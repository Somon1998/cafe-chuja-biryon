import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionEyebrowProps {
  children: ReactNode;
  className?: string;
}

export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "mb-2.5 block font-bold uppercase tracking-[0.16em] text-gold",
        "text-[15px] min-[430px]:text-[16px] min-[768px]:text-[17px] min-[1024px]:text-[18px] min-[1440px]:text-[19px]",
        "min-[768px]:mb-3 min-[1024px]:mb-3.5",
        "leading-tight",
        className,
      )}
    >
      {children}
    </p>
  );
}
