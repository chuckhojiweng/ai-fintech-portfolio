"use client";

import { useEffect, useState } from "react";

interface StarCelebrationProps {
  stars: number;
  xpEarned: number;
  feedback: string;
  onContinue: () => void;
}

export default function StarCelebration({
  stars,
  xpEarned,
  feedback,
  onContinue,
}: StarCelebrationProps) {
  const [visibleStars, setVisibleStars] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 200);
    const t2 = setTimeout(() => setVisibleStars(1), 600);
    const t3 = setTimeout(() => setVisibleStars(stars >= 2 ? 2 : visibleStars), 900);
    const t4 = setTimeout(() => setVisibleStars(stars >= 3 ? 3 : visibleStars), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stars]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Confetti dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"][i % 5],
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div
        className={`relative bg-white rounded-3xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl transition-all duration-500 ${
          showContent ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <div className="text-6xl mb-4">🎉</div>

        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
          Challenge Complete!
        </h2>

        {/* Stars */}
        <div className="flex justify-center gap-3 my-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`text-5xl transition-all duration-300 ${
                visibleStars >= n
                  ? "scale-110 opacity-100"
                  : "scale-75 opacity-30 grayscale"
              }`}
            >
              ⭐
            </div>
          ))}
        </div>

        <p className="text-gray-600 text-sm mb-4">{feedback}</p>

        {/* XP gained */}
        <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-2 mb-6">
          <span className="text-yellow-600 font-bold text-lg">+{xpEarned} XP</span>
          <span className="text-yellow-500">✨</span>
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-4 rounded-2xl text-lg hover:opacity-90 transition-opacity active:scale-95"
        >
          Keep Going! →
        </button>
      </div>
    </div>
  );
}
