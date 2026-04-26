---
title: "키워드 검색"
part: "검색"
partOrder: 4
order: 1
status: "draft"
slug: "04-01-keyword-search"
thumbnail: "/images/docs/ax-planning/ax-planning.jpg"
date: 2024-04-26
---

![얼굴 인증 프로세스를 단계별로 나타낸 흐름도. 얼굴 탐지(카메라로 얼굴 이미지 획득, OpenCV DNN 모듈, YOLO 얼굴 영역 탐지), 얼굴 벡터 추출(FaceNet으로 벡터 변환, 대안 모델 ArcFace·CosFace, 경량 모델 dlib), 얼굴 벡터 저장(사용자 ID와 함께 저장, 원본 이미지 미저장) 순으로 이어지며, 유사도 분석 단계에서 유클리드 거리 계산(두 벡터 간 직선 거리 측정)과 임계값 기반 판정(0.5 이하면 동일 인물로 판단)으로 인증 여부를 결정. 대규모 시스템에서는 FaceNet·ArcFace 모델과 FAISS·Annoy 벡터 검색을 조합해 밀리초 단위 빠른 매칭을 구현하는 구조..](/images/docs/ax-planning/01-06-face-authentication.png)