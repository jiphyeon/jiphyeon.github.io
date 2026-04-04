const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const blogRoot = path.join(process.cwd(), "content", "blog");

/**
 * 현재 post.html이 fetch("/posts.json")이면 이 경로 유지
 * 만약 fetch("/data/posts.json")이면 아래를 data/posts.json으로 바꾸면 된다.
 */
const outputPath = path.join(process.cwd(), "data", "posts.json");

function walkMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...walkMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      results.push(fullPath);
    }
  }

  return results;
}

function normalizeString(value, fallback = "") {
  if (value === undefined || value === null) return fallback;
  return String(value).trim();
}

function normalizeDate(value) {
  if (!value) return "";
  if (typeof value === "string") {
    return value.trim().replace(/^["']|["']$/g, "");
  }
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return String(value).trim();
}

function normalizeArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  return [String(value).trim()].filter(Boolean);
}

function safeNumber(value, fallback = 999) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function buildPosts() {
  console.log("blogRoot:", blogRoot);

  if (!fs.existsSync(blogRoot)) {
    console.error("blog 폴더를 찾을 수 없습니다.");
    process.exit(1);
  }

  const files = walkMarkdownFiles(blogRoot);
  console.log("md files:", files);

  const posts = files
    .map((fullPath, index) => {
      const raw = fs.readFileSync(fullPath, "utf8");
      const parsed = matter(raw);
      const data = parsed.data || {};

      const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, "/");
      const folderName = path.basename(path.dirname(fullPath));
      const fileName = path.basename(fullPath, ".md");

      const post = {
        id: safeNumber(data.id, index + 1),
        type: "post",
        title: normalizeString(data.title),
        excerpt: normalizeString(data.excerpt),
        category: normalizeString(data.category, folderName),
        tags: normalizeArray(data.tags),
        thumbnail: normalizeString(data.thumbnail),
        date: normalizeDate(data.date),
        slug: normalizeString(data.slug, fileName),
        order: safeNumber(data.order, 999),
        series: normalizeString(data.series, folderName),
        file: relativePath
      };

      console.log("parsed:", post);
      return post;
    })
    .filter((post) => post.title && post.slug);

  posts.sort((a, b) => {
    if (a.series === b.series) {
      if (a.order !== b.order) return a.order - b.order;
      return a.title.localeCompare(b.title, "ko");
    }

    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;
    return bTime - aTime;
  });

  fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2) + "\n", "utf8");

  console.log(`saved: ${outputPath}`);
  console.log(`count: ${posts.length}`);
}

buildPosts();