---
title: "아이디 추천"
part: "회원 가입"
partOrder: 1
order: 1
status: "published"
slug: "01-01-id-recommendation"
thumbnail: "/images/docs/ax-planning/01-01-id-recommendation"
date: 2024-01-14
---

<img
  src="/images/docs/ax-planning/01-01-id-recommendation.png"
  alt="사용자 입력 기반의 아이디 생성 프로세스 흐름도: 자연어 처리, 데이터 기반, 생성형 AI 기반의 세 가지 경로를 거쳐 규칙 기반 정제, 감성 분석, 서비스 특성 반영을 통해 최종 추천이 이루어지는 과정"
  class="img-medium">

* 인기 서비스일수록 원하는 아이디가 이미 사용 중인 경우가 많아 여러 번 시도하다 이탈하는 문제가 생김
* AI는 사용자가 입력한 이름, 이메일, 닉네임을 분석해서 적절한 아이디를 자동 추천하는 방식으로 이 문제를 해결
* 단순한 대안 제시를 넘어, 사용자 관심사나 트렌드를 반영한 개성 있는 아이디 추천도 가능
* 추천 방식은 크게 세 가지로 나뉨

<b>자연어 처리 기반</b> : 입력값을 토큰화해서 이름과 이니셜을 분리하고, WordNet 같은 도구로 연관 키워드를 생성한 뒤 단순 변형·조합으로 후보를 만들어냄. "Bryan Roh" 입력 시 `b_roh`, `bryanstar`, `roh_b_pro` 같은 후보가 나오는 방식

<b>데이터 기반</b> : NLP 기반 방식에 기존 아이디 패턴 분석과 트렌드 키워드 수집이 추가됨. Google Trends나 SNS 데이터로 요즘 뜨는 키워드를 가져오고, FastText·Word2Vec 같은 임베딩 도구로 사용자 관심사와 분위기가 비슷한 단어를 찾아 조합. 관심사가 "game"이라면 `bryan_gamer`, `b_esports` 같은 아이디를 추천

<b>생성형 AI 기반</b> : BERT로 입력값의 의미 벡터를 추출하고, GPT가 그 벡터를 바탕으로 기존에 없던 새로운 조합을 직접 생성. 단순 변형이나 패턴 재활용이 아니라 `luminousBryan`, `bryanova` 같은 독창적인 아이디를 만들어낼 수 있어 중복 가능성도 낮음

세 방식 모두 후보 생성 후 공통 정제 과정을 거침

* 길이·복잡성·발음 용이성 체크
* 감성 분석으로 부정적 뉘앙스 아이디 필터링 (`darkBryan`, `sadRoh` 같은 후보는 제거)
* 서비스 성격 반영 : 게임 플랫폼이면 활동적 톤, 비즈니스 플랫폼이면 전문적 톤으로 우선순위 조정