"use client";

import Link from "next/link";
import { useProgressStore } from "@/stores/progressStore";

const CHAPTER_LESSON_IDS: Record<string, string[]> = {
  "01-first-steps": [
    "lesson-hello-coco",
    "lesson-move-and-turn",
    "lesson-say-hello",
    "lesson-repeat-repeat",
    "lesson-square-dance",
  ],
};

const chapters = [
  {
    id: "01-first-steps",
    title: "First Steps",
    description: "Learn to make CoCo move!",
    icon: "🌱",
    color: "from-green-400 to-emerald-500",
    unlocked: true,
  },
  {
    id: "02-loops-island",
    title: "Loops Island",
    description: "Do things over and over!",
    icon: "🔄",
    color: "from-blue-400 to-cyan-500",
    unlocked: false,
  },
  {
    id: "03-if-then-mountain",
    title: "If-Then Mountain",
    description: "Make choices in your code!",
    icon: "🏔️",
    color: "from-purple-400 to-violet-500",
    unlocked: false,
  },
  {
    id: "04-creative-jungle",
    title: "Creative Jungle",
    description: "Build your own adventures!",
    icon: "🌴",
    color: "from-orange-400 to-amber-500",
    unlocked: false,
  },
];

export default function MapPage() {
  const lessonProgress = useProgressStore((s) => s.lessonProgress);

  const getChapterProgress = (chapterId: string) => {
    const ids = CHAPTER_LESSON_IDS[chapterId] ?? [];
    const completed = ids.filter((id) => lessonProgress[id]?.status === "completed").length;
    const totalStars = ids.reduce((sum, id) => sum + (lessonProgress[id]?.starsEarned ?? 0), 0);
    return { completed, total: ids.length, totalStars };
  };

  return (
    <div className="px-4 py-6 pb-24">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          <span className="text-4xl mr-2">🗺️</span>
          Adventure Map
        </h1>
        <p className="text-gray-500 text-sm">Choose an island to explore!</p>
      </div>

      {/* Chapter Islands */}
      <div className="max-w-md mx-auto space-y-4">
        {chapters.map((chapter, index) => {
          const { completed, total, totalStars } = getChapterProgress(chapter.id);

          return (
            <div key={chapter.id} className="relative">
              {/* Connecting path */}
              {index < chapters.length - 1 && (
                <div className="absolute left-1/2 bottom-0 w-1 h-8 -mb-8 bg-gray-200 transform -translate-x-1/2 z-0" />
              )}

              {chapter.unlocked ? (
                <Link href={`/lesson/${chapter.id}`}>
                  <div
                    className={`relative bg-gradient-to-r ${chapter.color} rounded-3xl p-5 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] z-10`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{chapter.icon}</span>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold">{chapter.title}</h2>
                        <p className="text-sm opacity-90">{chapter.description}</p>
                        {/* Lesson progress dots */}
                        <div className="flex items-center gap-1 mt-2">
                          {Array.from({ length: total }).map((_, i) => {
                            const lessonId = CHAPTER_LESSON_IDS[chapter.id]?.[i];
                            const done = lessonId
                              ? lessonProgress[lessonId]?.status === "completed"
                              : false;
                            return (
                              <div
                                key={i}
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                  done ? "bg-white" : "bg-white/30"
                                }`}
                              />
                            );
                          })}
                          <span className="text-xs ml-1 opacity-80">
                            {completed}/{total}
                          </span>
                          {totalStars > 0 && (
                            <span className="text-xs ml-2 opacity-90">
                              ⭐ {totalStars}
                            </span>
                          )}
                        </div>
                      </div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="opacity-75 flex-shrink-0"
                      >
                        <path d="M10 6L16 12L10 18" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="relative bg-gray-200 rounded-3xl p-5 text-gray-400 z-10 cursor-not-allowed">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl grayscale opacity-50">{chapter.icon}</span>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold">{chapter.title}</h2>
                      <p className="text-sm">{chapter.description}</p>
                      <p className="text-xs mt-1">🔒 Complete previous island to unlock</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sandbox CTA */}
      <div className="max-w-md mx-auto mt-8">
        <Link href="/sandbox">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-5 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] text-center">
            <span className="text-3xl mb-2 block">🎨</span>
            <h3 className="text-lg font-bold">Free Sandbox</h3>
            <p className="text-sm opacity-90">Create anything you can imagine!</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
