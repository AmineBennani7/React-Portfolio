import { About } from "./components/About/About";
import { Archive } from "./components/Archive/Archive";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Nav } from "./components/Nav/Nav";
import { Work } from "./components/Work/Work";
import { useRevealOnScroll } from "./lib/hooks";

export default function App() {
  useRevealOnScroll();
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to projects
      </a>
      <Nav />
      <main id="top">
        <Hero />
        <Work />
        <Archive />
        <Experience />
        <About />
      </main>
      <Contact />
    </>
  );
}
