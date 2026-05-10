import { readConfig, setUser } from "./config.js";

type CommandHandler = (cmdName: string, ...args: string[]) => void;

type CommandsRegistry = Record<string, CommandHandler>;

function handlerLogin(cmdName: string, ...args: string[]): void {
  if (args.length === 0) {
    throw new Error("the login handler expects a single argument, the username");
  }
  const username = args[0];
  const cfg = readConfig();
  cfg.currentUserName = username;
  setUser(cfg);
  console.log(`User has been set to "${username}"`);
}

function registerCommand(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler
): void {
  registry[cmdName] = handler;
}

function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
): void {
  const handler = registry[cmdName];
  if (!handler) {
    throw new Error(`unknown command: ${cmdName}`);
  }
  handler(cmdName, ...args);
}

export { handlerLogin, registerCommand, runCommand };
export type { CommandHandler, CommandsRegistry };
