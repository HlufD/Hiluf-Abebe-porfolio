import Section from "../components/Section";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { profile, experience, education } from "../lib/content";

function Timeline({ entries }) {
  return (
    <div className="relative flex flex-col gap-10 border-l border-line pl-6">
      {entries.map((e) => (
        <Reveal key={`${e.org}-${e.period}`} className="relative">
          <span className="absolute -left-[1.6875rem] top-1.5 size-2.5 rounded-full border-2 border-bg bg-accent" />
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="text-base font-semibold text-ink">{e.title ?? e.role}</h4>
            <span className="font-mono text-xs text-ink-faint">{e.period}</span>
          </div>
          <div className="mt-0.5 text-sm text-ink-muted">
            {e.org}
            {e.place ? ` · ${e.place}` : ""}
          </div>
          {e.points.length > 0 && (
            <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
              {e.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-ink-faint" />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      ))}
    </div>
  );
}

export default function Resume() {
  return (
    <Section id="resume" eyebrow="02 — Resume" title="Experience & education">
      <div className="mb-10">
        <a
          href={profile.cv}
          download
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
        >
          <Icon name="download" className="size-4" />
          Download full CV (PDF)
        </a>
      </div>

      <div className="flex flex-col gap-14">
        <div>
          <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-ink-faint">
            Experience
          </h3>
          <Timeline entries={experience} />
        </div>
        <div>
          <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-ink-faint">
            Education
          </h3>
          <Timeline entries={education} />
        </div>
      </div>
    </Section>
  );
}
