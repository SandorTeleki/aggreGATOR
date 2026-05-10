import fs from "fs";
import os from "os";
import path from "path";

interface Config {
  dbUrl: string;
  currentUserName: string;
}

function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
  const filePath = getConfigFilePath();
  const jsonObj = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName,
  };
  fs.writeFileSync(filePath, JSON.stringify(jsonObj, null, 2) + "\n");
}

function validateConfig(rawConfig: any): Config {
  if (typeof rawConfig.db_url !== "string") {
    throw new Error("missing or invalid db_url in config");
  }
  return {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name ?? "",
  };
}

export function setUser(cfg: Config): void {
  writeConfig(cfg);
}

export function readConfig(): Config {
  const filePath = getConfigFilePath();
  const data = fs.readFileSync(filePath, "utf-8");
  const rawConfig = JSON.parse(data);
  return validateConfig(rawConfig);
}

export type { Config };
