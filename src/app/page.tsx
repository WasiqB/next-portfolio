import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Services from "@/components/services";
import Contact from "@/components/contact";
import Blogs from "@/components/blogs";
import Videos from "@/components/videos";
import SponsorsSection from "@/components/sponsors-section";
import Testimonials from "@/components/testimonials";
import GrowthSection from "@/components/growth-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Services />
      <Blogs />
      <Videos />
      <GrowthSection />
      <Testimonials />
      <SponsorsSection />
      <Contact />
    </main>
  );
}
