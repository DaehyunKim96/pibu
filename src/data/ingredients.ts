// =============================================================================
// pibu · 성분 지식베이스 (Ingredient Knowledge Base)
// -----------------------------------------------------------------------------
// 각 성분은 INCI명/국문명, 분류, 작용 메커니즘, 민감·트러블 피부 관점의 평가,
// 그리고 근거가 되는 피부과학 논문/리뷰를 함께 담는다.
// 근거(evidence)는 대표적이고 비교적 널리 인용되는 문헌을 요약 인용한 것으로,
// 실제 서비스에서는 PubMed DOI 링크로 확장한다. (docs/01-ingredient-research.md 참고)
// =============================================================================

export type IngredientCategory =
  | 'soothing' // 진정·항염
  | 'barrier' // 장벽·보습
  | 'active' // 기능성 활성 (각질/미백/안티에이징)
  | 'antioxidant' // 항산화
  | 'caution' // 민감 피부 주의 성분

export interface ResearchRef {
  /** 짧은 인용 키 (저자/연도) */
  citation: string
  /** 논문/리뷰 제목 */
  title: string
  /** 출처 저널 */
  source: string
  /** 한 줄 요약 (피부 영향 결론) */
  finding: string
}

export interface Ingredient {
  id: string
  /** 국문 통용명 */
  name: string
  /** INCI / 영문명 */
  inci: string
  category: IngredientCategory
  /** 한 줄 요약 */
  summary: string
  /** 작용 메커니즘 설명 */
  mechanism: string
  /** 이 성분이 제품에 부여하는 '특성' 태그 (제품 설명에서 재사용) */
  confersTraits: string[]
  /** 민감·트러블 피부 적합도: 1(주의) ~ 5(매우 적합) */
  sensitiveScore: number
  /** 민감 피부 사용 시 유의점 */
  cautionNote?: string
  /** 함께 보면 좋은 성분 id */
  pairsWith?: string[]
  /** 상충/중복 주의 성분 id */
  conflictsWith?: string[]
  research: ResearchRef[]
}

export const INGREDIENTS: Ingredient[] = [
  // ───────────────────────── 진정 · 항염 ─────────────────────────
  {
    id: 'centella',
    name: '병풀추출물 (시카)',
    inci: 'Centella Asiatica Extract',
    category: 'soothing',
    summary: '상처 치유와 진정에 가장 널리 쓰이는 대표 시카 성분.',
    mechanism:
      '마데카소사이드·아시아티코사이드 등 트리테르페노이드가 섬유아세포의 콜라겐 합성을 촉진하고 염증성 사이토카인을 낮춰 손상된 피부 장벽 회복과 홍조 진정을 돕는다.',
    confersTraits: ['진정', '장벽 회복', '홍조 완화'],
    sensitiveScore: 5,
    pairsWith: ['panthenol', 'madecassoside', 'ceramide'],
    research: [
      {
        citation: 'Bylka et al., 2013',
        title: 'Centella asiatica in cosmetology',
        source: 'Postepy Dermatol Alergol',
        finding:
          '병풀의 트리테르페노이드가 콜라겐 합성과 창상 치유를 촉진하고 항염 효과를 보인다고 정리.',
      },
      {
        citation: 'Ratz-Łyko et al., 2016',
        title: 'Anti-inflammatory properties of Centella asiatica',
        source: 'Pharm Biol',
        finding: '병풀 추출물이 염증성 매개물질을 억제해 민감성 피부 진정에 유효.',
      },
    ],
  },
  {
    id: 'madecassoside',
    name: '마데카소사이드',
    inci: 'Madecassoside',
    category: 'soothing',
    summary: '병풀에서 분리한 단일 진정 활성물질. 장벽 회복에 특히 강점.',
    mechanism:
      '항산화·항염 작용과 함께 콜라겐 I 발현을 높여 자극·시술 후 붉어진 피부의 회복 속도를 앞당긴다.',
    confersTraits: ['진정', '재생', '장벽 회복'],
    sensitiveScore: 5,
    pairsWith: ['centella', 'panthenol'],
    research: [
      {
        citation: 'Bonté et al., 1994',
        title: 'Influence of asiaticoside on collagen synthesis',
        source: 'Ann Pharm Fr',
        finding: '병풀 사포닌이 인체 섬유아세포에서 콜라겐 합성을 유의하게 증가.',
      },
    ],
  },
  {
    id: 'panthenol',
    name: '판테놀 (프로비타민 B5)',
    inci: 'Panthenol',
    category: 'soothing',
    summary: '보습과 진정을 동시에, 자극이 거의 없는 만능 케어 성분.',
    mechanism:
      '피부에서 판토텐산으로 전환되어 각질층 수분을 잡아두고(휴멕턴트) 표피 장벽 회복과 가려움·홍조 완화를 돕는다.',
    confersTraits: ['보습', '진정', '장벽 회복'],
    sensitiveScore: 5,
    pairsWith: ['centella', 'hyaluronic', 'ceramide'],
    research: [
      {
        citation: 'Proksch & Nissen, 2002',
        title: 'Dexpanthenol enhances skin barrier repair',
        source: 'J Dermatolog Treat',
        finding: '덱스판테놀이 경피수분손실(TEWL)을 줄이고 장벽 회복과 홍반 완화를 촉진.',
      },
    ],
  },
  {
    id: 'allantoin',
    name: '알란토인',
    inci: 'Allantoin',
    category: 'soothing',
    summary: '각질 정돈과 진정을 돕는 저자극 클래식 성분.',
    mechanism:
      '케라틴 연화 작용으로 죽은 각질을 부드럽게 정돈하고, 세포 증식을 자극해 거칠고 자극받은 피부 표면을 매끈하게 한다.',
    confersTraits: ['진정', '각질 정돈', '보습'],
    sensitiveScore: 5,
    pairsWith: ['panthenol', 'centella'],
    research: [
      {
        citation: 'Araújo et al., 2010',
        title: 'Allantoin in wound healing',
        source: 'Int J Pharm',
        finding: '알란토인이 세포외기질 재구성을 촉진해 창상 치유와 진정에 기여.',
      },
    ],
  },
  {
    id: 'bisabolol',
    name: '비사보롤 (카모마일 유래)',
    inci: 'Bisabolol',
    category: 'soothing',
    summary: '카모마일에서 얻는 부드러운 항염·진정 성분.',
    mechanism:
      '프로스타글란딘 등 염증 매개물질을 억제하고 자극을 완화하며, 다른 활성 성분의 침투를 돕는 보조 역할도 한다.',
    confersTraits: ['진정', '홍조 완화'],
    sensitiveScore: 4,
    cautionNote: '국화과(데이지·돼지풀) 알레르기가 있으면 드물게 반응할 수 있다.',
    research: [
      {
        citation: 'Maurya et al., 2014',
        title: 'α-Bisabolol reduces inflammation',
        source: 'Eur J Pharmacol',
        finding: '비사보롤이 염증성 사이토카인을 낮춰 항염·진정 효과를 보임.',
      },
    ],
  },
  {
    id: 'heartleaf',
    name: '어성초추출물',
    inci: 'Houttuynia Cordata Extract',
    category: 'soothing',
    summary: '트러블·피지 피부에서 인기 있는 항염·항균 진정 성분.',
    mechanism:
      '쿠에르세틴 등 플라보노이드가 항염·항산화 작용을 하고 여드름 유발균에 대한 억제력을 보여, 자극은 낮추면서 트러블을 진정시킨다.',
    confersTraits: ['진정', '트러블 완화', '피지 케어'],
    sensitiveScore: 4,
    pairsWith: ['niacinamide', 'bha'],
    research: [
      {
        citation: 'Kim et al., 2008',
        title: 'Anti-inflammatory effect of Houttuynia cordata',
        source: 'J Ethnopharmacol',
        finding: '어성초 추출물이 염증 매개물질 생성을 억제하는 항염 효과 확인.',
      },
    ],
  },
  {
    id: 'mugwort',
    name: '쑥추출물 (병풀과 함께 인기)',
    inci: 'Artemisia Vulgaris / Princeps Extract',
    category: 'soothing',
    summary: '항산화·진정 효과가 큰 전통 약초. 단, 알레르기 주의도 필요.',
    mechanism:
      '클로로겐산·플라보노이드가 활성산소를 제거하고 항염 작용을 해 예민해진 피부를 가라앉힌다.',
    confersTraits: ['진정', '항산화'],
    sensitiveScore: 3,
    cautionNote: '국화과 식물 알레르기·꽃가루 알레르기가 있으면 패치 테스트 권장.',
    research: [
      {
        citation: 'Ekiert et al., 2021',
        title: 'Artemisia species in skin care',
        source: 'Molecules',
        finding: '쑥 속 식물의 폴리페놀이 항산화·항염 효과를 가지나 감작 가능성도 보고.',
      },
    ],
  },

  // ───────────────────────── 장벽 · 보습 ─────────────────────────
  {
    id: 'ceramide',
    name: '세라마이드',
    inci: 'Ceramide NP / AP / EOP',
    category: 'barrier',
    summary: '피부 장벽 지질의 핵심 구성성분. 민감·아토피 피부의 1순위.',
    mechanism:
      '각질세포 사이를 채우는 라멜라 지질을 보충해 무너진 장벽을 메우고, 수분 증발(TEWL)을 줄여 외부 자극에 대한 저항력을 높인다.',
    confersTraits: ['장벽 강화', '보습', '진정'],
    sensitiveScore: 5,
    pairsWith: ['cholesterol', 'fattyacid', 'panthenol', 'hyaluronic'],
    research: [
      {
        citation: 'Spada et al., 2018',
        title: 'Ceramide-containing moisturizers in barrier-impaired skin',
        source: 'Clin Cosmet Investig Dermatol',
        finding: '세라마이드 함유 보습제가 장벽 기능과 수분도를 유의하게 개선.',
      },
      {
        citation: 'Meckfessel & Brandt, 2014',
        title: 'The structure and function of skin lipids',
        source: 'J Am Acad Dermatol',
        finding: '세라마이드·콜레스테롤·지방산의 생리적 비율이 장벽 회복에 중요.',
      },
    ],
  },
  {
    id: 'cholesterol',
    name: '콜레스테롤',
    inci: 'Cholesterol',
    category: 'barrier',
    summary: '세라마이드·지방산과 함께 장벽 지질의 3대 축.',
    mechanism:
      '각질층 지질막의 유동성과 결속을 조절해, 세라마이드·지방산과 생리적 비율(약 3:1:1)로 함께 쓰일 때 장벽 회복이 극대화된다.',
    confersTraits: ['장벽 강화', '보습'],
    sensitiveScore: 5,
    pairsWith: ['ceramide', 'fattyacid'],
    research: [
      {
        citation: 'Man et al., 1993',
        title: 'Optimization of physiological lipid mixtures for barrier repair',
        source: 'J Invest Dermatol',
        finding: '세라마이드·콜레스테롤·지방산의 적정 비율이 장벽 회복을 가속.',
      },
    ],
  },
  {
    id: 'fattyacid',
    name: '지방산 (자유지방산)',
    inci: 'Linoleic / Stearic Acid',
    category: 'barrier',
    summary: '장벽 지질의 세 번째 축이자 피지 균형의 열쇠.',
    mechanism:
      '리놀레산 등 필수지방산은 각질층 지질을 보충하고, 피지 내 리놀레산이 부족하면 모공이 막히기 쉬워 여드름 피부에서 특히 중요하다.',
    confersTraits: ['장벽 강화', '피지 균형'],
    sensitiveScore: 4,
    pairsWith: ['ceramide', 'cholesterol'],
    research: [
      {
        citation: 'Letawe et al., 1998',
        title: 'Linoleic acid and sebum in acne',
        source: 'Clin Exp Dermatol',
        finding: '국소 리놀레산 도포가 면포 크기를 줄여 여드름 개선에 기여.',
      },
    ],
  },
  {
    id: 'hyaluronic',
    name: '히알루론산',
    inci: 'Sodium Hyaluronate',
    category: 'barrier',
    summary: '자기 무게의 수백 배 수분을 끌어당기는 대표 휴멕턴트.',
    mechanism:
      '고·저분자 히알루론산이 각질층 표면과 내부에서 수분을 붙잡아 피부를 즉각 촉촉하게 하고 잔주름을 도톰하게 채운다. 단독으로는 장벽을 메우지 못해 오클루시브와 함께 써야 한다.',
    confersTraits: ['보습', '수분 충전'],
    sensitiveScore: 5,
    cautionNote: '건조한 환경에서 단독 사용 시 오히려 속 수분을 끌어와 당길 수 있어 위에 보습막을 덮어줄 것.',
    pairsWith: ['ceramide', 'panthenol', 'squalane'],
    research: [
      {
        citation: 'Papakonstantinou et al., 2012',
        title: 'Hyaluronic acid: A key molecule in skin aging',
        source: 'Dermatoendocrinol',
        finding: '히알루론산이 피부 수분 유지와 주름 완화에 핵심적 역할.',
      },
    ],
  },
  {
    id: 'squalane',
    name: '스쿠알란',
    inci: 'Squalane',
    category: 'barrier',
    summary: '피부 친화적이고 모공을 거의 막지 않는 가벼운 에몰리언트.',
    mechanism:
      '피지에 본래 존재하는 스쿠알렌을 안정화한 형태로, 수분 증발을 막는 얇은 보호막을 만들면서도 산뜻해 지성·민감성 모두에 잘 맞는다.',
    confersTraits: ['보습', '유연', '저자극'],
    sensitiveScore: 5,
    pairsWith: ['hyaluronic', 'ceramide'],
    research: [
      {
        citation: 'Huang et al., 2009',
        title: 'Biological activities of squalene/squalane',
        source: 'Mar Drugs',
        finding: '스쿠알란이 항산화·보습·낮은 자극성을 가진 안정적 에몰리언트임을 정리.',
      },
    ],
  },
  {
    id: 'betaglucan',
    name: '베타글루칸',
    inci: 'Beta-Glucan',
    category: 'barrier',
    summary: '깊은 보습과 진정을 함께 주는 다당체.',
    mechanism:
      '귀리·효모 유래 다당체로, 각질층에 수분 저장막을 형성하고 면역세포를 자극해 자극받은 피부의 회복을 돕는다. 히알루론산보다 깊은 보습으로 평가된다.',
    confersTraits: ['보습', '진정', '재생'],
    sensitiveScore: 5,
    pairsWith: ['hyaluronic', 'panthenol'],
    research: [
      {
        citation: 'Du et al., 2014',
        title: 'Skin health benefits of beta-glucan',
        source: 'Int J Cosmet Sci',
        finding: '베타글루칸이 보습·창상 치유·항주름 효과를 보임.',
      },
    ],
  },

  // ───────────────────────── 기능성 활성 ─────────────────────────
  {
    id: 'niacinamide',
    name: '나이아신아마이드 (비타민 B3)',
    inci: 'Niacinamide',
    category: 'active',
    summary: '미백·피지·장벽·모공까지 다재다능하면서 비교적 순한 만능 활성.',
    mechanism:
      '세라마이드 생합성을 촉진해 장벽을 강화하고, 멜라닌이 각질세포로 전달되는 것을 막아 색소침착을 옅게 하며, 피지 분비와 염증을 조절한다.',
    confersTraits: ['미백', '피지 조절', '장벽 강화', '모공 케어'],
    sensitiveScore: 4,
    cautionNote: '고농도(10% 이상)에서는 일부 민감 피부가 따가움·홍조를 느낄 수 있어 2~5%가 무난.',
    pairsWith: ['ceramide', 'hyaluronic', 'zinc'],
    research: [
      {
        citation: 'Bissett et al., 2005',
        title: 'Niacinamide: A B vitamin that improves aging facial skin',
        source: 'Dermatol Surg',
        finding: '5% 나이아신아마이드가 색소·홍조·잔주름·탄력을 유의하게 개선.',
      },
      {
        citation: 'Draelos et al., 2006',
        title: 'Niacinamide and sebum',
        source: 'J Cosmet Laser Ther',
        finding: '2% 나이아신아마이드가 피지 분비량을 유의하게 감소.',
      },
    ],
  },
  {
    id: 'retinol',
    name: '레티놀 (비타민 A)',
    inci: 'Retinol',
    category: 'active',
    summary: '안티에이징·여드름의 황금 표준. 강력한 만큼 적응이 필요.',
    mechanism:
      '레티노산으로 전환되어 세포 턴오버를 촉진하고 콜라겐 합성을 늘려 주름·모공·색소를 개선하며 면포 형성을 막는다.',
    confersTraits: ['안티에이징', '모공 케어', '트러블 완화'],
    sensitiveScore: 2,
    cautionNote:
      '초기 자극(레티노이드 반응)·건조·각질이 흔하다. 저농도부터 주 2~3회 밤에 시작하고 보습·자외선 차단 필수. 임신·수유 중 피한다.',
    conflictsWith: ['aha', 'bha', 'vitaminc'],
    pairsWith: ['ceramide', 'panthenol'],
    research: [
      {
        citation: 'Mukherjee et al., 2006',
        title: 'Retinoids in the treatment of skin aging',
        source: 'Clin Interv Aging',
        finding: '국소 레티놀이 광노화 주름과 색소를 개선하나 자극이 흔함을 정리.',
      },
    ],
  },
  {
    id: 'bakuchiol',
    name: '바쿠치올 (식물성 레티놀 대안)',
    inci: 'Bakuchiol',
    category: 'active',
    summary: '레티놀과 유사한 효과에 자극은 훨씬 낮은 식물 유래 성분.',
    mechanism:
      '레티노이드 유사 유전자 발현을 유도해 콜라겐을 늘리지만 레티놀 특유의 건조·홍조 부작용이 적어 민감 피부의 안티에이징 입문에 적합하다.',
    confersTraits: ['안티에이징', '저자극', '미백'],
    sensitiveScore: 4,
    pairsWith: ['niacinamide', 'ceramide'],
    research: [
      {
        citation: 'Dhaliwal et al., 2019',
        title: 'Bakuchiol vs retinol: a randomized study',
        source: 'Br J Dermatol',
        finding: '바쿠치올이 레티놀과 비슷한 주름·색소 개선을 보이며 자극은 더 적음.',
      },
    ],
  },
  {
    id: 'aha',
    name: 'AHA (글리콜산·락틱산)',
    inci: 'Glycolic / Lactic Acid',
    category: 'active',
    summary: '표면 각질을 녹여 매끈함과 톤을 개선하는 수용성 각질제거제.',
    mechanism:
      '각질세포 간 결합을 끊어 묵은 각질을 탈락시키고 턴오버를 정상화해 칙칙함·잔주름·모공을 개선한다. 락틱산은 보습력도 있어 더 순하다.',
    confersTraits: ['각질 제거', '톤 개선', '매끈함'],
    sensitiveScore: 2,
    cautionNote: '따가움·자외선 민감을 유발할 수 있어 저농도부터, 낮에는 자외선 차단 필수. 손상된 장벽엔 피한다.',
    conflictsWith: ['retinol', 'vitaminc'],
    research: [
      {
        citation: 'Kornhauser et al., 2010',
        title: 'Applications of hydroxy acids',
        source: 'Clin Cosmet Investig Dermatol',
        finding: 'AHA가 각질박리·콜라겐 자극으로 피부결과 색소를 개선.',
      },
    ],
  },
  {
    id: 'bha',
    name: 'BHA (살리실산)',
    inci: 'Salicylic Acid',
    category: 'active',
    summary: '모공 속 피지를 녹이는 지용성 각질제거제. 여드름·블랙헤드의 핵심.',
    mechanism:
      '지용성이라 피지로 막힌 모공 안까지 침투해 각질·피지를 녹이고, 살리실산 특유의 항염 작용으로 염증성 여드름도 가라앉힌다.',
    confersTraits: ['모공 케어', '피지 조절', '트러블 완화', '각질 제거'],
    sensitiveScore: 3,
    cautionNote: '건조·각질을 유발할 수 있어 0.5~2% 부분 사용 권장. 광범위 사용 시 자극 누적 주의.',
    pairsWith: ['niacinamide', 'heartleaf'],
    conflictsWith: ['retinol'],
    research: [
      {
        citation: 'Arif, 2015',
        title: 'Salicylic acid as a peeling agent',
        source: 'Clin Cosmet Investig Dermatol',
        finding: '살리실산이 면포·염증성 여드름과 모공 개선에 효과적이며 지성 피부에 적합.',
      },
    ],
  },
  {
    id: 'azelaic',
    name: '아젤라산',
    inci: 'Azelaic Acid',
    category: 'active',
    summary: '여드름·홍조·색소를 한 번에, 자극이 적은 멀티 활성.',
    mechanism:
      '항균·항염 작용으로 여드름균을 억제하고 티로시나아제를 막아 색소침착을 옅게 하며, 주사(홍조성 여드름)에도 처방될 만큼 진정 효과가 있다.',
    confersTraits: ['트러블 완화', '미백', '홍조 완화'],
    sensitiveScore: 4,
    cautionNote: '초기에 가벼운 따끔거림이 있을 수 있으나 대체로 순하다.',
    pairsWith: ['niacinamide'],
    research: [
      {
        citation: 'Schulte et al., 2015',
        title: 'Azelaic acid in the treatment of acne and rosacea',
        source: 'J Drugs Dermatol',
        finding: '아젤라산이 여드름·주사 치료에 효과적이며 색소 개선도 보임.',
      },
    ],
  },
  {
    id: 'zinc',
    name: '징크 (산화아연/PCA아연)',
    inci: 'Zinc Oxide / Zinc PCA',
    category: 'active',
    summary: '피지 조절·진정·물리적 자외선 차단까지 겸하는 무기 성분.',
    mechanism:
      '피지 분비를 줄이고 항염·항균 작용을 하며, 산화아연은 자외선을 물리적으로 반사해 민감 피부용 선크림의 핵심으로 쓰인다.',
    confersTraits: ['피지 조절', '진정', '자외선 차단'],
    sensitiveScore: 5,
    pairsWith: ['niacinamide', 'heartleaf'],
    research: [
      {
        citation: 'Gupta et al., 2014',
        title: 'Zinc therapy in dermatology',
        source: 'Dermatol Res Pract',
        finding: '아연이 항염·항균 작용으로 여드름 등 염증성 피부질환에 유익.',
      },
    ],
  },

  // ───────────────────────── 항산화 ─────────────────────────
  {
    id: 'vitaminc',
    name: '비타민 C (아스코르브산)',
    inci: 'Ascorbic Acid / Derivatives',
    category: 'antioxidant',
    summary: '미백·항산화·콜라겐의 대표 항산화제.',
    mechanism:
      '활성산소를 중화하고 멜라닌 생성을 억제하며 콜라겐 합성의 보조인자로 작용해 톤·탄력·광노화를 개선한다. 순수 형태는 산성이라 자극·산화에 취약하다.',
    confersTraits: ['미백', '항산화', '광노화 개선'],
    sensitiveScore: 3,
    cautionNote:
      '순수 L-아스코르브산(고농도·저pH)은 따가울 수 있다. 민감 피부는 유도체(아스코르빌글루코사이드 등)부터.',
    conflictsWith: ['retinol', 'aha'],
    pairsWith: ['vitamine', 'ferulic'],
    research: [
      {
        citation: 'Pullar et al., 2017',
        title: 'The roles of vitamin C in skin health',
        source: 'Nutrients',
        finding: '비타민 C가 항산화·콜라겐 합성·광보호에 다면적으로 기여.',
      },
    ],
  },
  {
    id: 'vitamine',
    name: '비타민 E (토코페롤)',
    inci: 'Tocopherol',
    category: 'antioxidant',
    summary: '지용성 항산화제. 비타민 C와 시너지가 좋다.',
    mechanism:
      '세포막의 지질 산화를 막아 자외선·오염으로 인한 손상을 줄이고 보습막 형성을 돕는다. 비타민 C와 함께 쓰면 항산화 효과가 상승한다.',
    confersTraits: ['항산화', '보습', '광보호'],
    sensitiveScore: 5,
    pairsWith: ['vitaminc', 'squalane'],
    research: [
      {
        citation: 'Thiele & Ekanayake-Mudiyanselage, 2007',
        title: 'Vitamin E in human skin',
        source: 'Mol Aspects Med',
        finding: '토코페롤이 피부의 1차 지용성 항산화 방어를 담당.',
      },
    ],
  },
  {
    id: 'greentea',
    name: '녹차추출물 (EGCG)',
    inci: 'Camellia Sinensis Leaf Extract',
    category: 'antioxidant',
    summary: '폴리페놀이 풍부한 진정·항산화 성분.',
    mechanism:
      'EGCG 등 카테킨이 강력한 항산화·항염 작용을 하고 피지 산화를 억제해 트러블·홍조 피부를 가라앉힌다.',
    confersTraits: ['항산화', '진정', '피지 케어'],
    sensitiveScore: 5,
    pairsWith: ['niacinamide', 'centella'],
    research: [
      {
        citation: 'OyetakinWhite et al., 2012',
        title: 'Protective mechanisms of green tea polyphenols in skin',
        source: 'Oxid Med Cell Longev',
        finding: '녹차 폴리페놀이 자외선 손상과 염증으로부터 피부를 보호.',
      },
    ],
  },
  {
    id: 'ferulic',
    name: '페룰산',
    inci: 'Ferulic Acid',
    category: 'antioxidant',
    summary: '비타민 C·E의 안정성과 효과를 끌어올리는 항산화 부스터.',
    mechanism:
      '식물성 폴리페놀로 자체 항산화력에 더해 비타민 C·E를 안정화하고 광보호 효과를 배가한다.',
    confersTraits: ['항산화', '광보호'],
    sensitiveScore: 4,
    pairsWith: ['vitaminc', 'vitamine'],
    research: [
      {
        citation: 'Lin et al., 2005',
        title: 'Ferulic acid stabilizes a topical C+E solution',
        source: 'J Invest Dermatol',
        finding: '페룰산이 비타민 C·E 제형의 안정성과 광보호 효과를 2배로 향상.',
      },
    ],
  },

  // ───────────────────────── 주의 성분 ─────────────────────────
  {
    id: 'fragrance',
    name: '향료 (착향제)',
    inci: 'Fragrance / Parfum',
    category: 'caution',
    summary: '화장품 접촉성 알레르기의 가장 흔한 원인 중 하나.',
    mechanism:
      '수십~수백 종의 향 성분 혼합물로, 개별 표기 없이 "향료"로 묶여 표기된다. 민감·트러블 피부에서 자극성·알레르기성 접촉피부염을 유발할 수 있다.',
    confersTraits: ['알레르기 유발 가능', '자극 가능'],
    sensitiveScore: 1,
    cautionNote: '예민하거나 장벽이 약한 피부는 "무향(fragrance-free)" 제품을 우선 고려.',
    research: [
      {
        citation: 'de Groot & Schmidt, 2016',
        title: 'Fragrances: contact allergy and other adverse effects',
        source: 'Dermatitis',
        finding: '향료가 화장품 접촉 알레르기의 주요 원인임을 광범위하게 정리.',
      },
    ],
  },
  {
    id: 'essentialoil',
    name: '에센셜 오일 (정유)',
    inci: 'Essential Oils (Citrus, Lavender, Tea Tree…)',
    category: 'caution',
    summary: '천연이지만 향 알레르겐과 광독성을 품을 수 있다.',
    mechanism:
      '리모넨·리날룰 등 산화되기 쉬운 향 성분과, 시트러스 계열의 광독성(furocoumarin)으로 자극·색소침착을 유발할 수 있다.',
    confersTraits: ['알레르기 유발 가능', '광독성 가능'],
    sensitiveScore: 1,
    cautionNote: '“천연=순함”이 아니다. 민감 피부는 고농도 정유 제품을 피하고 패치 테스트.',
    research: [
      {
        citation: 'de Groot & Schmidt, 2016',
        title: 'Essential oils, part I: contact allergy',
        source: 'Dermatitis',
        finding: '여러 정유가 산화 시 감작성이 높아져 접촉 알레르기를 유발.',
      },
    ],
  },
  {
    id: 'alcohol',
    name: '변성알코올 (에탄올)',
    inci: 'Alcohol Denat. / SD Alcohol',
    category: 'caution',
    summary: '산뜻한 사용감을 주지만 건조·장벽 손상 우려.',
    mechanism:
      '휘발성이 높아 청량감과 빠른 흡수를 주지만, 고농도로 자주 쓰면 각질층 지질을 녹여 수분 증발과 장벽 약화를 일으킬 수 있다.',
    confersTraits: ['청량감', '건조 유발 가능'],
    sensitiveScore: 2,
    cautionNote: '성분표 상위(앞쪽)에 있으면 함량이 높다는 뜻. 건성·민감성은 주의. (세틸/스테아릴 등 지방알코올은 무관)',
    research: [
      {
        citation: 'Löffler et al., 2007',
        title: 'How irritant is alcohol?',
        source: 'Br J Dermatol',
        finding: '반복적 에탄올 노출이 손상된 장벽에서 자극과 TEWL 증가를 유발할 수 있음.',
      },
    ],
  },
  {
    id: 'mit',
    name: '메칠이소치아졸리논 (MIT/CMIT)',
    inci: 'Methylisothiazolinone',
    category: 'caution',
    summary: '강한 접촉성 알레르겐으로 규제가 강화된 보존제.',
    mechanism:
      '미생물 번식을 막는 보존제지만 접촉성 알레르기 유발률이 높아 유럽에서 리브온(씻어내지 않는) 제품 사용이 금지·제한되었다.',
    confersTraits: ['알레르기 유발 가능'],
    sensitiveScore: 1,
    cautionNote: '예민한 피부는 MIT/CMIT 표기 제품을 피하는 편이 안전.',
    research: [
      {
        citation: 'Lundov et al., 2011',
        title: 'Methylisothiazolinone contact allergy',
        source: 'Br J Dermatol',
        finding: 'MIT가 화장품 접촉 알레르기의 급증 원인으로 지목됨.',
      },
    ],
  },
  {
    id: 'sls',
    name: '소듐라우릴설페이트 (SLS)',
    inci: 'Sodium Lauryl Sulfate',
    category: 'caution',
    summary: '세정력이 강한 만큼 장벽을 벗길 수 있는 계면활성제.',
    mechanism:
      '풍부한 거품과 강한 세정력을 주지만 피부 지질·단백질과 결합해 각질층을 거칠게 하고 자극·건조를 유발할 수 있다.',
    confersTraits: ['강한 세정', '건조 유발 가능'],
    sensitiveScore: 2,
    cautionNote: '민감·건성은 더 순한 계면활성제(코코베타인, 아미노산계) 클렌저를 권장.',
    research: [
      {
        citation: 'Ananthapadmanabhan et al., 2004',
        title: 'Cleansing and skin barrier',
        source: 'Dermatol Ther',
        finding: 'SLS 등 강계면활성제가 각질층 단백질 변성과 자극을 유발할 수 있음.',
      },
    ],
  },
]

export const INGREDIENTS_BY_ID: Record<string, Ingredient> = Object.fromEntries(
  INGREDIENTS.map((i) => [i.id, i]),
)

export const CATEGORY_LABELS: Record<IngredientCategory, string> = {
  soothing: '진정·항염',
  barrier: '장벽·보습',
  active: '기능성 활성',
  antioxidant: '항산화',
  caution: '민감 피부 주의',
}

export const CATEGORY_COLORS: Record<IngredientCategory, string> = {
  soothing: '#5b8a72',
  barrier: '#4a7fb5',
  active: '#b5793a',
  antioxidant: '#8a6bb0',
  caution: '#c0584f',
}
