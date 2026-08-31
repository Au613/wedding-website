import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { TournamentBracket } from "@/components/games/TournamentBracket";

export const metadata = { title: "Tournament Bracket" };

export default function BracketPage() {
  return (
    <PageContainer wide>
      <SectionTitle title="Wedding predictions" subtitle="Click a winner in each match. The final pick earns leaderboard points." />
      <TournamentBracket />
    </PageContainer>
  );
}
