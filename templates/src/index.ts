import * as stylesImport from "./App.module.css";

export type GuardrailItem = {
  readonly title: string;
  readonly detail: string;
};

type StylesMap = Readonly<Record<string, string>>;

export const DEFAULT_GUARDRAILS: ReadonlyArray<GuardrailItem> = [
  { title: "Strict TypeScript", detail: "Compiler options are strict and tuned for safer refactors." },
  { title: "Strict ESLint", detail: "Linting blocks unsafe patterns and explicit any usage." },
  { title: "Quality Build", detail: "Production build runs lint, typecheck, tests, and coverage gates." }
];

const toStringMap = (source: Record<string, unknown>): StylesMap => {
  const entries = Object.entries(source).filter((entry): entry is [string, string] => typeof entry[1] === "string");
  return Object.fromEntries(entries);
};

export const resolveStyles = (source: unknown): StylesMap => {
  if (source === null || typeof source !== "object") {
    return {};
  }

  const directMap = toStringMap(source as Record<string, unknown>);
  if (Object.keys(directMap).length > 0) {
    return directMap;
  }

  const wrappedDefault = (source as { default?: unknown }).default;
  if (wrappedDefault !== null && typeof wrappedDefault === "object") {
    return toStringMap(wrappedDefault as Record<string, unknown>);
  }

  return {};
};

export const cls = (styles: StylesMap, key: string): string => styles[key] ?? key;

export const createEl = <K extends keyof HTMLElementTagNameMap>(
  doc: Document,
  tag: K,
  className?: string,
  text?: string
): HTMLElementTagNameMap[K] => {
  const element = doc.createElement(tag);
  if (className !== undefined && className.length > 0) {
    element.className = className;
  }
  if (text !== undefined && text.length > 0) {
    element.textContent = text;
  }
  return element;
};

export const buildGuardrailItem = (doc: Document, styles: StylesMap, item: GuardrailItem): HTMLElement => {
  const card = createEl(doc, "li", cls(styles, "guardrailItem"));
  const title = createEl(doc, "h3", cls(styles, "guardrailTitle"), item.title);
  const detail = createEl(doc, "p", cls(styles, "guardrailDetail"), item.detail);
  card.append(title, detail);
  return card;
};

export const buildGuardrailList = (
  doc: Document,
  styles: StylesMap,
  items: ReadonlyArray<GuardrailItem>
): HTMLElement => {
  const section = createEl(doc, "ul", cls(styles, "guardrailList"));
  const cards = items.map((item) => buildGuardrailItem(doc, styles, item));
  section.append(...cards);
  return section;
};

export const buildCommandList = (doc: Document, styles: StylesMap): HTMLElement => {
  const list = createEl(doc, "ul", cls(styles, "commandList"));
  const commands = ["npm run dev", "npm run test", "npm run build"];
  const items = commands.map((command) => createEl(doc, "li", cls(styles, "commandItem"), command));
  list.append(...items);
  return list;
};

export const buildPage = (
  doc: Document,
  styles: StylesMap,
  guardrails: ReadonlyArray<GuardrailItem> = DEFAULT_GUARDRAILS
): HTMLElement => {
  const page = createEl(doc, "div", cls(styles, "page"));
  const ambientGlowOne = createEl(doc, "div", cls(styles, "ambientGlowOne"));
  const ambientGlowTwo = createEl(doc, "div", cls(styles, "ambientGlowTwo"));
  const gridOverlay = createEl(doc, "div", cls(styles, "gridOverlay"));

  const shell = createEl(doc, "div", cls(styles, "contentShell"));
  const leftCol = createEl(doc, "section", cls(styles, "leftCol"));
  const rightCol = createEl(doc, "section", cls(styles, "rightCol"));

  const header = createEl(doc, "header", cls(styles, "header"));
  const pill = createEl(doc, "p", cls(styles, "pill"), "Costrix Starter");
  const title = createEl(doc, "h1", cls(styles, "title"), "Costrix TypeScript Starter");
  const subtitle = createEl(
    doc,
    "p",
    cls(styles, "subtitle"),
    "This template sets up a minimal TypeScript codebase that compiles to vanilla JavaScript with strict quality gates."
  );
  header.append(pill, title, subtitle);

  const guardrailHeading = createEl(doc, "h2", cls(styles, "sectionTitle"), "Build Guardrails");
  const guardrailList = buildGuardrailList(doc, styles, guardrails);
  leftCol.append(header, guardrailHeading, guardrailList);

  const commandsHeading = createEl(doc, "h2", cls(styles, "sectionTitle"), "Available Commands");
  const commandList = buildCommandList(doc, styles);
  const docsButton = createEl(doc, "a", cls(styles, "docsButton"), "Read Costrix Documentation");
  docsButton.setAttribute("href", "https://costrix.kaustubhvats.in");
  docsButton.setAttribute("target", "_blank");
  docsButton.setAttribute("rel", "noopener noreferrer");

  const noteCard = createEl(doc, "div", cls(styles, "noteCard"));
  const noteTitle = createEl(doc, "h3", cls(styles, "noteTitle"), "Ready for real app code");
  const noteText = createEl(
    doc,
    "p",
    cls(styles, "noteText"),
    "Edit src/index.ts, add modules in src/, and keep guardrails on while shipping to dist/."
  );
  noteCard.append(noteTitle, noteText);

  const footer = createEl(
    doc,
    "p",
    cls(styles, "footer"),
    "Start with src/index.ts and build your app. Crafted with care by Kaustubh."
  );
  rightCol.append(commandsHeading, commandList, docsButton, noteCard, footer);

  shell.append(leftCol, rightCol);
  page.append(ambientGlowOne, ambientGlowTwo, gridOverlay, shell);
  return page;
};

export const mountApp = (
  doc: Document = document,
  stylesSource: unknown = stylesImport
): HTMLElement => {
  const styles = resolveStyles(stylesSource);
  const root = createEl(doc, "main", cls(styles, "app"));
  root.setAttribute("data-costrix-root", "true");
  root.append(buildPage(doc, styles));
  doc.body.append(root);
  return root;
};

mountApp();
