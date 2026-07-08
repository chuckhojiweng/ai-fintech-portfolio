"use client";

import dynamic from "next/dynamic";
import type { FreePlayPhase as FreePlayPhaseType } from "@/types/lesson";
import Stage from "@/components/stage/Stage";
import Controls from "@/components/editor/Controls";

const BlocklyWorkspace = dynamic(
  () => import("@/components/editor/BlocklyWorkspace"),
  {
    ssr: false,
    loading: () => <div className="w-full h-full min-h-[280px] bg-gray-50 rounded-2xl animate-pulse" />,
  }
);

interface FreePlayPhaseProps {
  phase: FreePlayPhaseType;
  lessonAvailableBlocks: string[];
  onComplete: () => void;
}

export default function FreePlayPhase({ phase, lessonAvailableBlocks, onComplete }: FreePlayPhaseProps) {
  const blocks =
    phase.availableBlocks === "all_unlocked"
      ? undefined
      : phase.availableBlocks.length > 0
      ? phase.availableBlocks
      : lessonAvailableBlocks;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Prompt banner */}
      <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border-b border-emerald-100">
        <span className="text-2xl select-none">🎨</span>
        <p className="flex-1 font-bold text-emerald-800 text-sm">{phase.prompt}</p>
        <button
          onClick={onComplete}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold rounded-xl text-sm transition-all"
        >
          Finish! 🎉
        </button>
      </div>

      {/* Editor + Stage */}
      <div className="flex-1 flex flex-col lg:flex-row gap-3 p-3 min-h-0">
        <div className="flex-1 min-h-[280px] lg:min-h-0">
          <BlocklyWorkspace availableBlocks={blocks} />
        </div>
        <div className="flex flex-col gap-3 lg:w-[480px] flex-shrink-0">
          <Stage />
          <Controls />
        </div>
      </div>
    </div>
  );
}
