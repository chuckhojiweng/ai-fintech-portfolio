export interface ToolboxCategory {
  kind: "category";
  name: string;
  categorystyle: string;
  contents: ToolboxBlock[];
}

export interface ToolboxBlock {
  kind: "block";
  type: string;
  inputs?: Record<string, { shadow: { type: string; fields?: Record<string, unknown> } }>;
}

const motionBlocks: ToolboxBlock[] = [
  {
    kind: "block",
    type: "motion_move_steps",
    inputs: {
      STEPS: { shadow: { type: "math_number", fields: { NUM: 10 } } },
    },
  },
  {
    kind: "block",
    type: "motion_turn_right",
    inputs: {
      DEGREES: { shadow: { type: "math_number", fields: { NUM: 15 } } },
    },
  },
  {
    kind: "block",
    type: "motion_turn_left",
    inputs: {
      DEGREES: { shadow: { type: "math_number", fields: { NUM: 15 } } },
    },
  },
  {
    kind: "block",
    type: "motion_go_to_xy",
    inputs: {
      X: { shadow: { type: "math_number", fields: { NUM: 0 } } },
      Y: { shadow: { type: "math_number", fields: { NUM: 0 } } },
    },
  },
];

const looksBlocks: ToolboxBlock[] = [
  {
    kind: "block",
    type: "looks_say",
    inputs: {
      TEXT: { shadow: { type: "text", fields: { TEXT: "Hello!" } } },
    },
  },
  {
    kind: "block",
    type: "looks_say_for_seconds",
    inputs: {
      TEXT: { shadow: { type: "text", fields: { TEXT: "Hello!" } } },
      SECONDS: { shadow: { type: "math_number", fields: { NUM: 2 } } },
    },
  },
  { kind: "block", type: "looks_show" },
  { kind: "block", type: "looks_hide" },
  {
    kind: "block",
    type: "looks_change_size",
    inputs: {
      SIZE: { shadow: { type: "math_number", fields: { NUM: 10 } } },
    },
  },
];

const eventBlocks: ToolboxBlock[] = [
  { kind: "block", type: "event_when_flag_clicked" },
  { kind: "block", type: "event_when_key_pressed" },
  { kind: "block", type: "event_when_sprite_clicked" },
];

const controlBlocks: ToolboxBlock[] = [
  {
    kind: "block",
    type: "control_repeat",
    inputs: {
      TIMES: { shadow: { type: "math_number", fields: { NUM: 10 } } },
    },
  },
  { kind: "block", type: "control_if" },
  {
    kind: "block",
    type: "control_wait",
    inputs: {
      SECONDS: { shadow: { type: "math_number", fields: { NUM: 1 } } },
    },
  },
];

export const fullToolbox = {
  kind: "categoryToolbox" as const,
  contents: [
    { kind: "category", name: "Events", categorystyle: "event_category", contents: eventBlocks },
    { kind: "category", name: "Motion", categorystyle: "motion_category", contents: motionBlocks },
    { kind: "category", name: "Looks", categorystyle: "looks_category", contents: looksBlocks },
    { kind: "category", name: "Control", categorystyle: "control_category", contents: controlBlocks },
  ] as ToolboxCategory[],
};

export function buildToolboxForBlocks(allowedBlocks: string[]) {
  const allCategories = fullToolbox.contents;
  const filtered = allCategories
    .map((category) => ({
      ...category,
      contents: category.contents.filter((block) =>
        allowedBlocks.includes(block.type)
      ),
    }))
    .filter((category) => category.contents.length > 0);

  return { kind: "categoryToolbox" as const, contents: filtered };
}
