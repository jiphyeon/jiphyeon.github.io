<script>
        const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");

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

    const sidebarThumbnailList = Array.from({ length: 24 }, (_, i) => {
      return `/images/shapes/shape-${i + 1}.svg`;
    });

    const contentThumbnailCache = new Map();
    const postFrontMatterCache = new Map();

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function shuffleArray(array = []) {
      const copied = [...array];

      for (let i = copied.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copied[i], copied[j]] = [copied[j], copied[i]];
      }

      return copied;
    }

    function getRandomSidebarThumbnailPool(count = 0) {
      if (count <= 0) return [];

      const shuffled = shuffleArray(sidebarThumbnailList);
      const result = [];

      for (let i = 0; i < count; i += 1) {
        result.push(shuffled[i % shuffled.length]);
      }

      return result;
    }

    function normalizeAssetUrl(url = "") {
  const trimmed = String(url || "")
    .trim()
    .replace(/^["']+|["']+$/g, "");

  if (!trimmed) return "";

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("//") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  return `/${trimmed.replace(/^\.?\//, "")}`;
}

    function getThumbnailMode(post = {}, frontMatter = {}) {
      return String(
        frontMatter.thumbnailMode ||
        post.thumbnailMode ||
        "random"
      )
        .trim()
        .replace(/^['"]|['"]$/g, "")
        .toLowerCase();
    }

    function extractFirstImageFromMarkdown(markdownContent = "") {
      const imageMatch = markdownContent.match(/!\[[^\]]*\]\((?:<)?([^)\s>]+)(?:>)?(?:\s+["'][^"']*["'])?\)/);

      if (!imageMatch || !imageMatch[1]) {
        return "";
      }

      return normalizeAssetUrl(imageMatch[1]);
    }

    async function getPostMarkdownData(post) {
      const cacheKey = post.slug || post.file || post.title || "";

      if (postFrontMatterCache.has(cacheKey)) {
        return postFrontMatterCache.get(cacheKey);
      }

      try {
        const markdownResponse = await fetch(`/${post.file}`, {
          cache: "no-store"
        });

        if (!markdownResponse.ok) {
          throw new Error("Markdown 로드 실패");
        }

        const markdown = await markdownResponse.text();
        const parsed = parseFrontMatter(markdown);

        postFrontMatterCache.set(cacheKey, parsed);
        return parsed;
      } catch (error) {
        const fallback = { data: {}, content: "" };
        postFrontMatterCache.set(cacheKey, fallback);
        return fallback;
      }
    }

    async function getContentThumbnailUrl(post) {
      const cacheKey = post.slug || post.file || post.title || "";

      if (contentThumbnailCache.has(cacheKey)) {
        return contentThumbnailCache.get(cacheKey);
      }

      const { data: frontMatter, content } = await getPostMarkdownData(post);

      const firstContentImage = extractFirstImageFromMarkdown(content);
const postThumbnail = normalizeAssetUrl(post.thumbnail || "");
const frontMatterThumbnail = normalizeAssetUrl(frontMatter.thumbnail || "");

// thumbnail이 있으면 우선 사용, 없으면 본문 첫 이미지 사용
const resolvedThumbnail = frontMatterThumbnail || postThumbnail || firstContentImage || "";

      contentThumbnailCache.set(cacheKey, resolvedThumbnail);
      return resolvedThumbnail;
    }

    async function getThumbnailByMode(post, randomThumbnailUrl = "") {
      const { data: frontMatter } = await getPostMarkdownData(post);
      const mode = getThumbnailMode(post, frontMatter);

      if (mode === "content") {
        const contentThumbnail = await getContentThumbnailUrl(post);
        return contentThumbnail || randomThumbnailUrl;
      }

      return randomThumbnailUrl;
    }

    function isPublishedPost(post = {}) {
      return (post.status || "published") === "published";
    }

    function setHeroBackground(heroBgEl, post) {
      const seed = encodeURIComponent(post.slug || post.title || "jiphyeon");
      const heroImageUrl = `https://picsum.photos/seed/${seed}/1800/1200`;

      heroBgEl.style.display = "block";
      heroBgEl.innerHTML = `<img src="${heroImageUrl}" alt="">`;
    }

    function bindContentImageLightbox() {
      const lightbox = document.getElementById("image-lightbox");
      const lightboxImg = document.getElementById("image-lightbox-img");
      const closeBtn = document.getElementById("image-lightbox-close");

      if (!lightbox || !lightboxImg || !closeBtn) return;

      const contentImages = document.querySelectorAll(".content img");

      function openLightbox(img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "";
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }

      function closeLightbox() {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImg.src = "";
        lightboxImg.alt = "";
        document.body.style.overflow = "";
      }

      contentImages.forEach((img) => {
        img.style.cursor = "zoom-in";
        img.onclick = () => openLightbox(img);
      });

      closeBtn.onclick = closeLightbox;

      lightbox.onclick = (event) => {
        if (event.target === lightbox) {
          closeLightbox();
        }
      };

      document.onkeydown = (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
          closeLightbox();
        }
      };
    }

    function bindHeroScrollInteraction() {
      const stickyHeaderEl = document.getElementById("stickyHeader");
      if (!stickyHeaderEl) return;

      let ticking = false;

      function getFadeDistance() {
        return window.innerWidth <= 768 ? 120 : 170;
      }

      function applyHeroState() {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const fadeDistance = getFadeDistance();
        const progress = clamp(scrollY / fadeDistance, 0, 1);
        const isSticky = scrollY >= fadeDistance - 6;

        document.documentElement.style.setProperty(
          "--hero-progress",
          progress.toFixed(4)
        );

        document.body.classList.toggle(
          "hero-condensed",
          scrollY > 24 && !isSticky
        );
        document.body.classList.toggle("sticky-active", isSticky);
        stickyHeaderEl.setAttribute("aria-hidden", isSticky ? "false" : "true");

        ticking = false;
      }

      function requestApplyHeroState() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(applyHeroState);
      }

      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      applyHeroState();

      window.addEventListener("scroll", requestApplyHeroState, { passive: true });
      window.addEventListener("resize", requestApplyHeroState);
      window.addEventListener("orientationchange", requestApplyHeroState);
      window.addEventListener("pageshow", requestApplyHeroState);
      window.addEventListener("load", requestApplyHeroState);
    }

    function buildRelatedCard(post, currentSlug, thumbnailUrl, mode = "random") {
      const isCurrent =
        (post.slug || "").trim().toLowerCase() ===
        (currentSlug || "").trim().toLowerCase();

      const thumbHtml =
        mode === "content"
          ? `
            <div class="related-thumb content-thumb">
              <img
                class="related-thumb-image content-image"
                src="${escapeHtml(thumbnailUrl || "")}"
                alt=""
                loading="lazy"
                decoding="async"
              >
            </div>
          `
          : `
            <div class="related-thumb">
              <div class="related-thumb-frame">
                <img
                  class="related-thumb-image"
                  src="${escapeHtml(thumbnailUrl || "")}"
                  alt=""
                  loading="lazy"
                  decoding="async"
                >
              </div>
            </div>
          `;

      return `
        <a class="related-card${mode === "content" ? " is-content" : ""}${isCurrent ? " is-current" : ""}" href="/post.html?slug=${encodeURIComponent(post.slug || "")}">
          ${thumbHtml}
          <div class="related-card-body">
            <p class="related-card-post-title">${escapeHtml(post.title || "")}</p>
            <div class="related-date">${escapeHtml(post.date || "")}</div>
          </div>
        </a>
      `;
    }

    async function renderRelatedPosts(posts, currentPost) {
      const relatedSidebarEl = document.getElementById("relatedSidebar");
      const relatedListEl = document.getElementById("relatedList");
      const relatedTitleEl = document.getElementById("relatedTitle");

      if (!relatedSidebarEl || !relatedListEl || !relatedTitleEl || !currentPost) {
        return;
      }

      const currentCategory = currentPost.category || currentPost.categoryLabel || "";

      if (!currentCategory) {
        relatedSidebarEl.classList.add("is-hidden");
        relatedTitleEl.textContent = "";
        relatedListEl.innerHTML = "";
        return;
      }

      const sameCategoryPosts = posts.filter((item) => {
        const itemCategory = item.category || item.categoryLabel || "";
        return itemCategory === currentCategory && isPublishedPost(item);
      });

     if (sameCategoryPosts.length === 0) {
  relatedSidebarEl.classList.add("is-hidden");
  relatedTitleEl.textContent = "";
  relatedListEl.innerHTML = "";
  return;
}

      relatedSidebarEl.classList.remove("is-hidden");
      relatedTitleEl.textContent = currentCategory;

      const randomThumbnailPool = getRandomSidebarThumbnailPool(sameCategoryPosts.length);

      const thumbnailPool = await Promise.all(
        sameCategoryPosts.map((item, index) => {
          return getThumbnailByMode(item, randomThumbnailPool[index]);
        })
      );

      const cards = await Promise.all(
        sameCategoryPosts.map((item, index) =>
          getPostMarkdownData(item).then(({ data }) => {
            const mode = getThumbnailMode(item, data);
            return buildRelatedCard(item, currentPost.slug, thumbnailPool[index], mode);
          })
        )
      );

      relatedListEl.innerHTML = cards.join("");
    }

    const md = window.markdownit({
       breaks: false,
  html: true,
  linkify: true,
  typographer: true
    });

    async function initializePostPage() {
      const titleEl = document.getElementById("title");
      const metaEl = document.getElementById("meta");
      const contentEl = document.getElementById("content");
      const categoryEl = document.getElementById("category");
      const heroBgEl = document.getElementById("heroBg");
      const stickyTitleEl = document.getElementById("stickyTitle");

      if (!slug) {
        titleEl.textContent = "잘못된 접근";
        contentEl.innerHTML = '<p class="error">slug 값이 없습니다.</p>';
        if (stickyTitleEl) stickyTitleEl.textContent = "";
        return;
      }

      try {
        const postResponse = await fetch("/data/posts.json", { cache: "no-store" });
        if (!postResponse.ok) throw new Error("posts.json 로드 실패");

        const posts = await postResponse.json();
        const post = posts.find((item) => item.slug === slug);

        if (!post) {
          titleEl.textContent = "게시물을 찾을 수 없음";
          contentEl.innerHTML = '<p class="error">해당 게시물을 찾을 수 없습니다.</p>';
          if (stickyTitleEl) stickyTitleEl.textContent = "";
          return;
        }

        document.title = post.title || "Post";
        titleEl.textContent = post.title || "";
        if (stickyTitleEl) {
          stickyTitleEl.textContent = post.title || "";
        }
        metaEl.textContent = "";

        if (post.category || post.categoryLabel) {
          const currentCategoryName = post.categoryLabel || post.category;
          categoryEl.style.display = "inline-flex";
          categoryEl.textContent = currentCategoryName;
        }

        setHeroBackground(heroBgEl, post);

        const markdownResponse = await fetch(`/${post.file}`, {
          cache: "no-store"
        });

        if (!markdownResponse.ok) throw new Error("Markdown 로드 실패");

        const markdown = await markdownResponse.text();
        const { data: frontMatter, content: cleanedMarkdown } = parseFrontMatter(markdown);

        metaEl.textContent = frontMatter.date || post.date || "";
        contentEl.innerHTML = md.render(cleanedMarkdown);

        await renderRelatedPosts(posts, post);
        bindContentImageLightbox();

        requestAnimationFrame(() => {
          window.dispatchEvent(new Event("resize"));
        });
      } catch (error) {
        console.error(error);
        titleEl.textContent = "불러오기 실패";
        contentEl.innerHTML = '<p class="error">본문을 불러오지 못했습니다.</p>';
        if (stickyTitleEl) stickyTitleEl.textContent = "";
      }
    }

    bindHeroScrollInteraction();
    initializePostPage();
  </script>