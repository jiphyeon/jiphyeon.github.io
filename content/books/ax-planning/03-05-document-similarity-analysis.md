---
title: "문서 유사도 분석"
part: "문서 분석"
partOrder: 3
order: 5
status: "published"
slug: "03-05-document-similarity-analysis"
thumbnail: "/images/docs/ax-planning/03-05-document-similarity-analysis.png"
date: 2023-08-18
---

<img
  src="/images/docs/ax-planning/03-05-document-similarity-analysis.png"
  alt="문서 유사도 분석 프로세스를 나타낸 흐름도. 유사도 계산 방식은 전통적 방식(n-그램, TF-IDF, 단어 일치 중심)과 딥러닝 방식(문장 임베딩, 의미 중심, 문맥 이해) 두 갈래로 구성됨. 시스템 아키텍처는 텍스트 전처리(spaCy, NLTK, Stanza), 문장 임베딩(Sentence-transformers), 벡터 저장(FAISS, Annoy, Qdrant) 순으로 이어지며, 백엔드(FastAPI, Flask)와 벡터 검색 엔진(FAISS, Annoy, Qdrant), 문서 저장소(Elasticsearch, Weaviate)로 구성된 구조."
  class="img-small">

* 서로 다른 문서 간의 콘텐츠 중복 여부를 판단하는 기술
* 단순한 문장 복사 여부만 확인하는 게 아니라 의미적 유사성까지 분석
* 최근 AI 생성 콘텐츠가 늘면서 직접 복사 없이도 유사한 구조/내용을 따르는 경우가 많아 문맥/개념 수준의 유사성 감지가 중요해짐
* 유사도 계산 방식은 전통적 방식과 딥러닝 방식으로 나뉨

<b>전통적 방식</b> : n-그램 기반으로 문장을 쪼개 일치 여부를 비교하거나 TF-IDF로 벡터화한 후 코사인 유사도로 거리를 측정. 단어 단위가 바뀌거나 문장 구조가 달라지면 유사성을 계산하기 어려운 한계

<b>딥러닝 방식(문장 임베딩)</b> : 문장의 의미를 수치 벡터로 변환하고 벡터 간 거리를 계산. 표현은 달라도 의미가 같은 문장을 유사하다고 판단 가능. Sentence-transformers의 all-MiniLM, distiluse-base-multilingual 같은 모델이 속도/정확도 균형이 좋아 서비스 적용에 적합. 코사인 유사도 계산 방법 자체는 전통적 방식과 같지만, 비교 대상 벡터가 의미 중심의 임베딩이라는 점이 다름

<b>시스템 아키텍처</b> : 텍스트 전처리(spaCy/NLTK/Stanza) → 문장 임베딩(Sentence-transformers) → 벡터 저장(FAISS/Annoy/Qdrant). 백엔드는 FastAPI/Flask로 유사도 분석 API 제공. 참조 문서 저장/관리에는 벡터 검색 기능이 내장된 Elasticsearch/Weaviate가 적합