"use client";

import { cn } from "@/lib/utils";
import { useLayoutEffect, useRef, useState } from "react";

interface ProductDescriptionProps {
  text: string;
  showMoreLabel: string;
  showLessLabel: string;
  /** Растягивать блок описания — только у карточек с фото. */
  grow?: boolean;
  /**
   * Показывать «Бештар нишон додан» при переполнении line-clamp-2.
   * false — полный текст без truncation/кнопки (per-item override).
   */
  allowExpand?: boolean;
}

export function ProductDescription({
  text,
  showMoreLabel,
  showLessLabel,
  grow = true,
  allowExpand = true,
}: ProductDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const clampEnabled = allowExpand && !expanded;

  useLayoutEffect(() => {
    if (!allowExpand || expanded) return;

    const el = descriptionRef.current;
    if (!el) return;

    setCanExpand(el.scrollHeight > el.clientHeight + 1);
  }, [text, expanded, allowExpand]);

  return (
    <div className={cn("mt-2 min-w-0", grow && "flex-1")}>
      <p
        ref={descriptionRef}
        className={cn(
          "break-words text-[0.8125rem] leading-relaxed text-muted/90 sm:text-sm",
          clampEnabled && "line-clamp-2",
        )}
      >
        {text}
      </p>
      {allowExpand && (canExpand || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1 text-left text-xs font-medium text-gold/90 transition-colors duration-200 hover:text-gold-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2"
        >
          {expanded ? showLessLabel : showMoreLabel}
        </button>
      )}
    </div>
  );
}

