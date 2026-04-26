---
title: "지능형 문서 처리"
part: "문서 분석"
partOrder: 3
order: 4
status: "published"
slug: "03-04-intelligent-document-processing"
thumbnail: "/images/docs/ax-planning/03-04-intelligent-document-processing.png"
date: 2023-06-28
---

![지능형 문서 처리 프로세스를 단계별로 나타낸 흐름도. 문서 수집/전처리(Apache NiFi 문서 자동 수집/데이터 파이프라인 구축, Tesseract OCR 텍스트 추출 및 레이아웃 분석), 문서 구조 분석(요소 간 관계 파악, 의미적 분석), 엔터티 추출(spaCy CNN 기반 빠른 처리 속도, Hugging Face Transformer 기반 높은 정확도), 데이터 구조화(Pandas 데이터 처리/정형 변환, PostgreSQL 데이터베이스 저장) 순으로 이어지며, Flask/Django 기반 API 서버를 통해 ERP/CRM/계약 관리 시스템과 연계하고 Apache Airflow로 워크플로우를 자동화하는 구조. 하단에 문서 처리 기술 발전 단계로 DLA(생김새) → DSA(구조/의미) → IDP(엔터티 추출+프로세스 자동화)가 표시됨.](/images/docs/ax-planning/03-04-intelligent-document-processing.png)

* 비정형/반정형 문서에서 데이터를 자동으로 식별하고 추출해 구조화된 데이터로 변환하고, 이를 업무 프로세스에 바로 연결하는 기술
* DLA(생김새 분석)와 DSA(구조/의미 분석)에서 한 단계 더 나아가 엔터티 추출과 비즈니스 프로세스 자동화까지 포함
* 문서 구조 분석에 엔터티 추출과 자동화 프로세스를 선택적으로 추가 구축하는 개념
* 프로세스는 문서 수집/전처리 → 문서 구조 분석 → 엔터티 추출 → 데이터 구조화 → API 서버 연계 → 워크플로우 자동화 순으로 이어짐

<b>엔터티 추출</b> : spaCy(CNN 기반, 빠른 처리 속도)와 Hugging Face Transformers(Transformer 기반, 높은 정확도)가 대표적인 도구. 대량 데이터는 spaCy로 신속히 처리하고, 중요도/리스크가 높은 데이터에만 Hugging Face를 추가 적용하는 상호 보완적 구성이 실무에서 효과적

<b>데이터 구조화 및 저장</b> : Pandas로 처리해 JSON 또는 구조화된 데이터로 구성 후 PostgreSQL에 저장. Apache Airflow로 전체 데이터 처리 과정을 자동화

<b>시스템 연계 및 자동화</b> : Flask/Django 기반 API 서버로 ERP, CRM, 계약 관리 시스템 등 비즈니스 시스템에 데이터를 제공하고 비즈니스 로직에 따라 자동으로 업무 처리

실사례: 대출 신청서를 Apache NiFi로 자동 수집 → Tesseract OCR로 텍스트 추출 → LayoutParser로 구조 분석 → spaCy로 대출 금액/기간 등 핵심 엔터티 자동 추출 → PostgreSQL 저장 → Airflow로 자동화. 수작업 대비 처리 시간을 크게 단축