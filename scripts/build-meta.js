const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const booksRoot = path.join(process.cwd(), "content", "books");

function normalizeQuotes(value = "") {
  return String(value)
    .replace(/[“”]/g, "\"")
    .replace(/[‘’]/g, "'")
    .trim();
}

function stripWrappingQuotes(value = "") {
  return String(value).replace(/^["']+|["']+$/g, "").trim();
}

function normalizeString(value, fallback = "") {
  if (value === undefined || value === null) return fallback;
  return stripWrappingQuotes(normalizeQuotes(value));
}

function normalizeStatus(value, fallback = "published") {
  const normalized = String(value || fallback)
    .replace(/[“”]/g, "\"")
    .replace(/[‘’]/g, "'")
    .replace(/^["']+|["']+$/g, "")
    .toLowerCase()
    .trim();

  if (normalized.includes("draft")) return "draft";
  if (normalized.includes("published")) return "published";
  if (normalized.includes("hidden")) return "hidden";

  return fallback;
}

function safeNumber(value, fallback = 999) {
  const n = Number(normalizeString(value));
  return Number.isFinite(n) ? n : fallback;
}

function walkMarkdownFiles(dir, baseDir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith(".")) return;
      results.push(...walkMarkdownFiles(fullPath, baseDir));
      return;
    }

    if (!entry.isFile()) return;
    if (!entry.name.toLowerCase().endsWith(".md")) return;

    const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
    results.push(relativePath);
  });

  return results;
}

function buildBookMeta(bookId) {
  const bookDir = path.join(booksRoot, bookId);

  if (!fs.existsSync(bookDir) || !fs.statSync(bookDir).isDirectory()) {
    return;
  }

  let existingMeta = {};
  const metaPath = path.join(bookDir, "meta.json");

  if (fs.existsSync(metaPath)) {
    try {
      existingMeta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    } catch (error) {
      console.warn(`meta.json 읽기 실패: ${metaPath}`);
    }
  }

  const files = walkMarkdownFiles(bookDir, bookDir);

  console.log(`\n[${bookId}] md files:`, files);

  const docs = files
    .map((file) => {
      const fullPath = path.join(bookDir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const parsed = matter(raw);
      const data = parsed.data || {};

      const filename = path.basename(file);

      const doc = {
        title: normalizeString(data.title),
        slug: normalizeString(data.slug, filename.replace(/\.md$/i, "")),
        part: normalizeString(data.part, "기타"),
        partOrder: safeNumber(data.partOrder, 999),
        order: safeNumber(data.order, 999),
        status: normalizeStatus(data.status, "published"),
        file
      };

      console.log(`parsed: ${file}`, doc);
      return doc;
    })
    .filter((doc) => doc.title && doc.slug);

  const structureMap = new Map();

  docs.forEach((doc) => {
    const normalizedPart = normalizeString(doc.part, "기타");
    const isOverview = normalizedPart.toLowerCase() === "overview";
    const sectionType = isOverview ? "overview" : "part";
    const sectionTitle = isOverview ? "Overview" : normalizedPart;
    const sectionKey = `${sectionType}::${sectionTitle}`;

    if (!structureMap.has(sectionKey)) {
      structureMap.set(sectionKey, {
        type: sectionType,
        title: sectionTitle,
        partOrder: doc.partOrder,
        items: []
      });
    }

    const section = structureMap.get(sectionKey);

    if (doc.partOrder < section.partOrder) {
      section.partOrder = doc.partOrder;
    }

    section.items.push(doc);
  });

  const structure = Array.from(structureMap.values())
    .sort((a, b) => {
      if (a.partOrder !== b.partOrder) {
        return a.partOrder - b.partOrder;
      }

      if (a.type !== b.type) {
        if (a.type === "overview") return -1;
        if (b.type === "overview") return 1;
      }

      return a.title.localeCompare(b.title, "ko");
    })
    .map((section) => {
      section.items.sort((a, b) => {
        if (a.order !== b.order) {
          return a.order - b.order;
        }

        return a.title.localeCompare(b.title, "ko");
      });

      return {
        type: section.type,
        title: section.title,
        items: section.items.map((doc) => ({
          title: doc.title,
          slug: doc.slug,
          file: doc.file,
          status: doc.status
        }))
      };
    });

  const meta = {
    id: bookId,
    title: normalizeString(existingMeta.title, bookId),
    description: normalizeString(existingMeta.description, ""),
    structure
  };

  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n", "utf8");

  console.log(`완료: ${bookId}`);
  console.log(`saved: ${metaPath}`);
}

if (!fs.existsSync(booksRoot)) {
  console.error("content/books 폴더를 찾을 수 없습니다.");
  process.exit(1);
}

const bookIds = fs
  .readdirSync(booksRoot)
  .filter((name) => {
    const fullPath = path.join(booksRoot, name);
    return fs.statSync(fullPath).isDirectory();
  });

if (bookIds.length === 0) {
  console.error("books 폴더 안에 책 디렉터리가 없습니다.");
  process.exit(1);
}

bookIds.forEach(buildBookMeta);