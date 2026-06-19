import Interpreter from "js-interpreter";
import type { StageAPI } from "./api";

const MAX_STEPS = 10_000;

export interface SandboxOptions {
  code: string;
  stageApi: StageAPI;
  onStep?: (stepNumber: number) => void;
  onComplete?: () => void;
  onError?: (error: string) => void;
  speed?: number;
}

export class CodeSandbox {
  private interpreter: InstanceType<typeof Interpreter> | null = null;
  private stepCount = 0;
  private running = false;
  private animationFrameId: number | null = null;
  private options: SandboxOptions;

  constructor(options: SandboxOptions) {
    this.options = options;
  }

  init() {
    const { code, stageApi } = this.options;
    try {
      this.interpreter = new Interpreter(code, (interpreter: InstanceType<typeof Interpreter>, globalObject: unknown) => {
        const createNative = (fn: (...args: number[]) => void) =>
          interpreter.createNativeFunction(fn);

        interpreter.setProperty(
          globalObject,
          "moveSteps",
          createNative((steps: number) => stageApi.moveSteps(steps))
        );
        interpreter.setProperty(
          globalObject,
          "turnRight",
          createNative((degrees: number) => stageApi.turnRight(degrees))
        );
        interpreter.setProperty(
          globalObject,
          "turnLeft",
          createNative((degrees: number) => stageApi.turnLeft(degrees))
        );
        interpreter.setProperty(
          globalObject,
          "goToXY",
          createNative((x: number, y: number) => stageApi.goToXY(x, y))
        );
        interpreter.setProperty(
          globalObject,
          "say",
          createNative((text: number) => stageApi.say(String(text)))
        );
        interpreter.setProperty(
          globalObject,
          "showSprite",
          createNative(() => stageApi.show())
        );
        interpreter.setProperty(
          globalObject,
          "hideSprite",
          createNative(() => stageApi.hide())
        );
        interpreter.setProperty(
          globalObject,
          "changeSize",
          createNative((amount: number) => stageApi.changeSize(amount))
        );
        interpreter.setProperty(
          globalObject,
          "wait",
          createNative(() => {
            // no-op in stepped execution; timing handled by step loop
          })
        );
      });
      this.stepCount = 0;
    } catch (err) {
      this.options.onError?.(
        err instanceof Error ? err.message : "Failed to initialize program"
      );
    }
  }

  run() {
    if (!this.interpreter) {
      this.init();
    }
    this.running = true;
    this.step();
  }

  private step() {
    if (!this.running || !this.interpreter) return;

    const stepsPerFrame = Math.max(1, Math.round(this.options.speed ?? 1));

    for (let i = 0; i < stepsPerFrame; i++) {
      if (this.stepCount >= MAX_STEPS) {
        this.running = false;
        this.options.onError?.(
          "Your program is going around and around! Maybe check your loop?"
        );
        return;
      }

      let hasMore: boolean;
      try {
        hasMore = this.interpreter.step();
      } catch (err) {
        this.running = false;
        this.options.onError?.(
          err instanceof Error ? err.message : "Something went wrong"
        );
        return;
      }

      this.stepCount++;
      this.options.onStep?.(this.stepCount);

      if (!hasMore) {
        this.running = false;
        this.options.onComplete?.();
        return;
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.step());
  }

  pause() {
    this.running = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resume() {
    if (this.interpreter && !this.running) {
      this.running = true;
      this.step();
    }
  }

  stop() {
    this.running = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.interpreter = null;
    this.stepCount = 0;
  }

  get isRunning() {
    return this.running;
  }
}
