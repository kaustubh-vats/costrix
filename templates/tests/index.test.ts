import type { GuardrailItem } from "../src/index";
import type * as IndexModule from "../src/index";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

const loadModule = async (): Promise<typeof IndexModule> => import("../src/index");

describe("app module", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    jest.resetModules();
  });

  it("mounts by default on import", async () => {
    await loadModule();
    const root = document.querySelector('[data-costrix-root="true"]');
    expect(root).not.toBeNull();
  });

  it("resolves direct style objects and class fallback", async () => {
    const mod = await loadModule();
    const resolved = mod.resolveStyles({ app: "app_hash" });
    expect(mod.cls(resolved, "app")).toBe("app_hash");
    expect(mod.cls(resolved, "missing")).toBe("missing");
  });

  it("resolves wrapped default style objects and invalid input", async () => {
    const mod = await loadModule();
    const wrapped = mod.resolveStyles({ default: { page: "page_hash" } });
    const empty = mod.resolveStyles(null);
    const fallbackEmpty = mod.resolveStyles({ default: 7, page: 1 });
    expect(mod.cls(wrapped, "page")).toBe("page_hash");
    expect(mod.cls(empty, "page")).toBe("page");
    expect(mod.cls(fallbackEmpty, "page")).toBe("page");
  });

  it("creates elements with optional class and text", async () => {
    const mod = await loadModule();
    const withAll = mod.createEl(document, "button", "cta", "Launch");
    const bare = mod.createEl(document, "div");
    expect(withAll.className).toBe("cta");
    expect(withAll.textContent).toBe("Launch");
    expect(bare.className).toBe("");
    expect(bare.textContent).toBe("");
  });

  it("builds guardrail item and list", async () => {
    const mod = await loadModule();
    const styles = mod.resolveStyles({
      guardrailItem: "card",
      guardrailTitle: "cardTitle",
      guardrailDetail: "cardDetail",
      guardrailList: "grid"
    });
    const item: GuardrailItem = { title: "Rule", detail: "Detail" };
    const card = mod.buildGuardrailItem(document, styles, item);
    const grid = mod.buildGuardrailList(document, styles, [item]);
    expect(card.className).toBe("card");
    expect(card.querySelector("h3")?.className).toBe("cardTitle");
    expect(card.querySelector("p")?.className).toBe("cardDetail");
    expect(grid.className).toBe("grid");
    expect(grid.querySelectorAll("li").length).toBe(1);
  });

  it("builds command list", async () => {
    const mod = await loadModule();
    const styles = mod.resolveStyles({ commandList: "commands", commandItem: "command" });
    const list = mod.buildCommandList(document, styles);
    expect(list.className).toBe("commands");
    expect(list.querySelectorAll("li").length).toBe(3);
  });

  it("builds page and mounts with provided styles", async () => {
    const mod = await loadModule();
    const styles = mod.resolveStyles({
      app: "appHash",
      page: "pageHash",
      header: "headerHash",
      title: "titleHash",
      subtitle: "subtitleHash",
      sectionTitle: "sectionTitleHash",
      guardrailList: "guardrailListHash",
      guardrailItem: "guardrailItemHash",
      guardrailTitle: "guardrailTitleHash",
      guardrailDetail: "guardrailDetailHash",
      commandList: "commandListHash",
      commandItem: "commandItemHash",
      docsButton: "docsButtonHash",
      footer: "footerHash"
    });
    const page = mod.buildPage(document, styles);
    expect(page.className).toBe("pageHash");
    expect(page.querySelector("h1")?.textContent).toBe("Costrix TypeScript Starter");
    expect(page.querySelector('a[href="https://costrix.kaustubhvats.in"]')?.className).toBe("docsButtonHash");

    const defaultPage = mod.buildPage(document, styles);
    expect(defaultPage.querySelectorAll("li").length).toBeGreaterThan(3);

    document.body.innerHTML = "";
    const mounted = mod.mountApp(document, styles);
    expect(mounted.className).toBe("appHash");
    expect(document.querySelectorAll('[data-costrix-root="true"]').length).toBe(1);
  });
});
