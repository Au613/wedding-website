import Image from "next/image";
import type { GalleryPhoto } from "@/data/galleryPhotos";

export function GalleryFace({ photo, priority }: { photo: GalleryPhoto; priority?: boolean }) {
  if (photo.treatment === "title") {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-cream p-5 text-left">
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-ink">Austin & Alexa</p>
        <p className="font-display text-4xl leading-tight text-burgundy md:text-5xl">{photo.caption}</p>
      </div>
    );
  }

  if (photo.treatment === "pattern") {
    return (
      <div className="relative flex h-full w-full items-end overflow-hidden bg-cream p-5">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundColor: "#F4EEE4",
            backgroundImage:
              "radial-gradient(circle at 50% 22px, #6F2A3D 16px, #C4A36A 17px, #C4A36A 19px, transparent 20px)",
            backgroundSize: "44px 32px",
            backgroundPosition: "0 12px",
          }}
        />
        <p className="relative font-display text-3xl text-burgundy">{photo.caption}</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-cream-deep">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="40vw"
        priority={priority}
        className="object-cover"
        draggable={false}
      />
    </div>
  );
}
