import Sidebar from "./components/Sidebar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Resume from "./sections/Resume";
import Work from "./sections/Work";
import Contact from "./sections/Contact";
import { profile } from "./lib/content";

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <Sidebar />

      <div className="relative z-10 pt-14 lg:pl-64 lg:pt-0">
        <main>
          <Hero />
          <div className="border-t border-line">
            <About />
          </div>
          <div className="border-t border-line">
            <Resume />
          </div>
          <div className="border-t border-line">
            <Work />
          </div>
          <div className="border-t border-line">
            <Contact />
          </div>
        </main>

        <footer className="border-t border-line px-6 py-10">
          <div className="mx-auto flex max-w-3xl flex-col items-start justify-between gap-2 text-sm text-ink-faint sm:flex-row sm:items-center">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span className="font-mono text-xs">
              Built with React, Vite &amp; Tailwind
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
