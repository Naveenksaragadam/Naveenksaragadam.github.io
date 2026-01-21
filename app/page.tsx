import ScrollyCanvas from "./components/ScrollyCanvas";
import Overlay from "./components/Overlay";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <main className="relative w-full">
      <ScrollyCanvas />
      <Overlay />
      <Projects />

      {/* Footer / Contact Section filler */}
      <footer className="w-full py-20 bg-[#121212] flex items-center justify-center border-t border-white/10">
        <p className="text-gray-500 text-sm uppercase tracking-widest">© 2024 Naveen Saragadam</p>
      </footer>
    </main>
  );
}
