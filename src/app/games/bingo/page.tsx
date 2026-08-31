import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { BingoBoard } from "@/components/games/BingoBoard";

export const metadata = { title: "Wedding Bingo" };

export default function BingoPage() {
  return (
    <PageContainer>
      <SectionTitle title="Wedding Bingo" subtitle="Tap a square when you see it. Progress saves on this device." />
      <BingoBoard />
    </PageContainer>
  );
}
