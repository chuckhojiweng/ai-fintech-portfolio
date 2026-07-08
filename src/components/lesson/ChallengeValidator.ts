import type { ValidationRules, StarCriteria } from "@/types/lesson";

export interface ValidationResult {
  passed: boolean;
  stars: number;
  feedback: string;
}

export function validateChallenge(
  workspaceJson: string,
  rules: ValidationRules,
  hintsUsed: number,
  timeSpentSeconds: number,
  starCriteria: StarCriteria
): ValidationResult {
  if (!workspaceJson) {
    return { passed: false, stars: 0, feedback: "Add some blocks to your workspace first!" };
  }

  let workspace: Record<string, unknown>;
  try {
    workspace = JSON.parse(workspaceJson);
  } catch {
    return { passed: false, stars: 0, feedback: "Something went wrong — try again!" };
  }

  const blockTypes = extractBlockTypes(workspace);

  if (rules.mustUseBlocks?.length) {
    for (const required of rules.mustUseBlocks) {
      if (!blockTypes.includes(required)) {
        const friendlyName = friendlyBlockName(required);
        return {
          passed: false,
          stars: 0,
          feedback: `Try adding the "${friendlyName}" block to your code!`,
        };
      }
    }
  }

  if (rules.repeatCountMin !== undefined) {
    const repeatCount = getRepeatCount(workspace);
    if (repeatCount < rules.repeatCountMin) {
      return {
        passed: false,
        stars: 0,
        feedback: `Make your loop repeat at least ${rules.repeatCountMin} times!`,
      };
    }
  }

  const stars = calculateStars(starCriteria, hintsUsed, timeSpentSeconds);
  return {
    passed: true,
    stars,
    feedback: starFeedback(stars),
  };
}

function extractBlockTypes(workspace: Record<string, unknown>): string[] {
  const types: string[] = [];

  function walk(obj: unknown) {
    if (!obj || typeof obj !== "object") return;
    if (Array.isArray(obj)) {
      obj.forEach(walk);
      return;
    }
    const record = obj as Record<string, unknown>;
    if (typeof record.type === "string") {
      types.push(record.type);
    }
    Object.values(record).forEach(walk);
  }

  walk(workspace);
  return types;
}

function getRepeatCount(workspace: Record<string, unknown>): number {
  let maxRepeat = 0;

  function walk(obj: unknown) {
    if (!obj || typeof obj !== "object") return;
    if (Array.isArray(obj)) { obj.forEach(walk); return; }
    const record = obj as Record<string, unknown>;
    if (record.type === "control_repeat") {
      const inputs = record.inputs as Record<string, unknown> | undefined;
      const timesInput = inputs?.TIMES as Record<string, unknown> | undefined;
      const shadow = timesInput?.shadow as Record<string, unknown> | undefined;
      const fields = shadow?.fields as Record<string, unknown> | undefined;
      const num = Number(fields?.NUM ?? 0);
      if (num > maxRepeat) maxRepeat = num;
    }
    Object.values(record).forEach(walk);
  }

  walk(workspace);
  return maxRepeat;
}

function calculateStars(
  criteria: StarCriteria,
  hintsUsed: number,
  timeSpentSeconds: number
): number {
  if (
    hintsUsed <= criteria.threeStars.hintsUsed.max &&
    (criteria.threeStars.timeSeconds === undefined ||
      timeSpentSeconds <= criteria.threeStars.timeSeconds.max)
  ) {
    return 3;
  }
  if (hintsUsed <= criteria.twoStars.hintsUsed.max) return 2;
  return 1;
}

function starFeedback(stars: number): string {
  if (stars === 3) return "Amazing! You got 3 stars! You're a coding superstar! ⭐⭐⭐";
  if (stars === 2) return "Great job! 2 stars! Try using fewer hints next time for 3 stars! ⭐⭐";
  return "You did it! 1 star! Keep practicing and you'll get more stars! ⭐";
}

function friendlyBlockName(blockType: string): string {
  const names: Record<string, string> = {
    motion_move_steps: "move steps",
    motion_turn_right: "turn right",
    motion_turn_left: "turn left",
    motion_go_to_xy: "go to position",
    looks_say: "say",
    looks_say_for_seconds: "say for seconds",
    looks_show: "show",
    looks_hide: "hide",
    control_repeat: "repeat",
    control_if: "if",
    control_wait: "wait",
    event_when_flag_clicked: "when flag clicked",
  };
  return names[blockType] ?? blockType.replace(/_/g, " ");
}
