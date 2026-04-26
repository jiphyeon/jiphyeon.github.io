---
title: "키워드 검색"
part: "검색"
partOrder: 4
order: 1
status: "draft"
slug: "04-01-keyword-search"
thumbnail: "/images/docs/ax-planning/04-01-keyword-search.png"
date: 2024-07-17
---

![키워드 검색 프로세스를 단계별로 나타낸 흐름도. 색인 단계(데이터 수집, 토큰화/형태소 분석, 역색인 구축, Elasticsearch 저장/갱신), 검색 질의 처리(검색어 입력, 토큰화/전처리, 검색 쿼리 구성 Match/Multi-match, 가중치 조정 Boost/Bool Query), 검색 결과 처리 및 정렬(관련도 평가 TF-IDF/BM25, 결과 정렬, 점수 조정 Function Score Query) 순으로 이어지며, 검색 결과 출력 및 품질 개선 단계에서 RESTful API(JSON) 결과 전달, 검색 로그 수집(Filebeat/Logstash), 자동완성(Completion Suggester), 검색 행동 분석(Kibana)으로 지속 개선하는 구조.](/images/docs/ax-planning/04-01-keyword-search.png)

* 사용자가 입력한 단어와 일치하거나 유사한 항목을 찾아 반환하는 가장 기초적이고 전통적인 검색 방식
* 단순하고 직관적이라 지금도 가장 많이 사용됨. 정확히 어떤 단어를 썼는가 여부가 결과에 직접 영향
* 검색 품질을 높이려면 동의어 처리, 형태소 분석, 검색어 확장 등의 전처리가 필수
* 프로세스는 색인 단계 → 검색 질의 처리 → 검색 결과 처리 및 정렬 → 검색 결과 출력 및 품질 개선 순으로 이어짐

<b>색인 단계</b> : 상품명, 설명, 카테고리 등 검색 대상 데이터를 수집해 형태소 분석으로 토큰화하고, 역색인(단어 → 문서 매핑) 구조로 Elasticsearch에 저장. 역색인은 '가방 → A, B, D' 형태로 단어가 어느 문서에 등장했는지 미리 정리해두는 구조로, 검색 속도를 크게 높이는 핵심 기술

<b>검색 질의 처리</b> : 사용자가 입력한 검색어를 의미 단위로 분리(토큰화/전처리)하고 Match/Multi-match 쿼리로 변환. 상품명에 가중치 3, 카테고리에 가중치 2처럼 필드별 가중치(Boost)를 설정해 검색 정확도를 조정

<b>검색 결과 처리 및 정렬</b> : TF-IDF/BM25 알고리즘으로 검색어와 문서 간의 연관도를 점수로 산출하고, 관련도순/최신순/가격순 등으로 정렬. Function Score Query로 랭킹을 세밀하게 조정

<b>검색 품질 개선</b> : 동의어 처리(노트북 → 랩탑/울트라북), 검색어 확장(의미 연관 키워드 자동 추가), 자동완성(Completion Suggester), 검색 로그 수집(Filebeat/Logstash), 행동 분석(Kibana)으로 지속 개선