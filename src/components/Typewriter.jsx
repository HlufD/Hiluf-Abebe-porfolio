import { useEffect, useState } from "react";

export default function Typewriter({ words, className }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const done = text === current;
    const cleared = text === "";

    let delay = deleting ? 45 : 90;
    if (done && !deleting) delay = 1600;
    if (cleared && deleting) delay = 350;

    const timer = setTimeout(() => {
      if (!deleting && done) {
        setDeleting(true);
      } else if (deleting && cleared) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return (
    <span className={className}>
      {text}
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-accent"
      />
    </span>
  );
}
