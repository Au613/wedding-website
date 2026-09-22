import { PhotoCardTunnel } from "@/components/wedding/PhotoCardTunnel";
import { PhotoTotem } from "@/components/wedding/PhotoTotem";
import { PageContainer, SectionTitle } from "@/components/site/PageContainer";

export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <PageContainer wide>
      <SectionTitle title="Gallery" />
      <section id="tunnel" className="scroll-mt-24">
        <PhotoCardTunnel />
      </section>
      <section id="totem" className="mt-14 scroll-mt-24">
        <PhotoTotem />
      </section>
    </PageContainer>
  );
}
