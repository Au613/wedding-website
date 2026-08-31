import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { SevenBrachotList } from "@/components/wedding/SevenBrachotList";

export const metadata = { title: "The Seven Brachot" };

export default function BrachotPage() {
  return (
    <PageContainer>
      <SectionTitle
        title="The Seven Brachot"
        subtitle="Seven blessings of joy. Hebrew is stored in data for review — please confirm with your rabbi before printing."
      />
      <SevenBrachotList />
    </PageContainer>
  );
}
