"use client";

import { useEffect, useRef, useState } from "react";
import type { GhostBlockHint } from "@/types/lesson";

interface HintSystemProps {
  hints: (string | GhostBlockHint)[];
  hintDelayMs: number;
  onHintShown: () => void;
  resetKey?: number;
}

export default function HintSystem({ hints, hintDelayMs, onHintShown, resetKey }: HintSystemProps) {
  const [shownTier, setShownTier] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reportedTiersRef = useRef(new Set<number>());

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setShownTier(0);
    reportedTiersRef.current.clear();

    hints.forEach((_, i) => {
      const t = setTimeout(() => {
        const tier = i + 1;
        setShownTier(tier);
        if (!reportedTiersRef.current.has(tier)) {
          reportedTiersRef.current.add(tier);
          onHintShown();
        }
      }, hintDelayMs * (i + 1));
      timersRef.current.push(t);
    });

    return () => { timersRef.current.forEach(clearTimeout); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, hintDelayMs]);

  if (shownTier === 0 || hints.length === 0) return null;

  const hint = hints[shownTier - 1];

  if (typeof hint === "string") {
    return (
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-2 z-30 pointer-events-none max-w-xs w-full px-4">
        <span className="text-4xl flex-shrink-0">🦎</span>
        <div className="bg-white border-2 border-indigo-300 rounded-2xl px-4 py-3 shadow-xl">
          <p className="text-sm font-bold text-indigo-700 leading-snug">{hint}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute z-20 animate-pulse pointer-events-none"
      style={{ left: hint.position.x, top: hint.position.y }}
    >
      <div className="w-44 h-11 rounded-xl border-4 border-dashed border-yellow-400 bg-yellow-100/70 flex items-center justify-center shadow-lg">
        <span className="text-xs font-bold text-yellow-800">Put block here! ↓</span>
      </div>
    </div>
  );
}
