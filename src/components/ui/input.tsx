import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-full border border-gold/25 bg-cream-soft px-5 py-3 text-sm text-ink shadow-soft outline-none transition placeholder:text-ink-faint focus:border-burgundy/40",
        className,
      )}
      {...props}
    />
  );
}
