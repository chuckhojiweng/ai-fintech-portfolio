import { useEditorStore } from "@/stores/editorStore";

export interface StageAPI {
  moveSteps: (steps: number) => void;
  turnRight: (degrees: number) => void;
  turnLeft: (degrees: number) => void;
  goToXY: (x: number, y: number) => void;
  say: (text: string) => void;
  show: () => void;
  hide: () => void;
  changeSize: (amount: number) => void;
}

export function createStageAPI(spriteId: string = "coco"): StageAPI {
  const updateSprite = useEditorStore.getState().updateSprite;

  return {
    moveSteps(steps: number) {
      const sprites = useEditorStore.getState().stage.sprites;
      const sprite = sprites.find((s) => s.id === spriteId);
      if (!sprite) return;
      const rad = (sprite.rotation * Math.PI) / 180;
      updateSprite(spriteId, {
        x: sprite.x + steps * Math.cos(rad),
        y: sprite.y + steps * Math.sin(rad),
      });
    },

    turnRight(degrees: number) {
      const sprites = useEditorStore.getState().stage.sprites;
      const sprite = sprites.find((s) => s.id === spriteId);
      if (!sprite) return;
      updateSprite(spriteId, { rotation: sprite.rotation + degrees });
    },

    turnLeft(degrees: number) {
      const sprites = useEditorStore.getState().stage.sprites;
      const sprite = sprites.find((s) => s.id === spriteId);
      if (!sprite) return;
      updateSprite(spriteId, { rotation: sprite.rotation - degrees });
    },

    goToXY(x: number, y: number) {
      updateSprite(spriteId, { x, y });
    },

    say(text: string) {
      updateSprite(spriteId, { sayText: text });
    },

    show() {
      updateSprite(spriteId, { visible: true });
    },

    hide() {
      updateSprite(spriteId, { visible: false });
    },

    changeSize(amount: number) {
      const sprites = useEditorStore.getState().stage.sprites;
      const sprite = sprites.find((s) => s.id === spriteId);
      if (!sprite) return;
      updateSprite(spriteId, {
        scale: Math.max(0.1, sprite.scale + amount / 100),
      });
    },
  };
}
