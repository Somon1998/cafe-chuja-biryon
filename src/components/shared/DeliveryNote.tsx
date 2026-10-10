"use client";

import { DELIVERY } from "@/constants/delivery";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface DeliveryNoteProps {
  className?: string;
  compact?: boolean;
}

export function DeliveryNote({ className, compact = false }: DeliveryNoteProps) {
  const { t } = useLanguage();

  return (
    <p
      className={cn(
        "text-muted",
        compact ? "text-sm leading-relaxed" : "text-sm leading-relaxed sm:text-base",
        className,
      )}
    >
      {t.delivery.fee(DELIVERY.fee)}{" "}
      {t.delivery.freeFrom(DELIVERY.freeFrom)}
    </p>
  );
}
