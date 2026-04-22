function parseFrontMatter(markdown = "") {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);

  if (!match) {
    return { data: {}, content: markdown };
  }

  const raw = match[1];
  const content = markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, "");
  const data = {};

  raw.split("\n").forEach((line) => {
    const index = line.indexOf(":");
    if (index === -1) return;

    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    data[key] = value;
  });

  return { data, content };
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
console.log("common.js loaded", typeof parseFrontMatter, typeof escapeHtml);