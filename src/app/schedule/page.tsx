import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { ScheduleTimeline } from "@/components/wedding/ScheduleTimeline";
import { LiveStatusBanner } from "@/components/wedding/LiveStatusBanner";

export const metadata = { title: "Schedule" };

export default function SchedulePage() {
  return (
    <PageContainer>
      <SectionTitle title="The Day's Rhythm" subtitle="One schedule, shared with Live Wedding Mode." />
      <div className="mb-8">
        <LiveStatusBanner />
      </div>
      <ScheduleTimeline />
    </PageContainer>
  );
}
