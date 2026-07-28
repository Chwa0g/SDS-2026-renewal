# 🗺️ 프로젝트 빌드 파일 대입 맵 (File-to-File Build Mapping Guide)

> **프로젝트**: Samsung SDS Renewal  
> **목적**: `app/` 소스 파일 수정 시 **어떤 최종 빌드 파일(`dist/`)에 영향을 주는지 1:1 및 1:N 대입 매핑 정리**

---

## 📌 목차
1. [SCSS ➔ CSS 빌드 파일 대입 맵](#1-scss--css-빌드-파일-대입-맵)
2. [HTML & `.inc` 인클루드 ➔ HTML 빌드 대입 맵](#2-html--inc-인클루드--html-빌드-대입-맵)
3. [JavaScript & 자산 파일 대입 맵](#3-javascript--자산-파일-대입-맵)
4. [한눈에 보는 수정 포인트 요약표](#4-한눈에-보는-수정-포인트-요약표)

---

## 1. SCSS ➔ CSS 빌드 파일 대입 맵

언더바(`_`)로 시작하는 부분 소스 파일(Partial)을 수정하면, 해당 소스를 `@import`로 수집하고 있는 **엔트리 SCSS 파일들이 컴파일되어 `dist/static/css/`로 생성**됩니다.

### 📍 SCSS 파일별 CSS 빌드 매핑표

| 내가 수정하는 SCSS 소스 파일 (`app/static/scss/`) | 빌드 시 생성/업데이트되는 CSS 파일 (`dist/static/css/`) | 설명 및 영향 범위 |
| :--- | :--- | :--- |
| 🛠️ **`page/_layout.scss`** | ➔ **`layout.css`**<br>➔ **`common_renew.css`** | **[푸터 / 헤더 / 레이어 모달 / 기본 틀]**<br>수정 시 `layout.css`와 `common_renew.css` 2개에 동시 반영 |
| 🛠️ **`page/_base.scss`** | ➔ **`layout.css`**<br>➔ **`common_renew.css`** | **[기본 폰트 / 리셋 / 공통 스타일]**<br>수정 시 `layout.css`와 `common_renew.css` 2개에 동시 반영 |
| 🛠️ **`page/_component.scss`** | ➔ **`component.css`**<br>➔ **`common_renew.css`** | **[버튼 / 카드 / 폼 요소]**<br>수정 시 `component.css`와 `common_renew.css` 2개에 동시 반영 |
| 🛠️ **`page/_main.scss`** | ➔ **`main.css`**<br>➔ **`common_renew.css`** | **[메인 페이지 전용 스타일]**<br>수정 시 `main.css`와 `common_renew.css` 2개에 동시 반영 |
| 🛠️ **`page/_insight.scss`** | ➔ **`insight.css`**<br>➔ **`common_renew.css`** | **[인사이트 페이지 전용 스타일]**<br>수정 시 `insight.css`와 `common_renew.css` 2개에 동시 반영 |
| 🛠️ **`page/_contact.scss`** | ➔ **`contact.css`**<br>➔ **`common_renew.css`** | **[문의하기 페이지 전용 스타일]**<br>수정 시 `contact.css`와 `common_renew.css` 2개에 동시 반영 |
| 🛠️ **`page/_offer.scss`** | ➔ **`offering.css`**<br>➔ **`common_renew.css`** | **[오퍼링 페이지 전용 스타일]**<br>수정 시 `offering.css`와 `common_renew.css` 2개에 동시 반영 |
| ⚙️ **`sub/_mixin.scss`** | ➔ **모든 CSS 파일 전체** | **[미디어쿼리 및 공통 SCSS 믹스인]**<br>모든 SCSS 컴파일 시 전체 적용됨 |
| ⚙️ **`sub/_function.scss`** | ➔ **모든 CSS 파일 전체** | **[rem(), f-clamp() 단위 계산식]**<br>모든 SCSS 컴파일 시 전체 적용됨 |
| ⚙️ **`sub/_webfont.scss`** | ➔ **`layout.css`**, **`common_renew.css`** | **[웹폰트 @font-face 구문]** |
| ⚙️ **`sub/_swiper.scss`** | ➔ **`component.css`**, **`insight.css`**, **`common_renew.css`** | **[Swiper 슬라이더 커스텀 스타일]** |

---

## 2. HTML & `.inc` 인클루드 ➔ HTML 빌드 대입 맵

`app/inc/*.inc` 조각 마크업 파일을 수정하면, 해당 파일을 주석(`<!--#include virtual="..." -->`)으로 포함하고 있는 **모든 HTML 페이지에 실시간 주입되어 완성형 HTML로 생성**됩니다.

### 📍 HTML 파일별 빌드 매핑표

| 내가 수정하는 소스 파일 (`app/`) | 빌드 시 생성/업데이트되는 최종 HTML 파일 (`dist/`) | 영향 범위 및 주입 메커니즘 |
| :--- | :--- | :--- |
| 🧱 **`app/inc/footer.inc`** | ➔ **`dist/html/dashboard.html`**<br>➔ **`dist/html/main.html`**<br>➔ **`dist/html/**/*.html` 전체** | **[푸터 및 푸터 레이어 모달 팝업 전체]**<br>`<!--#include virtual="/inc/footer.inc" -->` 구문을 사용하는 모든 HTML 페이지의 하단 푸터 위치로 자동 실시간 주입됨 |
| 🧱 **`app/inc/header.inc`** | ➔ **`dist/html/**/*.html` 전체** | **[상단 헤더 및 GNB 메뉴]**<br>모든 HTML 페이지 상단 헤더 위치로 자동 주입됨 |
| 🧱 **`app/inc/floating.inc`** | ➔ **`dist/html/**/*.html` 전체** | **[우측 플로팅 퀵메뉴]**<br>모든 HTML 페이지 우측 플로팅 위치로 자동 주입됨 |
| 📄 **`app/html/dashboard.html`** | ➔ **`dist/html/dashboard.html`** | 단일 페이지 소스 (`.inc` 파일들이 통합 주입되어 최종 생성됨) |

---

## 3. JavaScript & 자산 파일 대입 맵

자바스크립트 및 에셋 파일들은 **`app/` ➔ `dist/` 로 1:1 파일명과 경로 구조를 그대로 유지하며 복사 동기화**됩니다.

| 내가 수정하는 소스 파일 (`app/`) | 빌드 시 생성되는 파일 (`dist/`) | 변환 방식 |
| :--- | :--- | :--- |
| 📜 **`app/static/js/ui.js`** | ➔ **`dist/static/js/ui.js`** | **1:1 동일 경로 복사** (UI 인터랙션 및 모달 스크립트) |
| 📜 **`app/static/js/lib/*.js`** | ➔ **`dist/static/js/lib/*.js`** | **1:1 동일 경로 복사** (서드파티 라이브러리) |
| 🖼️ **`app/static/images/**/*`** | ➔ **`dist/static/images/**/*`** | **1:1 동일 경로 복사** (이미지 자산 전체) |
| 🔤 **`app/static/fonts/**/*`** | ➔ **`dist/static/fonts/**/*`** | **1:1 동일 경로 복사** (웹폰트 파일 전체) |

---

## 4. 한눈에 보는 수정 포인트 요약표

> 💡 **"내가 이 영역을 고칠 때 어디를 열고 어떤 파일이 출력되는지"** 3초 점검 가이드

```
1) [푸터 텍스트/모달 팝업 추가]
   수정: app/inc/footer.inc
   출력: dist/html/*.html (모든 HTML 페이지에 자동 합체)

2) [푸터 스타일/모달 팝업 디자인 변경]
   수정: app/static/scss/page/_layout.scss
   출력: dist/static/css/layout.css + dist/static/css/common_renew.css (2개 파일에 동시 반영)

3) [푸터 모달/아코디언 JS 기능 변경]
   수정: app/static/js/ui.js
   출력: dist/static/js/ui.js (1:1 복사)
```
