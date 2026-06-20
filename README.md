# 🌿 pibu

> 민감·트러블 피부를 위한 **성분 기반 제품 큐레이션** 서비스

브랜드의 마케팅이 아니라 **전성분과 피부과학 근거**로 제품의 특성을 풀어 설명하고,
사용자가 자신의 피부 타입에 맞는 제품을 안심하고 고를 수 있도록 돕습니다.

---

## ✨ 핵심 기능

| 기능 | 설명 |
| --- | --- |
| **제품 큐레이션** | 시중 대표 제품의 전성분을 분석 → 특성 태그 · 피부 키워드 · 적합 타입 매핑 |
| **자세히 보기** | "○○ 성분 때문에 ○○한 특성을 가진다" 형식으로 근거를 투명하게 설명 |
| **성분 사전** | 진정·장벽·활성·항산화·주의 성분별 작용 원리 + 논문 근거 + 민감 피부 적합도 |
| **피부 타입 진단** | 유분·민감도·트러블·홍조 4축 진단 → 7가지 타입 분류 → 타입별 성분/제품 추천 |
| **트러블 가이드** | 예민한 피부가 지켜야 할 피부과학 원칙 6가지 |

## 🛠 기술 스택

- **React 18 + TypeScript + Vite** — 데이터 중심 SPA
- **React Router** — 페이지 라우팅
- 순수 CSS 디자인 시스템 (외부 UI 라이브러리 없음)

## 🚀 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 📁 구조

```
src/
├─ data/
│  ├─ ingredients.ts   # 성분 지식베이스 (작용·근거·적합도)
│  ├─ products.ts      # 제품 DB (성분→특성→키워드→타입 매핑)
│  └─ skinTypes.ts     # 피부 타입 분류 + 진단 로직
├─ pages/
│  ├─ HomePage / ProductsPage / ProductDetailPage
│  ├─ IngredientsPage / SkinTypePage / GuidePage
├─ components/ProductCard.tsx
└─ styles.css          # 디자인 시스템
```

## 📚 기획·리서치 기록 (`docs/`)

내가 리서치하고 기획하고 판단한 내용을 모두 마크다운으로 남겼습니다.

- [`docs/00-overview.md`](docs/00-overview.md) — 서비스 개요·범위·핵심 가설
- [`docs/01-ingredient-research.md`](docs/01-ingredient-research.md) — 성분 리서치와 근거 문헌
- [`docs/02-skin-type-taxonomy.md`](docs/02-skin-type-taxonomy.md) — 피부 타입 분류 설계
- [`docs/03-product-data.md`](docs/03-product-data.md) — 제품 데이터 수집 방법론
- [`docs/04-design.md`](docs/04-design.md) — 디자인 리서치와 결정
- [`docs/05-roadmap-collaboration.md`](docs/05-roadmap-collaboration.md) — **앞으로 함께 발전시키는 방법**
- [`docs/decision-log.md`](docs/decision-log.md) — 주요 판단 기록 (ADR)

## ⚠️ 면책

pibu의 정보는 교육·참고용이며 의학적 진단·처방을 대체하지 않습니다.
현재 제품/성분 데이터는 공개 전성분과 검증된 피부과학 지식을 바탕으로 한 **큐레이션 데이터셋**으로,
실제 크롤링 데이터로 교체 가능하도록 구조화되어 있습니다.
