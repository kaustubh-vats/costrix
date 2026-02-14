const mode = process.argv[2] || "run";

const color = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  gray: "\x1b[90m"
};

const paint = (tone, text) => `${color[tone]}${text}${color.reset}`;

const lines = [
  "",
  paint("cyan", " ██████╗ ██████╗ ███████╗████████╗██████╗ ██╗██╗  ██╗"),
  paint("cyan", "██╔════╝██╔═══██╗██╔════╝╚══██╔══╝██╔══██╗██║╚██╗██╔╝"),
  paint("cyan", "██║     ██║   ██║███████╗   ██║   ██████╔╝██║ ╚███╔╝ "),
  paint("cyan", "██║     ██║   ██║╚════██║   ██║   ██╔══██╗██║ ██╔██╗ "),
  paint("cyan", "╚██████╗╚██████╔╝███████║   ██║   ██║  ██║██║██╔╝ ██╗"),
  paint("cyan", " ╚═════╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝"),
  paint("magenta", `Running: ${mode.toUpperCase()}`),
  paint("gray", "TypeScript + Guardrails + Webpack"),
  paint("gray", "Crafted with care by Kaustubh"),
  ""
];

console.log(lines.join("\n"));
