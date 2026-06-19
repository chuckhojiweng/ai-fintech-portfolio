import { create } from "zustand";
import type { ExecutionState, StageState, SpriteState } from "@/types/editor";

const DEFAULT_SPRITE: SpriteState = {
  id: "coco",
  name: "CoCo",
  x: 240,
  y: 180,
  rotation: 0,
  scale: 1,
  visible: true,
  costume: "default",
  costumes: ["default"],
};

interface EditorState {
  workspaceXml: string;
  generatedCode: string;
  execution: ExecutionState;
  stage: StageState;

  setWorkspaceXml: (xml: string) => void;
  setGeneratedCode: (code: string) => void;
  setExecution: (update: Partial<ExecutionState>) => void;
  updateSprite: (spriteId: string, update: Partial<SpriteState>) => void;
  resetStage: () => void;
  setBackground: (background: string) => void;
}

const initialStage: StageState = {
  width: 480,
  height: 360,
  background: "default",
  sprites: [DEFAULT_SPRITE],
};

const initialExecution: ExecutionState = {
  status: "idle",
  currentStep: 0,
  totalSteps: 0,
  speed: 1,
};

export const useEditorStore = create<EditorState>()((set) => ({
  workspaceXml: "",
  generatedCode: "",
  execution: initialExecution,
  stage: initialStage,

  setWorkspaceXml: (workspaceXml) => set({ workspaceXml }),
  setGeneratedCode: (generatedCode) => set({ generatedCode }),
  setExecution: (update) =>
    set((state) => ({
      execution: { ...state.execution, ...update },
    })),
  updateSprite: (spriteId, update) =>
    set((state) => ({
      stage: {
        ...state.stage,
        sprites: state.stage.sprites.map((s) =>
          s.id === spriteId ? { ...s, ...update } : s
        ),
      },
    })),
  resetStage: () =>
    set({
      stage: initialStage,
      execution: initialExecution,
      generatedCode: "",
    }),
  setBackground: (background) =>
    set((state) => ({
      stage: { ...state.stage, background },
    })),
}));
