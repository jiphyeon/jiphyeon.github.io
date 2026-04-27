---
title: "AI 아바타 생성"
part: "회원 가입"
partOrder: 1
order: 8
status: "published"
slug: "01-08-ai-avatar-generation"
thumbnail: "/images/docs/ax-planning/01-08-ai-avatar-generation.jpg"
date: 2024-02-25
---

<img
  src="/images/docs/ax-planning/01-08-ai-avatar-generation.png"
  alt="얼굴 특징점 추출(MediaPipe, dlib)과 스타일 기반 생성(DreamBooth, ControlNet)을 거쳐 품질 개선 및 최적화를 통해 최종 AI 아바타를 생성하는 프로세스 흐름도"
  class="img-small">

* 사용자 프로필 이미지를 캐릭터 형태로 자동 생성하는 기능
* 단순 필터이나 보정이 아니라 얼굴 특징을 분석해 스타일을 반영한 새로운 이미지를 만들어냄
* 온라인 프로필, 커뮤니티, 게임 플랫폼 등에서 자아 표현 수단으로 각광받고 있으며 서비스 초기 몰입도에도 긍정적인 영향
* 프로세스는 입력 이미지 전처리 → 얼굴 특징점 추출 → 스타일 기반 이미지 생성 → 결과물 후처리 및 제공 순으로 진행

<b>입력 이미지 전처리</b> : 업로드된 사진을 모델이 요구하는 해상도로 리사이징하고, 얼굴이 중심에 오도록 크롭, 패딩 처리. OpenCV로 얼굴 영역을 검출하고 노이즈 제거, 밝기 보정을 거쳐 이후 단계의 정확도를 높임

<b>얼굴 특징점 추출</b> : MediaPipe Face Mesh(468개 랜드마크)로 눈동자·콧망울·입술 등 세밀한 특징점을 추출하거나, dlib(68개 랜드마크)으로 가볍게 주요 부위만 추출. 추출된 특징점은 조건 기반 스타일링 마스크나 포즈 제어용 가이드로도 활용

<b>스타일 기반 이미지 생성</b> : 핵심 단계. 주로 Stable Diffusion 기반의 DreamBooth를 활용해 사용자 얼굴을 학습시키고 "a [V] person in anime style" 같은 프롬프트로 스타일 아바타를 생성. ControlNet을 쓰면 얼굴 랜드마크에서 윤곽선/깊이 맵을 추출하여 원본 구조를 유지한 상태로 스타일을 입힐 수 있음

<b>결과물 후처리 및 제공</b> : 해상도 향상(Super Resolution), 노이즈 제거, 배경 제거 등 품질 개선 후 PNG·JPEG·WebP 등 다양한 포맷으로 저장. 이미지 생성은 계산이 많이 필요해서 Celery로 비동기 처리하고 Redis로 작업 상태를 관리. 생성된 여러 아바타 옵션을 사용자에게 보여주고 선택하게 함