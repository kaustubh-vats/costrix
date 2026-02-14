const color = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  blue: "\x1b[34m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  gray: "\x1b[90m"
};

const paint = (tone, text) => `${color[tone]}${text}${color.reset}`;

function printBanner() {
  const lines = [
    "",
    paint("cyan", " ██████╗ ██████╗ ███████╗████████╗██████╗ ██╗██╗  ██╗"),
    paint("cyan", "██╔════╝██╔═══██╗██╔════╝╚══██╔══╝██╔══██╗██║╚██╗██╔╝"),
    paint("cyan", "██║     ██║   ██║███████╗   ██║   ██████╔╝██║ ╚███╔╝ "),
    paint("cyan", "██║     ██║   ██║╚════██║   ██║   ██╔══██╗██║ ██╔██╗ "),
    paint("cyan", "╚██████╗╚██████╔╝███████║   ██║   ██║  ██║██║██╔╝ ██╗"),
    paint("cyan", " ╚═════╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝"),
    paint("gray", "Scaffold TypeScript projects with guardrails"),
    paint("gray", "Created with care by Kaustubh"),
    ""
  ];
  console.log(lines.join("\n"));
}

const logInfo = (text) => console.log(`${paint("cyan", "ℹ")} ${text}`);
const logStep = (text) => console.log(`${paint("blue", "🧩")} ${text}`);
const logSuccess = (text) => console.log(`${paint("green", "✅")} ${text}`);
const logWarn = (text) => console.log(`${paint("yellow", "⚠️")} ${text}`);
const logError = (text) => console.error(`${paint("red", "❌")} ${text}`);

function startLoader(label) {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let index = 0;
  process.stdout.write(`${paint("cyan", frames[index])} ${label}`);

  const timer = setInterval(() => {
    index = (index + 1) % frames.length;
    process.stdout.write(`\r${paint("cyan", frames[index])} ${label}`);
  }, 90);

  const stop = (icon, tone, text) => {
    clearInterval(timer);
    process.stdout.write(`\r${paint(tone, icon)} ${text}\n`);
  };

  return {
    done: (text) => stop("✅", "green", text),
    fail: (text) => stop("❌", "red", text),
    info: (text) => stop("ℹ", "cyan", text)
  };
}

module.exports = {
  printBanner,
  logInfo,
  logStep,
  logSuccess,
  logWarn,
  logError,
  startLoader
};
