import { PhotoFrame } from "@/components/site/PhotoFrame";
import { couple } from "@/data/couple";
import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { WeddingGuideStepper } from "@/components/wedding/WeddingGuideStepper";
import { Card } from "@/components/ui/card";

export const metadata = { title: "What to Expect" };

export default function GuidePage() {
  return (
    <PageContainer wide>
      <SectionTitle
        title="What to Expect"
        subtitle="A step-by-step guide to our wedding day — written for first-timers and old hands alike."
      />
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <PhotoFrame
          src={couple.photos.guide}
          alt="Austin and Alexa walking toward the next moment"
          className="min-h-72"
        />
        <Card hover={false} className="p-6 text-left">
          <p className="font-display text-2xl text-burgundy">What to expect when you&apos;re expecting... an Orthodox wedding</p>
          <p className="mt-2 text-ink-muted">
            There will be Hebrew, a canopy, a glass, and more joy than the schedule can reasonably contain. You do not need to know the choreography. You only need to be here.
          </p>
        </Card>
      </div>
      <WeddingGuideStepper />
    </PageContainer>
  );
}
