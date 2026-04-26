---
title: "신용카드 등록"
part: "회원 가입"
partOrder: 1
order: 3
status: "published"
slug: "01-03-credit-card-registration"
thumbnail: "/images/docs/ax-planning/01-03-credit-card-registration.png"
date: 2024-01-14
---

<img
  src="/images/docs/ax-planning/01-03-credit-card-registration.png"
  alt="이미지 전처리, OCR 추출, 유효성 검증 및 머신러닝 기반 이상 탐지를 포함한 단계별 신용카드 등록 및 보안 인증 프로세스 흐름도"
  class="img-small">


* 기존에는 카드 번호, 만료일, CVV 코드를 직접 입력해야 해서 오류와 보안 문제가 자주 발생
* 스마트폰 카메라로 카드를 촬영하면 AI가 자동으로 정보를 읽고 등록하는 방식으로 개선
* 프로세스는 이미지 전처리 → 텍스트 추출(OCR) → 유효성 검증 → 신용카드 정보 조회 및 이상 탐지 순서로 이어짐

<b>이미지 전처리</b> : 스마트폰 카메라로 카드를 촬영하면 OpenCV로 이미지 대비와 기울기를 보정하고, TensorFlow EAST 모델로 카드 번호 영역을 자동 감지. OCR 정확도를 높이기 위한 준비 단계

<b>텍스트 추출(OCR)</b> : 전처리된 이미지에서 카드 번호, 만료일, 카드사 로고 등을 OCR로 인식. 신용카드 정보는 외부 전송 시 보안 문제가 생길 수 있어 클라우드 기반 OCR보다 단말기 내에서 처리하는 방식이 권장됨

<b>유효성 검증</b> : Luhn 알고리즘으로 카드 번호가 유효한지 체크섬 계산을 통해 검증. 입력 오류나 존재하지 않는 카드 번호를 걸러내는 단계

<b>신용카드 정보 조회 및 이상 탐지</b> : 카드 데이터베이스를 조회해 발급 국가·카드 유형을 확인하고, Scikit-learn으로 부정 사용, 도난 카드 등록 여부를 머신러닝으로 탐지. 카드 정보, 사용자 IP, 위치 데이터, 등록 패턴 등을 종합 분석하며, 이상 징후가 감지되면 Face ID·지문 인식·OTP 등 추가 인증을 요구