import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Target,
  Users,
  TrendingUp,
  CheckCircle2,
  Flame,
} from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Navbar } from "@/components/shared/navbar";

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
      <section
        id="home"
        className="mx-auto max-w-7xl px-4 pt-24 pb-16 text-center sm:px-6"
      >
        {/* Live badge */}
        <div className="border-primary/30 bg-primary/10 text-primary-glow mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
          <span className="dot-live" />
          Your next 6 months start today
        </div>

        <h1 className="text-foreground mx-auto max-w-3xl text-5xl leading-tight font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Build streaks. <span className="text-primary-glow">Ship goals.</span>
          <br />
          Show your growth.
        </h1>

        <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg">
          Grova is a public productivity tracker where your progress is your
          reputation. Set ambitious goals, log daily, and let the world see your
          consistency.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/login">
            <Button variant="default" size="lg" className="btn-glow">
              Start your journey
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="outline" size="lg">
              <Users className="h-4 w-4" />
              Explore community
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8">
          {[
            { value: "10K+", label: "Goals Created" },
            { value: "94%", label: "Avg Completion" },
            { value: "∞", label: "Streaks Possible" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-primary-glow text-3xl font-bold">
                {stat.value}
              </div>
              <div className="text-muted-foreground mt-1 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Heatmap Preview ── */}
      <section id="preview" className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <Card className="overflow-hidden p-6 shadow-2xl">
          {/* Mock header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/15 h-10 w-10 rounded-full" />
              <div>
                <div className="text-foreground text-sm font-semibold">
                  alexdev
                </div>
                <div className="text-muted-foreground text-xs">
                  🔥 34 day streak · 92% completion rate
                </div>
              </div>
            </div>
            <Badge variant="primary">Top 5%</Badge>
          </div>

          {/* Mock heatmap */}
          <div className="mb-2 flex gap-0.75 overflow-hidden">
            {Array.from({ length: 52 }).map((_, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-0.75">
                {Array.from({ length: 7 }).map((_, dayIdx) => {
                  const intensity =
                    Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
                  const heatClasses = [
                    "heat-0",
                    "heat-1",
                    "heat-2",
                    "heat-3",
                    "heat-4",
                  ];
                  return (
                    <div
                      key={dayIdx}
                      className={`h-2.75 w-2.75 rounded-sm ${heatClasses[intensity]}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="text-muted-foreground text-xs">
            2,340 contributions in 2026
          </div>
        </Card>
      </section>

      {/* ── Features ── */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-3xl font-bold">
            Everything you need to stay accountable
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Target,
              color: "text-primary-glow",
              bg: "bg-primary/15",
              title: "Smart Goal Creation",
              desc: "Set total targets, daily recurring, or weekly goals. We auto-calculate your daily pace to keep you on track.",
            },
            {
              icon: Flame,
              color: "text-warning",
              bg: "bg-warning/15",
              title: "Streak Tracking",
              desc: "Build momentum with daily streaks. Miss a day and lose it — the pressure keeps you going.",
            },
            {
              icon: Users,
              color: "text-info",
              bg: "bg-info/15",
              title: "Public Profiles",
              desc: "Every profile is public by default. Your progress is your reputation. Let consistency speak.",
            },
            {
              icon: TrendingUp,
              color: "text-purple",
              bg: "bg-purple/15",
              title: "Analytics & Trends",
              desc: "Deep insights into your velocity, best days, and completion patterns across all goals.",
            },
            {
              icon: CheckCircle2,
              color: "text-primary-glow",
              bg: "bg-primary/15",
              title: "Daily Execution Log",
              desc: "Log your day task by task. Lock the day when done. Tomorrow's queue prepares itself.",
            },
            {
              icon: Zap,
              color: "text-warning",
              bg: "bg-warning/15",
              title: "GitHub-style Heatmap",
              desc: "Visualize your entire year at a glance. Green means you showed up. No green? You know what to do.",
            },
          ].map((feature) => (
            <Card key={feature.title} variant="hover" className="p-5">
              <div
                className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md ${feature.bg}`}
              >
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              <h3 className="text-foreground mb-1.5 text-sm font-semibold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <Card className="border-primary/30 p-10 shadow-2xl">
          <Flame className="text-primary-glow mx-auto mb-4 h-12 w-12" />
          <h2 className="text-foreground text-3xl font-bold">
            Your 6-month transformation starts now.
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-md text-base">
            Sign up free. Set your first goal. Come back tomorrow. The
            discipline compounds.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/login">
              <Button variant="default" size="lg" className="btn-glow">
                Create your profile — it&apos;s free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* ── Footer ── */}
      <footer className="border-border border-t py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="btn-glow flex h-5 w-5 items-center justify-center rounded">
                <Zap className="h-3 w-3 text-white" />
              </div>
              <span className="text-muted-foreground text-sm font-semibold">
                Grova
              </span>
            </div>
            <div className="text-subtle-foreground flex gap-6 text-xs">
              <span>© 2026 Grova</span>
              <Link
                href="/explore"
                className="hover:text-muted-foreground transition-colors"
              >
                Community
              </Link>
              <span>Privacy</span>
              <span>Terms</span>
            </div>
            <div className="text-primary-glow flex items-center gap-1.5 text-xs">
              <span className="dot-live h-1.5! w-1.5!" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
