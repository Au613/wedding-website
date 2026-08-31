import { faq } from "@/data/faq";
import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export const metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <PageContainer>
      <SectionTitle title="A few gentle answers" subtitle="Friendly, non-judgmental, and safe to ask twice." />
      <div className="space-y-8">
        {faq.map((category) => (
          <Card key={category.id} hover={false} className="px-6">
            <h2 className="pt-6 font-display text-3xl text-burgundy">{category.title}</h2>
            <Accordion type="single" collapsible>
              {category.items.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
