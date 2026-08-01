import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
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
    <div className="bg-background text-foreground min-h-screen">
      <Navbar
        user={{
          name: user.name,
          username: user.username,
          image: user.image,
          currentStreak: user.currentStreak,
        }}
      />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
