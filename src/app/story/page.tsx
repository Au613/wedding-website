import Image from "next/image";
import Link from "next/link";
import { PhotoFrame } from "@/components/site/PhotoFrame";
import { couple } from "@/data/couple";
import { storyMilestones } from "@/data/story";
import { PageContainer, SectionTitle } from "@/components/site/PageContainer";
import { Reveal } from "@/components/site/Reveal";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = { title: "Our Story" };

export default function StoryPage() {
  return (
    <PageContainer wide>
      <SectionTitle eyebrow="Austin & Alexa" title="Our Story" subtitle="A short editorial of a long conversation." />
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          {[couple.groom, couple.bride].map((person, index) => (
            <Reveal key={person.firstName}>
              <Card className="flex gap-5 p-5">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-cream-deep">
                  <Image
                    src={index === 0 ? couple.photos.austin : couple.photos.alexa}
                    alt={person.fullName}
                    fill
                    className="object-contain object-center"
                  />
                </div>
                <div>
                  <h2 className="font-display text-3xl text-burgundy">{person.fullName}</h2>
                  <p className="mt-2 text-sm text-ink-muted">{person.shortBio}</p>
                  <p className="mt-2 text-sm italic text-gold-ink">{person.funFact}</p>
                </div>
              </Card>
            </Reveal>
          ))}
          <ol className="relative ml-3 border-l border-gold/40 pl-8">
            {storyMilestones.map((item) => (
              <Reveal key={item.year}>
                <li className="mb-10">
                  <span className="absolute -left-2 mt-1 h-4 w-4 rounded-full border border-gold bg-cream-soft" />
                  <p className="text-xs uppercase tracking-[0.2em] text-gold-ink">{item.year}</p>
                  <h3 className="font-display text-2xl text-burgundy">{item.title}</h3>
                  <p className="text-ink-muted">{item.caption}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Link href="/" className={cn(buttonVariants())}>
            Save the date
          </Link>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <PhotoFrame
            src={couple.photos.storyMain}
            alt="Austin and Alexa looking at each other among the trees"
            className="min-h-[28rem] md:row-span-2"
          />
          <PhotoFrame
            src={couple.photos.storyOne}
            alt="Austin and Alexa walking through a sunlit field"
            className="min-h-52"
          />
          <PhotoFrame
            src={couple.photos.storyTwo}
            alt="Alexa showing her engagement ring while Austin celebrates"
            className="min-h-52"
          />
        </div>
      </div>
    </PageContainer>
  );
}
