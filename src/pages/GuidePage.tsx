import { Link } from 'react-router-dom'

export default function GuidePage() {
  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="page-head">
          <h1>
            트러블·민감 피부 <em>가이드</em>
          </h1>
          <p>
            예민한 피부일수록 “무엇을 더 바르는가”보다 “무엇을 덜고, 어떻게 지키는가”가
            중요합니다. 피부과학에서 반복적으로 강조되는 핵심 원칙을 정리했습니다.
          </p>
        </div>

        <div className="detail-prose" style={{ marginBottom: 28 }}>
          이 페이지의 내용은 교육·참고용입니다. 진물·심한 가려움·통증이 있거나 2~4주 이상
          호전이 없으면 자가 케어보다 <b>피부과 전문의 상담</b>을 우선하세요.
        </div>

        <GuideSection
          n="01"
          title="장벽을 먼저 지킨다"
          body="민감·트러블 피부의 출발점은 대부분 약해진 피부 장벽입니다. 장벽이 무너지면 수분이 새고
          외부 자극·미생물이 쉽게 침투해 따가움·홍조·트러블이 반복됩니다. 세라마이드·콜레스테롤·지방산
          같은 장벽 지질과 판테놀·히알루론산으로 ‘채우고 덮어’ 장벽부터 회복하세요."
          tags={['세라마이드', '판테놀', '히알루론산']}
        />
        <GuideSection
          n="02"
          title="덜어내기(스킨 다이어트)"
          body="단계가 많을수록 좋은 게 아닙니다. 예민한 시기에는 기능성 활성(레티놀·고농도 산·비타민 C)을
          멈추고, 클렌저-보습-자외선차단의 3단계로 단순화하세요. 성분 수가 적고 향이 없는 제품일수록
          자극 변수가 줄어듭니다."
          tags={['무향', '단순한 루틴', '활성 휴식']}
        />
        <GuideSection
          n="03"
          title="향료·정유·강한 계면활성제를 의심한다"
          body="향료(Fragrance/Parfum)는 화장품 접촉 알레르기의 흔한 원인입니다. ‘천연’ 정유도 산화되면
          오히려 더 자극적일 수 있어요. 세정은 SLS 같은 강한 계면활성제 대신 아미노산계 등 순한
          클렌저로, 미온수로 짧게 하세요."
          tags={['향료 주의', '정유 주의', '순한 세정']}
        />
        <GuideSection
          n="04"
          title="한 번에 하나씩, 패치 테스트"
          body="새 제품은 한 번에 하나씩 들이고, 팔 안쪽이나 귀 뒤에 며칠 발라 반응을 본 뒤 얼굴에
          올리세요. 여러 활성을 같은 날 겹치면(예: 레티놀+산+비타민 C) 자극이 누적되니 시간대·요일을
          나누는 것이 안전합니다."
          tags={['패치 테스트', '활성 분리', '점진적 도입']}
        />
        <GuideSection
          n="05"
          title="자외선 차단은 타협하지 않는다"
          body="자외선은 색소·홍조·노화·장벽 손상의 공통 가속 요인입니다. 특히 활성 성분을 쓰는 동안에는
          필수예요. 화학 필터에 예민하면 산화아연·이산화티타늄 기반의 물리(무기) 자외선 차단제를
          고려하세요."
          tags={['SPF', '물리 선크림', '데일리 차단']}
        />
        <GuideSection
          n="06"
          title="성분표를 읽는 습관"
          body="성분은 함량이 많은 순서로 표기됩니다. 앞쪽에 변성알코올·향료가 있다면 함량이 높다는
          뜻이에요. pibu의 성분 사전에서 각 성분의 역할과 민감 피부 적합도를 확인하고, 내 피부 타입의
          ‘조심할 성분’과 대조해 보세요."
          tags={['성분표 읽기', '함량 순서', '근거 기반']}
        />

        <div className="cta-band" style={{ marginTop: 40 }}>
          <h2>이제 내 피부 타입을 확인해 볼까요?</h2>
          <p>타입별로 챙길 성분과 피할 성분, 맞는 제품을 추천해 드려요.</p>
          <Link to="/skin-type" className="btn btn-ghost">
            피부 타입 진단하기 →
          </Link>
        </div>
      </div>
    </div>
  )
}

function GuideSection({
  n,
  title,
  body,
  tags,
}: {
  n: string
  title: string
  body: string
  tags: string[]
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '64px 1fr',
        gap: 20,
        padding: '24px 0',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 30,
          color: 'var(--green-300)',
          fontWeight: 700,
        }}
      >
        {n}
      </div>
      <div>
        <h3 style={{ fontSize: 20, marginBottom: 10 }}>{title}</h3>
        <p style={{ color: 'var(--ink-soft)', marginBottom: 12 }}>{body}</p>
        <div className="trait-row">
          {tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
