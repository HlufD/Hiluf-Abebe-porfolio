import Reveal from "./Reveal";

export default function Section({ id, eyebrow, title, children, className = "" }) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-3xl scroll-mt-24 px-6 py-24 sm:py-28 ${className}`}
    >
      {(eyebrow || title) && (
        <Reveal className="mb-12 flex flex-col gap-3">
          {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
          {title && (
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {title}
            </h2>
          )}
        </Reveal>
      )}
      {children}
    </section>
  );
}
