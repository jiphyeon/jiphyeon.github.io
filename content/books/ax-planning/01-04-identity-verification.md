---
title: "신분증 인증"
part: "회원 가입"
partOrder: 1
order: 4
status: "published"
slug: "01-04-identity-verification"
thumbnail: "/images/docs/ax-planning/01-04-identity-verification.png"
date: 2024-01-20
---

<img
  src="/images/docs/ax-planning/01-04-identity-verification.png"
  alt="YOLO 및 R-CNN 기반 객체 탐지, OCR 추출, 홀로그램 및 딥페이크 분석을 통한 위변조 검증 후 신뢰도 점수로 진본 여부를 판정하는 신분증 인증 프로세스"
  class="img-small">

* 금융 거래, 민원 신청 등 디지털 환경에서 신분증 기반 신원 확인이 보편화되고 있음
* 신용카드 등록과 비슷한 흐름이지만 신분증은 더 많은 정보를 담고 있고 레이아웃도 제각각이라 난이도가 더 높음
* 프로세스는 객체 탐지 → 신분증 분석 → 위변조 검증 → 신뢰도 평가 순서로 이어짐

<b>객체 탐지</b> : OpenCV로 이미지 전처리 후, YOLO로 신분증 전체를 빠르게 탐지하고 Faster R-CNN으로 이름, 생년월일 등 세부 영역을 정밀하게 탐지. 이후 Tesseract OCR로 텍스트를 추출. 신분증은 종류가 다양해서 LayoutParser만으로는 한계가 있어 객체 탐지 모델을 병행하는 방식이 필요

<b>위변조 검증</b> : CNN 모델로 홀로그램, 워터마크, 보안 패턴 등 신분증 표면의 보안 요소를 분석. 딥페이크 탐지로 사진 합성, 변조 여부도 확인. 포토샵이나 GAN으로 조작된 이미지는 EXIF 메타데이터에 이상이 생기는데, ExifTool로 이를 탐지

<b>신뢰도 평가</b> : 위변조 가능성을 0~1 범위의 신뢰도 점수로 수치화. 0.75~1.0이면 진본, 0.5~0.75는 미확정, 0.25~0.5는 의심, 0~0.25는 위조로 판정. 실제 전문가 판정 결과와 지속적으로 대조하며 모델을 개선