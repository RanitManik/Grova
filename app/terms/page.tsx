import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Metadata } from "next";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Grova.",
};

export default async function TermsOfServicePage() {
  const session = await auth();
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Navbar user={session?.user} />
      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Terms of Service
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
              Welcome to Grova. By accessing or using our website, you agree to
              be bound by these Terms of Service. If you disagree with any part
              of the terms, you may not access the service.
            </p>

            <h2 className="mt-8 text-xl font-bold text-white">
              1. Use of the Service
            </h2>
            <p>
              Grova provides a platform for daily habit-building and
              goal-tracking. You agree to use the service only for lawful
              purposes and in a way that does not infringe the rights of,
              restrict, or inhibit anyone else&apos;s use of the platform.
            </p>

            <h2 className="mt-8 text-xl font-bold text-white">
              2. User Accounts
            </h2>
            <p>
              When you create an account with us, you must provide accurate and
              complete information. You are responsible for maintaining the
              security of your account and for all activities that occur under
              the account. We reserve the right to terminate accounts that
              violate our community standards or are used for malicious
              purposes.
            </p>

            <h2 className="mt-8 text-xl font-bold text-white">
              3. User-Generated Content
            </h2>
            <p>
              You retain ownership of any content you submit, post, or display
              on or through the service. By submitting content, you grant Grova
              a worldwide, non-exclusive, royalty-free license to use,
              reproduce, adapt, and display that content in connection with
              providing the service (e.g., displaying your public profile).
            </p>

            <h2 className="mt-8 text-xl font-bold text-white">
              4. Open Source and Self-Hosting
            </h2>
            <p>
              The source code for Grova is available under the MIT License. You
              are free to self-host and modify the code as permitted by the
              license. However, the managed service provided at our official
              domain is subject to these Terms of Service.
            </p>

            <h2 className="mt-8 text-xl font-bold text-white">
              5. Disclaimer of Warranties
            </h2>
            <p>
              The service is provided on an &quot;AS IS&quot; and &quot;AS
              AVAILABLE&quot; basis. We make no warranties, expressed or
              implied, regarding the availability, reliability, or accuracy of
              the service.
            </p>

            <h2 className="mt-8 text-xl font-bold text-white">
              6. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify or replace these Terms at any time.
              If a revision is material, we will try to provide at least 30
              days&apos; notice prior to any new terms taking effect.
            </p>

            <h2 className="mt-8 text-xl font-bold text-white">7. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please
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
