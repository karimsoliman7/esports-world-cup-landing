// tilted emoji pill, from the hero design + social posters
export default function Sticker({
  emoji,
  rotate = -15,
  className = "",
  bob = false,
}: {
  emoji: string;
  rotate?: number;
  className?: string;
  bob?: boolean;
}) {
  return (
    <span className={`pointer-events-none select-none ${className}`} aria-hidden>
      <span className={bob ? "block animate-bob" : "block"}>
        <span
          className="flex size-11 items-center justify-center rounded-full border-2 border-black/5 bg-purple text-2xl leading-none md:size-12"
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          {emoji}
        </span>
      </span>
    </span>
  );
}
