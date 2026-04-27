---
title: "혼잡도 분석"
part: "위치 및 공간"
partOrder: 9
order: 2
status: "published"
slug: "09-02-crowd-analysis"
thumbnail: "/images/docs/ax-planning/09-02-crowd-analysis.png"
date: 2025-02-13
---

<img
  src="/images/docs/ax-planning/09-02-crowd-analysis.png"
  alt="혼잡도 분석 프로세스를 단계별로 나타낸 흐름도. 데이터 수집 및 저장(시간적 데이터 승하차 기록/방문 시간/체크인, 공간적 데이터 GPS 좌표/센서/CCTV 카운팅, 비정형 데이터 리뷰/SNS/포털 검색 트렌드, 저장 기술 PostgreSQL/PostGIS/Redis/Kafka 공간 인덱스 R-Tree), 시계열 데이터 분석(Pandas 시간 단위 집계, 커널 밀도 추정 KDE 시간대별 밀도 패턴 분석, scikit-learn 이상 탐지/예측 모델 구축), 공간 데이터 분석(GeoPandas 공간 데이터프레임 처리, 공간 연산 .within()/.intersects()/.distance(), PostGIS/Shapely/Fiona/Pyproj), 밀도 추정 및 패턴 분석(KDE 혼잡도 곡선 생성, 머신러닝 다차원 밀도 추정, FAISS 유사 혼잡 패턴 장소 검색, 시각화 Matplotlib/Folium/Plotly), 실시간 처리 및 서비스 적용(Kafka/Redis Streams 실시간 처리, 경로 추천/혼잡 알림/방문 최적화 서비스) 순으로 이어지는 구조."
  class="img-small">

* 특정 시간대에 도로/대중교통/공간이 얼마나 붐비는지를 예측하거나 실시간으로 파악해 서비스에 반영하는 분석
* 단순히 "사람이 많다/적다"가 아니라 밀도의 추이, 체류 시간, 분포 특성까지 분석
* 프로세스는 데이터 수집 및 저장 → 시계열 데이터 분석 → 공간 데이터 분석 → 밀도 추정 및 패턴 분석 → 실시간 처리 및 서비스 적용 순으로 이어짐

<b>데이터 수집 및 저장</b> : 시간적 데이터(승하차 기록, 방문 시간, 체크인), 공간적 데이터(GPS 좌표, 센서, CCTV 인원 카운팅), 비정형 데이터(리뷰, SNS, 포털 검색 트렌드)를 수집. PostgreSQL/PostGIS로 공간 데이터 저장, Redis로 빠른 조회, Kafka로 실시간 스트리밍 처리

<b>시계열 데이터 분석</b> : Pandas로 시간 단위 집계. scikit-learn 이상 탐지로 비정상 혼잡 자동 감지. 커널 밀도 추정(KDE)으로 연속적인 혼잡도 곡선 생성. 수치 대신 사이 시간대까지 반영하여 혼잡도 추이 반영

<b>공간 데이터 분석</b> : GeoPandas로 지리 정보 처리. .within(), .intersects(), .distance() 같은 공간 연산으로 어떤 지점이 어느 구역에 속하는지, 두 지점 간 거리가 얼마인지 계산. PostGIS의 ST_Contains(), ST_Distance() 등도 활용. Shapely(기하학적 연산), Fiona(공간 파일 읽기/저장), Pyproj(좌표계 변환)와 연동

<b>밀도 추정 및 패턴 분석</b> : KDE로 시간대별/공간별 밀도 패턴 파악. 머신러닝 모델로 시간대/요일/날씨/지역 이벤트 등 외부 요인을 결합한 다차원 밀도 추정. FAISS로 유사 혼잡 패턴을 가진 장소 검색. Matplotlib/Folium/Plotly로 지도 위에 혼잡도를 색상/크기로 시각화

<b>실시간 처리 및 서비스 적용</b> : Kafka/Redis Streams로 실시간 데이터 처리 및 이벤트 감지. 경로 추천, 장소 추천, 혼잡 알림, 대안 경로 제안, 시간대별 방문 최적화에 활용
