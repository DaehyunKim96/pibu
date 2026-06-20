// =============================================================================
// pibu · 제품 데이터베이스 (Product Database)
// -----------------------------------------------------------------------------
// 올리브영 등에서 유통되는 대표 제품들의 '공개 전성분'을 기반으로 한 큐레이션.
// 각 제품은 핵심 성분을 성분 지식베이스(ingredients.ts) id로 연결하고,
// 그 성분이 부여하는 '특성'과 '키워드', 적합한 피부 타입을 매핑한다.
// highlights: "~성분 때문에 ~한 특성을 가진다" 형태의 자세히 보기 근거.
// (수집 방법론은 docs/03-product-data.md 참고)
// =============================================================================

import type { SkinTypeId } from './skinTypes'

export type ProductCategory =
  | 'cleanser'
  | 'toner'
  | 'serum'
  | 'moisturizer'
  | 'sunscreen'
  | 'mask'
  | 'treatment'

export interface ProductHighlight {
  /** 성분 id (ingredients.ts) */
  ingredientId: string
  /** 이 성분이 이 제품에서 만들어내는 효과 한 줄 */
  effect: string
}

export interface Product {
  id: string
  brand: string
  name: string
  category: ProductCategory
  /** 대략적 가격(원) */
  priceKRW: number
  volume: string
  /** 카드 썸네일용 이모지 + 그라데이션 색 */
  emoji: string
  gradient: [string, string]
  /** 한 줄 소개 */
  blurb: string
  /** 핵심 성분 id */
  keyIngredients: string[]
  /** 제품에 들어있는 주의 성분 id (있으면 표시) */
  cautionIngredients: string[]
  /** 제품 특성 태그 */
  traits: string[]
  /** 피부 키워드 (해시태그) */
  keywords: string[]
  /** 적합한 피부 타입 */
  bestFor: SkinTypeId[]
  /** 자세히 보기: 성분→특성 근거 */
  highlights: ProductHighlight[]
  /** 자세히 보기: 긴 설명 */
  detail: string
  /** 무향 여부 */
  fragranceFree: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: 'roundlab-dokdo-toner',
    brand: '라운드랩',
    name: '1025 독도 토너',
    category: 'toner',
    priceKRW: 18000,
    volume: '200ml',
    emoji: '🌊',
    gradient: ['#cfe6f0', '#9fc6dd'],
    blurb: '미네랄 워터 베이스의 순한 데일리 수분·각질 정돈 토너.',
    keyIngredients: ['panthenol', 'allantoin', 'hyaluronic'],
    cautionIngredients: [],
    traits: ['저자극', '수분 충전', '각질 정돈'],
    keywords: ['#데일리토너', '#순한각질케어', '#무향', '#예민피부입문'],
    bestFor: ['dry-sensitive', 'combination-sensitive', 'redness-prone'],
    highlights: [
      { ingredientId: 'panthenol', effect: '판테놀이 수분을 잡아두며 자극을 완화해 매일 써도 부담이 적다.' },
      { ingredientId: 'allantoin', effect: '알란토인이 묵은 각질을 부드럽게 정돈해 결을 매끈하게 한다.' },
      { ingredientId: 'hyaluronic', effect: '히알루론산이 즉각적인 수분감을 더한다.' },
    ],
    detail:
      '자극 성분을 최소화하고 판테놀·알란토인 같은 진정/정돈 성분으로 구성해, 예민한 피부의 첫 토너로 자주 추천됩니다. 화장솜으로 가볍게 닦아내면 각질 정돈, 손으로 두드리면 수분 충전 용도로 모두 쓸 수 있습니다.',
    fragranceFree: true,
  },
  {
    id: 'anua-heartleaf-toner',
    brand: '아누아',
    name: '어성초 77 토너',
    category: 'toner',
    priceKRW: 22000,
    volume: '250ml',
    emoji: '🌿',
    gradient: ['#dcecd6', '#a9cf9c'],
    blurb: '어성초 추출물 77%로 트러블·피지 피부를 진정시키는 토너.',
    keyIngredients: ['heartleaf', 'panthenol', 'allantoin'],
    cautionIngredients: [],
    traits: ['진정', '트러블 완화', '피지 케어'],
    keywords: ['#어성초', '#진정토너', '#트러블피부', '#피지케어'],
    bestFor: ['oily-sensitive', 'acne-prone', 'combination-sensitive'],
    highlights: [
      { ingredientId: 'heartleaf', effect: '고함량 어성초가 항염·항균 작용으로 올라오는 트러블을 가라앉힌다.' },
      { ingredientId: 'panthenol', effect: '판테놀이 진정과 함께 속건조를 막아준다.' },
    ],
    detail:
      '어성초(Houttuynia cordata) 추출물을 높은 비율로 담아, 유분이 많으면서도 예민해 쉽게 트러블이 나는 피부를 진정시키는 데 초점을 둔 토너입니다. 가벼운 사용감으로 지성·복합성 피부의 데일리 진정 베이스로 적합합니다.',
    fragranceFree: true,
  },
  {
    id: 'torriden-divein-serum',
    brand: '토리든',
    name: '다이브인 저분자 히알루론산 세럼',
    category: 'serum',
    priceKRW: 22000,
    volume: '50ml',
    emoji: '💦',
    gradient: ['#d6e9f5', '#a7c9e8'],
    blurb: '5종 저분자 히알루론산으로 속까지 수분을 채우는 진정 세럼.',
    keyIngredients: ['hyaluronic', 'betaglucan', 'panthenol'],
    cautionIngredients: [],
    traits: ['수분 충전', '진정', '저자극'],
    keywords: ['#수분세럼', '#히알루론산', '#속건조', '#무향'],
    bestFor: ['dry-sensitive', 'combination-sensitive', 'barrier-damaged'],
    highlights: [
      { ingredientId: 'hyaluronic', effect: '분자 크기가 다른 히알루론산이 표면과 속층 모두에 수분을 채운다.' },
      { ingredientId: 'betaglucan', effect: '베타글루칸이 깊은 보습과 진정을 더한다.' },
    ],
    detail:
      '여러 분자량의 히알루론산을 조합해 표면 수분감과 속보습을 동시에 노린 세럼입니다. 무향·저자극 설계로 장벽이 약한 피부도 무난하며, 보습 크림 전에 수분 베이스로 깔기 좋습니다.',
    fragranceFree: true,
  },
  {
    id: 'skin1004-centella-ampoule',
    brand: '스킨천사(SKIN1004)',
    name: '마다가스카르 센텔라 아쿠아 수딩 앰플',
    category: 'serum',
    priceKRW: 26000,
    volume: '55ml',
    emoji: '🍃',
    gradient: ['#d9ecd4', '#9fcf9a'],
    blurb: '단일 병풀 추출물로 채운 고순도 진정 앰플.',
    keyIngredients: ['centella', 'madecassoside'],
    cautionIngredients: [],
    traits: ['진정', '장벽 회복', '홍조 완화'],
    keywords: ['#병풀앰플', '#시카', '#진정', '#홍조'],
    bestFor: ['redness-prone', 'acne-prone', 'barrier-damaged'],
    highlights: [
      { ingredientId: 'centella', effect: '병풀 추출물이 자극받은 피부의 염증을 낮추고 장벽 회복을 돕는다.' },
      { ingredientId: 'madecassoside', effect: '마데카소사이드가 붉어진 피부의 진정과 재생을 가속한다.' },
    ],
    detail:
      '향·색소를 배제하고 병풀 추출물 위주로 단순하게 구성해, 시술 후나 트러블 직후처럼 예민해진 피부를 빠르게 가라앉히는 데 강점이 있습니다. 가볍고 흡수가 빨라 레이어링 베이스로도 좋습니다.',
    fragranceFree: true,
  },
  {
    id: 'numbuzin-3-serum',
    brand: '넘버즈인',
    name: '3번 토닝 세럼 (나이아신아마이드)',
    category: 'serum',
    priceKRW: 24000,
    volume: '50ml',
    emoji: '✨',
    gradient: ['#f1e6d0', '#dcc79a'],
    blurb: '나이아신아마이드 중심의 톤·피지·모공 멀티 세럼.',
    keyIngredients: ['niacinamide', 'panthenol', 'hyaluronic'],
    cautionIngredients: [],
    traits: ['미백', '피지 조절', '모공 케어'],
    keywords: ['#나이아신아마이드', '#잡티', '#모공', '#피지조절'],
    bestFor: ['oily-sensitive', 'combination-sensitive', 'resilient'],
    highlights: [
      { ingredientId: 'niacinamide', effect: '나이아신아마이드가 멜라닌 전달을 막아 칙칙함·잡티를 옅게 하고 피지를 조절한다.' },
      { ingredientId: 'panthenol', effect: '판테놀이 미백 활성의 자극을 완화한다.' },
    ],
    detail:
      '나이아신아마이드를 핵심으로 톤 보정과 피지·모공 케어를 한 번에 노린 세럼입니다. 비교적 순한 활성이지만 고농도에 예민한 분은 처음엔 격일로 적응하는 것을 권합니다.',
    fragranceFree: true,
  },
  {
    id: 'illiyoon-ceramide-lotion',
    brand: '일리윤',
    name: '세라마이드 아토 집중크림',
    category: 'moisturizer',
    priceKRW: 16000,
    volume: '200ml',
    emoji: '🧴',
    gradient: ['#eef0f3', '#cdd4dd'],
    blurb: '세라마이드로 장벽을 채우는 가성비 보습 크림.',
    keyIngredients: ['ceramide', 'panthenol', 'hyaluronic'],
    cautionIngredients: [],
    traits: ['장벽 강화', '보습', '저자극'],
    keywords: ['#세라마이드', '#장벽보습', '#아토피', '#가성비'],
    bestFor: ['dry-sensitive', 'barrier-damaged', 'combination-sensitive'],
    highlights: [
      { ingredientId: 'ceramide', effect: '세라마이드가 무너진 장벽 지질을 메워 수분 증발을 막는다.' },
      { ingredientId: 'panthenol', effect: '판테놀이 보습과 진정을 보탠다.' },
    ],
    detail:
      '세라마이드를 중심으로 장벽 보습에 집중한 크림으로, 건조하고 예민한 피부의 데일리 보습 마무리로 적합합니다. 용량 대비 가격이 좋아 몸·얼굴에 넉넉히 쓰기 좋습니다.',
    fragranceFree: true,
  },
  {
    id: 'aestura-atobarrier-cream',
    brand: '에스트라',
    name: '아토베리어 365 크림',
    category: 'moisturizer',
    priceKRW: 30000,
    volume: '80ml',
    emoji: '🛡️',
    gradient: ['#e7eef0', '#c3d3d6'],
    blurb: '세라마이드+판테놀로 민감 장벽을 재건하는 더마 크림.',
    keyIngredients: ['ceramide', 'panthenol', 'betaglucan', 'cholesterol'],
    cautionIngredients: [],
    traits: ['장벽 강화', '진정', '보습'],
    keywords: ['#더마', '#장벽재건', '#민감피부', '#무향'],
    bestFor: ['barrier-damaged', 'dry-sensitive', 'redness-prone'],
    highlights: [
      { ingredientId: 'ceramide', effect: '세라마이드와 콜레스테롤이 생리적 비율로 장벽 지질을 보충한다.' },
      { ingredientId: 'betaglucan', effect: '베타글루칸이 깊은 보습과 진정을 더한다.' },
    ],
    detail:
      '피부과학 브랜드의 장벽 케어 라인으로, 세라마이드·콜레스테롤 등 장벽 지질 성분을 균형 있게 담았습니다. 잦은 시술·아토피 경향 등으로 장벽이 약해진 피부의 회복 집중 케어에 적합합니다.',
    fragranceFree: true,
  },
  {
    id: 'larocheposay-cicaplast-b5',
    brand: '라로슈포제',
    name: '시카플라스트 밤 B5',
    category: 'treatment',
    priceKRW: 23000,
    volume: '40ml',
    emoji: '🩹',
    gradient: ['#eef1f4', '#cbd2dc'],
    blurb: '판테놀·마데카소사이드로 자극받은 피부를 덮어 진정하는 멀티 밤.',
    keyIngredients: ['panthenol', 'madecassoside', 'cholesterol'],
    cautionIngredients: [],
    traits: ['진정', '재생', '장벽 회복'],
    keywords: ['#리페어밤', '#판테놀', '#건조각질', '#국소케어'],
    bestFor: ['barrier-damaged', 'dry-sensitive', 'redness-prone'],
    highlights: [
      { ingredientId: 'panthenol', effect: '고함량 판테놀(B5)이 건조하고 헐은 부위의 회복을 돕는다.' },
      { ingredientId: 'madecassoside', effect: '마데카소사이드가 진정과 재생을 더한다.' },
    ],
    detail:
      '건조해서 트거나 자극받은 부위에 국소적으로 덮어 진정시키는 리페어 밤입니다. 약간 무거운 제형으로 보습막을 만들어, 각질이 일거나 따가운 부위의 집중 케어에 좋습니다.',
    fragranceFree: true,
  },
  {
    id: 'cosrx-snail-essence',
    brand: '코스알엑스',
    name: '아드밴스드 스네일 96 뮤신 에센스',
    category: 'serum',
    priceKRW: 21000,
    volume: '100ml',
    emoji: '🐌',
    gradient: ['#e9e4d8', '#cfc3a6'],
    blurb: '달팽이 점액 96%로 보습과 재생을 노리는 베스트셀러 에센스.',
    keyIngredients: ['hyaluronic', 'panthenol', 'allantoin'],
    cautionIngredients: [],
    traits: ['보습', '재생', '진정'],
    keywords: ['#스네일뮤신', '#보습', '#재생', '#광채'],
    bestFor: ['dry-sensitive', 'combination-sensitive', 'resilient'],
    highlights: [
      { ingredientId: 'allantoin', effect: '뮤신과 알란토인이 매끈한 보습막을 만들어 결을 정돈한다.' },
      { ingredientId: 'panthenol', effect: '판테놀이 진정과 수분 유지를 돕는다.' },
    ],
    detail:
      '달팽이 점액 여과물을 고함량으로 담아 끈적임 없이 촉촉한 막을 만드는 에센스입니다. 자극 성분이 적어 무난하지만, 점액 단백에 드물게 예민한 분은 패치 테스트를 권합니다.',
    fragranceFree: true,
  },
  {
    id: 'cosrx-bha-blackhead',
    brand: '코스알엑스',
    name: 'BHA 블랙헤드 파워 리퀴드',
    category: 'treatment',
    priceKRW: 24000,
    volume: '100ml',
    emoji: '🔬',
    gradient: ['#e6ddef', '#c4b1dd'],
    blurb: '살리실산(BHA)으로 모공 속 피지와 블랙헤드를 녹이는 액상 각질케어.',
    keyIngredients: ['bha', 'niacinamide'],
    cautionIngredients: [],
    traits: ['모공 케어', '피지 조절', '각질 제거'],
    keywords: ['#BHA', '#블랙헤드', '#모공', '#각질케어'],
    bestFor: ['oily-sensitive', 'acne-prone', 'combination-sensitive'],
    highlights: [
      { ingredientId: 'bha', effect: '지용성 BHA가 모공 속 피지를 녹여 블랙헤드와 좁쌀을 정돈한다.' },
      { ingredientId: 'niacinamide', effect: '나이아신아마이드가 피지·자극을 함께 조절한다.' },
    ],
    detail:
      '지용성 살리실산으로 모공 안쪽까지 각질·피지를 정돈하는 화학적 각질케어입니다. 자극 누적을 막기 위해 처음엔 주 2~3회 밤에, 사용 다음 날 자외선 차단을 꼭 챙기세요. 장벽이 약하면 부분 사용을 권합니다.',
    fragranceFree: true,
  },
  {
    id: 'somebymi-aha-bha-toner',
    brand: '썸바이미',
    name: 'AHA·BHA·PHA 30일 미라클 토너',
    category: 'toner',
    priceKRW: 20000,
    volume: '150ml',
    emoji: '⚗️',
    gradient: ['#e9e1d4', '#d0bf9f'],
    blurb: '3종 산으로 각질·트러블을 정돈하는 데일리 필링 토너.',
    keyIngredients: ['aha', 'bha', 'niacinamide'],
    cautionIngredients: [],
    traits: ['각질 제거', '트러블 완화', '톤 개선'],
    keywords: ['#AHABHA', '#필링토너', '#트러블', '#각질'],
    bestFor: ['oily-sensitive', 'acne-prone'],
    highlights: [
      { ingredientId: 'aha', effect: 'AHA가 표면 각질을 정돈해 칙칙함을 줄인다.' },
      { ingredientId: 'bha', effect: 'BHA가 모공 속 피지를 녹여 트러블을 완화한다.' },
    ],
    detail:
      '약한 농도의 AHA·BHA·PHA로 매일 가볍게 각질을 정돈하는 토너입니다. 산 성분이 있어 건성·민감성/장벽 손상 피부에는 부담이 될 수 있으니, 트러블·피지가 고민인 피부 위주로 사용하고 자외선 차단을 병행하세요.',
    fragranceFree: false,
  },
  {
    id: 'drg-red-blemish-cream',
    brand: '닥터지',
    name: '레드 블레미쉬 클리어 수딩 크림',
    category: 'moisturizer',
    priceKRW: 28000,
    volume: '70ml',
    emoji: '🍵',
    gradient: ['#dde9da', '#aecaa4'],
    blurb: '병풀+녹차로 홍조·트러블을 진정시키는 수분 크림.',
    keyIngredients: ['centella', 'greentea', 'panthenol'],
    cautionIngredients: [],
    traits: ['진정', '홍조 완화', '보습'],
    keywords: ['#홍조진정', '#병풀크림', '#트러블', '#수분크림'],
    bestFor: ['redness-prone', 'oily-sensitive', 'combination-sensitive'],
    highlights: [
      { ingredientId: 'centella', effect: '병풀이 붉어진 피부의 염증을 가라앉힌다.' },
      { ingredientId: 'greentea', effect: '녹차 폴리페놀이 항산화·진정으로 트러블을 달랜다.' },
    ],
    detail:
      '병풀과 녹차 등 진정 성분을 모아 홍조와 트러블이 잦은 피부를 가라앉히는 수분 크림입니다. 가벼운 제형이라 지성·복합성도 무겁지 않게 마무리할 수 있습니다.',
    fragranceFree: false,
  },
  {
    id: 'beautyofjoseon-relief-sun',
    brand: '조선미녀',
    name: '릴리프 선 라이스+프로바이오틱스 SPF50+',
    category: 'sunscreen',
    priceKRW: 18000,
    volume: '50ml',
    emoji: '☀️',
    gradient: ['#f3ead2', '#e0cf9c'],
    blurb: '쌀겨·프로바이오틱스 함유의 산뜻한 화학 자외선 차단제.',
    keyIngredients: ['niacinamide', 'panthenol'],
    cautionIngredients: [],
    traits: ['자외선 차단', '보습', '산뜻함'],
    keywords: ['#선크림', '#SPF50', '#백탁없는', '#데일리선'],
    bestFor: ['combination-sensitive', 'oily-sensitive', 'resilient'],
    highlights: [
      { ingredientId: 'niacinamide', effect: '나이아신아마이드가 톤 보정과 장벽 케어를 더한다.' },
      { ingredientId: 'panthenol', effect: '판테놀이 자외선 차단제 특유의 건조함을 덜어준다.' },
    ],
    detail:
      '백탁과 무거움이 적어 매일 쓰기 좋은 화학 자외선 차단제입니다. 자외선 차단은 모든 피부 타입의 기본 — 특히 활성 성분을 쓰는 경우 색소·자극 예방을 위해 필수입니다. 화학 필터에 예민하면 산화아연 기반 물리 선크림을 고려하세요.',
    fragranceFree: false,
  },
  {
    id: 'roundlab-birch-sun',
    brand: '라운드랩',
    name: '자작나무 수분 선크림 SPF50+',
    category: 'sunscreen',
    priceKRW: 22000,
    volume: '50ml',
    emoji: '🌲',
    gradient: ['#e4eef0', '#bcd3d6'],
    blurb: '자작나무 수액 베이스의 촉촉한 데일리 선크림.',
    keyIngredients: ['panthenol', 'hyaluronic', 'allantoin'],
    cautionIngredients: [],
    traits: ['자외선 차단', '수분 충전', '저자극'],
    keywords: ['#수분선크림', '#촉촉', '#데일리', '#건성용선'],
    bestFor: ['dry-sensitive', 'combination-sensitive', 'redness-prone'],
    highlights: [
      { ingredientId: 'hyaluronic', effect: '히알루론산이 자외선 차단과 동시에 수분을 채운다.' },
      { ingredientId: 'allantoin', effect: '알란토인이 자극을 완화한다.' },
    ],
    detail:
      '건조하고 예민한 피부도 당김 없이 쓸 수 있도록 수분감을 높인 선크림입니다. 보습 마무리 겸 자외선 차단으로 데일리 사용에 적합합니다.',
    fragranceFree: true,
  },
  {
    id: 'isntree-hyaluronic-toner',
    brand: '이즈앤트리',
    name: '히알루론산 토너 플러스',
    category: 'toner',
    priceKRW: 20000,
    volume: '200ml',
    emoji: '🫧',
    gradient: ['#dce9f3', '#aecbe6'],
    blurb: '여러 분자량 히알루론산으로 채우는 진정 수분 토너.',
    keyIngredients: ['hyaluronic', 'centella', 'betaglucan'],
    cautionIngredients: [],
    traits: ['수분 충전', '진정', '저자극'],
    keywords: ['#수분토너', '#히알루론산', '#병풀', '#무향'],
    bestFor: ['dry-sensitive', 'redness-prone', 'barrier-damaged'],
    highlights: [
      { ingredientId: 'hyaluronic', effect: '8종 히알루론산이 층층이 수분을 채운다.' },
      { ingredientId: 'centella', effect: '병풀이 수분과 함께 진정을 더한다.' },
    ],
    detail:
      '향·색소를 배제하고 히알루론산과 병풀로 수분·진정에 집중한 토너입니다. 결이 가벼워 여러 번 레이어링하기 좋고, 장벽이 약한 피부의 수분 베이스로 적합합니다.',
    fragranceFree: true,
  },
  {
    id: 'goodal-vitac-serum',
    brand: '구달',
    name: '청귤 비타C 잡티 세럼',
    category: 'serum',
    priceKRW: 25000,
    volume: '30ml',
    emoji: '🍊',
    gradient: ['#f3ead0', '#e6cd8c'],
    blurb: '청귤 유래 비타민 C 유도체로 잡티·칙칙함을 케어하는 미백 세럼.',
    keyIngredients: ['vitaminc', 'niacinamide'],
    cautionIngredients: [],
    traits: ['미백', '항산화', '톤 개선'],
    keywords: ['#비타민C', '#잡티', '#미백', '#광채'],
    bestFor: ['resilient', 'combination-sensitive', 'oily-sensitive'],
    highlights: [
      { ingredientId: 'vitaminc', effect: '비타민 C가 멜라닌 생성을 억제해 잡티·칙칙함을 옅게 한다.' },
      { ingredientId: 'niacinamide', effect: '나이아신아마이드가 미백 효과를 보강한다.' },
    ],
    detail:
      '비교적 순한 비타민 C 농도로 톤·잡티 케어에 입문하기 좋은 세럼입니다. 비타민 C 특유의 따가움에 예민하면 격일로 시작하고, 아침 사용 시 자외선 차단을 병행하세요. 레티놀·고농도 산과의 동시 사용은 피하는 게 좋습니다.',
    fragranceFree: false,
  },
  {
    id: 'klairs-vitamin-drop',
    brand: '클레어스',
    name: '프레쉬리 주스드 비타민 드롭',
    category: 'serum',
    priceKRW: 23000,
    volume: '35ml',
    emoji: '🧪',
    gradient: ['#f1e7d6', '#ddc79c'],
    blurb: '5% 순수 비타민 C를 민감 피부도 쓸 수 있게 순화한 입문 세럼.',
    keyIngredients: ['vitaminc', 'centella', 'vitamine'],
    cautionIngredients: [],
    traits: ['미백', '항산화', '저자극'],
    keywords: ['#비타민C입문', '#순한미백', '#항산화', '#병풀'],
    bestFor: ['dry-sensitive', 'redness-prone', 'combination-sensitive'],
    highlights: [
      { ingredientId: 'vitaminc', effect: '저농도 순수 비타민 C로 자극을 낮추면서 항산화·톤 케어를 시작한다.' },
      { ingredientId: 'centella', effect: '병풀이 비타민 C의 자극을 완충한다.' },
    ],
    detail:
      '순수 비타민 C는 효과적이지만 따가울 수 있어, 농도를 낮추고 병풀·비타민 E로 완충해 민감 피부의 입문용으로 만든 세럼입니다. 개봉 후 산화가 빠르니 서늘한 곳에 보관하고 빨리 소진하세요.',
    fragranceFree: false,
  },
  {
    id: 'purito-centella-serum',
    brand: '퓨리토',
    name: '센텔라 그린 레벨 버퍼 앰플',
    category: 'serum',
    priceKRW: 19000,
    volume: '30ml',
    emoji: '🌱',
    gradient: ['#dcebd6', '#a6cf9a'],
    blurb: '병풀+나이아신아마이드로 진정과 톤 케어를 함께 잡는 앰플.',
    keyIngredients: ['centella', 'niacinamide', 'panthenol'],
    cautionIngredients: [],
    traits: ['진정', '미백', '장벽 회복'],
    keywords: ['#병풀', '#진정', '#나이아신아마이드', '#무향'],
    bestFor: ['redness-prone', 'combination-sensitive', 'oily-sensitive'],
    highlights: [
      { ingredientId: 'centella', effect: '병풀이 자극을 진정시키며 장벽 회복을 돕는다.' },
      { ingredientId: 'niacinamide', effect: '나이아신아마이드가 톤·피지 케어를 더한다.' },
    ],
    detail:
      '진정(병풀)과 기능성(나이아신아마이드)을 한 병에 담아, 예민하면서도 톤·피지 고민이 있는 피부에 적합한 앰플입니다. 무향 설계로 자극 요인을 줄였습니다.',
    fragranceFree: true,
  },
  {
    id: 'aestura-azelaic-serum',
    brand: '에스트라',
    name: '아젤라산 트러블 세럼',
    category: 'serum',
    priceKRW: 32000,
    volume: '30ml',
    emoji: '🎯',
    gradient: ['#eee6dc', '#d4c2ab'],
    blurb: '아젤라산으로 트러블·흔적·홍조를 한 번에 케어하는 멀티 세럼.',
    keyIngredients: ['azelaic', 'niacinamide', 'panthenol'],
    cautionIngredients: [],
    traits: ['트러블 완화', '미백', '홍조 완화'],
    keywords: ['#아젤라산', '#트러블흔적', '#홍조', '#멀티케어'],
    bestFor: ['acne-prone', 'redness-prone', 'oily-sensitive'],
    highlights: [
      { ingredientId: 'azelaic', effect: '아젤라산이 여드름균을 억제하고 붉은 흔적·색소를 옅게 한다.' },
      { ingredientId: 'niacinamide', effect: '나이아신아마이드가 피지·톤 케어를 보강한다.' },
    ],
    detail:
      '아젤라산은 여드름·홍조·색소를 동시에 다루면서도 비교적 순해, 강한 산이 부담스러운 트러블 피부에 좋은 선택입니다. 초기 가벼운 따끔거림은 대개 적응되며, 보습·자외선 차단을 함께 챙기세요.',
    fragranceFree: true,
  },
  {
    id: 'cosrx-retinol-0.1',
    brand: '코스알엑스',
    name: 'RX 레티놀 0.1 크림',
    category: 'treatment',
    priceKRW: 26000,
    volume: '20ml',
    emoji: '🌙',
    gradient: ['#e7e2ef', '#c5b6dd'],
    blurb: '저농도 레티놀로 시작하는 안티에이징·모공 입문 크림.',
    keyIngredients: ['retinol', 'panthenol', 'ceramide'],
    cautionIngredients: [],
    traits: ['안티에이징', '모공 케어', '트러블 완화'],
    keywords: ['#레티놀입문', '#안티에이징', '#모공', '#밤케어'],
    bestFor: ['resilient', 'oily-sensitive'],
    highlights: [
      { ingredientId: 'retinol', effect: '저농도 레티놀이 턴오버를 높여 주름·모공·트러블을 개선한다.' },
      { ingredientId: 'ceramide', effect: '세라마이드가 레티놀의 건조·자극을 완충한다.' },
    ],
    detail:
      '레티놀은 강력하지만 초기 자극(건조·각질·붉음)이 흔하므로 0.1%처럼 낮은 농도부터 주 2~3회 밤에 시작하는 것이 정석입니다. 보습·자외선 차단 필수이며, 임신·수유 중이거나 장벽이 무너진 상태에서는 사용하지 마세요. AHA/BHA·비타민 C와 같은 날 겹쳐 쓰지 않도록 주의합니다.',
    fragranceFree: true,
  },
  {
    id: 'mediheal-teatree-mask',
    brand: '메디힐',
    name: '티트리 카밍 에센스 마스크',
    category: 'mask',
    priceKRW: 2000,
    volume: '1매',
    emoji: '🧖',
    gradient: ['#dcecda', '#b6d1a0'] as [string, string],
    blurb: '티트리·병풀 에센스로 빠르게 진정하는 데일리 시트 마스크.',
    keyIngredients: ['centella', 'panthenol', 'heartleaf'],
    cautionIngredients: ['essentialoil'],
    traits: ['진정', '수분 충전', '트러블 완화'],
    keywords: ['#시트마스크', '#티트리', '#진정팩', '#데일리팩'],
    bestFor: ['oily-sensitive', 'acne-prone', 'combination-sensitive'],
    highlights: [
      { ingredientId: 'centella', effect: '병풀·티트리가 트러블 피부를 빠르게 진정시킨다.' },
      { ingredientId: 'essentialoil', effect: '티트리 오일이 항균 진정을 더하지만, 정유에 예민하면 자극이 될 수 있다.' },
    ],
    detail:
      '단시간에 수분과 진정을 채우는 시트 마스크로, 트러블이 올라오는 날 빠른 케어에 좋습니다. 다만 티트리 등 정유 성분이 들어 있어 정유 알레르기·고민감 피부는 패치 테스트 후 사용하세요.',
    fragranceFree: false,
  },
]

export const PRODUCTS_BY_ID: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p]),
)

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  cleanser: '클렌저',
  toner: '토너·스킨',
  serum: '세럼·앰플',
  moisturizer: '크림·로션',
  sunscreen: '선케어',
  mask: '마스크팩',
  treatment: '스페셜·각질케어',
}
