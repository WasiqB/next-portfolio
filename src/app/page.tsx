import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Services from "@/components/services";
import Contact from "@/components/contact";
import Blogs from "@/components/blogs";
import Videos from "@/components/videos";
import SponsorsSection from "@/components/sponsors-section";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Services />
      <Blogs />
      <Videos />
      <Testimonials />
      <SponsorsSection />
      <Contact />
    </main>
  );
}
