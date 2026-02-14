const path = require("path");
const { parseCliArgs, printHelp } = require("./args");
const { askProjectArg } = require("./prompt");
const { scaffoldProject } = require("./scaffold");
const { runCommand } = require("./run");
const { printBanner, logInfo, logWarn, logSuccess, logError } = require("./logger");

async function main() {
  printBanner();

  const { projectArg: parsedProjectArg, flags } = parseCliArgs(process.argv.slice(2));

  if (flags.help) {
    printHelp();
    return;
  }

  let projectArg = parsedProjectArg;
  if (!projectArg) {
    projectArg = await askProjectArg();
  }

  if (!projectArg) {
    logError("No app name provided.");
    process.exit(1);
  }

  const projectDir = path.resolve(process.cwd(), projectArg);
  logInfo(`Preparing folder ${projectDir}`);
  logInfo("Generating project files...");
  scaffoldProject(projectDir, projectArg);

  logSuccess(`Scaffold complete for ${projectArg}`);
  logInfo(`Options: install=${String(flags.install)} dev=${String(flags.dev)}`);

  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

  if (flags.install) {
    await runCommand(npmCmd, ["install"], projectDir, "Installing dependencies");
  } else {
    logWarn("Skipping dependency installation (--no-install)");
  }

  if (flags.dev) {
    await runCommand(npmCmd, ["run", "dev"], projectDir, "Starting development server");
  } else {
    logWarn("Skipping development server startup (--no-dev)");
  }
}

module.exports = {
  main
};
