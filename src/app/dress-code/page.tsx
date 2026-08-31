import Image from "next/image";
import { couple } from "@/data/couple";
import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { DressCodeCard } from "@/components/wedding/DressCodeCard";

export const metadata = { title: "Dress Code" };

export default function DressCodePage() {
  return (
    <PageContainer>
      <SectionTitle title="Dress Code" subtitle="Elegant. Respectful. Timeless." />
      <div className="grid gap-8 md:grid-cols-2">
        <DressCodeCard
          title="Women"
          points={[
            "Dresses around the knee or longer",
            "Sleeves or a shawl suggested",
            "Elegant evening attire",
            "Please avoid white and ivory",
          ]}
        >
          <div className="relative h-72 bg-cream-deep">
            <Image src={couple.photos.dress} alt="Alexa in a blush top and floral skirt" fill className="object-contain object-center" />
          </div>
        </DressCodeCard>
        <DressCodeCard
          title="Men"
          points={[
            "Suit or jacket",
            "Dress shirt and dress shoes",
            "Kippot available at the entrance",
            "A festive tie is always welcome",
          ]}
        >
          <div className="relative h-72 bg-cream-deep">
            <Image src={couple.photos.austin} alt="Austin wearing a kippah" fill className="object-contain object-center" />
          </div>
        </DressCodeCard>
      </div>
      <p className="mt-10 text-center text-ink-muted">
        If you are unsure, choose the kinder, more covered option. You will look wonderful, and you will feel at ease.
      </p>
    </PageContainer>
  );
}
