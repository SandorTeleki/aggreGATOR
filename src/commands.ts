import { readConfig, setUser } from "./config.js";
import { createUser, getUserByName } from "./lib/db/queries/users.js";

type CommandHandler = (cmdName: string, ...args: string[]) => void | Promise<void>;

type CommandsRegistry = Record<string, CommandHandler>;

async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    throw new Error("the login handler expects a single argument, the username");
  }
  const username = args[0];
  const user = await getUserByName(username);
  if (!user) {
    throw new Error(`user "${username}" does not exist. Please register first.`);
  }
  const cfg = readConfig();
  cfg.currentUserName = username;
  setUser(cfg);
  console.log(`User has been set to "${username}"`);
}

async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    throw new Error("the register handler expects a single argument, the username");
  }
  const name = args[0];
  const existing = await getUserByName(name);
  if (existing) {
    throw new Error(`user "${name}" already exists`);
  }
  const user = await createUser(name);
  const cfg = readConfig();
  cfg.currentUserName = name;
  setUser(cfg);
  console.log(`User "${name}" was created successfully`);
  console.log(user);
}

function registerCommand(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler
): void {
  registry[cmdName] = handler;
}

async function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
): Promise<void> {
  const handler = registry[cmdName];
  if (!handler) {
    throw new Error(`unknown command: ${cmdName}`);
  }
  await handler(cmdName, ...args);
}

export { handlerLogin, handlerRegister, registerCommand, runCommand };
export type { CommandHandler, CommandsRegistry };
