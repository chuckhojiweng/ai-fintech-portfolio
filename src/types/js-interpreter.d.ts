declare module "js-interpreter" {
  class Interpreter {
    constructor(
      code: string,
      initFunc?: (interpreter: Interpreter, globalObject: unknown) => void
    );
    step(): boolean;
    run(): boolean;
    createNativeFunction(fn: Function): unknown;
    setProperty(scope: unknown, name: string, value: unknown): void;
  }
  export default Interpreter;
}
