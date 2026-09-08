import { AnimatePresence, motion } from "motion/react";
import Icon from "./Icon";
import useTheme from "../lib/useTheme.jsx";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative flex size-9 items-center justify-center overflow-hidden rounded-lg border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 12, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -12, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Icon name={isDark ? "moon" : "sun"} className="size-4" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
