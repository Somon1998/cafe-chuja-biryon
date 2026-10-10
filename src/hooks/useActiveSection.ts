"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export const NAV_SECTION_IDS = [
  "hero",
  "menu",
  "about",
  "gallery",
  "contact",
] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

function isNavSectionId(value: string): value is NavSectionId {
  return (NAV_SECTION_IDS as readonly string[]).includes(value);
}

function hashParts(): string[] {
  if (typeof window === "undefined") return [];
  return window.location.hash.replace(/^#/, "").split("#").filter(Boolean);
}

function sectionFromHash(): NavSectionId | null {
  for (const part of hashParts()) {
    if (isNavSectionId(part)) return part;
  }
  return null;
}

function canonicalHashUrl(section: NavSectionId): string {
  return `${window.location.pathname}${window.location.search}#${section}`;
}

function locationHasDuplicateHash(): boolean {
  return window.location.hash.replace(/^#/, "").includes("#");
}

function sectionForPathname(pathname: string): NavSectionId {
  if (pathname === "/menu") return "menu";
  if (pathname === "/contact") return "contact";
  return sectionFromHash() ?? "hero";
}

function pathDefaultSection(pathname: string): NavSectionId {
  if (pathname === "/menu") return "menu";
  if (pathname === "/contact") return "contact";
  return "hero";
}

export function useActiveSection() {
  const pathname = usePathname();
  const [navState, setNavState] = useState(() => ({
    pathname,
    section: pathDefaultSection(pathname) as NavSectionId,
  }));
  const clickLockRef = useRef(false);
  const clickLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (navState.pathname !== pathname) {
    setNavState({
      pathname,
      section: sectionForPathname(pathname),
    });
  }

  const setSection = useCallback((section: NavSectionId) => {
    setNavState((prev) =>
      prev.section === section ? prev : { ...prev, section },
    );
  }, []);

  const canonicalizeHash = useCallback(() => {
    if (!locationHasDuplicateHash()) return;
    const fromHash = sectionFromHash();
    if (!fromHash) return;
    window.history.replaceState(null, "", canonicalHashUrl(fromHash));
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      canonicalizeHash();
      if (clickLockRef.current) return;
      const fromHash = sectionFromHash();
      if (fromHash) setSection(fromHash);
    };

    window.addEventListener("hashchange", onHashChange);

    const frame = requestAnimationFrame(() => {
      canonicalizeHash();
      const fromHash = sectionFromHash();
      if (fromHash) setSection(fromHash);
    });

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      cancelAnimationFrame(frame);
    };
  }, [pathname, setSection, canonicalizeHash]);

  useEffect(() => {
    const elements = NAV_SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLockRef.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0];
        if (!top) return;

        const id = top.target.id;
        if (isNavSectionId(id)) {
          setSection(id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname, setSection]);

  useEffect(() => {
    return () => {
      if (clickLockTimerRef.current) {
        clearTimeout(clickLockTimerRef.current);
      }
    };
  }, []);

  const activateSection = useCallback(
    (sectionId: NavSectionId) => {
      clickLockRef.current = true;
      setSection(sectionId);
      requestAnimationFrame(canonicalizeHash);

      if (clickLockTimerRef.current) {
        clearTimeout(clickLockTimerRef.current);
      }
      clickLockTimerRef.current = setTimeout(() => {
        clickLockRef.current = false;
        clickLockTimerRef.current = null;
        canonicalizeHash();
      }, 900);
    },
    [setSection, canonicalizeHash],
  );

  useEffect(() => {
    if (pathname !== "/") return;

    const onDocumentClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const hrefAttr = anchor.getAttribute("href");
      if (!hrefAttr) return;

      const sectionId = sectionIdFromHref(hrefAttr);
      if (!sectionId) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin || url.pathname !== "/") return;

      event.preventDefault();
      activateSection(sectionId);

      const currentId = window.location.hash.replace(/^#/, "").split("#")[0];
      if (locationHasDuplicateHash()) {
        window.history.replaceState(null, "", canonicalHashUrl(sectionId));
      } else if (currentId !== sectionId) {
        window.location.hash = sectionId;
        return;
      }

      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    };

    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, [pathname, activateSection]);

  return { activeSection: navState.section, activateSection };
}

export function sectionIdFromHref(href: string): NavSectionId | null {
  if (!href.includes("#")) return null;
  for (const part of href.split("#").slice(1)) {
    if (isNavSectionId(part)) return part;
  }
  return null;
}
