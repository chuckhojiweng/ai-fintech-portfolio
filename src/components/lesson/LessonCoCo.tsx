"use client";

import dynamic from "next/dynamic";

const CoCoChat = dynamic(() => import("@/components/ai-tutor/CoCoChat"), { ssr: false });

export default function LessonCoCo() {
  return <CoCoChat />;
}
