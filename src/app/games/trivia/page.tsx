import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { TriviaGame } from "@/components/games/TriviaGame";

export const metadata = { title: "Couple Trivia" };

export default function TriviaPage() {
  return (
    <PageContainer>
      <SectionTitle title="Couple Trivia" subtitle="Four choices. One right answer. Unlimited affection." />
      <TriviaGame />
    </PageContainer>
  );
}
