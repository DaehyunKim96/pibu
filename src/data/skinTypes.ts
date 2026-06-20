// =============================================================================
// pibu · 피부 타입 분류 & 진단 (Skin Type Taxonomy)
// -----------------------------------------------------------------------------
// Baumann Skin Type 체계(유분/수분, 민감/저항, 색소, 주름 4축)를 참고하되,
// pibu의 미션(민감·트러블 피부)에 맞게 7개의 실용 아키타입으로 재구성했다.
// 진단은 4개 축을 점수화해 가장 가까운 아키타입으로 매핑한다.
// (근거·설계 메모는 docs/02-skin-type-taxonomy.md 참고)
// =============================================================================

export type SkinTypeId =
  | 'dry-sensitive'
  | 'oily-sensitive'
  | 'combination-sensitive'
  | 'acne-prone'
  | 'redness-prone'
  | 'barrier-damaged'
  | 'resilient'

export interface SkinType {
  id: SkinTypeId
  name: string
  emoji: string
  tagline: string
  description: string
  /** 대표 특징 */
  traits: string[]
  /** 이 타입이 챙기면 좋은 성분 id */
  recommendIngredients: string[]
  /** 이 타입이 피하거나 조심할 성분 id */
  avoidIngredients: string[]
  /** 케어 팁 */
  careTips: string[]
  color: string
}

export const SKIN_TYPES: SkinType[] = [
  {
    id: 'dry-sensitive',
    name: '건성 민감',
    emoji: '🌵',
    tagline: '당기고 거칠고, 작은 자극에도 따가운',
    description:
      '피지 분비가 적어 늘 당기고 각질이 일어나며, 장벽이 얇아 새 제품에 쉽게 따갑거나 붉어집니다. 핵심은 "빼앗기지 않게" 장벽을 채우고 덮어주는 것.',
    traits: ['세안 후 심한 당김', '각질·푸석함', '겨울에 악화', '발림성 강한 제품에 따가움'],
    recommendIngredients: ['ceramide', 'cholesterol', 'panthenol', 'hyaluronic', 'squalane', 'betaglucan'],
    avoidIngredients: ['alcohol', 'sls', 'aha', 'fragrance'],
    careTips: [
      '아미노산계 등 순한 클렌저로 짧게 세안하고 미온수를 쓰세요.',
      '토너 → 히알루론산 세럼 → 세라마이드 크림 순으로 "수분 위에 보습막" 레이어링.',
      '각질이 일어도 강한 스크럽 대신 보습으로 정돈하세요.',
    ],
    color: '#4a7fb5',
  },
  {
    id: 'oily-sensitive',
    name: '지성 민감',
    emoji: '💧',
    tagline: '번들거리는데 속은 예민한',
    description:
      '피지는 많지만 장벽은 약한 "겉기름 속건조"형. 강한 피지 제거 제품에 오히려 자극받아 더 번들거리는 악순환에 빠지기 쉽습니다.',
    traits: ['T존 번들거림', '모공·블랙헤드', '강한 클렌저에 속당김', '여름에 악화'],
    recommendIngredients: ['niacinamide', 'zinc', 'greentea', 'heartleaf', 'betaglucan', 'squalane'],
    avoidIngredients: ['alcohol', 'essentialoil', 'sls'],
    careTips: [
      '하루 두 번까지만 세안하고 탈각질형 강한 클렌저는 피하세요.',
      '오일프리·논코메도제닉 수분 제품으로 가볍게 보습하세요.',
      '나이아신아마이드로 피지·모공을, 산화아연 선크림으로 진정+차단을 함께.',
    ],
    color: '#5b8a72',
  },
  {
    id: 'combination-sensitive',
    name: '복합 민감',
    emoji: '🌗',
    tagline: 'T존은 번들, 볼은 당기는',
    description:
      'T존은 유분이 많고 U존(볼)은 건조한 복합형이면서 자극에도 예민합니다. 부위별로 다른 케어가 필요합니다.',
    traits: ['T존 유분 + 볼 건조', '계절 따라 변동', '부분 트러블', '제품 적응이 까다로움'],
    recommendIngredients: ['niacinamide', 'panthenol', 'hyaluronic', 'centella', 'betaglucan'],
    avoidIngredients: ['alcohol', 'fragrance', 'sls'],
    careTips: [
      '볼은 보습 크림, T존은 가벼운 젤로 "존별 멀티 모이스처라이징".',
      '전체 자극을 줄이는 진정 토너/세럼을 베이스로 깔아주세요.',
      '주 1회 정도만 부분 각질 관리(BHA를 T존에).',
    ],
    color: '#6b8fa3',
  },
  {
    id: 'acne-prone',
    name: '트러블·여드름',
    emoji: '🔴',
    tagline: '반복되는 뾰루지와 좁쌀',
    description:
      '피지·각질·여드름균·염증이 얽혀 면포와 화농성 트러블이 반복됩니다. 자극을 더하지 않으면서 모공을 비우고 염증을 가라앉히는 균형이 중요합니다.',
    traits: ['좁쌀·화농성 트러블', '모공 막힘', '울긋불긋 흔적', '유분과 함께 속건조도'],
    recommendIngredients: ['bha', 'niacinamide', 'azelaic', 'zinc', 'heartleaf', 'fattyacid'],
    avoidIngredients: ['essentialoil', 'alcohol', 'fragrance'],
    careTips: [
      'BHA로 모공 속 피지를, 아젤라산/나이아신아마이드로 염증·흔적을 케어하세요.',
      '"논코메도제닉" 표기와 가벼운 제형 위주로 고르세요.',
      '터뜨리지 말고, 한 번에 여러 강한 활성을 겹치지 마세요(자극 누적).',
    ],
    color: '#c0584f',
  },
  {
    id: 'redness-prone',
    name: '홍조·붉음',
    emoji: '🌹',
    tagline: '쉽게 붉어지고 열감이 오르는',
    description:
      '온도 변화·맵고 뜨거운 음식·각질제거에 얼굴이 쉽게 붉어지고 화끈거립니다. 혈관이 예민한 타입으로, 진정과 항염, 자극 회피가 최우선입니다.',
    traits: ['볼·코 홍조', '열감·화끈거림', '자극에 즉각 빨개짐', '주사(rosacea) 경향'],
    recommendIngredients: ['centella', 'madecassoside', 'azelaic', 'greentea', 'panthenol', 'zinc'],
    avoidIngredients: ['alcohol', 'essentialoil', 'aha', 'fragrance'],
    careTips: [
      '뜨거운 물·사우나·과한 각질제거 등 혈관을 자극하는 요인을 줄이세요.',
      '병풀·아젤라산 등 항홍조 성분을 꾸준히, 미온/찬물 세안.',
      '물리적(산화아연) 자외선 차단으로 햇빛 자극을 막으세요.',
    ],
    color: '#cf6f7e',
  },
  {
    id: 'barrier-damaged',
    name: '장벽 손상·아토피 경향',
    emoji: '🩹',
    tagline: '뭘 발라도 따갑고 진정이 안 되는',
    description:
      '과한 각질제거·잦은 시술·아토피 등으로 장벽이 무너져 거의 모든 제품에 따갑고 가렵고 건조합니다. 활성 성분을 멈추고 "장벽 재건"에만 집중할 시기입니다.',
    traits: ['전반적 따가움·가려움', '심한 건조·각질', '홍반·진물 경향', '새 제품 대부분 자극'],
    recommendIngredients: ['ceramide', 'cholesterol', 'fattyacid', 'panthenol', 'madecassoside', 'betaglucan'],
    avoidIngredients: ['retinol', 'aha', 'bha', 'vitaminc', 'alcohol', 'fragrance', 'essentialoil'],
    careTips: [
      '모든 기능성 활성을 잠시 중단하고 세라마이드+판테놀 보습에만 집중(스킨 다이어트).',
      '성분 수가 적은 무향 더마 제품으로 단순화하세요.',
      '2~4주에도 호전이 없거나 진물·심한 가려움이 있으면 피부과 진료를 권합니다.',
    ],
    color: '#9b7b5b',
  },
  {
    id: 'resilient',
    name: '건강·정상',
    emoji: '🌿',
    tagline: '비교적 튼튼하고 트러블이 적은',
    description:
      '장벽이 비교적 튼튼해 대부분의 제품을 잘 견딥니다. 지금의 건강함을 유지하면서 항산화·자외선 차단으로 예방 케어에 집중하면 좋습니다.',
    traits: ['자극에 비교적 강함', '트러블이 적음', '수분·유분 균형', '제품 적응이 쉬움'],
    recommendIngredients: ['vitaminc', 'vitamine', 'niacinamide', 'greentea', 'bakuchiol', 'ferulic'],
    avoidIngredients: ['fragrance'],
    careTips: [
      '예방이 핵심 — 매일 자외선 차단과 항산화(비타민 C/E)를 챙기세요.',
      '바쿠치올·레티놀 등으로 안티에이징 예방 케어를 시작해도 좋습니다.',
      '튼튼해도 과한 각질제거는 장벽을 무너뜨리니 적당히.',
    ],
    color: '#5b8a72',
  },
]

export const SKIN_TYPES_BY_ID: Record<SkinTypeId, SkinType> = Object.fromEntries(
  SKIN_TYPES.map((t) => [t.id, t]),
) as Record<SkinTypeId, SkinType>

// ─────────────────────────── 진단 퀴즈 ───────────────────────────
// 4개 축으로 점수를 모은 뒤 아키타입으로 매핑한다.
//  - oil: 유분 (음수=건성, 양수=지성)
//  - sensitivity: 민감도 (높을수록 예민)
//  - acne: 트러블 경향
//  - redness: 홍조 경향
export interface QuizOption {
  label: string
  scores: Partial<Record<'oil' | 'sensitivity' | 'acne' | 'redness' | 'barrier', number>>
}

export interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
}

export const QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: '세안 후 아무것도 바르지 않으면 30분 뒤 피부는?',
    options: [
      { label: '심하게 당기고 각질이 일어난다', scores: { oil: -2, sensitivity: 1 } },
      { label: '약간 당기지만 곧 괜찮다', scores: { oil: -1 } },
      { label: 'T존만 번들거리고 볼은 당긴다', scores: { oil: 0 } },
      { label: '금세 번들거린다', scores: { oil: 2 } },
    ],
  },
  {
    id: 'q2',
    question: '새로운 화장품을 발랐을 때 보통?',
    options: [
      { label: '자주 따갑거나 붉어진다', scores: { sensitivity: 2, barrier: 1 } },
      { label: '가끔 제품에 따라 반응한다', scores: { sensitivity: 1 } },
      { label: '거의 문제 없다', scores: { sensitivity: -1 } },
    ],
  },
  {
    id: 'q3',
    question: '얼굴에 뾰루지·좁쌀 트러블이 올라오는 빈도는?',
    options: [
      { label: '거의 항상 어딘가 나 있다', scores: { acne: 2, oil: 1 } },
      { label: '생리 주기·컨디션 따라 가끔', scores: { acne: 1 } },
      { label: '거의 나지 않는다', scores: { acne: -1 } },
    ],
  },
  {
    id: 'q4',
    question: '덥거나 매운 걸 먹거나 각질제거를 하면?',
    options: [
      { label: '볼·코가 금방 붉어지고 화끈거린다', scores: { redness: 2, sensitivity: 1 } },
      { label: '약간 붉어졌다 가라앉는다', scores: { redness: 1 } },
      { label: '별 변화 없다', scores: { redness: -1 } },
    ],
  },
  {
    id: 'q5',
    question: '요즘 피부 컨디션을 한마디로 표현하면?',
    options: [
      { label: '뭘 발라도 따갑고 진정이 안 된다', scores: { barrier: 3, sensitivity: 2 } },
      { label: '건조하고 푸석하다', scores: { oil: -1, sensitivity: 1 } },
      { label: '번들거리고 모공이 신경 쓰인다', scores: { oil: 1, acne: 1 } },
      { label: '대체로 안정적이다', scores: { sensitivity: -1 } },
    ],
  },
  {
    id: 'q6',
    question: '각질·피지가 가장 신경 쓰이는 부위는?',
    options: [
      { label: '볼·입가 건조와 각질', scores: { oil: -1 } },
      { label: 'T존 유분과 모공', scores: { oil: 1 } },
      { label: 'T존 유분 + 볼 건조 둘 다', scores: { oil: 0 } },
      { label: '딱히 없다', scores: {} },
    ],
  },
]

export interface QuizResult {
  oil: number
  sensitivity: number
  acne: number
  redness: number
  barrier: number
}

/** 점수 결과를 7개 아키타입 중 하나로 매핑 */
export function classifySkinType(r: QuizResult): SkinTypeId {
  // 1순위: 장벽 손상 (가장 시급)
  if (r.barrier >= 3) return 'barrier-damaged'
  // 2순위: 트러블 경향
  if (r.acne >= 2) return 'acne-prone'
  // 3순위: 홍조 경향
  if (r.redness >= 2) return 'redness-prone'

  const sensitive = r.sensitivity >= 1
  if (!sensitive) return 'resilient'

  // 민감 + 유분 축으로 분기
  if (r.oil <= -1) return 'dry-sensitive'
  if (r.oil >= 1) return 'oily-sensitive'
  return 'combination-sensitive'
}

export function emptyResult(): QuizResult {
  return { oil: 0, sensitivity: 0, acne: 0, redness: 0, barrier: 0 }
}
