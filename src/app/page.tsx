import Link from "next/link";
import { couple } from "@/data/couple";
import { PageHero } from "@/components/site/PageHero";
import { PageContainer } from "@/components/site/PageContainer";
import { Reveal } from "@/components/site/Reveal";
import { Countdown } from "@/components/wedding/Countdown";
import { RoomBlockCard } from "@/components/wedding/RoomBlockCard";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeHeroActions, HomeQuickLinks } from "@/components/site/HomeVisibility";

export default function HomePage() {
  return (
    <>
      <PageHero image={couple.photos.hero} alt="Austin and Alexa">
        <p className="text-xs uppercase tracking-[0.35em]">Welcome to our wedding</p>
        <h1 className="mt-4 font-display text-6xl md:text-8xl">{couple.names}</h1>
        <p className="mt-4 text-sm uppercase tracking-[0.22em] text-gold-pale">
          {couple.displayDate} • {couple.hebrewDate}
        </p>
        <div className="mt-8">
          <Countdown />
        </div>
        <HomeHeroActions />
      </PageHero>
      <PageContainer wide>
        <HomeQuickLinks />
        <Reveal className="mt-16 grid gap-8 lg:grid-cols-2">
          <Card className="p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-gold-ink">A note from us</p>
            <h2 className="mt-2 font-display text-4xl text-burgundy">Welcome, beloved guests</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">{couple.welcomeMessage}</p>
          </Card>
          <Card className="p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-gold-ink">Dress code</p>
            <p className="mt-3 font-display text-3xl leading-snug text-burgundy">
              Wear Shabbas or Church Clothes but if you wore pajamas, you better be prepared to dance in pajamas!
            </p>
          </Card>
        </Reveal>
        <Reveal className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <RoomBlockCard />
          <Card className="p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-gold-ink">Registry</p>
            <h2 className="mt-2 font-display text-4xl text-burgundy">If you would like to</h2>
            <p className="mt-4 text-ink-muted">Your presence is the gift. A registry exists for anyone who enjoys a list.</p>
            <Link href={couple.registryUrl} className={cn(buttonVariants({ variant: "outline" }), "mt-6 inline-flex")}>
              View registry
            </Link>
          </Card>
        </Reveal>
      </PageContainer>
    </>
  );
}
