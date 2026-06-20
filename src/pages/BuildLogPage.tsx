// =============================================================================
// pibu · /build-log 엔드포인트
// -----------------------------------------------------------------------------
// 이 서비스가 만들어진 과정 — 사용자가 Claude Code에게 한 요청과,
// 각 요청에 따라 수행한 작업을 시간순으로 기록한 페이지.
// =============================================================================

import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

interface LogEntry {
  n: string
  date: string
  title: string
  /** 사용자의 실제 요청(요약/인용) */
  request: string
  tags: string[]
  /** 그 요청에 따라 수행한 작업 */
  work: string[]
}

const BUILD_LOG: LogEntry[] = [
  {
    n: '01',
    date: '2026-06-20',
    title: '서비스 전체 기획 & 구축',
    request:
      '“pibu는 피부 트러블이 많고 예민한 사람을 위한 서비스야. 올리브영처럼 시중 피부 제품을 모으고, 제품별 성분을 리서치해 정리하고(표기 정보 활용), 최신 의학 논문·저널로 각 성분이 피부에 미치는 영향을 정리하고, 트러블 피부가 고려할 점을 정리해줘. 제품 페이지에서 제품별 피부 특성을 보여주고 ‘자세히 보기’로 세부 설명(~성분 때문에 ~특성)과 키워드를 붙이고, 피부 타입을 분류해 타입별 추천 페이지도 넣고, 유저 친화적으로 디자인해줘.”',
    tags: ['기획', '데이터', '구현'],
    work: [
      'Vite + React + TypeScript로 프로젝트 스캐폴딩',
      '성분 지식베이스 26종 구축 — 작용 기전, 논문 근거, 민감 피부 적합도(1~5)',
      '제품 데이터베이스 21종 큐레이션 — 성분→특성→키워드→피부타입 매핑, “~성분 때문에 ~특성” 구조(highlights)',
      '피부 타입 7종 분류(Baumann 참고) + 4축 진단 로직 설계',
      '페이지 구현: 홈 / 제품 목록·상세(자세히 보기) / 성분 사전 / 피부 타입 진단 / 트러블 가이드',
      '더마 감성 디자인 시스템 + 반응형 + 프로덕션 빌드 검증',
    ],
  },
  {
    n: '02',
    date: '2026-06-20',
    title: '협업 방식 리서치 & 기록 문서화',
    request:
      '“서비스 초안을 기획·구성한 뒤, 나랑 어떻게 이 서비스를 수정·발전시켜 나가면 좋을지 리서치해서 알려줘. 그리고 네가 리서치·기획·판단한 내용을 마크다운으로 남겨서 내가 기록을 볼 수 있게 해줘.”',
    tags: ['리서치', '문서화'],
    work: [
      'docs/ 디렉토리에 기록 7종 작성: 개요·성분 리서치·피부타입 설계·제품 데이터 방법론·디자인·협업 로드맵·의사결정 로그',
      '협업 루프(만들고→보고→고치기)와 v0.2~v0.5 발전 로드맵 제안',
      'README에 실행법·구조·문서 인덱스 정리',
    ],
  },
  {
    n: '03',
    date: '2026-06-20',
    title: '다음 우선순위 선택 → 디자인 다듬기',
    request: '제시된 4가지 방향(신뢰 강화 / 데이터 확장 / 기능 추가 / 디자인) 중 “디자인 다듬기” 선택.',
    tags: ['의사결정'],
    work: [
      '디자인 개선 후보 제안: 모바일 내비게이션, 다크 모드, 시각적 폴리시, 접근성',
    ],
  },
  {
    n: '04',
    date: '2026-06-20',
    title: '제안 항목 전체 강화',
    request: '“네가 방금 제시했던 내용 모두 강화해줘.”',
    tags: ['디자인', '접근성'],
    work: [
      '다크 모드 도입 — 토큰화 + localStorage 저장 + OS 설정 감지, 테마 토글',
      '모바일 내비게이션 버그 수정 — 하단 탭바 + 햄버거 메뉴',
      '제품 썸네일 성분 칩·패턴, 히어로 떠다니는 성분 배지 추가',
      '키보드 포커스 링(:focus-visible), prefers-reduced-motion 대응',
    ],
  },
  {
    n: '05',
    date: '2026-06-20',
    title: '실행 문제 진단',
    request: '“지금 실행이 안돼.”',
    tags: ['디버깅'],
    work: [
      'dev 서버 구동 점검 — index.html·entry 모듈 모두 HTTP 200 정상 확인',
      '포트를 점유하던 백그라운드 서버 정리, 증상 분기 확인',
    ],
  },
  {
    n: '06',
    date: '2026-06-20',
    title: 'UI/UX 트렌디 전면 리디자인',
    request:
      '“사이트 자체가 노션에 피부 제품 정리해 놓은 것 같아. 좀 더 최신 트렌드에 맞게 wow 포인트가 있는 형태로 UI/UX를 바꿀 수 없을까?”',
    tags: ['리디자인'],
    work: [
      '디자인 선호를 메모리에 저장(밋밋함 지양, 에디토리얼/트렌디 지향)',
      '디자인 시스템 v2 “Editorial Derma” 전면 재작성',
      '오로라 메시 그라데이션 히어로 + 글래스모피즘 카드 + 키워드 마퀴',
      '베이토(bento) 그리드, 스크롤 리빌(Reveal) 모션, Fraunces 세리프 타이포',
      '홈페이지 구조 재구성, 페이지 제목에 세리프 액센트',
    ],
  },
  {
    n: '07',
    date: '2026-06-20',
    title: '제품 진열 방식 감각적으로',
    request: '“이렇게 제품 나열하는 방식 말고 좀 더 감각적으로 보여줄 수 없을까?” (스크린샷 첨부)',
    tags: ['리디자인'],
    work: [
      '제품 카드 에디토리얼 재설계 — 성분명 대형 세리프 워터마크, 오브제형 이모지(그림자·광원)',
      'hover 시 키워드·CTA 슬라이드업 오버레이, 세리프 인덱스 번호',
      '매거진 리듬 — 5번째마다 가로형 와이드 피처 카드, grid-auto-flow dense',
    ],
  },
  {
    n: '08',
    date: '2026-06-20',
    title: '자동 커밋',
    request: '/auto-commit — 변경 사항을 분석해 자동 커밋 생성.',
    tags: ['git'],
    work: [
      'git 저장소 초기화(.gitignore로 node_modules·dist 제외)',
      '전체를 스테이징하고 컨벤션에 맞춘 첫 커밋(feat) 생성',
    ],
  },
  {
    n: '09',
    date: '2026-06-21',
    title: '빌드 로그 엔드포인트 생성',
    request:
      '“내가 이 서비스를 만들기 위해 Claude Code에게 어떤 요청을 했는지 context를 확인해, 요청 내역과 요청별 작업을 정리해. pibu에 엔드포인트를 하나 만들어서, 접근하면 어떤 요청을 했고 그에 따라 어떤 작업을 했는지 설명해줘.”',
    tags: ['기능', '문서화'],
    work: [
      '전체 대화 컨텍스트에서 요청 내역을 시간순으로 정리',
      '/build-log 엔드포인트(이 페이지) 추가 — 요청과 작업을 타임라인으로 시각화',
      '라우터 등록 및 푸터 링크 연결',
    ],
  },
  {
    n: '10',
    date: '2026-06-21',
    title: '서비스 구조 설명 엔드포인트 생성',
    request:
      '“이 서비스가 어떻게 구성되어 있는지 설명하는 엔드포인트도 만들어줘. 지금 시스템 아키텍처는 어떻게 되어 있고 향후에 어떻게 바뀔지, 데이터는 어떻게 수집하고 현재·향후 어떻게 관리하는지, 그리고 더 발전하려면 어떤 시도를 해야 하는지 정리해줘.”',
    tags: ['기능', '문서화'],
    work: [
      '/architecture 엔드포인트 추가 — 5개 섹션(서비스 구성·현재 아키텍처·향후 아키텍처·데이터 라이프사이클·발전 시도)',
      '아키텍처 흐름도, 데이터 파이프라인(6단계), 성장 시도 카드 시각화',
      '현재(코드 내 데이터) → 향후(API+DB+수집 파이프라인) 전환 설계 정리',
      '라우터 등록 및 푸터 “서비스 구조” 링크 연결',
    ],
  },
  {
    n: '11',
    date: '2026-06-21',
    title: 'dev 드롭다운 내비게이션 추가',
    request:
      '“페이지 오른쪽 상단에 dev 드롭다운 버튼 만들고, build log·architecture 항목을 추가해 해당 페이지로 이동할 수 있게 해줘.”',
    tags: ['기능', '네비게이션'],
    work: [
      '헤더 우상단에 DevMenu 드롭다운 추가 — 빌드 로그 / 서비스 구조 이동',
      '바깥 클릭·ESC·페이지 이동 시 자동 닫힘, aria 접근성 적용',
      '드롭다운 스타일링(현재 페이지 하이라이트, 캐럿 회전 애니메이션)',
    ],
  },
  {
    n: '12',
    date: '2026-06-21',
    title: '빌드 로그 항목 갱신',
    request: '“이번에 추가된 build log 추가해줘.”',
    tags: ['문서화'],
    work: [
      '최근 요청(서비스 구조 엔드포인트, dev 드롭다운, 본 갱신)을 빌드 로그 타임라인에 추가',
    ],
  },
]

export default function BuildLogPage() {
  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 920 }}>
        <Reveal className="page-head">
          <span className="chip" style={{ marginBottom: 14 }}>
            /build-log
          </span>
          <h1>
            이 서비스가 <em>만들어진</em> 과정
          </h1>
          <p>
            pibu는 사용자의 요청과 Claude Code의 작업이 주고받으며 만들어졌습니다. 어떤 요청을
            했고, 그에 따라 무엇을 어떻게 했는지 시간순으로 기록합니다.
          </p>
        </Reveal>

        <div className="bl-stats">
          <div className="bl-stat">
            <span className="num">{BUILD_LOG.length}</span>
            <span className="label">요청 단계</span>
          </div>
          <div className="bl-stat">
            <span className="num">
              {BUILD_LOG.reduce((s, e) => s + e.work.length, 0)}
            </span>
            <span className="label">수행 작업</span>
          </div>
          <div className="bl-stat">
            <span className="num">2</span>
            <span className="label">작업 일자</span>
          </div>
        </div>

        <div className="timeline">
          {BUILD_LOG.map((e, i) => (
            <Reveal key={e.n} className="tl-row" delay={(i % 4) * 60}>
              <div className="tl-line">
                <span className="tl-marker">{e.n}</span>
              </div>
              <div className="tl-card">
                <div className="tl-head">
                  <h3>{e.title}</h3>
                  <span className="tl-date">{e.date}</span>
                </div>
                <div className="trait-row" style={{ marginBottom: 14 }}>
                  {e.tags.map((t) => (
                    <span key={t} className="chip kw">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="tl-block req">
                  <span className="tl-label">🙋 요청</span>
                  <p>{e.request}</p>
                </div>

                <div className="tl-block">
                  <span className="tl-label">🛠️ 수행한 작업</span>
                  <ul className="tl-work">
                    {e.work.map((w, j) => (
                      <li key={j}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="detail-prose" style={{ marginTop: 32 }}>
            이 페이지는 대화 컨텍스트를 바탕으로 정리한 기록입니다. 더 자세한 리서치·판단 근거는{' '}
            <Link to="/guide" style={{ color: 'var(--green-700)', fontWeight: 700 }}>
              가이드
            </Link>
            와 저장소의 <code>docs/</code> 폴더(개요·성분 리서치·디자인·협업 로드맵·의사결정 로그)에서
            볼 수 있습니다.
          </div>
        </Reveal>
      </div>
    </div>
  )
}
