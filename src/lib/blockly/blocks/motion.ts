import * as Blockly from "blockly";

export function registerMotionBlocks() {
  Blockly.Blocks["motion_move_steps"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("STEPS")
        .setCheck("Number")
        .appendField("move");
      this.appendDummyInput().appendField("steps");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("motion_blocks");
      this.setTooltip("Move the character forward");
    },
  };

  Blockly.Blocks["motion_turn_right"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("DEGREES")
        .setCheck("Number")
        .appendField("turn right");
      this.appendDummyInput().appendField("degrees");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("motion_blocks");
      this.setTooltip("Turn the character clockwise");
    },
  };

  Blockly.Blocks["motion_turn_left"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("DEGREES")
        .setCheck("Number")
        .appendField("turn left");
      this.appendDummyInput().appendField("degrees");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("motion_blocks");
      this.setTooltip("Turn the character counter-clockwise");
    },
  };

  Blockly.Blocks["motion_go_to_xy"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("X")
        .setCheck("Number")
        .appendField("go to x:");
      this.appendValueInput("Y")
        .setCheck("Number")
        .appendField("y:");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("motion_blocks");
      this.setTooltip("Move the character to a position");
    },
  };
}
