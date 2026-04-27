---
title: "자연어 검색"
part: "검색"
partOrder: 4
order: 2
status: "published"
slug: "04-02-natural-language-search"
thumbnail: "/images/docs/ax-planning/04-02-natural-language-search.png"
date: 2024-08-07
---

<img
  src="/images/docs/ax-planning/04-02-natural-language-search.png"
  alt="자연어 검색 프로세스를 단계별로 나타낸 흐름도. 텍스트 임베딩(문장/문서를 SBERT 모델로 벡터 표현), 벡터 색인(임베딩된 벡터를 벡터 검색엔진에 저장, 색인된 벡터 DB로 빠른 유사도 검색), 질의 처리 및 유사도 검색(사용자 질의 입력, 동일 SBERT 모델로 질의 임베딩, 코사인 유사도/내적 방식으로 유사도 계산, Top-k 결과 반환) 순으로 이어지며, 벡터 검색엔진으로 FAISS/Elasticsearch가 활용되는 구조."
  class="img-small">

* 키워드 검색이 단어 일치를 찾는 방식이라면, 자연어 검색은 문장의 의미와 맥락을 이해하고 유사한 결과를 반환하는 방식
* "가성비 좋은 랩탑 찾고 싶어"처럼 단어가 달라도 의미가 같으면 동일한 검색 결과를 제공
* 의미 기반 검색의 핵심은 문장을 벡터로 변환하고 벡터 간 거리를 계산하는 것
* 프로세스는 텍스트 임베딩 → 벡터 색인 → 질의 처리 및 유사도 검색 순으로 이어짐

<b>텍스트 임베딩</b> : SBERT(Sentence-BERT)로 문서/상품 설명을 수치 벡터로 변환. 의미가 비슷한 문장은 비슷한 벡터로 표현되어 단어가 달라도 유사도 계산이 가능해짐. 기존 BERT보다 빠르고 검색 환경에 최적화된 구조

<b>벡터 색인</b> : 임베딩된 벡터를 FAISS 또는 Elasticsearch 벡터 검색엔진에 저장. FAISS는 Facebook이 개발한 대규모 벡터 검색 라이브러리로 CPU/GPU 모두에서 효율적으로 작동. Elasticsearch는 기존 키워드 검색과 벡터 검색을 함께 통합해서 운영 가능

<b>질의 처리 및 유사도 검색</b> : 사용자가 "출장용 캐리어 추천해줘"처럼 자연어로 입력하면 동일한 SBERT 모델로 질의를 벡터로 변환. 저장된 문서 벡터와 코사인 유사도/내적 방식으로 거리를 계산하고 상위 N개 결과를 반환