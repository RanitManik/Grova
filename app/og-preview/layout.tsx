import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OG Image Preview",
  description: "Preview OpenGraph social cards for Grova profiles.",
};

export default function OgPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
