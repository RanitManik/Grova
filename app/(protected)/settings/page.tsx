import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { SettingsClient } from "./settings-client";

export const metadata: Metadata = {
  title: "Settings",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

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

  if (!user) redirect("/login");

  return <SettingsClient user={user} />;
}
