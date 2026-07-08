export interface Chapter {
  id: string;
  slug: string;
  title: string;
  description: string;
  sortOrder: number;
  themeConfig: ChapterTheme;
  prerequisiteChapterId?: string;
}

export interface ChapterTheme {
  primaryColor: string;
  backgroundColor: string;
  backgroundImage?: string;
  musicTrack?: string;
}

export interface Lesson {
  id: string;
  chapterId: string;
  slug: string;
  title: string;
  sortOrder: number;
  lessonType: "guided" | "challenge" | "free_play";
  concepts: string[];
  difficulty: "easy" | "standard" | "challenge";
  phases: LessonPhase[];
  availableBlocks: string[];
  starterWorkspaceXml?: string;
}

export type LessonPhase =
  | NarrativePhase
  | GuidedCodingPhase
  | ChallengePhase
  | FreePlayPhase;

export interface NarrativePhase {
  type: "narrative";
  scenes: NarrativeScene[];
}

export interface NarrativeScene {
  background: string;
  character: string;
  animation?: string;
  voiceover?: string;
  subtitle: string;
  duration: number;
}

export interface GuidedCodingPhase {
  type: "guided_coding";
  instructions: GuidedStep[];
  availableBlocks: string[];
  sprites: string[];
  background: string;
}

export interface GuidedStep {
  text: string;
  highlightToolbox?: string;
  highlightBlock?: string;
  targetArea?: { x: number; y: number };
  hintDelayMs: number;
  hints: (string | GhostBlockHint)[];
}

export interface GhostBlockHint {
  type: "ghost_block";
  block: string;
  position: { x: number; y: number };
}

export interface ChallengePhase {
  type: "challenge";
  prompt: string;
  validation: ValidationRules;
  starCriteria: StarCriteria;
}

export interface ValidationRules {
  mustUseBlocks?: string[];
  repeatCountMin?: number;
  spriteCondition?: {
    sprite: string;
    property: string;
    value: unknown;
    count?: number;
  };
  customValidator?: string;
}

export interface StarCriteria {
  oneStar: { completed: boolean };
  twoStars: { hintsUsed: { max: number } };
  threeStars: { hintsUsed: { max: number }; timeSeconds?: { max: number } };
}

export interface FreePlayPhase {
  type: "free_play";
  prompt: string;
  availableBlocks: string[] | "all_unlocked";
  sprites: string[];
  background: string;
}
