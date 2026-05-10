import {
  handlerLogin,
  registerCommand,
  runCommand,
  type CommandsRegistry,
} from "./commands.js";

function main() {
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);

  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("not enough arguments were provided");
    process.exit(1);
  }

  const [cmdName, ...cmdArgs] = args;

  try {
    runCommand(registry, cmdName, ...cmdArgs);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    process.exit(1);
  }
}

main();
