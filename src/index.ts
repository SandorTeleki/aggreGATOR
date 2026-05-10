import { readConfig, setUser } from "./config.js";

function main() {
  const cfg = readConfig();
  cfg.currentUserName = "Sandor";
  setUser(cfg);

  const updatedCfg = readConfig();
  console.log(updatedCfg);
}

main();