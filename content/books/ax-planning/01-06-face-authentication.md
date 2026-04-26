---
title: "얼굴 인증"
part: "회원 가입"
partOrder: 1
order: 6
status: "published"
slug: "01-06-face-authentication"
thumbnail: "/images/docs/ax-planning/01-06-face-authentication.png"
date: 2024-02-19
---

![얼굴 인증 프로세스를 단계별로 나타낸 흐름도. 얼굴 탐지(카메라로 얼굴 이미지 획득, OpenCV DNN 모듈, YOLO 얼굴 영역 탐지), 얼굴 벡터 추출(FaceNet으로 벡터 변환, 대안 모델 ArcFace·CosFace, 경량 모델 dlib), 얼굴 벡터 저장(사용자 ID와 함께 저장, 원본 이미지 미저장) 순으로 이어지며, 유사도 분석 단계에서 유클리드 거리 계산(두 벡터 간 직선 거리 측정)과 임계값 기반 판정(0.5 이하면 동일 인물로 판단)으로 인증 여부를 결정. 대규모 시스템에서는 FaceNet·ArcFace 모델과 FAISS·Annoy 벡터 검색을 조합해 밀리초 단위 빠른 매칭을 구현하는 구조.](/images/docs/ax-planning/01-06-face-authentication.png)

* 비밀번호나 패턴 입력과 달리 별다른 동작 없이 즉시 인증 가능해 빠르고 편리함
* 애플 Face ID가 3D 얼굴 인증 대중화. 기술 자체는 그 이전부터 다양한 형태로 존재
* 모바일 앱은 OS 기본 API(iOS: LocalAuthentication, Android: BiometricPrompt)로 손쉽게 구현 가능. 커스텀 구현이 필요한 경우 얼굴 탐지 → 벡터 추출 → 저장 → 유사도 분석 순으로 진행

<b>얼굴 탐지</b> : 카메라로 입력된 얼굴을 OpenCV의 DNN 모듈과 YOLO로 탐지. YOLO는 이미지를 격자로 나눠 한 번에 얼굴 위치를 찾아내고, 탐지된 좌표를 FaceNet에 전달

<b>얼굴 벡터 추출</b> : FaceNet이 얼굴을 128차원 벡터로 변환. 시각적 비교가 아닌 수학적 계산으로 유사도를 평가하므로 조명이나 각도가 달라져도 안정적. ArcFace, CosFace는 FaceNet보다 정확도가 높은 최신 대안이고, dlib은 서버 부하가 적은 경량 모델

<b>얼굴 벡터 저장</b> : 추출한 벡터를 사용자 ID와 함께 DB에 저장. 원본 이미지는 저장하지 않아 개인정보 보호를 강화

<b>유사도 분석</b> : 로그인 시 새로 촬영한 얼굴을 벡터로 변환해 저장된 벡터와 유클리드 거리로 비교. 거리가 0.5 이하면 동일 인물로 판정. 임계값을 너무 낮게 설정하면 정확도는 높아지지만 본인도 인식 못하는 경우가 생길 수 있어 적절한 조정이 필요. 대규모 시스템에서는 FAISS, Annoy로 수백만 건의 벡터를 밀리초 단위로 빠르게 검색