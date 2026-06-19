import * as Blockly from "blockly";

export function registerEventBlocks() {
  Blockly.Blocks["event_when_flag_clicked"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("when")
        .appendField(new Blockly.FieldImage("/sprites/flag.svg", 24, 24, "flag"))
        .appendField("clicked");
      this.setNextStatement(true, null);
      this.setStyle("event_blocks");
      this.setTooltip("Run this code when the green flag is clicked");
      this.setDeletable(false);
    },
  };

  Blockly.Blocks["event_when_key_pressed"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("when")
        .appendField(
          new Blockly.FieldDropdown([
            ["space", "SPACE"],
            ["up arrow", "UP"],
            ["down arrow", "DOWN"],
            ["left arrow", "LEFT"],
            ["right arrow", "RIGHT"],
          ]),
          "KEY"
        )
        .appendField("pressed");
      this.setNextStatement(true, null);
      this.setStyle("event_blocks");
      this.setTooltip("Run this code when a key is pressed");
    },
  };

  Blockly.Blocks["event_when_sprite_clicked"] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField("when this sprite clicked");
      this.setNextStatement(true, null);
      this.setStyle("event_blocks");
      this.setTooltip("Run this code when the character is clicked");
    },
  };
}
