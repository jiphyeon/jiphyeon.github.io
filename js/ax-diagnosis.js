function fixCatCells() {
  // 기존에 만든 라벨 제거
  document.querySelectorAll(".ax-cat-label").forEach(function(el) { el.remove(); });

  var catCells = document.querySelectorAll("#axTable .ax-cat-cell.cat-first");
  catCells.forEach(function (cell) {
    var text = cell.textContent.trim();
    cell.textContent = "";

    var row = cell.closest("tr");
    if (!row) return;

    var last = row;
    var next = row.nextElementSibling;
    while (next && !next.classList.contains("group-first")) {
      last = next;
      next = next.nextElementSibling;
    }

    var tableRect = document.querySelector("#axTable").getBoundingClientRect();
    var top    = row.getBoundingClientRect().top    - tableRect.top;
    var bottom = last.getBoundingClientRect().bottom - tableRect.top;

    var label = document.createElement("div");
    label.className = "ax-cat-label";
    label.textContent = text;
    label.style.cssText =
  "position:absolute;" +
  "top:" + top + "px;" +
  "height:" + (bottom - top) + "px;" +
  "left:" + cell.offsetLeft + "px;" +
  "width:" + cell.offsetWidth + "px;" +
  "display:flex;align-items:center;justify-content:center;" +
  "font-weight:700;font-size:12px;color:#444;" +
  "pointer-events:none;" +
  "z-index:-1;";

    var wrapper = document.querySelector("#axTable").parentElement;
    wrapper.style.position = "relative";
    wrapper.appendChild(label);
  });
}