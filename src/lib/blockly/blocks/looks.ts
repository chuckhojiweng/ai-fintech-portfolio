import * as Blockly from "blockly";

export function registerLooksBlocks() {
  Blockly.Blocks["looks_say"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("say");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("looks_blocks");
      this.setTooltip("Make the character say something");
    },
  };

  Blockly.Blocks["looks_say_for_seconds"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("say");
      this.appendValueInput("SECONDS")
        .setCheck("Number")
        .appendField("for");
      this.appendDummyInput().appendField("seconds");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("looks_blocks");
      this.setTooltip("Make the character say something for a time");
    },
  };

  Blockly.Blocks["looks_show"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("show");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("looks_blocks");
      this.setTooltip("Show the character");
    },
  };

  Blockly.Blocks["looks_hide"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField("hide");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("looks_blocks");
      this.setTooltip("Hide the character");
    },
  };

  Blockly.Blocks["looks_change_size"] = {
    init(this: Blockly.Block) {
      this.appendValueInput("SIZE")
        .setCheck("Number")
        .appendField("change size by");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("looks_blocks");
      this.setTooltip("Make the character bigger or smaller");
    },
  };
}
