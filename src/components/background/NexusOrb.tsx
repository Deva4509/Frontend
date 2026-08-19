import React from "react";

interface NexusOrbProps {
  size?: number;
  className?: string;
}

const NexusOrb: React.FC<NexusOrbProps> = ({
  size = 360,
  className = "",
}) => {
  const orbSize = size;
  const center = orbSize / 2;

  return (
    <div
  className={`nexus-orb-wrapper nexus-orb-home-position ${className}`}
  style={
    {
      "--orb-size": `${orbSize}px`,
      "--orb-half": `${orbSize / 2}px`,
    } as React.CSSProperties
  }
>
      <div className="nexus-orb-scene">
        {/* Ambient glow */}
        <div className="nexus-orb-glow" />

        {/* Outer atmospheric glow */}
        <div className="nexus-orb-atmosphere" />

        {/* Floating particles */}
        <div className="nexus-orb-particles">
          {Array.from({ length: 34 }).map((_, index) => (
            <span
              key={index}
              className={`orb-particle particle-${index + 1}`}
            />
          ))}
        </div>

        {/* Orbit rings */}
        <div className="orb-ring orb-ring-1">
          <div className="orb-ring-dot" />
        </div>

        <div className="orb-ring orb-ring-2">
          <div className="orb-ring-dot orb-ring-dot-2" />
        </div>

        <div className="orb-ring orb-ring-3">
          <div className="orb-ring-dot orb-ring-dot-3" />
        </div>

        {/* Main orb */}
        <div className="nexus-orb">
          <div className="orb-core">
            <div className="orb-gradient orb-gradient-1" />
            <div className="orb-gradient orb-gradient-2" />
            <div className="orb-gradient orb-gradient-3" />

            <div className="orb-shine orb-shine-1" />
            <div className="orb-shine orb-shine-2" />

            <div className="orb-wave orb-wave-1" />
            <div className="orb-wave orb-wave-2" />
            <div className="orb-wave orb-wave-3" />
            <div className="orb-wave orb-wave-4" />

            <div className="orb-highlight" />
          </div>
        </div>

        {/* Small energy sparks */}
        <div className="energy-spark spark-1" />
        <div className="energy-spark spark-2" />
        <div className="energy-spark spark-3" />
        <div className="energy-spark spark-4" />
        <div className="energy-spark spark-5" />
        <div className="energy-spark spark-6" />
      </div>

      <style>{`
        /* =========================
   HOME PAGE ORB POSITION
========================= */

.nexus-orb-home-position {
  position: absolute;
  left: 72%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  pointer-events: none;
}

/* Keep the orb in the right-side empty area */
@media (max-width: 1100px) {
  .nexus-orb-home-position {
    left: 72%;
    top: 50%;
  }
}

@media (max-width: 850px) {
  .nexus-orb-home-position {
    left: 72%;
    top: 48%;
  }
}

@media (max-width: 700px) {
  .nexus-orb-home-position {
    left: 50%;
    top: 30%;
  }
}
        .nexus-orb-wrapper {
          position: absolute;
          width: var(--orb-size);
          height: var(--orb-size);
          pointer-events: none;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nexus-orb-scene {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        /* =========================
           ATMOSPHERIC GLOW
        ========================= */

        .nexus-orb-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 72%;
          height: 72%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(28, 111, 255, 0.65) 0%,
              rgba(67, 53, 255, 0.42) 32%,
              rgba(92, 37, 255, 0.2) 58%,
              transparent 76%
            );
          filter: blur(35px);
          animation: orbGlow 4s ease-in-out infinite;
        }

        .nexus-orb-atmosphere {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 96%;
          height: 96%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              transparent 38%,
              rgba(28, 88, 255, 0.08) 55%,
              rgba(76, 39, 255, 0.12) 67%,
              transparent 76%
            );
          filter: blur(8px);
          animation: atmospherePulse 5s ease-in-out infinite;
        }

        /* =========================
           MAIN ORB
        ========================= */

        .nexus-orb {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 61%;
          height: 61%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 5;
          animation:
            orbFloat 5s ease-in-out infinite,
            orbBreathing 4s ease-in-out infinite;
        }

        .orb-core {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 50%;

          background:
            radial-gradient(
              circle at 28% 20%,
              rgba(108, 245, 255, 0.95) 0%,
              rgba(54, 207, 255, 0.75) 11%,
              transparent 30%
            ),
            radial-gradient(
              circle at 70% 28%,
              rgba(89, 99, 255, 0.95) 0%,
              rgba(72, 45, 235, 0.8) 30%,
              transparent 60%
            ),
            radial-gradient(
              circle at 38% 76%,
              rgba(31, 211, 255, 0.9) 0%,
              rgba(31, 102, 255, 0.55) 35%,
              transparent 68%
            ),
            linear-gradient(
              145deg,
              #42f4ff 0%,
              #208bff 28%,
              #4937e8 53%,
              #6429d8 72%,
              #1d75ff 100%
            );

          box-shadow:
            0 0 8px rgba(92, 239, 255, 0.95),
            0 0 25px rgba(43, 180, 255, 0.8),
            0 0 55px rgba(67, 68, 255, 0.65),
            inset 8px 8px 20px rgba(168, 255, 255, 0.5),
            inset -18px -18px 30px rgba(18, 29, 170, 0.5);

          animation: orbRotate 12s linear infinite;
        }

        .orb-core::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background:
            radial-gradient(
              ellipse at 30% 18%,
              rgba(255, 255, 255, 0.75),
              transparent 18%
            ),
            radial-gradient(
              ellipse at 75% 80%,
              rgba(21, 30, 160, 0.42),
              transparent 45%
            );
          mix-blend-mode: screen;
          z-index: 10;
        }

        .orb-core::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          box-shadow:
            inset 0 0 5px rgba(255, 255, 255, 0.95),
            inset 0 0 18px rgba(65, 230, 255, 0.85);
          z-index: 20;
        }

        /* =========================
           INTERNAL GRADIENT MOTION
        ========================= */

        .orb-gradient {
          position: absolute;
          width: 75%;
          height: 40%;
          border-radius: 50%;
          filter: blur(18px);
          opacity: 0.8;
          mix-blend-mode: screen;
        }

        .orb-gradient-1 {
          left: -15%;
          top: 22%;
          background: linear-gradient(
            90deg,
            rgba(37, 248, 255, 0.9),
            rgba(57, 85, 255, 0.65),
            transparent
          );
          transform: rotate(-22deg);
          animation: gradientMove1 6s ease-in-out infinite;
        }

        .orb-gradient-2 {
          right: -15%;
          top: 42%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(102, 42, 255, 0.85),
            rgba(31, 214, 255, 0.8)
          );
          transform: rotate(18deg);
          animation: gradientMove2 7s ease-in-out infinite;
        }

        .orb-gradient-3 {
          left: 5%;
          bottom: -8%;
          background: linear-gradient(
            90deg,
            rgba(22, 113, 255, 0.8),
            rgba(105, 37, 232, 0.75),
            transparent
          );
          animation: gradientMove3 5.5s ease-in-out infinite;
        }

        /* =========================
           ORB WAVES
        ========================= */

        .orb-wave {
          position: absolute;
          left: -20%;
          width: 140%;
          height: 15%;
          border-radius: 50%;
          border-top: 2px solid rgba(82, 235, 255, 0.32);
          border-bottom: 2px solid rgba(103, 88, 255, 0.24);
          filter: blur(1px);
          opacity: 0.85;
        }

        .orb-wave-1 {
          top: 20%;
          transform: rotate(14deg);
          animation: waveMove1 5s ease-in-out infinite;
        }

        .orb-wave-2 {
          top: 36%;
          transform: rotate(-10deg);
          animation: waveMove2 6s ease-in-out infinite;
        }

        .orb-wave-3 {
          top: 53%;
          transform: rotate(12deg);
          animation: waveMove3 5.5s ease-in-out infinite;
        }

        .orb-wave-4 {
          top: 69%;
          transform: rotate(-15deg);
          animation: waveMove4 7s ease-in-out infinite;
        }

        /* =========================
           HIGHLIGHTS
        ========================= */

        .orb-shine {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 12;
        }

        .orb-shine-1 {
          width: 38%;
          height: 23%;
          left: 10%;
          top: 9%;
          background: rgba(185, 255, 255, 0.4);
          filter: blur(10px);
          transform: rotate(-25deg);
          animation: shinePulse 3s ease-in-out infinite;
        }

        .orb-shine-2 {
          width: 22%;
          height: 55%;
          right: 5%;
          top: 20%;
          background: rgba(74, 232, 255, 0.2);
          filter: blur(14px);
          transform: rotate(20deg);
        }

        .orb-highlight {
          position: absolute;
          width: 26%;
          height: 16%;
          top: 8%;
          left: 19%;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          filter: blur(9px);
          transform: rotate(-28deg);
          z-index: 15;
        }

        /* =========================
           ORBIT RINGS
        ========================= */

        .orb-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 76%;
          height: 30%;
          border: 1.5px solid rgba(109, 221, 255, 0.72);
          border-radius: 50%;
          z-index: 8;
          transform-style: preserve-3d;
          box-shadow:
            0 0 5px rgba(74, 218, 255, 0.25),
            inset 0 0 5px rgba(94, 90, 255, 0.18);
        }

        .orb-ring-1 {
          transform: translate(-50%, -50%) rotateX(68deg) rotateZ(-8deg);
          animation: ringRotate1 9s linear infinite;
        }

        .orb-ring-2 {
          width: 82%;
          height: 40%;
          border-color: rgba(153, 123, 255, 0.38);
          transform: translate(-50%, -50%) rotateX(66deg) rotateY(56deg);
          animation: ringRotate2 12s linear infinite;
        }

        .orb-ring-3 {
          width: 68%;
          height: 48%;
          border-color: rgba(73, 225, 255, 0.38);
          transform: translate(-50%, -50%) rotateY(70deg) rotateZ(25deg);
          animation: ringRotate3 14s linear infinite reverse;
        }

        .orb-ring-dot {
          position: absolute;
          width: 7px;
          height: 7px;
          left: 10%;
          top: 40%;
          border-radius: 50%;
          background: #8cf6ff;
          box-shadow:
            0 0 7px #5ceeff,
            0 0 16px #329cff;
        }

        .orb-ring-dot-2 {
          left: auto;
          right: 8%;
          top: 47%;
          width: 5px;
          height: 5px;
          background: #8b7cff;
          box-shadow:
            0 0 8px #735dff,
            0 0 16px #3c4fff;
        }

        .orb-ring-dot-3 {
          left: 48%;
          top: -2%;
          width: 4px;
          height: 4px;
        }

        /* =========================
           PARTICLES
        ========================= */

        .nexus-orb-particles {
          position: absolute;
          inset: -10%;
          z-index: 3;
        }

        .orb-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: #73eaff;
          box-shadow:
            0 0 4px rgba(74, 225, 255, 0.95),
            0 0 9px rgba(57, 126, 255, 0.7);
          animation: particleFloat 3s ease-in-out infinite;
        }

        ${Array.from({ length: 34 })
          .map((_, index) => {
            const positions = [
              [14, 32],
              [20, 15],
              [27, 76],
              [32, 5],
              [39, 91],
              [47, 12],
              [53, 3],
              [60, 91],
              [67, 10],
              [75, 23],
              [83, 39],
              [91, 29],
              [86, 55],
              [93, 72],
              [79, 83],
              [71, 94],
              [59, 82],
              [48, 97],
              [37, 84],
              [22, 91],
              [8, 68],
              [4, 49],
              [11, 22],
              [29, 31],
              [41, 44],
              [58, 25],
              [72, 47],
              [88, 17],
              [96, 44],
              [81, 66],
              [66, 72],
              [45, 70],
              [25, 57],
              [15, 43],
            ];

            const [left, top] = positions[index];

            return `
              .particle-${index + 1} {
                left: ${left}%;
                top: ${top}%;
                animation-delay: ${(index % 8) * 0.35}s;
                animation-duration: ${2.5 + (index % 5) * 0.5}s;
                transform: scale(${0.6 + (index % 4) * 0.3});
              }
            `;
          })
          .join("")}

        /* =========================
           ENERGY SPARKS
        ========================= */

        .energy-spark {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: white;
          box-shadow:
            0 0 6px #5ceeff,
            0 0 14px #397bff;
          z-index: 15;
        }

        .spark-1 {
          left: 27%;
          top: 26%;
          animation: spark 2.8s ease-in-out infinite;
        }

        .spark-2 {
          left: 82%;
          top: 27%;
          animation: spark 3.4s ease-in-out infinite 0.5s;
        }

        .spark-3 {
          left: 91%;
          top: 55%;
          animation: spark 2.5s ease-in-out infinite 1s;
        }

        .spark-4 {
          left: 17%;
          top: 62%;
          animation: spark 3.2s ease-in-out infinite 0.8s;
        }

        .spark-5 {
          left: 71%;
          top: 87%;
          animation: spark 2.9s ease-in-out infinite 1.4s;
        }

        .spark-6 {
          left: 38%;
          top: 7%;
          animation: spark 3.7s ease-in-out infinite 0.3s;
        }

        /* =========================
           ANIMATIONS
        ========================= */

        @keyframes orbFloat {
          0%,
          100% {
            margin-top: 0;
          }

          50% {
            margin-top: -9px;
          }
        }

        @keyframes orbBreathing {
          0%,
          100% {
            scale: 1;
          }

          50% {
            scale: 1.025;
          }
        }

        @keyframes orbRotate {
          0% {
            filter: hue-rotate(0deg);
          }

          50% {
            filter: hue-rotate(12deg);
          }

          100% {
            filter: hue-rotate(0deg);
          }
        }

        @keyframes orbGlow {
          0%,
          100% {
            opacity: 0.65;
            transform: translate(-50%, -50%) scale(0.94);
          }

          50% {
            opacity: 0.95;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }

        @keyframes atmospherePulse {
          0%,
          100% {
            opacity: 0.45;
            transform: translate(-50%, -50%) scale(0.94);
          }

          50% {
            opacity: 0.85;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }

        @keyframes gradientMove1 {
          0%,
          100% {
            transform: translateX(-5%) rotate(-22deg);
          }

          50% {
            transform: translateX(22%) rotate(-10deg);
          }
        }

        @keyframes gradientMove2 {
          0%,
          100% {
            transform: translateX(8%) rotate(18deg);
          }

          50% {
            transform: translateX(-20%) rotate(5deg);
          }
        }

        @keyframes gradientMove3 {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }

          50% {
            transform: translateX(18%) rotate(8deg);
          }
        }

        @keyframes waveMove1 {
          0%,
          100% {
            transform: translateX(-5%) rotate(14deg);
          }

          50% {
            transform: translateX(10%) rotate(7deg);
          }
        }

        @keyframes waveMove2 {
          0%,
          100% {
            transform: translateX(8%) rotate(-10deg);
          }

          50% {
            transform: translateX(-8%) rotate(-17deg);
          }
        }

        @keyframes waveMove3 {
          0%,
          100% {
            transform: translateX(-8%) rotate(12deg);
          }

          50% {
            transform: translateX(8%) rotate(20deg);
          }
        }

        @keyframes waveMove4 {
          0%,
          100% {
            transform: translateX(5%) rotate(-15deg);
          }

          50% {
            transform: translateX(-10%) rotate(-7deg);
          }
        }

        @keyframes shinePulse {
          0%,
          100% {
            opacity: 0.35;
          }

          50% {
            opacity: 0.75;
          }
        }

        @keyframes ringRotate1 {
          from {
            transform: translate(-50%, -50%) rotateX(68deg)
              rotateZ(-8deg);
          }

          to {
            transform: translate(-50%, -50%) rotateX(68deg)
              rotateZ(352deg);
          }
        }

        @keyframes ringRotate2 {
          from {
            transform: translate(-50%, -50%) rotateX(66deg)
              rotateY(56deg) rotateZ(0deg);
          }

          to {
            transform: translate(-50%, -50%) rotateX(66deg)
              rotateY(56deg) rotateZ(360deg);
          }
        }

        @keyframes ringRotate3 {
          from {
            transform: translate(-50%, -50%) rotateY(70deg)
              rotateZ(25deg);
          }

          to {
            transform: translate(-50%, -50%) rotateY(70deg)
              rotateZ(385deg);
          }
        }

        @keyframes particleFloat {
          0%,
          100% {
            opacity: 0.25;
            transform: translate3d(0, 0, 0) scale(0.8);
          }

          50% {
            opacity: 1;
            transform: translate3d(
                4px,
                -8px,
                0
              )
              scale(1.35);
          }
        }

        @keyframes spark {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(0.5);
          }

          50% {
            opacity: 1;
            transform: scale(1.8);
          }
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 1100px) {
          .nexus-orb-wrapper {
            width: 310px;
            height: 310px;
          }
        }

        @media (max-width: 850px) {
          .nexus-orb-wrapper {
            width: 270px;
            height: 270px;
          }
        }

        @media (max-width: 700px) {
          .nexus-orb-wrapper {
            width: 230px;
            height: 230px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nexus-orb-wrapper *,
          .nexus-orb-wrapper {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default NexusOrb;