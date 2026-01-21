import ScrollyCanvas from "./components/ScrollyCanvas";
import Overlay from "./components/Overlay";
import Projects from "./components/Projects";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import Footer from "./components/Footer";
import Noise from "./components/Noise";

export default function Home() {
  return (
    <main id="home" className="relative w-full">
      <Noise />
      <ScrollProgress />
      <Logo />
      <Navbar />
      <ScrollyCanvas />
      <Overlay />
      <Projects />
      <Footer />
    </main>
  );
}
