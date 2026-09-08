import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Section from "../components/Section";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { profile, socials, emailjs as cfg } from "../lib/content";

const contactLines = [
  { icon: "mail", label: profile.email, href: `mailto:${profile.email}` },
  { icon: "phone", label: profile.phone, href: `tel:${profile.phoneHref}` },
  { icon: "mapPin", label: profile.location, href: null },
];

const field =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-accent focus:outline-none";

export default function Contact() {
  const form = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(cfg.serviceId, cfg.templateId, form.current, {
        publicKey: cfg.publicKey,
      });
      form.current.reset();
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <Section id="contact" eyebrow="04 — Contact" title="Let's build something">
      <div className="grid gap-10 sm:grid-cols-[1fr_1.4fr]">
        <Reveal className="flex flex-col gap-6">
          <p className="text-sm leading-relaxed text-ink-muted">
            Have a project in mind or a role to fill? Send a message and I'll get
            back to you within a day or two.
          </p>
          <ul className="flex flex-col gap-3">
            {contactLines.map((c) => {
              const inner = (
                <>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line text-ink-muted">
                    <Icon name={c.icon} className="size-4" />
                  </span>
                  <span className="text-sm text-ink-muted">{c.label}</span>
                </>
              );
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="flex items-center gap-3 transition-colors hover:text-ink"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
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
        </Reveal>

        <Reveal delay={1}>
          <form ref={form} onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-ink-faint">Name</span>
                <input name="from_name" required className={field} placeholder="Jane Doe" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-ink-faint">Email</span>
                <input
                  name="from_email"
                  type="email"
                  required
                  className={field}
                  placeholder="jane@company.com"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs text-ink-faint">Subject</span>
              <input name="subject" required className={field} placeholder="Project inquiry" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs text-ink-faint">Message</span>
              <textarea
                name="message"
                required
                rows={6}
                className={`${field} resize-none`}
                placeholder="Tell me a little about what you need…"
              />
            </label>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                <Icon name={status === "sent" ? "check" : "send"} className="size-4" />
                {status === "sending"
                  ? "Sending…"
                  : status === "sent"
                    ? "Sent"
                    : "Send message"}
              </button>
              {status === "sent" && (
                <span className="text-sm text-emerald-400">Thanks — I'll be in touch.</span>
              )}
              {status === "error" && (
                <span className="text-sm text-red-400">
                  Something went wrong. Email me directly?
                </span>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
