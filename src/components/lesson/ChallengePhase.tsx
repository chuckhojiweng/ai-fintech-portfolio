"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { ChallengePhase as ChallengePhaseType } from "@/types/lesson";
import { validateChallenge } from "./ChallengeValidator";
import StarCelebration from "@/components/gamification/StarCelebration";
import Stage from "@/components/stage/Stage";
import Controls from "@/components/editor/Controls";
import { useEditorStore } from "@/stores/editorStore";

const BlocklyWorkspace = dynamic(
  () => import("@/components/editor/BlocklyWorkspace"),
  {
    ssr: false,
    loading: () => <div className="w-full h-full min-h-[280px] bg-gray-50 rounded-2xl animate-pulse" />,
  }
);

interface ChallengePhaseProps {
  phase: ChallengePhaseType;
  availableBlocks: string[];
  onComplete: (stars: number, hintsUsed: number, timeSpent: number) => void;
}

export default function ChallengePhase({ phase, availableBlocks, onComplete }: ChallengePhaseProps) {
  const [failFeedback, setFailFeedback] = useState<string | null>(null);
  const [passed, setPassed] = useState(false);
  const [resultStars, setResultStars] = useState(0);
  const [resultFeedback, setResultFeedback] = useState("");
  const [hintsUsed, setHintsUsed] = useState(0);
  const startTimeRef = useRef(Date.now());
  const workspaceXml = useEditorStore((s) => s.workspaceXml);

  const handleCheck = () => {
    setFailFeedback(null);
    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    const result = validateChallenge(
      workspaceXml,
      phase.validation,
      hintsUsed,
      timeSpent,
      phase.starCriteria
    );

    if (!result.passed) {
      setHintsUsed((n) => n + 1);
      setFailFeedback(result.feedback);
    } else {
      setPassed(true);
      setResultStars(result.stars);
      setResultFeedback(result.feedback);
    }
  };

  const handleContinue = () => {
    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    onComplete(resultStars, hintsUsed, timeSpent);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Challenge prompt */}
      <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border-b border-amber-100">
        <span className="text-2xl select-none">🏆</span>
        <p className="flex-1 font-bold text-amber-800 text-sm">{phase.prompt}</p>
        <button
          onClick={handleCheck}
          className="flex-shrink-0 px-4 py-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold rounded-xl text-sm transition-all"
        >
          Check! ✓
        </button>
      </div>

      {/* Failure feedback from CoCo */}
      {failFeedback && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-rose-50 border-b border-rose-100 animate-[fadeSlideDown_0.3s_ease-out]">
          <span className="text-xl select-none flex-shrink-0">🦎</span>
          <p className="flex-1 text-rose-700 text-sm font-semibold leading-snug">{failFeedback}</p>
          <button
            onClick={() => setFailFeedback(null)}
            className="text-rose-300 hover:text-rose-500 text-xl leading-none"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      {/* Editing area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-3 p-3 min-h-0">
        <div className="flex-1 min-h-[280px] lg:min-h-0">
          <BlocklyWorkspace availableBlocks={availableBlocks} />
        </div>
        <div className="flex flex-col gap-3 lg:w-[480px] flex-shrink-0">
          <Stage />
          <Controls />
        </div>
      </div>

      {/* Star celebration overlay */}
      {passed && (
        <StarCelebration
          stars={resultStars}
          xpEarned={resultStars * 25}
          feedback={resultFeedback}
          onContinue={handleContinue}
        />
      )}

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
