export interface SpriteState {
  id: string;
  name: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  visible: boolean;
  costume: string;
  costumes: string[];
  sayText?: string;
}

export interface StageState {
  width: number;
  height: number;
  background: string;
  sprites: SpriteState[];
}

export type ExecutionStatus = "idle" | "running" | "paused" | "stopped" | "error";

export interface ExecutionState {
  status: ExecutionStatus;
  currentStep: number;
  totalSteps: number;
  speed: number;
  highlightedBlockId?: string;
  error?: string;
}
