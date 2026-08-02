import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SidebarLayout } from "@/components/shared/sidebar";
import { db } from "@/lib/db";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      currentStreak: true,
    },
  });

  if (!user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <SidebarLayout
      user={{
        name: user.name,
        username: user.username,
        image: user.image,
        currentStreak: user.currentStreak,
      }}
    >
      {children}
    </SidebarLayout>
  );
}
