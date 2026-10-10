"use client";

import { LOCALES, LOCALE_LABELS } from "@/i18n/config";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export function LanguageSwitcher({
  className,
  compact = false,
}: LanguageSwitcherProps) {
  const { locale, setLocale, t, ready } = useLanguage();

  if (!ready) {
    return (
      <div
        className={cn(
          "h-10 w-[88px] rounded-full border border-[var(--border)]",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <div
      role="group"
      aria-label={t.lang.switcherLabel}
      className={cn(
        "inline-flex rounded-full border border-[var(--border)] bg-surface/80 p-0.5",
        className,
      )}
    >
      {LOCALES.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            aria-label={t.lang[code]}
            title={t.lang[code]}
            className={cn(
              "rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors",
              compact && "px-2 py-1 text-[11px]",
              active
                ? "bg-gold text-[#1a140c] shadow-sm"
                : "text-muted hover:text-gold",
            )}
          >
            {LOCALE_LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
