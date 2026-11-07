import { Contact } from "./components/Contact/Contact";
import { Education } from "./components/Education/Education";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Nav } from "./components/Nav/Nav";
import { Skills } from "./components/Skills/Skills";
import { Work } from "./components/Work/Work";
import { useRevealOnScroll } from "./lib/hooks";

export default function App() {
  useRevealOnScroll();
  return (
    <>
      <a className="skip-link" href="#experience">
        Skip to content
      </a>
      <Nav />
      <main id="top">
        <Hero />
        <Experience />
        <Education />
        <Work />
        <Skills />
      </main>
      <Contact />
    </>
  );
}
