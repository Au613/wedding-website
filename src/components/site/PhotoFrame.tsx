import Image from "next/image";
import { cn } from "@/lib/utils";

export function PhotoFrame({
  src,
  alt,
  className,
  priority = false,
  rounded = true,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  rounded?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-cream-deep",
        rounded && "rounded-card",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-contain object-center"
      />
    </div>
  );
}
