import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const CONFETTI = ["🎂", "🎉", "✨", "🎈", "🎁", "🥳", "⭐", "🌟"];

interface Particle {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayDuration: number;
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: CONFETTI[i % CONFETTI.length],
    left: Math.random() * 100,
    size: 16 + Math.random() * 20,
    duration: 7 + Math.random() * 8,
    delay: Math.random() * 7,
    swayDuration: 2.5 + Math.random() * 3,
  }));
}

const bgParticles = makeParticles(20);
const celebrationParticles = makeParticles(35);

export default function App() {
  const [screen, setScreen] = useState<"question" | "celebration">("question");
  const [noPos, setNoPos] = useState<{ top: number; left: number } | null>(
    null,
  );
  const noRef = useRef<HTMLButtonElement>(null);

  const moveNo = useCallback(() => {
    const btn = noRef.current;
    const bw = btn ? btn.offsetWidth : 90;
    const bh = btn ? btn.offsetHeight : 52;
    const pad = 20;
    const top = pad + Math.random() * (window.innerHeight - bh - pad * 2);
    const left = pad + Math.random() * (window.innerWidth - bw - pad * 2);
    setNoPos({ top, left });
  }, []);

  useEffect(() => {
    const btn = noRef.current;
    if (!btn) return;
    btn.addEventListener("touchstart", moveNo, { passive: true });
    return () => btn.removeEventListener("touchstart", moveNo);
  }, [moveNo]);

  return (
    <div
      className={`min-h-screen w-full overflow-hidden relative ${
        screen === "celebration" ? "animated-bg-celebration" : "animated-bg"
      }`}
    >
      <AnimatePresence mode="wait">
        {screen === "question" ? (
          <motion.div
            key="question"
            className="min-h-screen w-full flex items-center justify-center px-5 py-12 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.45 }}
          >
            {/* Background floating confetti */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {bgParticles.map((p) => (
                <span
                  key={p.id}
                  className="floating-confetti"
                  style={{
                    left: `${p.left}%`,
                    bottom: "-60px",
                    fontSize: `${p.size}px`,
                    animationDuration: `${p.duration}s, ${p.swayDuration}s`,
                    animationDelay: `${p.delay}s, 0s`,
                    opacity: 0.35,
                  }}
                >
                  {p.emoji}
                </span>
              ))}
            </div>

            {/* Glass card */}
            <motion.div
              className="glass-card relative z-10 w-full text-center px-8 py-10"
              style={{ maxWidth: "420px" }}
              initial={{ y: 50, opacity: 0, scale: 0.94 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                delay: 0.15,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Subtle inner highlight ring */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "28px",
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.18) 0%, transparent 65%)",
                  pointerEvents: "none",
                }}
              />

              {/* Emoji header */}
              <div className="cake-icon text-6xl mb-5">🎂✨</div>

              {/* Heading */}
              <h1
                className="shimmer-text font-display font-black leading-tight mb-10"
                style={{ fontSize: "clamp(1.35rem, 5vw, 1.85rem)" }}
              >
                Aakash Sir, are you ready for the best birthday ever?
              </h1>

              {/* Buttons */}
              <div
                className="flex items-center justify-center gap-6"
                style={{ minHeight: "60px" }}
              >
                <button
                  type="button"
                  data-ocid="birthday.primary_button"
                  onClick={() => setScreen("celebration")}
                  className="yes-btn font-bold rounded-2xl text-white"
                  style={{
                    padding: "14px 36px",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    minHeight: "52px",
                    minWidth: "110px",
                    borderRadius: "14px",
                    letterSpacing: "0.02em",
                  }}
                >
                  YES! 🎉
                </button>

                <button
                  type="button"
                  ref={noRef}
                  data-ocid="birthday.secondary_button"
                  onMouseOver={moveNo}
                  onFocus={moveNo}
                  className="no-btn font-semibold rounded-2xl"
                  style={{
                    padding: "14px 28px",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    minHeight: "52px",
                    minWidth: "90px",
                    borderRadius: "14px",
                    position: noPos ? "fixed" : "relative",
                    top: noPos ? `${noPos.top}px` : undefined,
                    left: noPos ? `${noPos.left}px` : undefined,
                    zIndex: 9999,
                  }}
                >
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            className="min-h-screen w-full flex items-center justify-center px-5 py-12 relative"
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Falling confetti */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {celebrationParticles.map((p) => (
                <span
                  key={p.id}
                  className="falling-confetti"
                  style={{
                    left: `${p.left}%`,
                    fontSize: `${p.size}px`,
                    animationDuration: `${p.duration}s`,
                    animationDelay: `${p.delay}s`,
                  }}
                >
                  {p.emoji}
                </span>
              ))}
            </div>

            {/* Glass celebration card */}
            <motion.div
              className="glass-card bounce-in relative z-10 w-full text-center px-8 py-10"
              style={{ maxWidth: "420px" }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              {/* Inner highlight */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "28px",
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />

              {/* Emoji */}
              <div className="text-6xl mb-4">🎉🥳</div>

              {/* Main heading */}
              <h1
                className="shimmer-text font-display font-black leading-tight mb-4"
                style={{ fontSize: "clamp(1.5rem, 6vw, 2.1rem)" }}
              >
                HAPPY BIRTHDAY AAKASH SIR!
              </h1>

              <p
                className="font-semibold mb-6 text-lg"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                You&apos;re the best! 🌟
              </p>

              {/* GIF */}
              <img
                src="https://media.giphy.com/media/l1Ihk9yI2e06aW9kk/giphy.gif"
                alt="Happy Birthday Meme"
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  marginBottom: "20px",
                  display: "block",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />

              <p
                className="font-extrabold text-base"
                style={{
                  background:
                    "linear-gradient(90deg, #ff80c8, #ff4d94, #ff80c8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 8px rgba(255,80,148,0.6))",
                }}
              >
                We all appreciate you! ✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer
        className="fixed bottom-0 left-0 right-0 text-center py-2 text-xs z-50"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        © {new Date().getFullYear()}. Built with{" "}
        <span style={{ color: "rgba(255,130,180,0.7)" }}>♥</span> using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: "rgba(255,130,180,0.8)" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
