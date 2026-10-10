import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

const variants = {
  default:
    "border border-gold/20 bg-gold/8 text-gold-deep dark:text-gold",
  success:
    "border border-emerald-500/15 bg-emerald-500/8 text-emerald-800/90 dark:text-emerald-300/85",
  warning:
    "border border-gold/25 bg-gold/12 text-gold-deep dark:text-gold",
  danger:
    "border border-red-500/15 bg-red-500/8 text-red-800/90 dark:text-red-300/85",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
