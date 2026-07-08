export interface LessonProgress {
  id: string;
  childId: string;
  lessonId: string;
  status: "not_started" | "in_progress" | "completed";
  starsEarned: number;
  attempts: number;
  hintsUsed: number;
  timeSpentSeconds: number;
  workspaceXml?: string;
  completedAt?: string;
}

export interface ConceptMastery {
  childId: string;
  concept: string;
  masteryLevel: number;
  exercisesCompleted: number;
  lastPracticedAt?: string;
}

export interface Badge {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconUrl: string;
  category: "milestone" | "mastery" | "consistency" | "exploration" | "creativity";
  criteria: Record<string, unknown>;
}

export interface EarnedBadge {
  childId: string;
  badgeId: string;
  earnedAt: string;
}

export interface DailyActivity {
  childId: string;
  activityDate: string;
  minutesActive: number;
  lessonsCompleted: number;
}
