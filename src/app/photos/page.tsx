import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { PhotoUploader } from "@/components/wedding/PhotoUploader";

export const metadata = { title: "Share Photos" };

export default function PhotosPage() {
  return (
    <PageContainer wide>
      <SectionTitle title="Share Your Photos" subtitle="Optional wedding monkey included. No server-side image processing yet." />
      <PhotoUploader />
    </PageContainer>
  );
}
