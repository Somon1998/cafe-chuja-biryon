"use client";

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  level?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  align = "center",
  level = "h2",
}: SectionHeadingProps) {
  const Title = level === "h1" ? "h1" : "h2";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-8 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
      <Title className="font-display text-[1.65rem] font-medium leading-[1.15] tracking-tight text-foreground sm:text-[2rem] lg:text-[2.5rem]">
        {title}
      </Title>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
