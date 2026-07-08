"use client";

import dynamic from "next/dynamic";
import Stage from "@/components/stage/Stage";
import Controls from "@/components/editor/Controls";

const BlocklyWorkspace = dynamic(
  () => import("@/components/editor/BlocklyWorkspace"),
  { ssr: false, loading: () => <div className="w-full h-full min-h-[300px] bg-gray-50 rounded-2xl animate-pulse" /> }
);

const CoCoChat = dynamic(
  () => import("@/components/ai-tutor/CoCoChat"),
  { ssr: false }
);

export default function SandboxPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦎</span>
          <h1 className="text-lg font-bold text-gray-800">CodeCritters</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Sandbox
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-3 p-3 min-h-0">
        {/* Left: Block Editor */}
        <div className="flex-1 min-h-[300px] lg:min-h-0">
          <BlocklyWorkspace />
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
