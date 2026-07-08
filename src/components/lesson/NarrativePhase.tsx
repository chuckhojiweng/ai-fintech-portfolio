"use client";

import { useEffect, useState } from "react";
import type { NarrativePhase as NarrativePhaseType } from "@/types/lesson";

const BG_COLORS: Record<string, string> = {
  default: "#E8F5E9",
  garden: "#C8E6C9",
  space: "#1A237E",
  ocean: "#E3F2FD",
};

interface NarrativePhaseProps {
  phase: NarrativePhaseType;
  onComplete: () => void;
}

export default function NarrativePhase({ phase, onComplete }: NarrativePhaseProps) {
  const [sceneIndex, setSceneIndex] = useState(0);

  const scene = phase.scenes[sceneIndex];
  const isSpace = scene?.background === "space";
  const bgColor = BG_COLORS[scene?.background ?? "default"] ?? "#E8F5E9";

  useEffect(() => {
    const t = setTimeout(() => {
      if (sceneIndex < phase.scenes.length - 1) {
        setSceneIndex((i) => i + 1);
      } else {
        onComplete();
      }
    }, scene?.duration ?? 4000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIndex]);

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center relative transition-colors duration-700"
      style={{ backgroundColor: bgColor }}
    >
      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute top-4 right-4 px-4 py-2 bg-white/70 hover:bg-white rounded-full text-sm font-bold text-gray-600 transition-all shadow z-10"
      >
        Skip →
      </button>

      {/* Scene progress dots */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {phase.scenes.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === sceneIndex
                ? "w-5 h-2.5 bg-indigo-500"
                : i < sceneIndex
                ? "w-2.5 h-2.5 bg-indigo-300"
                : "w-2.5 h-2.5 bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* CoCo character */}
      <div className="text-8xl mb-8 select-none" style={{ animation: "cocoFloat 3s ease-in-out infinite" }}>
        🦎
      </div>

      {/* Speech bubble */}
      <div
        key={sceneIndex}
        className={`mx-8 max-w-sm rounded-3xl px-7 py-5 shadow-xl border-2 transition-opacity duration-300 ${
          isSpace
            ? "bg-blue-900/80 border-blue-400 text-white"
            : "bg-white border-indigo-200 text-gray-800"
        }`}
        style={{ animation: "fadeSlideUp 0.4s ease-out" }}
      >
        <p className="text-center text-xl font-bold leading-snug">{scene?.subtitle}</p>
      </div>

      {/* Progress bar at bottom */}
      {scene && (
        <div key={sceneIndex} className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/10 overflow-hidden">
          <div
            className="h-full bg-indigo-400"
            style={{ animation: `narrativeBar ${scene.duration}ms linear forwards` }}
          />
        </div>
      )}

      <style>{`
        @keyframes narrativeBar { from { width: 0% } to { width: 100% } }
        @keyframes cocoFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}
