import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Services from "@/components/services";
import Contact from "@/components/contact";
import Blogs from "@/components/blogs";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Services />
      <Blogs />
      <Contact />
    </main>
  );
}
