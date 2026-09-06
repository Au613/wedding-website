import { PageContainer, SectionTitle } from "@/components/site/PageContainer";

export const metadata = { title: "Dress Code" };

export default function DressCodePage() {
  return (
    <PageContainer>
      <SectionTitle title="Dress Code" />
      <p className="mx-auto max-w-3xl text-center font-display text-3xl leading-snug text-burgundy md:text-4xl">
        Wear Shabbas or Church Clothes but if you wore pajamas, you better be prepared to dance in pajamas!
      </p>
    </PageContainer>
  );
}
