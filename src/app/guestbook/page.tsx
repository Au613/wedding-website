import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { GuestBookForm } from "@/components/wedding/GuestBookForm";

export const metadata = { title: "Guest Book" };

export default function GuestBookPage() {
  return (
    <PageContainer wide>
      <SectionTitle title="Leave a Note" subtitle="Advice, memory, mazel tov, or a story we will pretend not to believe." />
      <GuestBookForm />
    </PageContainer>
  );
}
