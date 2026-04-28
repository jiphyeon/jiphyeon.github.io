---
title: "AX 진단"
part: "AX 계획"
partOrder: 1
order: 1
status: "published"
slug: "01-01-ax-diagnosis"
date: 2024-03-09
---

현황에 대한 필요성, 기회, 준비도의 세 범주로 구성된다. 

* 필요성은 현재 업무 방식에 문제가 있는지 확인한다. 판단 반복, 숙련자 의존, 시스템 분절, 수작업 의존 증가는 전환의 신호다.
* 기회는 AI가 기존 방식으로는 불가능했던 고객 경험, 업무 프로세스, 서비스 구성을 실현할 수 있는지 살펴본다. 단순한 효율 향상이 아니라 새로운 가능성이 존재하는지가 핵심이다.
* 준비도는 변화를 받아들일 수 있는 기반이 있는지 확인한다. 데이터, 인프라, 인력, 문화가 정비되지 않았다면 전환은 실행되기 어렵다.

AX 진단은 진단표로 진행된다. 진단 항목은 총 30개 문항이며, 각 항목은 변화의 파급력과 자동화 적합성에 따라 1점에서 5점까지의 가중치가 부여된다. 사용자는 각 항목에 대해 예/아니요로 응답하며, 최종 점수는 100점 만점 기준으로 산출된다. 

진단 항목마다 중요도가 다르기 때문에 항목별로 가중치를 1점부터 5점까지 부여하여 구분한다. 점수가 높을수록 전환과의 연관성이 크고 우선적으로 고려해야 할 항목이다.

가중치는 진단 항목이 속한 범주에 따라 평가 기준이 달라진다.

* 필요성에 속한 항목은 전환의 시급성을 기준으로,
* 기회에 속한 항목은 전환을 통해 새로운 가능성이 열리는 정도를 기준으로,
* 준비도에 속한 항목은 전환을 위한 준비 상태 수준을 기준으로 판단한다.

이 기준에 따라 각 항목에 가중치를 부여한다.

### AX 진단 항목 가중치 및 설명

| 가중치 | 필요성 | 기회 | 준비도 |
|--------|--------|------|--------|
| 5점 | 매우 필요함 | 기회가 매우 큼 | 준비가 매우 잘 되어 있음 |
| 4점 | 필요함 | 기회가 큼 | 준비가 잘 되어 있음 |
| 3점 | 어느 정도 필요함 | 기회가 보통 | 보통 수준의 준비 |
| 2점 | 낮은 수준의 필요 | 기회가 적음 | 준비가 부족함 |
| 1점 | 거의 필요하지 않음 | 기회가 거의 없음 | 준비가 거의 되어 있지 않음 |

진단 결과는 전사 확장형, 핵심 전환형, 부서 파일럿형, 준비 기반형, 탐색 학습형이라는 AX 방향으로 연결된다.

<style>
.ax-wrap {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.ax-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 14px;
}

/* 열 너비 */
.ax-table .c-num  { width: 36px; }
.ax-table .c-cat  { width: 54px; }
.ax-table .c-item { width: auto; }
.ax-table .c-w    { width: 44px; }
.ax-table .c-yn   { width: 46px; }

.ax-table th,
.ax-table td {
  border-bottom: 1px solid #e0e0e0;
  padding: 9px 6px;
  vertical-align: middle;
  text-align: center;
}

.ax-table thead th {
  border-top: 2px solid #222;
  border-bottom: 1px solid #bbb;
  background: #f5f5f5;
  font-weight: 700;
  font-size: 13px;
}

/* ── 구분 셀: rowspan 대신 CSS 병합 시뮬레이션 ── */
.c-cat-cell {
  font-weight: 700;
  font-size: 12px;
  color: #444;
  background: #fafafa;
  word-break: keep-all;
  /* 기본: 텍스트 숨김 (중간 행) */
  color: transparent;
  user-select: none;
  border-bottom: 1px solid #e0e0e0;
}

/* 각 구분의 첫 행: 텍스트 표시 + 위 테두리 강조 */
.c-cat-cell.cat-first {
  color: #444;
  border-top: 2px solid #ccc;
}

/* 각 구분의 마지막 행: 아래 테두리 강조 */
.c-cat-cell.cat-last {
  border-bottom: 2px solid #ccc;
}

/* 구분 첫 행의 윗 테두리도 강조 */
tr.group-first td {
  border-top: 2px solid #ccc;
}

/* ── 진단항목 셀 ── */
.ax-item {
  text-align: left;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
  padding-left: 8px;
}

.ax-q {
  font-weight: 700;
  font-size: 13.5px;
  line-height: 1.4;
  margin-bottom: 2px;
}

.ax-d {
  font-size: 12.5px;
  line-height: 1.45;
  color: #666;
}

/* ── 라디오 ── */
.ax-yn { cursor: pointer; }
.ax-yn label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 40px;
  cursor: pointer;
}
.ax-table input[type=radio] {
  transform: scale(1.15);
  cursor: pointer;
}

/* ── 버튼 ── */
.ax-actions { margin-top: 20px; display: flex; gap: 10px; }
.ax-btn {
  padding: 10px 18px;
  border-radius: 8px;
  border: 0;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
}
.ax-btn-p { background: #111; color: #fff; }
.ax-btn-s { background: #eee; color: #111; }

#axError {
  margin-top: 16px; padding: 12px 14px;
  border-radius: 8px; background: #fff0f0;
  color: #b00020; border: 1px solid #ffd0d0;
  line-height: 1.6;
}
#axResult {
  margin-top: 16px; padding: 16px;
  border-radius: 10px; background: #f7f7f7;
  line-height: 1.7;
}
#axError:empty, #axResult:empty { display: none; }

/* ══ 모바일 ══ */
@media (max-width: 600px) {
  .ax-table { font-size: 12.5px; }

  /* 구분 열 완전 숨김 — rowspan 없으므로 안전 */
  .ax-table th.c-cat,
  .ax-table td.c-cat-cell { display: none; }

  .ax-table .c-num { width: 22px; font-size: 11px; }
  .ax-table .c-w   { width: 30px; font-size: 11px; }
  .ax-table .c-yn  { width: 36px; }

  .ax-table th, .ax-table td { padding: 7px 3px; }
  .ax-q { font-size: 12.5px; }
  .ax-d { font-size: 11.8px; }
  .ax-yn label { min-height: 34px; }
}
</style>

<div class="ax-table-scroll">
<table class="ax-table" id="axTable">
<thead>
<tr>
  <th class="col-num">번호</th>
  <th class="col-cat">구분</th>
  <th class="col-item">진단 항목</th>
  <th class="col-w">가중치</th>
  <th class="col-yn">예</th>
  <th class="col-yn">아니요</th>
</tr>
</thead>
<tbody>

<!-- ── 필요성 (1~10) ── -->
<tr><td>1</td><td rowspan="10" class="ax-category col-cat">필요성</td><td class="ax-item"><div class="ax-question">판단 기준이 사람 중심이다</div><div class="ax-description">판단 기준이 문서나 시스템이 아닌 개인 경험이나 직관에 의존해 의사결정이 이루어지고 있음</div></td><td class="col-w" data-w="4">4</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q1" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q1" value="0"></label></td></tr>
<tr><td>2</td><td class="ax-item"><div class="ax-question">반복 업무에 오류가 잦다</div><div class="ax-description">동일 작업에서 사람이 반복적으로 실수하거나 결과 품질이 일정하지 않음</div></td><td class="col-w" data-w="5">5</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q2" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q2" value="0"></label></td></tr>
<tr><td>3</td><td class="ax-item"><div class="ax-question">고객 응대 편차가 크다</div><div class="ax-description">담당자나 시간대에 따라 응답 속도나 응대 품질이 불균형하게 나타남</div></td><td class="col-w" data-w="3">3</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q3" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q3" value="0"></label></td></tr>
<tr><td>4</td><td class="ax-item"><div class="ax-question">데이터 해석이 수작업 중심이다</div><div class="ax-description">실무자가 직접 엑셀이나 문서를 열어 데이터를 해석하거나 비교 분석해야 함</div></td><td class="col-w" data-w="4">4</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q4" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q4" value="0"></label></td></tr>
<tr><td>5</td><td class="ax-item"><div class="ax-question">의사결정 속도가 느리다</div><div class="ax-description">정보 수집/분석에 오랜 시간이 걸려 빠른 의사결정이 어려운 상황</div></td><td class="col-w" data-w="3">3</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q5" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q5" value="0"></label></td></tr>
<tr><td>6</td><td class="ax-item"><div class="ax-question">시스템 연동 부족으로 오류 발생</div><div class="ax-description">업무 시스템 간 연결이 안 되어 수작업으로 전환하거나 이중 입력이 자주 발생</div></td><td class="col-w" data-w="3">3</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q6" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q6" value="0"></label></td></tr>
<tr><td>7</td><td class="ax-item"><div class="ax-question">실시간 업무 자동화가 어렵다</div><div class="ax-description">고객 반응, 긴급 요청, 예외 처리 등 실시간 대응이 필요한 업무를 시스템이 따라가지 못함</div></td><td class="col-w" data-w="4">4</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q7" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q7" value="0"></label></td></tr>
<tr><td>8</td><td class="ax-item"><div class="ax-question">인수인계 시 정보 손실이 있다</div><div class="ax-description">업무 교체 과정에서 매뉴얼, 히스토리, 의사결정 기준이 제대로 전달되지 않음</div></td><td class="col-w" data-w="1">1</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q8" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q8" value="0"></label></td></tr>
<tr><td>9</td><td class="ax-item"><div class="ax-question">예측 기반 대응이 부족하다</div><div class="ax-description">과거 패턴 분석을 통한 선제적인 대응보다 문제 발생 후 사후 대응에 의존</div></td><td class="col-w" data-w="3">3</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q9" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q9" value="0"></label></td></tr>
<tr><td>10</td><td class="ax-item"><div class="ax-question">고비용의 전문성 업무가 많다</div><div class="ax-description">높은 인건비나 전문성이 요구되는 업무가 많아 효율성 개선이 시급함</div></td><td class="col-w" data-w="3">3</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q10" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q10" value="0"></label></td></tr>

<!-- ── 기회 (11~20) ── -->
<tr><td>11</td><td rowspan="10" class="ax-category col-cat">기회</td><td class="ax-item"><div class="ax-question">개인화 수요가 커지고 있다</div><div class="ax-description">고객이나 사용자가 본인에게 맞는 정보, 서비스, 인터페이스를 기대하는 경향이 뚜렷해짐</div></td><td class="col-w" data-w="5">5</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q11" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q11" value="0"></label></td></tr>
<tr><td>12</td><td class="ax-item"><div class="ax-question">AI 적용 가능 업무가 명확하다</div><div class="ax-description">예측, 분류, 요약, 생성 등 AI가 대체 가능하다고 판단되는 구체적인 업무가 존재함</div></td><td class="col-w" data-w="5">5</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q12" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q12" value="0"></label></td></tr>
<tr><td>13</td><td class="ax-item"><div class="ax-question">조건 판단 업무가 반복된다</div><div class="ax-description">다수의 기준, 조건, 룰을 기반으로 유사한 결정을 반복적으로 수행하는 업무가 있음</div></td><td class="col-w" data-w="5">5</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q13" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q13" value="0"></label></td></tr>
<tr><td>14</td><td class="ax-item"><div class="ax-question">지식 업무에 AI 보조가 필요하다</div><div class="ax-description">전략, 분석, 보고서 작성 등 고차원적 사고가 요구되는 업무에서 AI 지원 가능성이 큼</div></td><td class="col-w" data-w="4">4</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q14" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q14" value="0"></label></td></tr>
<tr><td>15</td><td class="ax-item"><div class="ax-question">대화형 서비스 요구가 크다</div><div class="ax-description">챗봇, 음성 인터페이스 등 사용자와 상호작용하는 자동화 채널 수요가 확대되고 있음</div></td><td class="col-w" data-w="4">4</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q15" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q15" value="0"></label></td></tr>
<tr><td>16</td><td class="ax-item"><div class="ax-question">정밀 판단이 중요하다</div><div class="ax-description">계약 해석, 감사 체크리스트, 규정 판단 등 오류 없이 판단해야 하는 작업이 많음</div></td><td class="col-w" data-w="3">3</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q16" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q16" value="0"></label></td></tr>
<tr><td>17</td><td class="ax-item"><div class="ax-question">대용량 데이터 분석 필요성이 크다</div><div class="ax-description">축적된 데이터에서 패턴 발견과 인사이트 도출이 비즈니스에 중요한 영향을 미침</div></td><td class="col-w" data-w="3">3</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q17" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q17" value="0"></label></td></tr>
<tr><td>18</td><td class="ax-item"><div class="ax-question">시장 선점 기회가 있다</div><div class="ax-description">업계에서 AI 기반 서비스 도입이 초기 단계로 경쟁 우위 확보 가능성 존재</div></td><td class="col-w" data-w="4">4</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q18" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q18" value="0"></label></td></tr>
<tr><td>19</td><td class="ax-item"><div class="ax-question">비용 절감 효과가 크다</div><div class="ax-description">AI 도입으로 인건비, 운영비 등 직접적 비용 절감 효과가 상당할 것으로 분석됨</div></td><td class="col-w" data-w="1">1</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q19" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q19" value="0"></label></td></tr>
<tr><td>20</td><td class="ax-item"><div class="ax-question">신규 수익 모델 창출이 가능하다</div><div class="ax-description">AI 기능을 활용한 새로운 제품이나 서비스 개발 기회가 구체적으로 존재함</div></td><td class="col-w" data-w="2">2</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q20" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q20" value="0"></label></td></tr>

<!-- ── 준비도 (21~30) ── -->
<tr><td>21</td><td rowspan="10" class="ax-category col-cat">준비도</td><td class="ax-item"><div class="ax-question">데이터가 디지털화되어 있다</div><div class="ax-description">업무 핵심 데이터가 종이, 수기 메모가 아닌 시스템에 저장/관리되고 있음</div></td><td class="col-w" data-w="4">4</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q21" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q21" value="0"></label></td></tr>
<tr><td>22</td><td class="ax-item"><div class="ax-question">데이터 품질이 정제되어 있다</div><div class="ax-description">컬럼 명칭, 포맷, 범주 등이 정리되어 있어 분석 및 연동에 문제가 없음</div></td><td class="col-w" data-w="5">5</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q22" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q22" value="0"></label></td></tr>
<tr><td>23</td><td class="ax-item"><div class="ax-question">실시간 인프라가 있다</div><div class="ax-description">이벤트나 요청을 실시간으로 처리할 수 있는 데이터 시스템이 구성되어 있음</div></td><td class="col-w" data-w="3">3</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q23" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q23" value="0"></label></td></tr>
<tr><td>24</td><td class="ax-item"><div class="ax-question">API 또는 클라우드 기반이다</div><div class="ax-description">시스템이 유연하게 외부 연계되거나 확장이 가능한 구조로 운영되고 있음</div></td><td class="col-w" data-w="2">2</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q24" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q24" value="0"></label></td></tr>
<tr><td>25</td><td class="ax-item"><div class="ax-question">기술 인력이 내부에 있다</div><div class="ax-description">데이터 분석, AI 모델 이해, 시스템 운영 등 기술 인력을 일정 수준 보유하고 있음</div></td><td class="col-w" data-w="2">2</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q25" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q25" value="0"></label></td></tr>
<tr><td>26</td><td class="ax-item"><div class="ax-question">AI 성과 지표가 설정되어 있다</div><div class="ax-description">단순 도입이 아닌 어떤 효과를 기대하는지 명확히 정의된 KPI가 존재함</div></td><td class="col-w" data-w="3">3</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q26" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q26" value="0"></label></td></tr>
<tr><td>27</td><td class="ax-item"><div class="ax-question">리더십 지원이 확실하다</div><div class="ax-description">경영진이 AX의 필요성을 이해하고 예산과 조직 차원의 지원을 보장함</div></td><td class="col-w" data-w="3">3</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q27" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q27" value="0"></label></td></tr>
<tr><td>28</td><td class="ax-item"><div class="ax-question">변화 관리 체계가 있다</div><div class="ax-description">업무 프로세스 변화와 직원 적응을 위한 교육, 소통, 지원 체계가 구축되어 있음</div></td><td class="col-w" data-w="3">3</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q28" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q28" value="0"></label></td></tr>
<tr><td>29</td><td class="ax-item"><div class="ax-question">보안/윤리 체계가 갖춰져 있다</div><div class="ax-description">개인정보, 알고리즘 투명성, 규제 이슈에 대응할 수 있는 체계가 존재함</div></td><td class="col-w" data-w="3">3</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q29" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q29" value="0"></label></td></tr>
<tr><td>30</td><td class="ax-item"><div class="ax-question">투자 예산이 확보되어 있다</div><div class="ax-description">AI 도입과 운영에 필요한 초기 투자 및 지속 운영 예산이 배정되어 있음</div></td><td class="col-w" data-w="3">3</td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q30" value="1"></label></td><td class="ax-choice-cell col-yn"><label><input type="radio" name="q30" value="0"></label></td></tr>

</tbody>
</table>
</div>

<div class="ax-actions">
  <button type="button" class="ax-btn ax-btn-primary" id="axCalcBtn">결과 보기</button>
  <button type="button" class="ax-btn ax-btn-secondary" id="axResetBtn">다시 채점</button>
</div>

<div id="axError"></div>
<div id="axResult"></div>

<script>
/* ── 모바일: rowspan 해제 + 구분 셀 숨김 ── */
(function () {
  function applyMobile() {
    var isMobile = window.innerWidth <= 600;
    var cells = document.querySelectorAll('#axTable .ax-category');
    cells.forEach(function (td) {
      if (isMobile) {
        td.setAttribute('rowspan', '1');
        td.classList.add('ax-cat-mobile-hide');
      } else {
        /* rowspan 원복 — data 속성에서 읽음 */
        var rs = td.getAttribute('data-rowspan') || '1';
        td.setAttribute('rowspan', rs);
        td.classList.remove('ax-cat-mobile-hide');
      }
    });
  }

  /* 초기 rowspan 값을 data-rowspan에 백업 */
  document.querySelectorAll('#axTable .ax-category').forEach(function (td) {
    td.setAttribute('data-rowspan', td.getAttribute('rowspan') || '1');
  });

  applyMobile();
  window.addEventListener('resize', applyMobile);
})();

/* ── 채점 ── */
const WEIGHTS = [4,5,3,4,3,3,4,1,3,3, 5,5,5,4,4,3,3,4,1,2, 4,5,3,2,2,3,3,3,3,3];

const RESULT_MAP = [
  { min: 80, label: '전사 확장형',  desc: 'AI 전환의 필요성과 기회, 준비도가 모두 높습니다. 전사 수준의 AX 로드맵 수립과 본격 실행이 적절한 단계입니다.' },
  { min: 65, label: '핵심 전환형',  desc: '핵심 업무 영역에서 AI 전환의 조건이 갖춰져 있습니다. 임팩트가 높은 영역을 선별하여 집중 추진하는 전략이 유효합니다.' },
  { min: 50, label: '부서 파일럿형', desc: '특정 부서나 업무 단위에서 파일럿 프로젝트로 시작하기 적합한 상태입니다. 성과를 검증한 후 확장하는 방식을 권장합니다.' },
  { min: 35, label: '준비 기반형',  desc: '전환 의지는 있으나 데이터나 인프라 등 기반 요소 정비가 선행되어야 합니다. 준비 단계에 집중하세요.' },
  { min: 0,  label: '탐색 학습형',  desc: 'AX 전환을 위한 개념 이해와 내부 역량 탐색부터 시작하는 것이 적합합니다. 소규모 실험과 교육을 병행하세요.' },
];

document.getElementById('axCalcBtn').addEventListener('click', function () {
  var errorEl  = document.getElementById('axError');
  var resultEl = document.getElementById('axResult');
  errorEl.textContent = '';
  resultEl.innerHTML  = '';

  var unanswered = [];
  var answers    = [];

  for (var i = 1; i <= 30; i++) {
    var sel = document.querySelector('input[name="q' + i + '"]:checked');
    if (!sel) { unanswered.push(i); answers.push(null); }
    else answers.push(parseInt(sel.value));
  }

  if (unanswered.length > 0) {
    errorEl.textContent = '다음 항목에 응답하지 않았습니다: ' + unanswered.join(', ') + '번';
    return;
  }

  var raw = answers.reduce(function (s, v, i) { return s + v * WEIGHTS[i]; }, 0);
  var max = WEIGHTS.reduce(function (s, w) { return s + w; }, 0);
  var score = Math.round(raw / max * 100);
  var result = RESULT_MAP.find(function (r) { return score >= r.min; });

  resultEl.innerHTML =
    '<strong style="font-size:16px">📊 AX 진단 결과: ' + score + '점 / 100점</strong><br><br>' +
    '<strong>유형: ' + result.label + '</strong><br>' +
    result.desc;
});

document.getElementById('axResetBtn').addEventListener('click', function () {
  document.querySelectorAll('input[type="radio"]').forEach(function (r) { r.checked = false; });
  document.getElementById('axError').textContent = '';
  document.getElementById('axResult').innerHTML  = '';
});
</script>
