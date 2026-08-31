import { GamesHub } from "@/components/games/GamesHub";
import { PageContainer, SectionTitle } from "@/components/site/PageContainer";

export const metadata = { title: "Games" };

export default function GamesPage() {
  return (
    <PageContainer wide>
      <SectionTitle title="Let's Play!" subtitle="Trivia, bingo, predictions, and a friendly face-off. Points live in your browser." />
      <GamesHub />
    </PageContainer>
  );
}
