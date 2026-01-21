import ScrollyCanvas from "./components/ScrollyCanvas";
import Overlay from "./components/Overlay";
import Projects from "./components/Projects";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";

export default function Home() {
  return (
    <main id="home" className="relative w-full">
      <ScrollProgress />
      <Logo />
      <Navbar />
      <ScrollyCanvas />
      <Overlay />
      <Projects />

      {/* Footer / Contact Section filler */}
      <footer id="contact" className="w-full py-20 bg-[#121212] flex items-center justify-center border-t border-white/10">
        <p className="text-gray-500 text-sm uppercase tracking-widest">© 2024 Naveen Saragadam</p>
      </footer>
    </main>
  );
}
