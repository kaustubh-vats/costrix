function parseCliArgs(argv) {
  const flags = {
    install: true,
    dev: true,
    help: false
  };
  let projectArg = "";

  argv.forEach((arg) => {
    if (arg === "--no-install") {
      flags.install = false;
      return;
    }
    if (arg === "--no-dev") {
      flags.dev = false;
      return;
    }
    if (arg === "--help" || arg === "-h") {
      flags.help = true;
      return;
    }
    if (!arg.startsWith("-") && projectArg === "") {
      projectArg = arg;
    }
  });

  return { projectArg, flags };
}

function printHelp() {
  console.log("\nUsage:");
  console.log("  costrix [app-name] [--no-install] [--no-dev]");
  console.log("\nFlags:");
  console.log("  --no-install   Scaffold only, skip npm install");
  console.log("  --no-dev       Skip auto-starting dev server");
  console.log("  -h, --help     Show this help message\n");
}

module.exports = {
  parseCliArgs,
  printHelp
};
