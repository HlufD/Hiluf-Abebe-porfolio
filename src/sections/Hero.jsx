import { motion } from "motion/react";
import Icon from "../components/Icon";
import Typewriter from "../components/Typewriter";
import DevRoomCanvas from "../components/DevRoomCanvas";
import { profile } from "../lib/content";

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden px-6 py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 size-[36rem] rounded-full bg-accent/10 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.p
            custom={0}
            variants={item}
            initial="hidden"
            animate="visible"
            className="section-eyebrow mb-6 flex items-center gap-2"
          >
            <Icon name="mapPin" className="size-3.5" />
            {profile.location}
          </motion.p>

          <motion.h1
            custom={1}
            variants={item}
            initial="hidden"
            animate="visible"
            className="text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.div
            custom={2}
            variants={item}
            initial="hidden"
            animate="visible"
            className="mt-4 font-mono text-lg text-ink-muted sm:text-xl"
          >
            <Typewriter words={profile.roles} />
          </motion.div>

          <motion.p
            custom={3}
            variants={item}
            initial="hidden"
            animate="visible"
            className="mt-8 max-w-xl text-base text-ink-muted sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            custom={4}
            variants={item}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href={profile.cv}
              download
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              <Icon name="download" className="size-4" />
              Download CV
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
            >
              Get in touch
              <Icon
                name="arrowRight"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative -mx-6 h-[340px] sm:h-[420px] lg:mx-0 lg:h-[520px]"
        >
          <DevRoomCanvas className="size-full" />
        </motion.div>
      </div>
    </section>
  );
}
