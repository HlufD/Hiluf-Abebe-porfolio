import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Icon from "./Icon";
import { profile, socials, sections } from "../lib/content";
import useActiveSection from "../lib/useActiveSection";

const ids = sections.map((s) => s.id);

function NavItems({ active, onNavigate }) {
  return (
    <nav className="flex flex-col gap-1">
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={onNavigate}
            aria-current={isActive ? "true" : undefined}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive
                ? "bg-accent-soft text-ink"
                : "text-ink-muted hover:bg-surface-2 hover:text-ink"
            }`}
          >
            <Icon
              name={s.id}
              className={`size-4 shrink-0 transition-colors ${
                isActive ? "text-accent" : "text-ink-faint group-hover:text-ink-muted"
              }`}
            />
            {s.label}
          </a>
        );
      })}
    </nav>
  );
}

function Socials() {
  return (
    <div className="flex gap-2">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target={s.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          aria-label={s.label}
          className="flex size-9 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
        >
          <Icon name={s.icon} className="size-4" />
        </a>
      ))}
    </div>
  );
}

function Identity() {
  return (
    <a href="#home" className="flex items-center gap-3">
      <img
        src={profile.photo}
        alt={profile.name}
        width="44"
        height="44"
        className="size-11 rounded-full object-cover ring-1 ring-line-strong"
      />
      <span>
        <span className="block text-sm font-semibold text-ink">{profile.name}</span>
        <span className="block font-mono text-xs text-ink-faint">{profile.role}</span>
      </span>
    </a>
  );
}

export default function Sidebar() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col justify-between border-r border-line bg-surface/60 px-6 py-8 backdrop-blur-xl lg:flex">
        <div className="flex flex-col gap-10">
          <Identity />
          <NavItems active={active} />
        </div>
        <div className="flex flex-col gap-4">
          {profile.available && (
            <span className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Available for work
            </span>
          )}
          <Socials />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-line bg-surface/70 px-4 py-3 backdrop-blur-xl lg:hidden">
        <a href="#home" className="flex items-center gap-2.5">
          <img
            src={profile.photo}
            alt={profile.name}
            width="32"
            height="32"
            className="size-8 rounded-full object-cover ring-1 ring-line-strong"
          />
          <span className="text-sm font-semibold">{profile.name}</span>
        </a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex size-9 items-center justify-center rounded-lg border border-line text-ink-muted"
        >
          <Icon name="menu" className="size-4" />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 flex h-full w-72 max-w-[80vw] flex-col justify-between border-l border-line bg-surface px-6 py-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <Identity />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="flex size-9 items-center justify-center rounded-lg border border-line text-ink-muted"
                  >
                    <Icon name="close" className="size-4" />
                  </button>
                </div>
                <NavItems active={active} onNavigate={() => setOpen(false)} />
              </div>
              <Socials />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
