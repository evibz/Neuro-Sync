import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sound helper
const playSound = (src) => {
  const audio = new Audio(src);
  audio.play();
};

const LETTERS = ["D", "I", "G", "S", "O", "F", "T"];
const TAGLINES = ["Cloud Hosting", "Secure Platforms", "Web 3.0 Experts"];

export default function DigsoftLogo() {
  const [lettersConverged, setLettersConverged] = useState(false);
  const [showWebServices, setShowWebServices] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(-1);

  // Animate sequence timings
  useEffect(() => {
    const timers = [];

    // After 1.5s letters converge
    timers.push(
      setTimeout(() => setLettersConverged(true), 1500),
    );

    // After 3s show WEB SERVICES
    timers.push(
      setTimeout(() => setShowWebServices(true), 3000),
    );

    // After 3.5s start cycling taglines
    timers.push(
      setTimeout(() => setTaglineIndex(0), 3500),
    );

    // Cycle taglines every 1.5 seconds
    let taglineInterval;
    if (taglineIndex >= 0) {
      taglineInterval = setInterval(() => {
        setTaglineIndex((i) => {
          if (i + 1 >= TAGLINES.length) {
            clearInterval(taglineInterval);
            return -1;
          }
          // play click sound here optionally
          // playSound("click.mp3");
          return i + 1;
        });
      }, 1500);
    }

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(taglineInterval);
    };
  }, [taglineIndex]);

  return (
    <div
      style={{
        background: "#000",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Orbitron', sans-serif",
        userSelect: "none",
      }}
    >
      {/* DIGSOFT letters */}
      <motion.div
        style={{ display: "flex", fontSize: 64, letterSpacing: 40 }}
        animate={{
          letterSpacing: lettersConverged ? 8 : 40,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {LETTERS.map((letter, i) => {
          // Special 'O' morph effect
          if (letter === "O") {
            return (
              <motion.span
                key={i}
                style={{ position: "relative", display: "inline-block" }}
              >
                <OTransform isActive={lettersConverged} />
              </motion.span>
            );
          }
          return <span key={i}>{letter}</span>;
        })}
      </motion.div>

      {/* WEB SERVICES fade in */}
      <AnimatePresence>
        {showWebServices && (
          <motion.div
            style={{ fontSize: 28, marginTop: 8, letterSpacing: 6 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            WEB SERVICES
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taglines */}
      <div style={{ marginTop: 24, height: 30, minWidth: 200, textAlign: "center" }}>
        <AnimatePresence>
          {taglineIndex >= 0 && (
            <motion.div
              key={TAGLINES[taglineIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ fontSize: 20, color: "#a0a0a0", fontWeight: "300" }}
            >
              {TAGLINES[taglineIndex]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// The 'O' transformation component
function OTransform({ isActive }) {
  return (
    <motion.div
      style={{
        width: 48,
        height: 64,
        borderRadius: "50%",
        position: "relative",
        color: "white",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 0 10px 3px rgba(0,150,255,0.8)",
        overflow: "visible",
      }}
      animate={{
        boxShadow: isActive
          ? [
              "0 0 5px 1px rgba(0,150,255,0.5)",
              "0 0 15px 4px rgba(0,200,255,1)",
              "0 0 5px 1px rgba(0,150,255,0.5)",
            ]
          : "none",
        color: isActive ? "#ffffff" : "#00aaff",
      }}
      transition={{
        duration: 1,
        repeat: isActive ? Infinity : 0,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      {/* Particle burst simulation */}
      {isActive && <ParticleBurst />}
      O
    </motion.div>
  );
}

function ParticleBurst() {
  // Simple blue-white dots randomly positioned and animated
  const particles = new Array(12).fill(0);
  return (
    <>
      {particles.map((_, i) => (
        <motion.span
          key={i}
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: i % 2 === 0 ? "#00aaff" : "#ffffff",
            top: 28,
            left: 20,
            opacity: 0.7,
          }}
          animate={{
            x: [
              0,
              (Math.random() - 0.5) * 60,
              0,
            ],
            y: [
              0,
              (Math.random() - 0.5) * 60,
              0,
            ],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1,
            delay: i * 0.08,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </>
  );
}
