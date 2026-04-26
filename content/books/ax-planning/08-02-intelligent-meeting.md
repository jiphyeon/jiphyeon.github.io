---
title: "지능형 회의"
part: "음성 인터페이스"
partOrder: 8
order: 2
status: "draft"
slug: "08-02-intelligent-meeting"
thumbnail: "/images/docs/ax-planning/08-02-intelligent-meeting.png"
date: 2025-02-02
---

![지능형 회의 프로세스를 단계별로 나타낸 흐름도. 데이터 수집(회의 초기 참석자 음성 샘플 수집, 실시간 음성 수집), 음성 처리(음성 인식 Whisper STT, 화자 분리 Speaker Diarization, 화자 식별 참석자 매핑) 순으로 이어지며, 실시간 회의 분석 단계에서 주제 모델링/클러스터링(SBERT/LDA/BERTopic, 주제 이탈 감지 및 알림), 발언 통계 분석(화자별 시간/빈도, 발언 불균형 감지 및 피드백), 관련 자료 검색(FAISS/RAG, 관련 문서/대시보드 제시)이 병렬로 수행됨. 회의 종료 후 결과물 생성 단계에서 회의록 자동 생성, 요약본 생성(Transformers), 액션 아이템 추출, 그룹웨어 연동(Slack/Notion/Jira)으로 이어지는 구조.](/images/docs/ax-planning/08-02-intelligent-meeting.png)

* 회의 내용을 AI가 실시간으로 기록하고 요약/키워드 추출/액션 아이템 정리까지 자동화하는 시스템
* 회의록 작성 인력과 리소스를 줄이고, 회의 자체의 질을 실시간으로 진단/개선
* 프로세스는 음성 수집 → 음성 처리(STT/화자 분리/화자 식별) → 실시간 회의 분석 → 회의 종료 후 결과물 생성 순으로 이어짐

<b>음성 처리</b> : Whisper STT로 실시간 음성을 텍스트로 변환. 화자 분리(Speaker Diarization)로 누가 어떤 말을 했는지 구분. pyannote-audio가 대표 오픈소스 도구. 화자 식별은 회의 시작 전 참석자 음성 샘플을 수집하거나 자기소개를 유도하여 이름을 매핑하는 방식으로 처리

<b>실시간 회의 분석</b>
* <b>요약 생성</b> : HuggingFace Transformers/Pegasus로 실시간 요약 및 주요 키워드 추출
* <b>발언 통계 분석</b> : 화자별 발언 횟수/시간을 집계해 특정 화자가 70% 이상 발언 시 편중 알림 제공
* <b>주제 모델링/클러스터링</b> : SBERT/MiniLM으로 문장 임베딩 후 K-means/HDBSCAN으로 클러스터링. LDA/BERTopic으로 주제 모델링. 주제 이탈 감지 시 알림 메시지 제공
* <b>관련 자료 검색</b> : 회의 중 언급된 내용을 FAISS 벡터 검색으로 관련 문서/대시보드를 실시간으로 참석자 화면에 제공. 심층 조사는 RAG 모델 활용

<b>회의 종료 후 결과물 생성</b> : 참석자별 발언이 구분된 회의록 자동 생성. 요약본 생성. 액션 아이템 추출(자동 인식, 담당자/기한 등을 정리). Slack/Notion/Jira 등 그룹웨어 연동으로 즉시 공유