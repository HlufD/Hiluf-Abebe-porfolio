import Section from "../components/Section";
import Reveal from "../components/Reveal";
import { profile, facts, skillGroups } from "../lib/content";

export default function About() {
  return (
    <Section id="about" eyebrow="01 — About" title="A bit about me">
      <div className="flex flex-col gap-12">
        <Reveal className="space-y-4 text-base leading-relaxed text-ink-muted">
          {profile.about.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </Reveal>

        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-surface p-4">
              <div className="font-mono text-xs uppercase tracking-wide text-ink-faint">
                {f.label}
              </div>
              <div className="mt-1 text-sm font-medium text-ink">{f.value}</div>
            </div>
          ))}
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i}>
              <h3 className="mb-3 text-sm font-semibold text-ink">{group.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs text-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
