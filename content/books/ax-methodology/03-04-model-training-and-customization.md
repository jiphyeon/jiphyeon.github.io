--- 
title: "모델의 학습과 맞춤화"
part: "모델"
partOrder: 3
order: 4
status: "published"
slug: "03-04-model-training-and-customization"
date: 2024-10-18
---

어떤 모델을 선택하든 실제 업무에 적용하려면 목적과 용도에 맞게 설계하고 훈련시키는 과정이 필요하다. 

### 훈련
훈련(Training)은 사람이 모델에게 데이터를 주어 가중치를 조정하는 외부적인 행위이고, 학습(Learning)은 모델이 그 과정에서 스스로 패턴을 익히는 내부적인 과정이다. 즉, 우리가 모델을 훈련시키면 모델이 학습하는 것이다.

모델 구축은 크게 처음부터 훈련하는 방식과 기존 모델을 조정하는 방식으로 나눌 수 있다. 현실적으로는 대부분 후자를 선택하지만, 전체 흐름의 이해를 위해 두 방식의 차이를 알아보자.

처음부터 훈련한다는 것은 아무런 선행 지식이 없는 모델에게 방대한 양의 데이터와 계산 자원을 투입하여 스스로 이해하고 판단하게 만드는 것이다. 이는 수개월에서 수년의 개발 기간과 막대한 비용이 투입되므로 대기업이나 연구기관 수준에서나 가능하다. 실제 훈련 비용을 보면 그 규모를 실감할 수 있다. GPT-3는 약 460만 달러, GPT-4는 약 6300만 달러가 소요되었으며, 구글 제미나이 울트라(Google Gemini Ultra)는 약 1억 9100만 달러가 소요되었다. 

이 비용은 한 번의 훈련에 드는 컴퓨팅 자원 비용만을 계산한 것이며, 인건비, 연구개발비, 전력 및 유지비용은 제외된 값이다. 주목할 점은 모델 세대가 발전할수록 비용이 기하급수적으로 증가한다는 사실이다. GPT-3에서 GPT-4로 넘어오며 훈련 비용은 약 14배 증가했다.

### 프롬프트 엔지니어링
모델을 백지에서 훈련시키기보다 이미 공개된 사전 학습 모델을 조정하는 방식이 훨씬 효율적이다. 이 조정 방식은 두 가지로 나뉜다. 하나는 프롬프트 엔지니어링(Prompt Engineering)이고, 다른 하나는 파인튜닝(Fine-tuning)이다.

프롬프트 엔지니어링은 앞에서 언급한 기존 모델을 조정하는 방식 중 하나로 모델 자체는 건드리지 않고 입력 방식만 정교하게 바꾸는 방식이다. 대형 언어 모델은 엄청난 양의 데이터로 훈련되어 있어 엄청난 잠재력을 가지고 있다. 프롬프트 엔지니어링은 이런 능력을 효과적으로 끌어내는 기술이다. 모델은 이미 정답을 알고 있다. 그런데 지시가 없으면 어떤 방식으로 답해야 할지 모르므로 정확한 지시를 주면 적절한 능력을 발휘한다. 이 방식은 적용이 빠르고 리소스가 적게 들지만, 업무 목적에 정확하게 부합하는 결과를 얻기 어려울 수 있다.

파인튜닝은 사전 학습 모델의 가중치를 훈련을 통해 조정하는 방식이다. 즉, 특정 데이터를 활용하여 이미 학습된 모델을 특정 업무에 맞게 재훈련시키는 것이다. 내부 업무 프로세스나 도메인 특성이 뚜렷한 경우, 프롬프트만으로는 원하는 결과를 얻기 어렵다. 이럴 때는 기존 모델의 일반적인 능력을 유지하면서도 핵심 판단 기준은 용도에 맞게 재정의할 필요가 있다.

상담 AI를 만든다고 가정해보자. 먼저 상담 데이터를 준비한다. 제품 A에 대한 문의에 대해 “저희 제품 A는 3년 무상 A/S를 제공하며, 전국 50개 서비스센터에서 당일 수리가 가능합니다.” 같은 질문-답변 쌍을 수천 개 만든다. 이 데이터를 CSV나 JSON 파일로 저장한 후 파이토치(PyTorch), 텐서플로우(TensorFlow) 같은 딥러닝 프레임워크로 모델을 훈련시킨다. 훈련 과정에서 모델이 제품 A 문의에 대해 적절하지 않은 답변을 생성하면 틀렸다는 신호를 받고, 관련 가중치들을 조금씩 수정한다. 수십억 개 이상의 숫자로 이루어진 모델의 내부 설정값들을 가중치 또는 파라미터(Parameter)라고 부르는데, 파인튜닝은 이 숫자들을 업무 데이터에 맞게 조정한다. 

예를 들어 0.347이던 가중치를 0.351로 바꾸는 식으로 미세하게 조정한다. 이 과정을 데이터 전체에 대해 여러 번 반복하면, 입력과 적절한 답변 사이의 연결 강도가 높아지고, 적절하지 않은 답변으로 이어지는 연결 강도는 낮아진다. 결과적으로 수십 억 개 가중치 중에서 업무 데이터와 관련된 관계들이 강화되어, 같은 질문에도 업무 내용에 맞는 답변을 하게 된다.

### 학습 데이터
파인튜닝을 위해서는 업무에 맞는 데이터셋이 필요하다. 예를 들어 법률 상담 AI를 만들려면 “질문 : 임대차 계약 해지 조건이 궁금합니다, 답변 : 임대차보호법 제6조에 따라...” 같은 형태로 수천 개의 질문-답변 쌍을 준비해야 한다. 이 데이터를 만들기 위해서는 실제 상담 사례를 정리하거나 표준 답변을 작성해야 한다. 일반적으로 파인튜닝에는 수백에서 수천 개 수준의 질문–답변 쌍이 필요하며, 대형 모델은 수만 개 이상의의 학습쌍이 요구되기도 한다.

어떤 방식을 선택하든 먼저 입력(질문)과 출력(답변)의 관계를 설계해야 한다. 뉴스 요약이라면 ‘긴 기사를 받아 3문장으로 압축’, 제품 추천이라면 ‘사용자 이력을 받아 상품 목록 생성’처럼 구체적으로 정의한다. 모델은 이 관계를 학습한다. 그런 다음, 학습 데이터를 준비한다. 이때 데이터는 단순히 많다고 되는 것이 아니라 업무 목적에 맞게 구성된 입력–정답 쌍으로 만들어져야 한다. 고객 이탈 예측 모델이라면 이 고객은 90일 뒤 이탈했다는 기록이 명시되어 있어야 하고, 문서 분류 모델이라면 이 문서는 계약서라는 라벨이 붙어 있어야 한다. 

### 데이터 라벨링
이 과정에서 가장 큰 난관은 데이터 라벨링이다. 수천에서 수만 건의 데이터에 정확한 정답을 붙이는 작업은 적지 않은 시간과 비용이 든다. 또한 개인정보보호법 등 규제 때문에 민감 정보는 가공이나 익명화 과정을 거쳐야 한다. 잘못된 라벨이나 편향된 샘플은 모델을 왜곡시킨다. 따라서 양질의 학습 데이터를 확보하는 것이 중요하다.

### 성능 지표
모델의 조정이나 학습이 완료되었다고 해서 바로 운영되는 것이 아니다. 모델을 적용하기 전에 지표별로 성능을 평가해야 한다. 대표적인 성능 지표는 정확도(Accuracy), 정밀도(Precision), 재현율(Recall), F1 점수(F1-score)가 있다.

이메일 100개를 대상으로 스팸 필터 AI가 작동했다고 가정하자. 그중 실제 스팸 메일은 20개였고, 정상 메일은 80개였다. AI는 25개의 메일을 스팸이라고 판단했으며, 이 중 15개는 실제 스팸이었고 10개는 정상 메일을 잘못 분류한 것이었다. 또한 AI는 5개의 스팸 메일을 놓쳐서 정상이라고 판단했다. 

<div style="margin: 6px 0 2px 0; font-weight: bold;">
  이메일 스팸 필터링 결과 예시
</div>

<div style="overflow-x: auto; width: 100%; margin: 0 0 18px 0;">
  <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 0.95rem; margin: 0;">
    <thead>
      <tr style="border-bottom: 1px solid #ddd; text-align: center;">
        <th style="padding: 8px;">실제/예측</th>
        <th style="padding: 8px;">AI가 스팸이라고 예측</th>
        <th style="padding: 8px;">AI가 정상이라고 예측</th>
        <th style="padding: 8px;">합계</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px; font-weight: bold; text-align: center;">진짜 스팸</td>
        <td style="padding: 8px; text-align: center;">15</td>
        <td style="padding: 8px; text-align: center;">5</td>
        <td style="padding: 8px; text-align: center;">20</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px; font-weight: bold; text-align: center;">진짜 정상</td>
        <td style="padding: 8px; text-align: center;">10</td>
        <td style="padding: 8px; text-align: center;">70</td>
        <td style="padding: 8px; text-align: center;">80</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px; font-weight: bold; text-align: center;">합계</td>
        <td style="padding: 8px; text-align: center;">25</td>
        <td style="padding: 8px; text-align: center;">75</td>
        <td style="padding: 8px; text-align: center;">100</td>
      </tr>
    </tbody>
  </table>
</div>

이 상황에서 정량적인 성능 지표는 다음과 같이 계산된다.

* <b>정확도</b>는 전체 100개 메일 중 AI가 올바르게 분류한 스팸 15건과 정상 메일 70건을 합한 85건으로 정확도는 85%다.
* <b>정밀도</b>는 AI가 스팸이라고 예측한 25건 중 실제 스팸 15건의 비율로, 60%다.
* <b>재현율</b>은 실제 스팸 메일 20건 중 AI가 찾아낸 15건의 비율로, 75%다.
* <b>F1 점수</b>는 정밀도와 재현율의 균형을 측정하는 지표로 두 값이 균형 잡혀야 높게 나온다. 이 경우 66.7%로 계산된다.

<div style="margin: 0 0 4px 0; font-weight: bold; font-size: 1.1rem; letter-spacing: -0.02em;">
  이메일 스팸 필터링 결과 예시
</div>

<div style="overflow-x: auto; width: 100%; margin: 0 0 18px 0">
  <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 0.95rem; margin: 0;">
    <thead>
      <tr style="border-bottom: 1px solid #ddd; text-align: center;">
        <th style="padding: 8px;">실제/예측</th>
        <th style="padding: 8px;">AI가 스팸이라고 예측</th>
        <th style="padding: 8px;">AI가 정상이라고 예측</th>
        <th style="padding: 8px;">합계</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px; font-weight: bold; text-align: center;">진짜 스팸</td>
        <td style="padding: 8px; text-align: center;">15</td>
        <td style="padding: 8px; text-align: center;">5</td>
        <td style="padding: 8px; text-align: center;">20</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px; font-weight: bold; text-align: center;">진짜 정상</td>
        <td style="padding: 8px; text-align: center;">10</td>
        <td style="padding: 8px; text-align: center;">70</td>
        <td style="padding: 8px; text-align: center;">80</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px; font-weight: bold; text-align: center;">합계</td>
        <td style="padding: 8px; text-align: center;">25</td>
        <td style="padding: 8px; text-align: center;">75</td>
        <td style="padding: 8px; text-align: center;">100</td>
      </tr>
    </tbody>
  </table>
</div>

정확도는 전체 성능을 보는 데 유용하지만, 스팸 메일처럼 데이터 비율이 한쪽으로 쏠려 있는 경우에는 정밀도나 재현율이 더 중요하다. 예를 들어 스팸을 놓치지 않는 것이 중요한 경우에는 재현율이 중요하고, 정상 메일을 잘못 스팸으로 분류하지 않는 것이 중요하다면 정밀도를 우선 고려해야 한다. 그러나 대부분 이 두 기준이 동시에 중요하다. 이럴 때 사용하는 것이 F1 점수다. F1은 정밀도와 재현율이 균형 있게 높을 때만 높게 나오는 지표로 둘 중 하나라도 낮으면 점수가 급격히 떨어진다. 따라서 한쪽 성능만 부풀려 평가 결과가 왜곡되는 일을 막아주며, 실제 서비스 적용 전 모델의 균형 잡힌 품질을 판단하는 기준으로 주로 활용된다. 

### 성능 개선
업무별로 적정 성능 기준을 설정해야 한다. 모든 모델이 완벽할 수는 없으며, 어떤 수준부터는 자동 실행이 가능하고 어떤 수준에서는 사람의 검토가 필요한지 기준을 명시적으로 구분해야 한다. 이 기준은 고정된 것이 아니라 운영 과정에서 조절될 수 있다. 이 조정을 위해 사용자 평가, 오류 수집, 성능 저하 사례 등 피드백 루프(Feedback Loop)를 통해 모델은 계속적으로 보완된다. 

A/B 테스트를 통해 새로운 버전과 기존 버전의 성능을 비교하고, 모델 드리프트를 모니터링하여 성능 저하 시점을 감지한다. 이 피드백은 단순히 정확도를 높이는 수단이 아니라 모델이 변화하는 업무 요구사항에 맞춰 계속 발전할 수 있게 하는 핵심 장치다. 이 과정에서 데이터 편향으로 인한 차별적 결과, 적대적 공격(Adversarial Attack)에 대한 취약성, 설명 불가능한 판단으로 인한 신뢰 문제 등도 주의 깊게 살펴봐야 한다. 특히 인사, 대출심사, 의료진단 같은 민감 영역에서는 모델의 판단 근거를 설명할 수 있어야 하고, 최종 책임은 여전히 사람에게 있어야 한다.

모델은 판단을 대신하므로 기술적인 성능보다는 업무적인 판단 기준을 정의하고 개선하는 것이 더 중요하다. 모델은 한 번의 훈련으로 끝나는 것이 아니라 실무 환경에서 반복적인 학습을 통해 완성된다는 사실도 잊지 말아야 한다.