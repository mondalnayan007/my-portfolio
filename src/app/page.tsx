import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollText from "@/components/ui/ScrollText";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <ScrollText text="Real-time ✦ Scalable ✦ Multi-tenant ✦ " />
        <About />
        <Projects />
        <ScrollText text="Design ✦ Code ✦ Ship ✦ Repeat ✦ " reverse />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
