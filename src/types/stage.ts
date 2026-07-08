export interface SpriteDefinition {
  id: string;
  name: string;
  spritesheet: string;
  costumes: CostumeDefinition[];
  defaultCostume: string;
  defaultPosition: { x: number; y: number };
  defaultScale: number;
}

export interface CostumeDefinition {
  name: string;
  frame: string;
}

export interface BackgroundDefinition {
  id: string;
  name: string;
  imageUrl: string;
}

export interface StageAction {
  type:
    | "move"
    | "turn"
    | "goTo"
    | "say"
    | "changeCostume"
    | "changeSize"
    | "show"
    | "hide"
    | "playSound"
    | "wait";
  spriteId: string;
  params: Record<string, unknown>;
}
