import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Navbar } from "@/components/shared/navbar";
import { HeroSection } from "@/components/shared/hero-section";
import { FeatureCards } from "@/components/shared/feature-cards";
import { BenefitsCards } from "@/components/shared/benefits-cards";
import { TestimonialsCards } from "@/components/shared/testimonials-cards";
import { PricingSection } from "@/components/shared/pricing-section";
import { FaqSection } from "@/components/shared/faq-section";
import { CtaCard } from "@/components/shared/cta-card";
import { Footer } from "@/components/shared/footer";

export default async function LandingPage() {
  const session = await auth();
  let loggedInUser = null;
  if (session?.user?.id) {
    loggedInUser = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        username: true,
        image: true,
        currentStreak: true,
      },
    });
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar user={loggedInUser} />

      {/* ── Hero ── */}
      <HeroSection loggedInUser={loggedInUser} />

      {/* ── Features ── */}
      <FeatureCards />

      {/* ── Benefits ── */}
      <BenefitsCards />

      {/* ── Testimonials ── */}
      <TestimonialsCards />

      {/* ── Pricing & Open Source ── */}
      <PricingSection />

      {/* ── FAQ ── */}
      <FaqSection />

      {/* ── CTA Banner Card ── */}
      <CtaCard />

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
