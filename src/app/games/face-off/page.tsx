import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { FaceOff } from "@/components/games/FaceOff";

export const metadata = { title: "Friend Face-Off" };

export default function FaceOffPage() {
  return (
    <PageContainer>
      <SectionTitle title="Friend Face-Off" subtitle="Which team wins: Austin or Alexa?" />
      <FaceOff />
    </PageContainer>
  );
}
