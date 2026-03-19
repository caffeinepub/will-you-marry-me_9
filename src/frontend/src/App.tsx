import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const HEARTS = ["💗", "💖", "💕", "🌸", "💝", "✨", "💓", "🌷"];
const CELEBRATE = ["💗", "💖", "🌸", "💍", "💕", "✨", "🌷", "💝", "❤️", "🥂"];

interface Particle {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayDuration: number;
}

function makeParticles(emojis: string[], count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: emojis[i % emojis.length],
    left: Math.random() * 100,
    size: 14 + Math.random() * 18,
    duration: 8 + Math.random() * 9,
    delay: Math.random() * 8,
    swayDuration: 2.5 + Math.random() * 3,
  }));
}

const bgHearts = makeParticles(HEARTS, 22);
const celebrationHearts = makeParticles(CELEBRATE, 38);

export default function App() {
  const [screen, setScreen] = useState<"question" | "celebration">("question");
  const [noPos, setNoPos] = useState<{ top: number; left: number } | null>(
    null,
  );
  const noRef = useRef<HTMLButtonElement>(null);

  const moveNo = useCallback(() => {
    const btn = noRef.current;
    const bw = btn ? btn.offsetWidth : 80;
    const bh = btn ? btn.offsetHeight : 48;
    const pad = 16;
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
            {/* Floating background hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {bgHearts.map((p) => (
                <span
                  key={p.id}
                  className="floating-heart"
                  style={{
                    left: `${p.left}%`,
                    bottom: "-60px",
                    fontSize: `${p.size}px`,
                    animationDuration: `${p.duration}s, ${p.swayDuration}s`,
                    animationDelay: `${p.delay}s, 0s`,
                    opacity: 0.45,
                  }}
                >
                  {p.emoji}
                </span>
              ))}
            </div>

            {/* Central glass card */}
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
              {/* Inner glow highlight */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "28px",
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(255,200,220,0.5) 0%, transparent 65%)",
                  pointerEvents: "none",
                }}
              />

              {/* Ring icon */}
              <div
                className="ring-icon text-6xl mb-5"
                data-ocid="proposal.section"
              >
                💍
              </div>

              {/* Heading */}
              <h1
                className="shimmer-text font-display font-black leading-tight mb-3"
                style={{
                  fontSize: "clamp(1.7rem, 6vw, 2.4rem)",
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Will You Marry Me?
              </h1>

              {/* Script subtitle */}
              <p
                style={{
                  fontFamily: "'Parisienne', cursive",
                  fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
                  color: "#d4527a",
                  marginBottom: "2rem",
                  lineHeight: 1.4,
                }}
              >
                You are my everything...
              </p>

              {/* Decorative divider */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "2rem",
                  color: "rgba(212, 82, 122, 0.45)",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "linear-gradient(to right, transparent, rgba(212,82,122,0.4))",
                  }}
                />
                <span style={{ fontSize: "1rem" }}>💕</span>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "linear-gradient(to left, transparent, rgba(212,82,122,0.4))",
                  }}
                />
              </div>

              {/* Buttons */}
              <div
                className="flex items-center justify-center gap-5"
                style={{ minHeight: "60px" }}
              >
                <button
                  type="button"
                  data-ocid="proposal.primary_button"
                  onClick={() => setScreen("celebration")}
                  className="yes-btn font-bold text-white rounded-full"
                  style={{
                    padding: "15px 40px",
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    minHeight: "54px",
                    minWidth: "130px",
                    borderRadius: "50px",
                    letterSpacing: "0.03em",
                  }}
                >
                  Yes! 💗
                </button>

                <button
                  type="button"
                  ref={noRef}
                  data-ocid="proposal.secondary_button"
                  onMouseOver={moveNo}
                  onFocus={moveNo}
                  className="no-btn font-semibold rounded-full"
                  style={{
                    padding: "13px 24px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    minHeight: "50px",
                    minWidth: "80px",
                    borderRadius: "50px",
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
            transition={{ duration: 0.55 }}
          >
            {/* Falling celebration hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {celebrationHearts.map((p) => (
                <span
                  key={p.id}
                  className="falling-heart"
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

            {/* Celebration glass card */}
            <motion.div
              className="glass-card bounce-in relative z-10 w-full text-center px-8 py-10"
              style={{ maxWidth: "440px" }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              data-ocid="proposal.success_state"
            >
              {/* Inner glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "28px",
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(255,180,210,0.55) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />

              {/* Emojis */}
              <div className="text-5xl mb-4" style={{ lineHeight: 1.3 }}>
                💍❤️
              </div>

              {/* Heading */}
              <h1
                className="font-display font-black leading-tight mb-3"
                style={{
                  fontSize: "clamp(1.6rem, 6vw, 2.3rem)",
                  fontFamily: "'Playfair Display', serif",
                  color: "#c72060",
                  letterSpacing: "-0.01em",
                }}
              >
                She said YES! 🎉
              </h1>

              {/* Script line */}
              <p
                style={{
                  fontFamily: "'Parisienne', cursive",
                  fontSize: "clamp(1.1rem, 3.5vw, 1.35rem)",
                  color: "#d4527a",
                  marginBottom: "1.5rem",
                }}
              >
                Forever starts now...
              </p>

              {/* Love GIF */}
              <img
                src="https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif"
                alt="Love you meme"
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  marginBottom: "1.25rem",
                  display: "block",
                  border: "2px solid rgba(255, 100, 150, 0.3)",
                  boxShadow: "0 4px 20px rgba(255, 60, 120, 0.2)",
                }}
              />

              {/* Love message */}
              <p
                className="font-extrabold text-lg"
                style={{
                  background:
                    "linear-gradient(90deg, #c72060, #ff4d94, #c72060)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 8px rgba(255, 60, 120, 0.35))",
                  marginBottom: "0.5rem",
                }}
              >
                Love you so much! ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer
        className="fixed bottom-0 left-0 right-0 text-center py-2 text-xs z-50"
        style={{ color: "rgba(180, 80, 120, 0.55)" }}
      >
        © {new Date().getFullYear()}. Built with{" "}
        <span style={{ color: "#ff4d94" }}>♥</span> using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#e05a8a" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
