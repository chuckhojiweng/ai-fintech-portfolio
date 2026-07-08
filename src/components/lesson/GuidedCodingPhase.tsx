"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import type { GuidedCodingPhase as GuidedCodingPhaseType } from "@/types/lesson";
import HintSystem from "./HintSystem";
import Stage from "@/components/stage/Stage";
import Controls from "@/components/editor/Controls";

const BlocklyWorkspace = dynamic(
  () => import("@/components/editor/BlocklyWorkspace"),
  {
    ssr: false,
    loading: () => <div className="w-full h-full min-h-[280px] bg-gray-50 rounded-2xl animate-pulse" />,
  }
);

interface GuidedCodingPhaseProps {
  phase: GuidedCodingPhaseType;
  onComplete: () => void;
}

export default function GuidedCodingPhase({ phase, onComplete }: GuidedCodingPhaseProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [hintsUsedThisStep, setHintsUsedThisStep] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const totalHintsRef = useRef(0);

  const step = phase.instructions[stepIndex];
  const isLastStep = stepIndex >= phase.instructions.length - 1;

  const advance = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setStepIndex((i) => i + 1);
      setHintsUsedThisStep(0);
      setResetKey((k) => k + 1);
    }
  };

  const handleHintShown = () => {
    totalHintsRef.current += 1;
    setHintsUsedThisStep((n) => n + 1);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Step instruction banner */}
      <div className="flex items-center gap-3 px-4 py-3 bg-indigo-50 border-b border-indigo-100">
        <span className="text-2xl select-none">🦎</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
            Step {stepIndex + 1} of {phase.instructions.length}
          </p>
          <p className="font-bold text-indigo-800 text-sm leading-snug truncate">{step?.text}</p>
        </div>
        <button
          onClick={advance}
          className="flex-shrink-0 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-bold rounded-xl text-sm transition-all"
        >
          {isLastStep ? "Done! →" : "Next →"}
        </button>
      </div>

      {/* Step progress dots */}
      <div className="flex justify-center gap-1.5 py-2 bg-indigo-50/50">
        {phase.instructions.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === stepIndex
                ? "w-5 h-2 bg-indigo-500"
                : i < stepIndex
                ? "w-2 h-2 bg-indigo-300"
                : "w-2 h-2 bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Main editing area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-3 p-3 min-h-0">
        <div className="flex-1 min-h-[280px] lg:min-h-0 relative">
          <BlocklyWorkspace availableBlocks={phase.availableBlocks} />
          {step && (
            <HintSystem
              hints={step.hints}
              hintDelayMs={step.hintDelayMs}
              onHintShown={handleHintShown}
              resetKey={resetKey}
            />
          )}
        </div>
        <div className="flex flex-col gap-3 lg:w-[480px] flex-shrink-0">
          <Stage />
          <Controls />
        </div>
      </div>
    </div>
  );
}
