import { couple } from "@/data/couple";
import { Monogram } from "./Monogram";

export function Footer() {
  return (
    <footer className="mt-16 bg-burgundy-dark text-cream-soft">
      <div className="mx-auto flex max-w-site flex-col items-center gap-6 px-6 py-12 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-4">
          <Monogram light size="md" />
          <div>
            <p className="font-display text-2xl">{couple.names}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-pale">
              {couple.displayDate} • {couple.hebrewDate}
            </p>
          </div>
        </div>
        <p className="max-w-sm text-sm text-cream-soft/80">We can&apos;t wait to celebrate with you!</p>
        <div className="flex flex-col items-center gap-3 md:items-end">
          <p className="text-xs tracking-[0.18em] text-gold-pale">{couple.hashtag}</p>
        </div>
      </div>
    </footer>
  );
}
