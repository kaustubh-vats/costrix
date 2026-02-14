const { spawn } = require("child_process");
const { logInfo, logError, startLoader } = require("./logger");

function spawnWithOptions(command, args, cwd, useShell) {
  return spawn(command, args, {
    cwd,
    stdio: "inherit",
    shell: useShell
  });
}

function runCommand(command, args, cwd, label) {
  const loader = startLoader(label);

  const execute = (useShell) =>
    new Promise((resolve, reject) => {
      const child = spawnWithOptions(command, args, cwd, useShell);

      child.on("error", (error) => {
        reject(error);
      });

      child.on("close", (code) => {
        if (code === 0) {
          resolve();
          return;
        }
        reject(new Error(`${label} failed with exit code ${String(code)}`));
      });
    });

  return execute(false)
    .then(() => {
      loader.done(`${label} complete`);
    })
    .catch((error) => {
      if (process.platform === "win32" && error && error.code === "EINVAL") {
        loader.info(`${label}: retrying with Windows shell fallback...`);
        logInfo(`${label}: retrying with Windows shell fallback...`);
        return execute(true).then(() => {
          loader.done(`${label} complete`);
        });
      }
      throw error;
    })
    .catch((error) => {
      loader.fail(`${label} failed`);
      logError(`${label} failed: ${error.message}`);
      throw error;
    });
}

module.exports = {
  runCommand
};
