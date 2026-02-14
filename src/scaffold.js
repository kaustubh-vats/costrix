const fs = require("fs");
const path = require("path");
const { logWarn, logStep } = require("./logger");
const { toPackageName } = require("./utils");

const TEMPLATE_ROOT = path.resolve(__dirname, "..", "templates");

function ensureDirForFile(filePath) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
}

function writeTextFileSafe(targetPath, content) {
  if (fs.existsSync(targetPath)) {
    return false;
  }

  ensureDirForFile(targetPath);
  fs.writeFileSync(targetPath, content, "utf8");
  return true;
}

function copyFileSafe(sourcePath, targetPath) {
  if (fs.existsSync(targetPath)) {
    return false;
  }

  ensureDirForFile(targetPath);
  fs.copyFileSync(sourcePath, targetPath);
  return true;
}

function renderFile(relativePath, sourceContent, appName) {
  if (relativePath === "package.json") {
    const parsed = JSON.parse(sourceContent);
    parsed.name = toPackageName(appName);
    return `${JSON.stringify(parsed, null, 2)}\n`;
  }

  return sourceContent;
}

function copyTemplateDir(templateDir, projectDir, appName, rootTemplateDir) {
  const entries = fs.readdirSync(templateDir, { withFileTypes: true });

  entries.forEach((entry) => {
    const sourcePath = path.join(templateDir, entry.name);
    const relativePath = path.relative(rootTemplateDir, sourcePath);
    const normalizedRelativePath = relativePath.replace(/\\/g, "/");
    const outputRelativePath =
      normalizedRelativePath === "gitignore" ? ".gitignore" : normalizedRelativePath;
    const targetPath = path.join(projectDir, outputRelativePath);

    if (entry.isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      copyTemplateDir(sourcePath, projectDir, appName, rootTemplateDir);
      return;
    }

    let created = false;
    if (normalizedRelativePath === "package.json") {
      const rawContent = fs.readFileSync(sourcePath, "utf8");
      const content = renderFile(normalizedRelativePath, rawContent, appName);
      created = writeTextFileSafe(targetPath, content);
    } else {
      created = copyFileSafe(sourcePath, targetPath);
    }

    if (created) {
      logStep(`Created ${outputRelativePath}`);
      return;
    }

    logWarn(`Skipped ${outputRelativePath} (already exists)`);
  });
}

function scaffoldProject(projectDir, appName) {
  fs.mkdirSync(projectDir, { recursive: true });
  copyTemplateDir(TEMPLATE_ROOT, projectDir, appName, TEMPLATE_ROOT);
}

module.exports = {
  scaffoldProject
};
