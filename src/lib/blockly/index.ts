import { registerMotionBlocks } from "./blocks/motion";
import { registerEventBlocks } from "./blocks/events";
import { registerControlBlocks } from "./blocks/control";
import { registerLooksBlocks } from "./blocks/looks";
import { registerGenerators } from "./generators";

let initialized = false;

export function initializeBlockly() {
  if (initialized) return;
  registerMotionBlocks();
  registerEventBlocks();
  registerControlBlocks();
  registerLooksBlocks();
  registerGenerators();
  initialized = true;
}

export { codecrittersTheme } from "./theme";
export { fullToolbox, buildToolboxForBlocks } from "./toolbox";
