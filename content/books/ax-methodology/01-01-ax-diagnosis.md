<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
/* --- 기본 PC 스타일 --- */
.ax-table-wrapper {
  width: 100%;
  margin: 20px 0;
}

.ax-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto; /* 내용에 따라 유연하게 조절 */
  font-size: 14px;
  line-height: 1.5;
}

.ax-table th, .ax-table td {
  border-bottom: 1px solid #ddd;
  padding: 12px 8px;
  text-align: center;
}

.ax-table th {
  background: #f5f5f5;
  border-top: 2px solid #333;
  font-weight: 700;
}

/* 열 너비 최적화 (PC) */
.ax-table th:nth-child(1) { width: 50px; } /* 번호 */
.ax-table th:nth-child(2) { width: 80px; } /* 구분 */
.ax-table th:nth-child(4) { width: 60px; } /* 가중치 */
.ax-table th:nth-child(5), .ax-table th:nth-child(6) { width: 60px; } /* 예/아니오 */

.ax-category { font-weight: 700; background: #fafafa; }
.ax-item { text-align: left !important; }
.ax-question { font-weight: 800; margin-bottom: 4px; color: #111; }
.ax-description { font-size: 13px; color: #666; }

/* 선택 셀 스타일 */
.ax-choice-cell { cursor: pointer; }
.ax-choice-cell label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* --- 모바일 반응형 핵심 (가로 스크롤 제거 버전) --- */
@media (max-width: 768px) {
  /* 테이블 구조 해제 */
  .ax-table, .ax-table thead, .ax-table tbody, .ax-table tr, .ax-table td {
    display: block;
    width: 100% !important;
  }

  /* 헤더 숨기기 */
  .ax-table thead { display: none; }

  /* 각 문항을 카드 형태로 변경 */
  .ax-table tr {
    border: 1px solid #eee;
    border-radius: 10px;
    margin-bottom: 16px;
    padding: 12px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }

  /* 번호/구분 열은 모바일에서 숨겨서 공간 확보 */
  .ax-table td:nth-child(1), .ax-table td:nth-child(2) { display: none; }

  /* 진단 항목(텍스트)을 가장 넓게 배치 */
  .ax-table td.ax-item {
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 10px;
    padding: 0 0 12px 0 !important;
  }

  /* 가중치, 예, 아니오 버튼을 하단에 가로로 나열 */
  .ax-table td[data-w], .ax-table td.ax-choice-cell {
    display: inline-flex !important;
    width: 32% !important; /* 3분할 */
    border: none !important;
    padding: 8px 0 !important;
    justify-content: center;
    align-items: center;
    font-size: 13px;
  }

  /* 가중치 라벨 추가 */
  .ax-table td[data-w]::before {
    content: "가중치 ";
    font-size: 11px;
    color: #999;
    margin-right: 4px;
  }

  /* 예/아니오 라벨 추가 (라디오 버튼 옆에 글자 생성) */
  .ax-table td.ax-choice-cell:nth-child(5)::after { content: " 예"; margin-left: 6px; font-weight: 600; }
  .ax-table td.ax-choice-cell:nth-child(6)::after { content: " 아니오"; margin-left: 6px; font-weight: 600; }
}

/* 버튼 스타일 */
.ax-actions { margin-top: 20px; display: flex; gap: 10px; }
.ax-btn { padding: 12px 20px; border-radius: 8px; border: 0; cursor: pointer; font-weight: 600; }
.ax-btn-primary { background: #111; color: #fff; }
.ax-btn-secondary { background: #eee; color: #111; }
</style>
</head>
<body>

<div class="ax-table-wrapper">
  <table class="ax-table" id="axTable">
    <thead>
      <tr>
        <th>번호</th>
        <th>구분</th>
        <th>진단 항목</th>
        <th>가중치</th>
        <th>예</th>
        <th>아니요</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td rowspan="10" class="ax-category">필요성</td>
        <td class="ax-item">
          <div class="ax-question">판단 기준이 사람 중심이다</div>
          <div class="ax-description">판단 기준이 문서나 시스템이 아닌 개인 경험이나 직관에 의존함</div>
        </td>
        <td data-w="4">4</td>
        <td class="ax-choice-cell"><label><input type="radio" name="q1" value="1"></label></td>
        <td class="ax-choice-cell"><label><input type="radio" name="q1" value="0"></label></td>
      </tr>
      <tr>
        <td>2</td>
        <td class="ax-item">
          <div class="ax-question">반복 업무에 오류가 잦다</div>
          <div class="ax-description">동일 작업에서 사람이 반복적으로 실수하거나 품질이 일정하지 않음</div>
        </td>
        <td data-w="5">5</td>
        <td class="ax-choice-cell"><label><input type="radio" name="q2" value="1"></label></td>
        <td class="ax-choice-cell"><label><input type="radio" name="q2" value="0"></label></td>
      </tr>
      <tr>
        <td>11</td>
        <td rowspan="10" class="ax-category">기회</td>
        <td class="ax-item">
          <div class="ax-question">개인화 수요가 커지고 있다</div>
          <div class="ax-description">고객이 본인에게 맞는 정보와 서비스를 기대하는 경향이 뚜렷함</div>
        </td>
        <td data-w="5">5</td>
        <td class="ax-choice-cell"><label><input type="radio" name="q11" value="1"></label></td>
        <td class="ax-choice-cell"><label><input type="radio" name="q11" value="0"></label></td>
      </tr>
    </tbody>
  </table>
</div>

<div class="ax-actions">
  <button type="button" class="ax-btn ax-btn-primary" id="axCalcBtn">결과 보기</button>
  <button type="button" class="ax-btn ax-btn-secondary" id="axResetBtn">다시 채점</button>
</div>

</body>
</html>