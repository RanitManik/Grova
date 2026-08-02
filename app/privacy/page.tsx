import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Metadata } from "next";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Privacy Policy | Grova",
  description: "Privacy Policy for Grova.",
};

export default async function PrivacyPolicyPage() {
  const session = await auth();
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Navbar user={session?.user} />
      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <div className="space-y-6 text-sm leading-relaxed text-[#8b949e]">
            <p>
              <strong>Last updated:</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p>
              At Grova, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website and use our service.
            </p>

            <h2 className="mt-8 text-xl font-bold text-white">
              1. Information We Collect
            </h2>
            <p>
              We collect information that you provide directly to us when you
              register for an account, create goals, or otherwise communicate
              with us. This includes:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Personal Data:</strong> Name, email address, username,
                and profile picture (typically obtained through OAuth providers
                like GitHub or Google).
              </li>
              <li>
                <strong>Usage Data:</strong> Information about your goals,
                streaks, daily logs, and interactions within the platform.
              </li>
            </ul>

            <h2 className="mt-8 text-xl font-bold text-white">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Provide, operate, and maintain our platform.</li>
              <li>Improve, personalize, and expand our platform.</li>
              <li>Understand and analyze how you use our platform.</li>
              <li>Communicate with you for customer service or updates.</li>
            </ul>

            <h2 className="mt-8 text-xl font-bold text-white">
              3. Public Visibility
            </h2>
            <p>
              By default, Grova is a public accountability platform. The goals
              you create, your heatmaps, and your activity logs are visible on
              your public profile unless specified otherwise in future settings.
              Please do not share sensitive personal information in your goal
              descriptions or daily notes.
            </p>

            <h2 className="mt-8 text-xl font-bold text-white">
              4. Third-Party Services
            </h2>
            <p>
              We use third-party authentication services (like GitHub and
              Google) to verify your identity. We do not store your passwords.
              We also use third-party infrastructure (like Vercel and Neon) to
              host our database and application. These services have their own
              privacy policies.
            </p>

            <h2 className="mt-8 text-xl font-bold text-white">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:grova@5dev.in"
                className="underline underline-offset-4 hover:text-white"
              >
                grova@5dev.in
              </a>{" "}
              or open an issue in our open-source repository.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
