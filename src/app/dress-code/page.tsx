import { PageContainer, SectionTitle } from "@/components/site/PageContainer";

export const metadata = { title: "Dress Code" };

export default function DressCodePage() {
  return (
    <PageContainer>
      <SectionTitle title="Dress Code" />
      <p className="mx-auto max-w-3xl text-center font-display text-3xl leading-snug text-burgundy md:text-4xl">
        Formal / Evening attire
      </p>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-ink-muted">
        {"Suggested: Suit and Ties for men and Cocktail or midi dress; dressy jumpsuit also works. But wear whatever you'd like. If you wore pajamas, you better be prepared to dance in pajamas!"}
      </p>
      <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-ink-muted">
        Weather permitting, the ceremony is outside, so some heels and stilettos may be hard to walk in.
      </p>
    </PageContainer>
  );
}
