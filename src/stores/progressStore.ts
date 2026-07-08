import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LessonProgress, ConceptMastery, EarnedBadge } from "@/types/progress";

interface ProgressState {
  lessonProgress: Record<string, LessonProgress>;
  conceptMastery: Record<string, ConceptMastery>;
  earnedBadges: EarnedBadge[];
  streakDays: number;
  totalXp: number;
  level: number;

  updateLessonProgress: (lessonId: string, update: Partial<LessonProgress>) => void;
  completeLesson: (lessonId: string, stars: number, hintsUsed: number, timeSpent: number) => void;
  updateConceptMastery: (concept: string, update: Partial<ConceptMastery>) => void;
  earnBadge: (badge: EarnedBadge) => void;
  addXp: (amount: number) => void;
}

function levelFromXp(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      lessonProgress: {},
      conceptMastery: {},
      earnedBadges: [],
      streakDays: 0,
      totalXp: 0,
      level: 1,

      updateLessonProgress: (lessonId, update) =>
        set((state) => ({
          lessonProgress: {
            ...state.lessonProgress,
            [lessonId]: {
              ...state.lessonProgress[lessonId],
              ...update,
            } as LessonProgress,
          },
        })),

      completeLesson: (lessonId, stars, hintsUsed, timeSpent) =>
        set((state) => {
          const existing = state.lessonProgress[lessonId];
          const bestStars = Math.max(existing?.starsEarned ?? 0, stars);
          const xpGain = stars * 25;
          const newXp = state.totalXp + xpGain;
          return {
            lessonProgress: {
              ...state.lessonProgress,
              [lessonId]: {
                ...(existing ?? {
                  id: lessonId,
                  childId: "",
                  lessonId,
                }),
                status: "completed" as const,
                starsEarned: bestStars,
                attempts: (existing?.attempts ?? 0) + 1,
                hintsUsed,
                timeSpentSeconds: timeSpent,
                completedAt: new Date().toISOString(),
              },
            },
            totalXp: newXp,
            level: levelFromXp(newXp),
          };
        }),

      updateConceptMastery: (concept, update) =>
        set((state) => ({
          conceptMastery: {
            ...state.conceptMastery,
            [concept]: {
              ...state.conceptMastery[concept],
              ...update,
            } as ConceptMastery,
          },
        })),

      earnBadge: (badge) =>
        set((state) => ({
          earnedBadges: [...state.earnedBadges, badge],
        })),

      addXp: (amount) =>
        set((state) => {
          const newXp = state.totalXp + amount;
          return { totalXp: newXp, level: levelFromXp(newXp) };
        }),
    }),
    { name: "codecritters-progress" }
  )
);
