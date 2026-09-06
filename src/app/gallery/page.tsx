import { PhotoCardTunnel } from "@/components/wedding/PhotoCardTunnel";
import { PhotoTotem } from "@/components/wedding/PhotoTotem";
import { PageContainer, SectionTitle } from "@/components/site/PageContainer";

export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <PageContainer wide>
      <SectionTitle
        title="Gallery"
        subtitle="Two ways through the same engagement set — a card tunnel, then a floating field of parallel cards."
      />
      <section id="tunnel" className="scroll-mt-24">
        <p className="text-xs uppercase tracking-[0.22em] text-gold-ink">First</p>
        <h2 className="mt-1 font-display text-3xl text-burgundy md:text-4xl">A card tunnel</h2>
        <p className="mb-4 mt-2 max-w-2xl text-ink-muted">Scroll, swipe, or use the arrows to move through the hallway of photos.</p>
        <PhotoCardTunnel />
      </section>
      <section id="totem" className="mt-14 scroll-mt-24">
        <p className="text-xs uppercase tracking-[0.22em] text-gold-ink">Then</p>
        <h2 className="mt-1 font-display text-3xl text-burgundy md:text-4xl">A parallel totem of cards</h2>
        <p className="mb-4 mt-2 max-w-2xl text-ink-muted">Overlapping cards on a black field. Scroll or drag to move through the stack.</p>
        <PhotoTotem />
      </section>
    </PageContainer>
  );
}
