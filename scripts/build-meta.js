const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

let existingMeta = {};

const metaPath = path.join(bookDir, "meta.json");

if (fs.existsSync(metaPath)) {
  existingMeta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
}

const booksRoot = path.join(process.cwd(), "content", "books");

function buildBookMeta(bookId) {
  const bookDir = path.join(booksRoot, bookId);

  if (!fs.existsSync(bookDir) || !fs.statSync(bookDir).isDirectory()) {
    return;
  }

  const files = fs
    .readdirSync(bookDir)
    .filter((file) => file.endsWith(".md"));

  console.log(`\n[${bookId}] md files:`, files);

  const docs = files
    .map((file) => {
      const fullPath = path.join(bookDir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const parsed = matter(raw);
      const data = parsed.data || {};

      console.log(`parsed: ${file}`, data);

      return {
        title: data.title || "",
        slug: data.slug || file.replace(/\.md$/, ""),
        part: data.part || "기타",
        order: Number(data.order || 999),
        file
      };
    })
    .filter((doc) => doc.title && doc.slug);

  const structureMap = new Map();

  docs.forEach((doc) => {
    const normalizedPart = String(doc.part).trim();
    const sectionType = normalizedPart === "Overview" ? "overview" : "part";
    const sectionKey = `${sectionType}::${normalizedPart}`;

    if (!structureMap.has(sectionKey)) {
      structureMap.set(sectionKey, {
        type: sectionType,
        title: normalizedPart,
        items: []
      });
    }

    structureMap.get(sectionKey).items.push(doc);
  });

  const structure = Array.from(structureMap.values()).map((section) => {
    section.items.sort((a, b) => a.order - b.order);

    return {
      type: section.type,
      title: section.title,
      items: section.items.map((doc) => ({
        title: doc.title,
        slug: doc.slug,
        file: doc.file
      }))
    };
  });

  const meta = {
  id: bookId,
  title: existingMeta.title || bookId,
  description: existingMeta.description || "",
  structure
};

  const metaPath = path.join(bookDir, "meta.json");
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