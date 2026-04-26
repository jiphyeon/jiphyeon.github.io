---
title: "고객 평생 가치 예측"
part: "고객 분석"
partOrder: 2
order: 4
status: "draft"
slug: "02-04-customer-lifetime-value-prediction"
thumbnail: "/images/docs/ax-planning/02-04-customer-lifetime-value-prediction.png"
date: 2024-06-07
---

![고객 평생 가치 예측 프로세스를 나타낸 흐름도. 상단에 CLV(고객이 앞으로 창출할 총 가치 예측) 개념을 설명하고, 통계 기반 예측(RFM 모델, BG/NBD 모델, Gamma-Gamma 모델)과 머신러닝 기반 예측(고객 특성 엔지니어링, Random Forest/Gradient Boosting 앙상블 모델 학습)이 병렬로 구성됨. Python의 Lifetimes 라이브러리와 scikit-learn을 활용하며, 산출된 CLV는 고객 확보 비용 최적화, VIP 고객 선정, 맞춤형 혜택 설계에 활용되는 구조.](/images/docs/ax-planning/02-04-customer-lifetime-value-prediction.png)

* 고객이 앞으로 창출할 총 가치를 예측하는 지표(CLV, Customer Lifetime Value)
* 단기 매출이 아닌 장기적 관점에서 고객을 바라보는 방식. 고객 확보 비용 최적화, VIP 고객 선정, 맞춤형 혜택 설계에 직접 활용
* 예측 방식은 크게 통계 기반과 머신러닝 기반으로 나뉨

<b>통계 기반 CLV 예측</b>

* <b>RFM 모델</b> : Recency(최근성), Frequency(빈도), Monetary(금액) 세 가지 지표로 고객 가치를 점수화. 각 항목을 1~5점으로 환산해 조합하면 우수 고객, 잠재 고객, 이탈 위험 고객으로 분류 가능. SQL의 NTILE 함수나 Python으로 간단히 구현
* <b>BG/NBD 모델</b> : 과거 구매 횟수와 최근성을 조합해 고객이 앞으로도 활동할 가능성과 잔여 구매 횟수를 예측. 총 구매 횟수가 같아도 최근까지 활동한 고객을 더 가치 있게 평가. Python Lifetimes 라이브러리로 구현
* <b>Gamma-Gamma 모델</b> : 한 번 구매할 때 평균 얼마를 지출할지 예측. 단순 평균이 아니라 소비 패턴의 일관성과 분산까지 반영. BG/NBD와 결합하면 CLV = 잔여 구매 횟수 x 평균 구매 금액으로 최종 CLV 산출

<b>머신러닝 기반 CLV 예측</b> : 고객 수가 많고 행동이 복잡할 때 통계 모델의 한계를 보완. 최근 30일 구매 빈도, 평균 구매 간격, 카테고리별 구매 금액, 앱 접속 패턴 등 다양한 특성을 입력으로 활용. Random Forest/Gradient Boosting 같은 앙상블 모델로 학습하고 scikit-learn으로 구현. 마케팅 반응, 시즌성 등 외부 변수도 함께 반영할 수 있어 실제 운영 환경에 적합