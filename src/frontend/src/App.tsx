import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const HEART_EMOJIS = ["❤️", "💕", "💗", "💖", "💝", "🌸", "💓", "💞"];

interface FloatingHeart {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayDuration: number;
}

interface FallingHeart {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
}

function generateFloatingHearts(count: number): FloatingHeart[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
    left: Math.random() * 100,
    size: 16 + Math.random() * 24,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 8,
    swayDuration: 3 + Math.random() * 3,
  }));
}

function generateFallingHearts(count: number): FallingHeart[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
    left: Math.random() * 100,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 5,
  }));
}

const floatingHearts = generateFloatingHearts(18);
const fallingHearts = generateFallingHearts(30);

export default function App() {
  const [screen, setScreen] = useState<"proposal" | "celebration">("proposal");
  const [noPos, setNoPos] = useState<{ top: number; left: number } | null>(
    null,
  );
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = useCallback(() => {
    const margin = 80;
    const top = margin + Math.random() * (window.innerHeight - margin * 2);
    const left = margin + Math.random() * (window.innerWidth - margin * 2);
    setNoPos({ top, left });
  }, []);

  useEffect(() => {
    const btn = noButtonRef.current;
    if (!btn) return;
    btn.addEventListener("touchstart", moveNoButton, { passive: true });
    return () => btn.removeEventListener("touchstart", moveNoButton);
  }, [moveNoButton]);

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      <AnimatePresence mode="wait">
        {screen === "proposal" ? (
          <motion.div
            key="proposal"
            className="min-h-screen w-full relative flex items-center justify-center px-4 py-10"
            style={{ background: "oklch(0.96 0.018 80)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            {/* Floating hearts background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {floatingHearts.map((h) => (
                <span
                  key={h.id}
                  className="floating-heart"
                  style={{
                    left: `${h.left}%`,
                    bottom: "-60px",
                    fontSize: `${h.size}px`,
                    animationDuration: `${h.duration}s, ${h.swayDuration}s`,
                    animationDelay: `${h.delay}s, ${h.delay * 0.5}s`,
                    opacity: 0.6,
                  }}
                >
                  {h.emoji}
                </span>
              ))}
            </div>

            {/* Proposal card */}
            <motion.div
              className="relative z-10 w-full max-w-md rounded-3xl shadow-2xl px-8 py-12 text-center"
              style={{
                background: "oklch(0.99 0.008 60 / 0.92)",
                backdropFilter: "blur(12px)",
                border: "1px solid oklch(0.88 0.06 15 / 0.5)",
                boxShadow:
                  "0 20px 60px oklch(0.65 0.12 10 / 0.2), 0 4px 20px oklch(0.65 0.12 10 / 0.1)",
              }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            >
              {/* Top heart */}
              <div className="heart-icon text-5xl mb-4">💍</div>

              {/* Salutation */}
              <p
                className="playfair text-xl font-semibold italic mb-2"
                style={{ color: "oklch(0.65 0.12 10)" }}
              >
                My Dearest Love,
              </p>

              {/* Subtext */}
              <p
                className="playfair text-base mb-8"
                style={{ color: "oklch(0.45 0.06 20)" }}
              >
                You are my heart, my joy, my everything.
              </p>

              {/* The Question */}
              <h1
                className="dancing-script mb-10 leading-tight"
                style={{
                  fontSize: "clamp(44px, 10vw, 64px)",
                  color: "oklch(0.42 0.14 10)",
                  textShadow: "0 2px 12px oklch(0.65 0.12 10 / 0.25)",
                }}
              >
                Will you marry me?
              </h1>

              {/* Buttons */}
              <div className="flex items-center justify-center gap-6">
                <button
                  type="button"
                  data-ocid="proposal.primary_button"
                  onClick={() => setScreen("celebration")}
                  className="yes-button px-8 py-4 rounded-full text-xl font-bold transition-transform duration-200 cursor-pointer"
                  style={{
                    background: "oklch(0.65 0.12 10)",
                    color: "oklch(0.99 0 0)",
                    border: "none",
                    minWidth: "140px",
                  }}
                >
                  YES! 💍
                </button>

                <button
                  type="button"
                  ref={noButtonRef}
                  data-ocid="proposal.secondary_button"
                  onMouseOver={moveNoButton}
                  onFocus={moveNoButton}
                  className="px-6 py-4 rounded-full text-xl font-semibold cursor-pointer transition-all duration-150"
                  style={{
                    background: "transparent",
                    color: "oklch(0.65 0.12 10)",
                    border: "2px solid oklch(0.65 0.12 10)",
                    position: noPos ? "fixed" : "relative",
                    top: noPos ? `${noPos.top}px` : undefined,
                    left: noPos ? `${noPos.left}px` : undefined,
                    zIndex: 9999,
                    minWidth: "110px",
                  }}
                >
                  NO
                </button>
              </div>

              {/* Decorative bottom flowers */}
              <p className="mt-10 text-2xl tracking-widest">🌸 🌷 🌸</p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            className="min-h-screen w-full relative flex flex-col items-center justify-center px-4 py-12 text-center overflow-hidden"
            style={{ background: "oklch(0.93 0.05 15)" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            {/* Falling hearts confetti */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {fallingHearts.map((h) => (
                <span
                  key={h.id}
                  className="falling-heart"
                  style={{
                    left: `${h.left}%`,
                    animationDuration: `${h.duration}s`,
                    animationDelay: `${h.delay}s`,
                  }}
                >
                  {h.emoji}
                </span>
              ))}
            </div>

            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {/* Meme image */}
              <div
                className="rounded-3xl overflow-hidden shadow-2xl mb-8"
                style={{
                  border: "4px solid oklch(0.99 0 0 / 0.7)",
                  boxShadow: "0 20px 60px oklch(0.65 0.12 10 / 0.3)",
                  maxWidth: "min(90vw, 500px)",
                }}
              >
                <img
                  src="/assets/generated/love-you-meme.dim_600x500.png"
                  alt="Love you meme"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>

              <h2
                className="dancing-script mb-4"
                style={{
                  fontSize: "clamp(36px, 9vw, 56px)",
                  color: "oklch(0.32 0.12 10)",
                  textShadow: "0 2px 10px oklch(0.99 0 0 / 0.6)",
                }}
              >
                I love you so much! 💕
              </h2>

              <p
                className="playfair text-lg italic"
                style={{ color: "oklch(0.45 0.08 12)" }}
              >
                You&apos;ve made me the happiest person alive!
              </p>

              <div className="mt-6 text-3xl tracking-widest">
                💍 💕 🥂 💕 💍
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer
        className="fixed bottom-0 left-0 right-0 text-center py-2 text-xs z-50"
        style={{ color: "oklch(0.65 0.12 10 / 0.6)" }}
      >
        © {new Date().getFullYear()}. Built with{" "}
        <span style={{ color: "oklch(0.65 0.12 10)" }}>♥</span> using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: "oklch(0.55 0.12 10)" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
