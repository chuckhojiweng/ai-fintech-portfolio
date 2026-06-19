"use client";

import { use } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Stage from "@/components/stage/Stage";
import Controls from "@/components/editor/Controls";

const BlocklyWorkspace = dynamic(
  () => import("@/components/editor/BlocklyWorkspace"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[300px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);

const CoCoChat = dynamic(
  () => import("@/components/ai-tutor/CoCoChat"),
  { ssr: false }
);

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { slug } = use(params);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link
            href="/map"
            className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 4L6 10L12 16" />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              {slug.replace(/-/g, " ").replace(/^\d+-/, "")}
            </h1>
            <p className="text-xs text-gray-500">Chapter lesson</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-lg">☆ ☆ ☆</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-3 p-3 min-h-0">
        {/* Left: Block Editor */}
        <div className="flex-1 min-h-[300px] lg:min-h-0">
          <BlocklyWorkspace
            availableBlocks={[
              "event_when_flag_clicked",
              "motion_move_steps",
              "motion_turn_right",
              "motion_turn_left",
              "looks_say",
            ]}
          />
        </div>

        {/* Right: Stage + Controls */}
        <div className="flex flex-col gap-3 lg:w-[500px] flex-shrink-0">
          <Stage />
          <Controls />
        </div>
      </div>

      {/* CoCo AI Chat */}
      <CoCoChat />
    </div>
  );
}
