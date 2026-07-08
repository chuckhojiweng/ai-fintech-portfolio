import * as Blockly from "blockly";

export function registerControlBlocks() {
  Blockly.Blocks["control_repeat"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("TIMES")
        .setCheck("Number")
        .appendField("repeat");
      this.appendDummyInput().appendField("times");
      this.appendStatementInput("DO").appendField("do");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("control_blocks");
      this.setTooltip("Repeat the blocks inside a number of times");
    },
  };

  Blockly.Blocks["control_if"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("if");
      this.appendStatementInput("DO").appendField("then");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("control_blocks");
      this.setTooltip("Do something only if the condition is true");
    },
  };

  Blockly.Blocks["control_wait"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("SECONDS")
        .setCheck("Number")
        .appendField("wait");
      this.appendDummyInput().appendField("seconds");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("control_blocks");
      this.setTooltip("Pause for a number of seconds");
    },
  };
}
