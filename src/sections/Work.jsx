import { motion } from "motion/react";
import Section from "../components/Section";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { projects } from "../lib/content";

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index}>
      <motion.a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="group block overflow-hidden rounded-2xl border border-line bg-surface"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="size-full object-cover object-top opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-ink">{project.title}</h3>
            <Icon
              name="arrowUpRight"
              className="size-4 text-ink-faint transition-colors group-hover:text-accent"
            />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {project.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-ink-faint"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </motion.a>
    </Reveal>
  );
}

export default function Work() {
  return (
    <Section id="work" eyebrow="03 — Work" title="Selected projects">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
