---
title: "문서 구조 분석"
part: "문서 분석"
partOrder: 3
order: 3
status: "published"
slug: "03-03-document-structure-analysis"
thumbnail: "/images/docs/ax-planning/03-03-document-structure-analysis.png"
date: 2023-06-26
---

![문서 구조 분석 프로세스를 단계별로 나타낸 흐름도. 문서 구성 분석(구성 요소 인식, 시각적 특징 분석), 논리적 구조 분석(요소 간 관계 파악, 계층 구조 분석), 의미적 관계 분석(NLP 기반 분석, 개체명 인식 NER) 순으로 이어지며, 결과물 후처리 단계에서 XML/JSON 형식으로 구조화된 데이터를 저장하고 MySQL/PostgreSQL/BigQuery 등에 적재됨. 소프트웨어 아키텍처는 Apache NiFi(문서 수집/전처리), Tesseract OCR(텍스트 추출), Hugging Face Transformers(NLP 처리), Pandas(데이터 처리/정형 변환), PostgreSQL(데이터베이스 저장), Flask/Django 기반 API 서버, ERP/CRM/계약 관리 시스템 연계, Apache Airflow(워크플로우 자동화)로 구성된 구조. 하단에 문서 처리 기술 발전 단계로 DLA(생김새) → DSA(구조/의미) → IDP(엔터티 추출+프로세스 자동화)가 표시됨.](/images/docs/ax-planning/03-03-document-structure-analysis.png)

* 문서 내 다양한 구성 요소가 어떤 논리적 관계를 맺고 있는지, 의미와 맥락을 어떻게 형성하는지를 분석하는 기술
* 문서 구성 분석(DLA)이 생김새를 분석한다면 문서 구조 분석(DSA)은 요소 간 맥락과 의미를 분석
* 계약서, 청구서, 보고서 등 대량 문서를 처리해야 하는 법률, 금융, 의료 분야에서 핵심적으로 활용
* 프로세스는 문서 구성 분석 → 논리적 구조 분석 → 의미적 관계 분석 → 결과물 후처리 순으로 이어짐

<b>논리적 구조 분석</b> : 제목-본문 구조, 본문-표 연결성 등 요소 간 관계를 파악하고, 섹션/하위 섹션/문단 간 계층 구조를 분석

<b>의미적 관계 분석</b> : Hugging Face Transformers 같은 NLP 기술로 텍스트 요소들 간의 의미적 관계를 분석. 개체명 인식(NER)으로 키워드, 이름, 참조 관계를 파악

<b>결과물 후처리 및 데이터 구조화</b> : Apache Spark/Pandas로 데이터를 정제하고 MySQL/PostgreSQL에 저장. 데이터가 방대하거나 복잡한 쿼리가 필요하면 Amazon Redshift/Google BigQuery 같은 데이터웨어하우스를 활용

<b>소프트웨어 아키텍처</b> : Apache NiFi로 문서 자동 수집 및 데이터 파이프라인 구축, Tesseract OCR로 텍스트 추출, LayoutParser로 레이아웃 분석, Hugging Face Transformers로 NLP 처리, Pandas/PostgreSQL로 데이터 처리 및 저장. Apache Airflow로 전체 워크플로우 자동화

* 실사례로 아마존 KDP는 이 기술을 적용해 원고 업로드 시 여백, 페이지 크기, 이미지 해상도, 글꼴 임베딩 여부 등을 자동 검증