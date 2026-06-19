import * as Blockly from "blockly";

export const codecrittersTheme = Blockly.Theme.defineTheme("codecritters", {
  name: "codecritters",
  base: Blockly.Themes.Classic,
  blockStyles: {
    motion_blocks: { colourPrimary: "#4C97FF", colourSecondary: "#3373CC", colourTertiary: "#2A5FAA" },
    looks_blocks: { colourPrimary: "#9966FF", colourSecondary: "#7744CC", colourTertiary: "#5522AA" },
    sound_blocks: { colourPrimary: "#CF63CF", colourSecondary: "#A84DA8", colourTertiary: "#883988" },
    event_blocks: { colourPrimary: "#FFBF00", colourSecondary: "#CCA000", colourTertiary: "#AA8500" },
    control_blocks: { colourPrimary: "#FFAB19", colourSecondary: "#CF8B17", colourTertiary: "#AA7015" },
    sensing_blocks: { colourPrimary: "#5CB1D6", colourSecondary: "#4A8DAA", colourTertiary: "#3A7088" },
    variable_blocks: { colourPrimary: "#FF6680", colourSecondary: "#CC5266", colourTertiary: "#AA4455" },
    procedure_blocks: { colourPrimary: "#FF6D72", colourSecondary: "#CC575B", colourTertiary: "#AA4548" },
  },
  categoryStyles: {
    motion_category: { colour: "#4C97FF" },
    looks_category: { colour: "#9966FF" },
    sound_category: { colour: "#CF63CF" },
    event_category: { colour: "#FFBF00" },
    control_category: { colour: "#FFAB19" },
    sensing_category: { colour: "#5CB1D6" },
    variable_category: { colour: "#FF6680" },
    procedure_category: { colour: "#FF6D72" },
  },
  componentStyles: {
    workspaceBackgroundColour: "#F9F9FF",
    toolboxBackgroundColour: "#FFFFFF",
    toolboxForegroundColour: "#575E75",
    flyoutBackgroundColour: "#F0F0F8",
    flyoutForegroundColour: "#575E75",
    flyoutOpacity: 0.95,
    scrollbarColour: "#CECDDD",
    scrollbarOpacity: 0.6,
    insertionMarkerColour: "#575E75",
    insertionMarkerOpacity: 0.4,
    cursorColour: "#4C97FF",
  },
  fontStyle: {
    family: "Nunito, system-ui, sans-serif",
    weight: "600",
    size: 13,
  },
});
