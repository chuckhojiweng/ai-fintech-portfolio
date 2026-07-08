"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Lesson } from "@/types/lesson";
import { useProgressStore } from "@/stores/progressStore";
import { useEditorStore } from "@/stores/editorStore";
import NarrativePhase from "./NarrativePhase";
import GuidedCodingPhase from "./GuidedCodingPhase";
import ChallengePhase from "./ChallengePhase";
import FreePlayPhase from "./FreePlayPhase";

interface LessonPlayerProps {
  lesson: Lesson;
  nextLessonUrl: string | null;
}

export default function LessonPlayer({ lesson, nextLessonUrl }: LessonPlayerProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const router = useRouter();
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const resetStage = useEditorStore((s) => s.resetStage);

  const phase = lesson.phases[phaseIndex];

  const advancePhase = () => {
    const next = phaseIndex + 1;
    if (next < lesson.phases.length) {
      resetStage();
      setPhaseIndex(next);
    } else {
      router.push(nextLessonUrl ?? "/map");
    }
  };

  const handleChallengeComplete = (stars: number, hintsUsed: number, timeSpent: number) => {
    completeLesson(lesson.id, stars, hintsUsed, timeSpent);
    advancePhase();
  };

  const handleFreePlayComplete = () => {
    router.push(nextLessonUrl ?? "/map");
  };

  if (!phase) {
    router.push("/map");
    return null;
  }

  if (phase.type === "narrative") {
    return <NarrativePhase phase={phase} onComplete={advancePhase} />;
  }

  if (phase.type === "guided_coding") {
    return <GuidedCodingPhase phase={phase} onComplete={advancePhase} />;
  }

  if (phase.type === "challenge") {
    return (
      <ChallengePhase
        phase={phase}
        availableBlocks={lesson.availableBlocks}
        onComplete={handleChallengeComplete}
      />
    );
  }

  if (phase.type === "free_play") {
    return (
      <FreePlayPhase
        phase={phase}
        lessonAvailableBlocks={lesson.availableBlocks}
        onComplete={handleFreePlayComplete}
      />
    );
  }

  return null;
}
