import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { OnboardingClient } from "./onboarding-client";

export const metadata: Metadata = {
  title: "Welcome to Grova | Onboarding",
  description: "Set up your profile and get started on Grova.",
};

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      username: true,
      email: true,
      image: true,
      bio: true,
      location: true,
      website: true,
      company: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return <OnboardingClient user={user} />;
}
