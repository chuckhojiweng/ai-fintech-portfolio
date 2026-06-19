"use client";

import { useProgressStore } from "@/stores/progressStore";

const LEVEL_NAMES = [
  "Beginner Bug",
  "Code Caterpillar",
  "Loop Lizard",
  "Function Fox",
  "Algorithm Eagle",
];

export default function ProfilePage() {
  const { level, totalXp, earnedBadges, streakDays } = useProgressStore();
  const levelName = LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)];
  const xpInLevel = totalXp % 100;

  return (
    <div className="px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          <span className="text-4xl mr-2">⭐</span>
          My Profile
        </h1>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {/* Avatar & Level */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white text-center shadow-lg">
          <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl">
            🦎
          </div>
          <h2 className="text-xl font-bold">Young Coder</h2>
          <p className="text-sm text-indigo-200 mt-1">Level {level}: {levelName}</p>
          <div className="mt-3 bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-yellow-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${xpInLevel}%` }}
            />
          </div>
          <p className="text-xs text-indigo-200 mt-1">{xpInLevel}/100 XP to next level</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center border-2 border-gray-100">
            <span className="text-2xl block mb-1">🔥</span>
            <span className="text-2xl font-bold text-orange-500">{streakDays}</span>
            <p className="text-xs text-gray-500 mt-1">Day Streak</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center border-2 border-gray-100">
            <span className="text-2xl block mb-1">⭐</span>
            <span className="text-2xl font-bold text-yellow-500">{totalXp}</span>
            <p className="text-xs text-gray-500 mt-1">Total XP</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center border-2 border-gray-100">
            <span className="text-2xl block mb-1">🏅</span>
            <span className="text-2xl font-bold text-indigo-500">{earnedBadges.length}</span>
            <p className="text-xs text-gray-500 mt-1">Badges</p>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-3xl p-5 border-2 border-gray-100">
          <h3 className="font-bold text-gray-700 mb-3">Badge Collection</h3>
          {earnedBadges.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              Complete lessons to earn badges! 🌟
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {earnedBadges.map((badge, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-2xl mx-auto">
                    🏅
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
