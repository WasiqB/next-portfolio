import SponsorContent from "@/components/pages/sponsor-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Sponsors",
  description: "My sponsors for my open source project contributions",
};

export default function SponsorsPage() {
  return <SponsorContent />;
}
