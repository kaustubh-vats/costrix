function toPackageName(input) {
  const normalized = String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  return normalized || "my-costrix-app";
}

module.exports = {
  toPackageName
};
