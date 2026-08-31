import { menuCourses } from "@/data/menu";
import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { MenuVoting } from "@/components/wedding/MenuVoting";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Menu" };

export default function MenuPage() {
  return (
    <PageContainer>
      <SectionTitle title="What's on the Menu?" subtitle="Kosher, celebratory, and worth a vote." />
      <div className="mb-10 grid gap-4 md:grid-cols-2">
        {menuCourses.map((course) => (
          <Card key={course.id} className="p-6">
            <h2 className="font-display text-2xl text-burgundy">{course.title}</h2>
            <ul className="mt-3 space-y-1 text-ink-muted">
              {course.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <MenuVoting />
    </PageContainer>
  );
}
