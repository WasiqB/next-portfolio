import type React from "react";
import ServiceContent from "@/components/pages/services-content";
import { Data as portfolioData } from "@/data/portfolio-data";

export const metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <ServiceContent
      sectionTitle={portfolioData.services.sectionTitle}
      sectionDescription={portfolioData.services.sectionDescription}
      bookCallButton={portfolioData.services.bookCallButton}
      email={portfolioData.about.email}
    />
  );
}
