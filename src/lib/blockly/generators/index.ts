import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript";

export function registerGenerators() {
  javascriptGenerator.forBlock["motion_move_steps"] = function (
    block: Blockly.Block
  ) {
    const steps =
      javascriptGenerator.valueToCode(block, "STEPS", Order.ATOMIC) || "10";
    return `moveSteps(${steps});\n`;
  };

  javascriptGenerator.forBlock["motion_turn_right"] = function (
    block: Blockly.Block
  ) {
    const degrees =
      javascriptGenerator.valueToCode(block, "DEGREES", Order.ATOMIC) || "15";
    return `turnRight(${degrees});\n`;
  };

  javascriptGenerator.forBlock["motion_turn_left"] = function (
    block: Blockly.Block
  ) {
    const degrees =
      javascriptGenerator.valueToCode(block, "DEGREES", Order.ATOMIC) || "15";
    return `turnLeft(${degrees});\n`;
  };

  javascriptGenerator.forBlock["motion_go_to_xy"] = function (
    block: Blockly.Block
  ) {
    const x =
      javascriptGenerator.valueToCode(block, "X", Order.ATOMIC) || "0";
    const y =
      javascriptGenerator.valueToCode(block, "Y", Order.ATOMIC) || "0";
    return `goToXY(${x}, ${y});\n`;
  };

  javascriptGenerator.forBlock["event_when_flag_clicked"] = function () {
    return "";
  };

  javascriptGenerator.forBlock["event_when_key_pressed"] = function (
    block: Blockly.Block
  ) {
    const key = block.getFieldValue("KEY");
    return `// when ${key} pressed\n`;
  };

  javascriptGenerator.forBlock["event_when_sprite_clicked"] = function () {
    return "";
  };

  javascriptGenerator.forBlock["control_repeat"] = function (
    block: Blockly.Block
  ) {
    const times =
      javascriptGenerator.valueToCode(block, "TIMES", Order.ATOMIC) || "10";
    const body = javascriptGenerator.statementToCode(block, "DO");
    return `for (var i = 0; i < ${times}; i++) {\n${body}}\n`;
  };

  javascriptGenerator.forBlock["control_if"] = function (
    block: Blockly.Block
  ) {
    const condition =
      javascriptGenerator.valueToCode(block, "CONDITION", Order.NONE) ||
      "false";
    const body = javascriptGenerator.statementToCode(block, "DO");
    return `if (${condition}) {\n${body}}\n`;
  };

  javascriptGenerator.forBlock["control_wait"] = function (
    block: Blockly.Block
  ) {
    const seconds =
      javascriptGenerator.valueToCode(block, "SECONDS", Order.ATOMIC) || "1";
    return `wait(${seconds});\n`;
  };

  javascriptGenerator.forBlock["looks_say"] = function (
    block: Blockly.Block
  ) {
    const text =
      javascriptGenerator.valueToCode(block, "TEXT", Order.ATOMIC) ||
      "'Hello!'";
    return `say(${text});\n`;
  };

  javascriptGenerator.forBlock["looks_say_for_seconds"] = function (
    block: Blockly.Block
  ) {
    const text =
      javascriptGenerator.valueToCode(block, "TEXT", Order.ATOMIC) ||
      "'Hello!'";
    const seconds =
      javascriptGenerator.valueToCode(block, "SECONDS", Order.ATOMIC) || "2";
    return `sayForSeconds(${text}, ${seconds});\n`;
  };

  javascriptGenerator.forBlock["looks_show"] = function () {
    return "showSprite();\n";
  };

  javascriptGenerator.forBlock["looks_hide"] = function () {
    return "hideSprite();\n";
  };

  javascriptGenerator.forBlock["looks_change_size"] = function (
    block: Blockly.Block
  ) {
    const size =
      javascriptGenerator.valueToCode(block, "SIZE", Order.ATOMIC) || "10";
    return `changeSize(${size});\n`;
  };
}
