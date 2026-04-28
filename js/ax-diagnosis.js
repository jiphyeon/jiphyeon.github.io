function fixCatCells() {
  var table = document.querySelector("#axTable");
  if (!table) return;

  table.querySelectorAll(".ax-cat-cell").forEach(function(cell) {
    cell.style.borderTop    = "none";
    cell.style.borderBottom = "none";
    cell.style.verticalAlign = "middle";
  });

  var groups = [
    { label: "필요성", first: 0, last: 9  },
    { label: "기회",   first: 10, last: 19 },
    { label: "준비도", first: 20, last: 29 }
  ];

  var rows = table.querySelectorAll("tbody tr");

groups.forEach(function(g) {
    for (var i = g.first; i <= g.last; i++) {
      var cell = rows[i] && rows[i].querySelector(".ax-cat-cell");
      if (!cell) continue;
      cell.textContent = (i === g.first) ? g.label : "";
      if (i === g.first) cell.style.borderTop    = "2px solid #ccc";
      if (i === g.last)  cell.style.borderBottom = (g.last === 29) ? "2px solid #222" : "2px solid #ccc";
    }
  });
}

window.addEventListener("resize", fixCatCells);

document.addEventListener("click", function (event) {
  if (event.target.id === "axCalcBtn") {
    var table = document.querySelector("#axTable");
    var resultBox = document.querySelector("#axResult");
    var errorBox = document.querySelector("#axError");
    if (!table || !resultBox || !errorBox) return;

    var total = 0;
    var unanswered = [];

    for (var i = 1; i <= 30; i++) {
      var checked = table.querySelector('input[name="q' + i + '"]:checked');
      if (!checked) {
        unanswered.push(i);
        continue;
      }
      if (checked.value === "1") {
        var row = checked.closest("tr");
        var weightCell = row.querySelector("[data-w]");
        if (weightCell) total += parseInt(weightCell.dataset.w, 10);
      }
    }

    if (unanswered.length > 0) {
      errorBox.innerHTML = "선택하지 않은 항목이 있습니다: " + unanswered.join(", ") + "번";
      resultBox.innerHTML = "";
      return;
    }

    errorBox.innerHTML = "";

    var type, desc;
    if      (total <= 39) { type = "탐색 학습형";  desc = "전환 개념이 내부에 형성되지 않은 초기 단계로 기술 도입보다 사고 전환이 우선되어야 한다."; }
    else if (total <= 59) { type = "준비 기반형";  desc = "전환의 필요성은 인식하지만 실행을 위한 데이터, 시스템, 인력, 리더십 기반이 부족한 상태로 기반 정비가 우선이다."; }
    else if (total <= 74) { type = "부서 파일럿형"; desc = "일부 부서 수준에서는 실험적인 전환이 가능한 상태로 작은 성공 사례를 빠르게 만들고 운영 전환을 검증하는 것이 중요하다."; }
    else if (total <= 89) { type = "핵심 전환형";  desc = "핵심 기능이나 부서에서 전환을 본격적으로 추진할 수 있으며, 향후 전사적인 AI 전략을 재설계하는 단계다."; }
    else                  { type = "전사 확장형";  desc = "모든 업무를 AI 중심으로 전환할 수 있는 상태로 전사적으로 AI 중심 체계를 확산시키는 것이 핵심이다."; }

    resultBox.innerHTML =
      "<b>총점:</b> " + total + "점<br>" +
      "<b>AX 방향:</b> " + type + "<br>" +
      desc;
  }

  if (event.target.id === "axResetBtn") {
    document.querySelectorAll("#axTable input[type='radio']").forEach(function(input) {
      input.checked = false;
    });
    var resultBox = document.querySelector("#axResult");
    var errorBox  = document.querySelector("#axError");
    if (resultBox) resultBox.innerHTML = "";
    if (errorBox)  errorBox.innerHTML  = "";
  }
});