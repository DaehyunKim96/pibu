// =============================================================================
// pibu · /architecture 엔드포인트
// -----------------------------------------------------------------------------
// 서비스가 어떻게 구성되어 있는지, 현재/향후 시스템 아키텍처,
// 데이터 수집·관리 방식(현재/미래), 그리고 발전을 위한 시도를 설명한다.
// =============================================================================

import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

/** 화살표로 연결되는 아키텍처 노드 흐름 */
function Flow({ nodes }: { nodes: { label: string; sub?: string; accent?: boolean }[] }) {
  return (
    <div className="arch-flow">
      {nodes.map((n, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span className={`arch-node ${n.accent ? 'accent' : ''}`}>
            <b>{n.label}</b>
            {n.sub && <span>{n.sub}</span>}
          </span>
          {i < nodes.length - 1 && <span className="arch-sep">→</span>}
        </span>
      ))}
    </div>
  )
}

const PIPELINE = [
  { t: '수집', d: '올리브영·브랜드몰 공개 전성분 / 제휴 API' },
  { t: '정규화', d: 'INCI 표준화, 중복·표기 정리' },
  { t: '매핑', d: '성분 지식베이스 id에 연결' },
  { t: 'LLM 초안', d: '특성·키워드·요약 자동 생성' },
  { t: '사람 검수', d: '근거 확인 후 확정' },
  { t: '적재·노출', d: 'DB 저장 + 출처/근거 링크 노출' },
]

const GROWTH = [
  {
    icon: '🔬',
    title: '신뢰 강화',
    body: '성분별 논문 DOI 실제 링크, 출처 페이지, 성분 충돌(레티놀+산 등) 경고 배지로 “근거 있는 정보”를 굳힌다.',
    tag: '최우선',
  },
  {
    icon: '🎯',
    title: '진단 정확도',
    body: '주 타입 + 부 타입 동시 제시, 사용자 응답 데이터로 분기 임계값을 재보정. 계절·호르몬 변동 반영.',
    tag: '핵심',
  },
  {
    icon: '📦',
    title: '데이터 규모',
    body: '제품 100+ 로 확장, 크롤링/제휴 파이프라인 자동화, 성분·제품 검색과 정렬.',
    tag: '확장',
  },
  {
    icon: '💚',
    title: '개인화',
    body: '계정·찜, 아침/저녁 루틴 빌더(성분 충돌 자동 점검), 제품 비교, 진단 결과 공유 카드.',
    tag: '리텐션',
  },
  {
    icon: '🤖',
    title: 'AI 성분 해석',
    body: '전성분을 붙여넣으면 Claude API가 내 피부 타입 기준으로 해석·경고해 주는 챗봇.',
    tag: '차별화',
  },
  {
    icon: '🧪',
    title: '품질·운영',
    body: '데이터 검수 워크플로, 자동 테스트, 정보 정정 루프, 의료 면책·전문의 권고 트리거 강화.',
    tag: '신뢰성',
  },
]

export default function ArchitecturePage() {
  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 960 }}>
        <Reveal className="page-head">
          <span className="chip" style={{ marginBottom: 14 }}>
            /architecture
          </span>
          <h1>
            서비스는 어떻게 <em>구성</em>되어 있나
          </h1>
          <p>
            pibu의 현재 구조와 향후 아키텍처, 데이터를 수집·관리하는 방식, 그리고 더 발전하기
            위해 시도할 것들을 정리합니다.
          </p>
        </Reveal>

        {/* 1. 서비스 구성 (레이어) */}
        <Reveal className="arch-section">
          <span className="kicker">01 · Composition</span>
          <h2 className="arch-h2">3개의 레이어로 구성</h2>
          <div className="layer-stack">
            <div className="layer l1">
              <b>🎨 프레젠테이션 — 페이지 & 디자인 시스템</b>
              <span>
                홈 · 제품(목록/상세) · 성분 사전 · 피부 타입 진단 · 가이드 · 빌드 로그 ·
                아키텍처 / 에디토리얼 CSS 디자인 시스템(다크모드·반응형·모션)
              </span>
            </div>
            <div className="layer l2">
              <b>🧩 로직 — 컴포넌트 & 라우팅</b>
              <span>
                React Router 클라이언트 라우팅, ProductCard·Reveal 등 컴포넌트, 진단 분류
                로직(classifySkinType), 필터·테마 상태
              </span>
            </div>
            <div className="layer l3">
              <b>🗄️ 데이터 — 타입 안전 지식베이스</b>
              <span>
                ingredients(성분) · products(제품) · skinTypes(타입) 세 모듈이 id로 상호 연결.
                제품→성분→타입이 하나의 그래프로 묶임
              </span>
            </div>
          </div>
        </Reveal>

        {/* 2. 현재 아키텍처 */}
        <Reveal className="arch-section">
          <span className="kicker">02 · Current architecture</span>
          <h2 className="arch-h2">지금: 클라이언트 전용 정적 SPA</h2>
          <Flow
            nodes={[
              { label: '브라우저', sub: '사용자' },
              { label: 'React SPA', sub: 'Vite 빌드 / 정적 자산', accent: true },
              { label: '코드 내 데이터', sub: 'src/data/*.ts' },
            ]}
          />
          <div className="bento" style={{ marginTop: 24 }}>
            <div className="bento-card col-2">
              <h3>특징</h3>
              <p>
                백엔드·DB 없이 정적 호스팅만으로 동작. 데이터가 코드에 있어 빠르고, TypeScript가
                id 참조 오류를 빌드 시점에 잡아준다.
              </p>
            </div>
            <div className="bento-card col-2">
              <h3>상태 관리</h3>
              <p>테마는 localStorage, 진단 결과·필터는 컴포넌트 상태. 서버 세션 없음.</p>
            </div>
            <div className="bento-card col-2">
              <h3>한계</h3>
              <p>
                데이터 수정에 배포 필요, 사용자별 저장·검색·SEO에 약함. 데이터가 커지면 부적합.
              </p>
            </div>
          </div>
        </Reveal>

        {/* 3. 향후 아키텍처 */}
        <Reveal className="arch-section">
          <span className="kicker">03 · Future architecture</span>
          <h2 className="arch-h2">향후: API + DB + 수집 파이프라인</h2>
          <Flow
            nodes={[
              { label: '클라이언트', sub: 'React / Next(SSR·SEO)' },
              { label: 'API', sub: 'REST·GraphQL', accent: true },
              { label: '백엔드', sub: '추천·검색·인증' },
              { label: 'DB', sub: 'Postgres + 검색엔진' },
            ]}
          />
          <Flow
            nodes={[
              { label: '수집 파이프라인', sub: '크롤러 / 제휴 API' },
              { label: 'LLM 보조', sub: '특성·키워드 초안', accent: true },
              { label: 'DB 적재', sub: '버전·출처 추적' },
            ]}
          />
          <div className="detail-prose" style={{ marginTop: 20 }}>
            현재의 데이터 구조(성분·제품·타입의 id 연결)는 그대로 두고 <b>저장소만 코드 → DB</b>로
            옮기면 된다. 컴포넌트는 데이터 출처에 의존하지 않도록 설계돼 있어, 전환 비용이 낮다.
          </div>
        </Reveal>

        {/* 4. 데이터 수집·관리 */}
        <Reveal className="arch-section">
          <span className="kicker">04 · Data lifecycle</span>
          <h2 className="arch-h2">데이터는 어떻게 수집·관리되나</h2>
          <div className="data-cols">
            <div className="data-col">
              <span className="data-tag now">현재</span>
              <ul>
                <li>
                  <b>수집:</b> 실재 제품의 <u>공개 전성분</u>을 기반으로 한 수기 큐레이션(실시간
                  크롤링 아님)
                </li>
                <li>
                  <b>관리:</b> <code>src/data/*.ts</code>에 타입 객체로 보관, git으로 버전 관리
                </li>
                <li>
                  <b>무결성:</b> 제품이 참조하는 성분·타입 id를 TypeScript가 검증, 빌드가 오타를
                  차단
                </li>
                <li>
                  <b>문서화:</b> 수집 기준·방법론을 <code>docs/03-product-data.md</code>에 기록
                </li>
              </ul>
            </div>
            <div className="data-col">
              <span className="data-tag next">향후</span>
              <ul>
                <li>
                  <b>수집:</b> 크롤링/제휴 API로 자동 수집(약관·법적 검토 후)
                </li>
                <li>
                  <b>가공:</b> INCI 정규화 → 성분 매핑 → LLM 초안 → <u>사람 검수</u>
                </li>
                <li>
                  <b>저장:</b> DB로 이전, 출처·버전·갱신 이력 추적
                </li>
                <li>
                  <b>품질:</b> 근거 필수화, 정정 루프, 가격·표기 주기적 갱신
                </li>
              </ul>
            </div>
          </div>

          <h3 style={{ margin: '28px 0 16px', fontSize: 18 }}>데이터 파이프라인 (향후)</h3>
          <div className="pipe">
            {PIPELINE.map((s, i) => (
              <div className="pipe-step" key={s.t}>
                <span className="pipe-n">{i + 1}</span>
                <b>{s.t}</b>
                <span>{s.d}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 5. 발전을 위한 시도 */}
        <Reveal className="arch-section">
          <span className="kicker">05 · What to try next</span>
          <h2 className="arch-h2">더 발전하기 위한 시도</h2>
          <div className="grow-grid">
            {GROWTH.map((g) => (
              <div className="grow-card" key={g.title}>
                <div className="grow-top">
                  <span className="grow-ico">{g.icon}</span>
                  <span className="chip">{g.tag}</span>
                </div>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="cta-band" style={{ marginTop: 16 }}>
            <h2>
              이 서비스의 <em>만들어진 과정</em>이 궁금하다면
            </h2>
            <p>요청과 작업 내역을 시간순으로 기록한 빌드 로그를 확인하세요.</p>
            <Link to="/build-log" className="btn btn-ghost">
              빌드 로그 보기 →
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
