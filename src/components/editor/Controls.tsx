"use client";

import { useRef, useCallback } from "react";
import Button from "@/components/ui/Button";
import { useEditorStore } from "@/stores/editorStore";
import { CodeSandbox } from "@/lib/interpreter/sandbox";
import { createStageAPI } from "@/lib/interpreter/api";

export default function Controls() {
  const sandboxRef = useRef<CodeSandbox | null>(null);
  const generatedCode = useEditorStore((s) => s.generatedCode);
  const execution = useEditorStore((s) => s.execution);
  const setExecution = useEditorStore((s) => s.setExecution);
  const resetStage = useEditorStore((s) => s.resetStage);

  const handleRun = useCallback(() => {
    if (sandboxRef.current) {
      sandboxRef.current.stop();
    }

    resetStage();
    setExecution({ status: "running", currentStep: 0, error: undefined });

    const stageApi = createStageAPI("coco");
    const sandbox = new CodeSandbox({
      code: generatedCode,
      stageApi,
      speed: execution.speed,
      onStep: (step) => setExecution({ currentStep: step }),
      onComplete: () => setExecution({ status: "idle" }),
      onError: (error) => setExecution({ status: "error", error }),
    });

    sandboxRef.current = sandbox;
    sandbox.run();
  }, [generatedCode, execution.speed, setExecution, resetStage]);

  const handleStop = useCallback(() => {
    sandboxRef.current?.stop();
    setExecution({ status: "idle", currentStep: 0 });
  }, [setExecution]);

  const handlePause = useCallback(() => {
    if (execution.status === "running") {
      sandboxRef.current?.pause();
      setExecution({ status: "paused" });
    } else if (execution.status === "paused") {
      sandboxRef.current?.resume();
      setExecution({ status: "running" });
    }
  }, [execution.status, setExecution]);

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
      {/* Run Button */}
      <Button
        variant="success"
        size="lg"
        onClick={handleRun}
        disabled={execution.status === "running" || !generatedCode}
        icon={
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6.5 3.5L16 10L6.5 16.5V3.5Z" />
          </svg>
        }
      >
        Run
      </Button>

      {/* Pause/Resume */}
      {(execution.status === "running" || execution.status === "paused") && (
        <Button variant="secondary" size="lg" onClick={handlePause} icon={
          execution.status === "running" ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <rect x="5" y="4" width="4" height="12" rx="1" />
              <rect x="11" y="4" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.5 3.5L16 10L6.5 16.5V3.5Z" />
            </svg>
          )
        }>
          {execution.status === "running" ? "Pause" : "Resume"}
        </Button>
      )}

      {/* Stop */}
      <Button
        variant="danger"
        size="lg"
        onClick={handleStop}
        disabled={execution.status === "idle"}
        icon={
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect x="4" y="4" width="12" height="12" rx="2" />
          </svg>
        }
      >
        Stop
      </Button>

      {/* Speed Slider */}
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm text-gray-500 font-medium">Speed</span>
        <input
          type="range"
          min="1"
          max="10"
          value={execution.speed}
          onChange={(e) => setExecution({ speed: Number(e.target.value) })}
          className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <span className="text-xs text-gray-400 w-6">{execution.speed}x</span>
      </div>

      {/* Error message */}
      {execution.error && (
        <div className="text-sm text-orange-600 bg-orange-50 px-3 py-1.5 rounded-xl max-w-[200px] truncate">
          {execution.error}
        </div>
      )}
    </div>
  );
}
