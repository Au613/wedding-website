import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { GuestSearch } from "@/components/wedding/GuestSearch";

export const metadata = { title: "Guests" };

export default function GuestsPage() {
  return (
    <PageContainer wide>
      <SectionTitle title="Find & Connect" subtitle="Search for guests, friends, and family. No private contact details live here." />
      <GuestSearch />
    </PageContainer>
  );
}
