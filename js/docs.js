const params = new URLSearchParams(window.location.search);
const book = params.get("book");
const chapter = params.get("chapter");

function parseFrontMatter(markdown = "") {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);

  if (!match) {
    return { data: {}, content: markdown };
  }

  const raw = match[1];
  const content = markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, "");
  const data = {};

  raw.split("\n").forEach(line => {
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

function flattenDocs(structure = []) {
  const docs = [];

  structure.forEach((group, groupIndex) => {
    const items = Array.isArray(group.items) ? group.items : [];

    items.forEach((item, itemIndex) => {
      docs.push({
        ...item,
        _groupTitle: group.title || "",
        _groupIndex: groupIndex,
        _itemIndex: itemIndex
      });
    });
  });

  return docs;
}

function isPublishedDoc(item = {}) {
  return (item.status || "published") === "published";
}

function renderToc(structure = [], currentSlug = "", currentBook = "") {
  const tocEl = document.getElementById("toc");
  if (!tocEl) return;

  tocEl.innerHTML = (structure || []).map(group => {
    const items = (Array.isArray(group.items) ? group.items : []).filter(isPublishedDoc);

    if (!items.length) {
      return "";
    }

    const groupTitle = group.title
      ? `<div class="toc-group-title">${escapeHtml(group.title)}</div>`
      : "";

    const links = items.map(item => `
      <a href="/docs.html?book=${encodeURIComponent(currentBook)}&chapter=${encodeURIComponent(item.slug)}"
         class="${item.slug === currentSlug ? "active" : ""}"
         ${item.slug === currentSlug ? 'aria-current="page"' : ""}>
        ${escapeHtml(item.title || "")}
      </a>
    `).join("");

    return `
      <div class="toc-group">
        ${groupTitle}
        ${links}
      </div>
    `;
  }).join("");
}

function setupNavigation(list, current, currentBook) {
  const index = list.findIndex(item => item.slug === current.slug);

  const prev = list[index - 1];
  const next = list[index + 1];

  const prevWrap = document.getElementById("prevWrap");
  const nextWrap = document.getElementById("nextWrap");

  if (prevWrap) {
    if (prev) {
      prevWrap.style.display = "block";
      prevWrap.className = "";
      prevWrap.innerHTML = `
        <a href="/docs.html?book=${encodeURIComponent(currentBook)}&chapter=${encodeURIComponent(prev.slug)}">
          <span class="nav-label">이전</span>
          <span class="nav-title">← ${escapeHtml(prev.title)}</span>
        </a>
      `;
    } else {
      prevWrap.style.display = "block";
      prevWrap.className = "nav-placeholder";
      prevWrap.innerHTML = "";
    }
  }

  if (nextWrap) {
    if (next) {
      nextWrap.style.display = "block";
      nextWrap.className = "doc-nav-next";
      nextWrap.innerHTML = `
        <a href="/docs.html?book=${encodeURIComponent(currentBook)}&chapter=${encodeURIComponent(next.slug)}" class="doc-nav-next">
          <span class="nav-label">다음</span>
          <span class="nav-title">${escapeHtml(next.title)} →</span>
        </a>
      `;
    } else {
      nextWrap.style.display = "block";
      nextWrap.className = "nav-placeholder";
      nextWrap.innerHTML = "";
    }
  }
}

function applyReferenceHeadingStyle(contentEl) {
  contentEl.querySelectorAll("p, li").forEach((el) => {
    const text = el.textContent.trim().replace(/\s+/g, "");
    if (text.includes("참고자료")) {
      el.classList.add("reference-heading");
    }
  });
}

function setupContentImageLightbox(contentEl) {
  if (!contentEl) return;

  contentEl.querySelectorAll("img").forEach((img) => {
    img.style.cursor = "zoom-in";

    img.addEventListener("click", () => {
      const lightbox = document.getElementById("image-lightbox");
      const lightboxImg = document.getElementById("image-lightbox-img");

      if (!lightbox || !lightboxImg) return;

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "";

      lightbox.classList.add("is-active");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
}

function setupLightboxClose() {
  document.addEventListener("click", (event) => {
    const lightbox = document.getElementById("image-lightbox");
    const lightboxImg = document.getElementById("image-lightbox-img");

    if (!lightbox || !lightboxImg) return;

    const isBackdrop = event.target.id === "image-lightbox";
    const isCloseButton = event.target.id === "image-lightbox-close";

    if (!isBackdrop && !isCloseButton) return;

    lightbox.classList.remove("is-active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    lightboxImg.alt = "";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const lightbox = document.getElementById("image-lightbox");
    const lightboxImg = document.getElementById("image-lightbox-img");

    if (!lightbox || !lightboxImg) return;

    lightbox.classList.remove("is-active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    lightboxImg.alt = "";
  });
}

const md = window.markdownit({
  breaks: false,
  html: true,
  linkify: true,
  typographer: true
});

async function initializeDocsPage() {
  const titleEl = document.getElementById("title");
  const metaEl = document.getElementById("meta");
  const contentEl = document.getElementById("content");
  const categoryEl = document.getElementById("category");
  const seriesTitleEl = document.getElementById("seriesTitle");

  if (!book) {
    titleEl.textContent = "잘못된 접근";
    contentEl.innerHTML = '<p class="error">book 값이 없습니다.</p>';
    return;
  }

  try {
    const response = await fetch(`/content/books/${encodeURIComponent(book)}/meta.json`, { cache: "no-store" });
    if (!response.ok) throw new Error("meta.json 로드 실패");

    const meta = await response.json();
    const structure = Array.isArray(meta.structure) ? meta.structure : [];
    const docs = flattenDocs(structure);
    const publishedDocs = docs.filter(isPublishedDoc);

    seriesTitleEl.textContent = meta.title || "문서";

    if (!docs.length) {
      titleEl.textContent = "문서를 찾을 수 없음";
      contentEl.innerHTML = '<p class="error">챕터가 없습니다.</p>';
      return;
    }

    const current = docs.find(item => item.slug === chapter) || publishedDocs[0] || docs[0];

    renderToc(structure, current.slug, book);

    document.title = `${current.title || "Docs"} | ${meta.title || "Jiphyeon"}`;
    titleEl.textContent = current.title || "";
    categoryEl.textContent = current._groupTitle || meta.category || "문서";
    metaEl.textContent = "";

    const markdownResponse = await fetch(
      `/content/books/${encodeURIComponent(book)}/${encodeURIComponent(current.file)}`,
      { cache: "no-store" }
    );

    if (!markdownResponse.ok) throw new Error("Markdown 로드 실패");

    const markdown = await markdownResponse.text();
    const { data: frontMatter, content: cleanedMarkdown } = parseFrontMatter(markdown);

    metaEl.textContent = frontMatter.date || "";
    contentEl.innerHTML = md.render(cleanedMarkdown);

    applyReferenceHeadingStyle(contentEl);
    setupContentImageLightbox(contentEl);

    const navDocs = isPublishedDoc(current) ? publishedDocs : docs;
    setupNavigation(navDocs, current, book);
  } catch (error) {
    console.error(error);
    titleEl.textContent = "불러오기 실패";
    contentEl.innerHTML = `<p class="error">${escapeHtml(error.message || "본문을 불러오지 못했습니다.")}</p>`;
  }
}

setupLightboxClose();
initializeDocsPage();