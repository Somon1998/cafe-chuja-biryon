"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface GalleryLightboxItem {
  src: string;
  unoptimized?: boolean;
  alt: string;
}

interface GalleryLightboxProps {
  items: readonly GalleryLightboxItem[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function GalleryLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const { t } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const isOpen = index !== null;
  const current = isOpen ? items[index] : null;

  useEffect(() => {
    if (!isOpen) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const frame = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled])",
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus();
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !current || typeof document === "undefined") return null;

  const controlClass =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/18 bg-black/55 text-white backdrop-blur-sm transition-colors duration-200 hover:border-gold/40 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:h-11 sm:w-11";

  return createPortal(
    <div
      ref={panelRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.lightbox.label}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/92"
        onClick={onClose}
        aria-label={t.gallery.lightbox.close}
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col">
        <div className="mb-3 flex items-center justify-end sm:mb-4">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className={controlClass}
            aria-label={t.gallery.lightbox.close}
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="relative mx-auto h-[min(58vh,680px)] w-full max-w-5xl sm:h-[min(70vh,760px)]">
          <Image
            src={current.src}
            unoptimized={current.unoptimized}
            alt={current.alt}
            fill
            sizes="100vw"
            quality={90}
            className="object-contain"
          />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 sm:mt-4 sm:gap-4">
          <button
            type="button"
            onClick={onPrev}
            className={controlClass}
            aria-label={t.gallery.lightbox.previous}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <p className="min-w-0 flex-1 truncate text-center text-xs text-white/75 sm:text-sm">
            {current.alt}
          </p>
          <button
            type="button"
            onClick={onNext}
            className={controlClass}
            aria-label={t.gallery.lightbox.next}
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
