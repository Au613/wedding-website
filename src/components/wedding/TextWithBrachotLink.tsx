const PHRASE = "our Seven Brachot page";

export function TextWithBrachotLink({
  text,
  className,
  linkClassName,
}: {
  text: string;
  className?: string;
  linkClassName?: string;
}) {
  const index = text.indexOf(PHRASE);
  if (index === -1) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className}>
      {text.slice(0, index)}
      <a href="/brachot" className={linkClassName}>
        {PHRASE}
      </a>
      {text.slice(index + PHRASE.length)}
    </p>
  );
}
