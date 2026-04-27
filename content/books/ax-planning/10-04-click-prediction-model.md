---
title: "클릭 예측 모델"
part: "광고"
partOrder: 10
order: 4
status: "published"
slug: "10-04-click-prediction-model"
thumbnail: "/images/docs/ax-planning/10-04-click-prediction-model.jpg"
date: 2025-03-09
---

<img
  src="/images/docs/ax-planning/10-04-click-prediction-model.png"
  alt="클릭 예측 모델 프로세스를 단계별로 나타낸 흐름도. 학습 데이터셋 구성(입력 피처 X 사용자 정보/광고 특성/사용자 행동 이력, 출력값 Y 클릭 여부 0 또는 1), 데이터 수집 및 전처리(사용자 행동 로그 수집 Apache Kafka 활용 실시간 이벤트 스트리밍, 데이터 전처리 PySpark 분산 처리 클래스 불균형 샘플링, 피처 엔지니어링 시간순 이벤트 정렬 사용자 행동 이력 병합), 모델 학습 및 최적화(딥러닝 모델 Wide & Deep/DeepFM, 프레임워크 PyTorch/TensorFlow, 모델 경량화 TorchScript/ONNX) 순으로 이어지며, 모델 평가 및 적용 단계에서 AUC/Log Loss/Calibration/CTR Lift/ROI 기여도 지표로 성능을 평가하는 구조."
  class="img-small">

* 사용자의 광고 클릭 가능성(CTR, Click-Through Rate)을 사전에 예측하는 모델
* 광고 입찰, 예산 분배, 광고 순위 결정 등 광고 전략 자동화와 최적화의 핵심 기술
* 예상 클릭률 × 광고주 입찰가 = 광고 경매 순위 결정 기준
* 프로세스는 학습 데이터셋 구성 → 데이터 수집 및 전처리 → 모델 학습 및 최적화 → 모델 평가 및 적용 순으로 이어짐

<b>학습 데이터셋 구성</b> : 입력 피처(X)와 출력값(Y)으로 구성
* 입력 피처 : 사용자 ID/기기/시간대, 광고 카테고리/위치, 사용자 최근 클릭 이력 등
* 출력값 : 클릭 여부(0 또는 1)
수천만 건의 로그가 쌓이면 모델은 어떤 피처 조합에서 클릭이 일어나는지 학습

<b>데이터 수집 및 전처리</b> : Kafka로 실시간 이벤트 스트리밍 수집. PySpark로 분산 처리. 클릭이 1% 수준으로 매우 적어 클래스 불균형 처리(다운샘플링)가 필수. 타임스탬프 기준 시간순 정렬로 행동 흐름 분석. 장기 피처(지난 7일 클릭 패턴)와 단기 피처(오늘 클릭 기록)를 분리해 병합

<b>모델 학습 및 최적화</b> : 초기에는 로지스틱 회귀 같은 선형 모델이 주류였지만 딥러닝 기반이 표준으로 자리잡음. Wide & Deep(기억력+일반화 결합), DeepFM(피처 상호작용 모델링), DCN, DIN 등이 대표적. PyTorch/TensorFlow로 구현. 실시간 입찰(RTB) 환경에서 100ms 내 예측 완료를 위해 TorchScript/ONNX로 모델 경량화

<b>모델 평가 지표</b>
* <b>AUC</b> : 클릭된 광고와 클릭되지 않은 광고를 얼마나 잘 구분하는지. 0.7 이상이면 잘 작동
* <b>로그 손실(Log Loss)</b> : 예측 확률이 정답과 얼마나 가까운지. 낮을수록 좋음
* <b>보정(Calibration)</b> : 예측 확률 0.7이라면 실제로도 70% 클릭되어야 잘 보정된 것
* <b>CTR Lift</b> : 모델 적용 후 클릭률이 얼마나 개선됐는지
* <b>ROI 기여도</b> : 모델 기반 타겟팅이 실제 매출/전환에 기여한 정도