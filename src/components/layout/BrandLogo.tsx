import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface BrandLogoProps {
  alt: string;
  size?: number;
  className?: string;
  priority?: boolean;
}

export function BrandLogo({
  alt,
  size = 96,
  className,
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src={IMAGES.logo}
      alt={alt}
      width={size}
      height={size}
      quality={90}
      priority={priority}
      className={cn("aspect-square object-contain", className)}
    />
  );
}
