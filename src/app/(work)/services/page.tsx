import type React from "react";
import ServiceContent from "@/components/pages/services-content";
import { Data as portfolioData } from "@/data/portfolio-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Services",
  description: "My freelancing services for different aspects of automation",
};

export default function ServicesPage() {
  return (
    <ServiceContent
      sectionTitle={portfolioData.services.sectionTitle}
      sectionDescription={portfolioData.services.sectionDescription}
      bookCallButton={portfolioData.services.bookCallButton}
    />
  );
}
