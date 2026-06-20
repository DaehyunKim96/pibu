import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { INGREDIENTS } from '../data/ingredients'
import { SKIN_TYPES } from '../data/skinTypes'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'

const MARQUEE_WORDS = [
  '병풀 진정',
  '세라마이드 장벽',
  '히알루론산 보습',
  '나이아신아마이드',
  '무향 저자극',
  '어성초 트러블케어',
  '판테놀 재생',
  '아젤라산',
  '비타민C 광채',
  '논코메도제닉',
]

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 6)
  return (
    <>
      {/* ───────── 히어로 ───────── */}
      <section className="hero">
        <div className="aurora" aria-hidden>
          <span className="a1" />
          <span className="a2" />
          <span className="a3" />
          <span className="a4" />
        </div>
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">🌿 예민한 피부를 위한 성분 큐레이션</span>
              <h1>
                내 피부가 <span className="accent">왜</span> 예민한지,
                <br />
                <span className="hl">성분</span>이 답해줍니다
              </h1>
              <p className="lead">
                마케팅 문구가 아니라 전성분과 피부과학 근거로 제품을 해석합니다. 트러블 많고
                민감한 피부가 안심하고 고를 수 있도록.
              </p>
              <div className="hero-cta">
                <Link to="/skin-type" className="btn btn-primary">
                  ✨ 1분 피부 진단
                </Link>
                <Link to="/products" className="btn btn-ghost">
                  제품 둘러보기
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="num">{PRODUCTS.length}</div>
                  <div className="label">분석된 제품</div>
                </div>
                <div className="stat">
                  <div className="num">{INGREDIENTS.length}</div>
                  <div className="label">성분 데이터</div>
                </div>
                <div className="stat">
                  <div className="num">{SKIN_TYPES.length}</div>
                  <div className="label">피부 타입</div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <span className="blob">🧴</span>
              <div className="hero-card hc1">
                <div className="hc-title">🌿 병풀 95%</div>
                <div className="hc-sub">진정 · 장벽 회복</div>
              </div>
              <div className="hero-card hc2">
                <div className="hc-title">🛡️ 세라마이드 NP</div>
                <div className="hc-sub">민감 적합도 ●●●●●</div>
              </div>
              <div className="hero-card hc3">
                <div className="hc-title">🚫 향료 · 정유 0</div>
                <div className="hc-sub">무향 저자극</div>
              </div>
            </div>
          </div>

          {/* 키워드 마퀴 */}
          <div className="marquee" aria-hidden>
            <div className="marquee-track">
              {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
                <span className="m-item" key={i}>
                  <span className="d" />
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 베이토: 어떻게 도와주나 ───────── */}
      <section className="block">
        <div className="container">
          <Reveal className="section-head">
            <span className="kicker">How pibu works</span>
            <h2>
              성분으로 시작하는 <em>정직한</em> 피부 케어
            </h2>
            <p>브랜드의 마케팅이 아니라, 전성분과 피부과학 논문을 근거로 제품을 풀어냅니다.</p>
          </Reveal>

          <Reveal className="bento">
            <div className="bento-card feature col-3">
              <span className="ico">🔬</span>
              <h3>성분을 끝까지 본다</h3>
              <p>
                전성분을 진정·장벽·활성·항산화·주의로 분류하고, 각 성분이 피부에 어떤 영향을
                주는지 논문 근거와 함께 정리합니다.
              </p>
            </div>
            <div className="bento-card col-3">
              <span className="ico">🧭</span>
              <h3>내 타입에 맞춘다</h3>
              <p>7가지 피부 타입 진단으로 챙길 성분·피할 성분, 맞는 제품을 추천받으세요.</p>
            </div>
            <div className="bento-card col-2">
              <span className="ico">💬</span>
              <h3>왜 그런지 설명한다</h3>
              <p>“○○ 성분 때문에 ○○한 특성을 가진다”를 이유와 함께.</p>
            </div>
            <div className="bento-card pop col-2">
              <span className="big-num">26</span>
              <p style={{ marginTop: 8, fontWeight: 700 }}>성분별 논문 근거 + 민감 적합도</p>
            </div>
            <div className="bento-card col-2">
              <span className="ico">🚫</span>
              <h3>덜어내기 철학</h3>
              <p>더 파는 게 아니라, 안 맞는 걸 거르도록 돕습니다. 무향 필터 기본 제공.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── 추천 제품 ───────── */}
      <section className="block" style={{ background: 'var(--cream-100)' }}>
        <div className="container">
          <Reveal className="section-head">
            <span className="kicker">Curated for sensitive skin</span>
            <h2>
              예민한 피부가 <em>자주 찾는</em> 제품
            </h2>
            <p>핵심 성분과 키워드를 한눈에. 카드를 눌러 “왜 이런 특성을 가지는지” 확인하세요.</p>
          </Reveal>
          <div className="product-grid">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
          <Reveal className="" >
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link to="/products" className="btn btn-primary">
                전체 제품 보기 →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── 피부 타입 미리보기 ───────── */}
      <section className="block">
        <div className="container">
          <Reveal className="section-head">
            <span className="kicker">Find your type</span>
            <h2>
              7가지 <em>피부 타입</em>
            </h2>
            <p>유분·민감도·트러블·홍조 4가지 축으로 분류해, 타입별 맞춤 케어를 제안합니다.</p>
          </Reveal>
          <div className="type-grid">
            {SKIN_TYPES.slice(0, 6).map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 90}>
                <Link
                  to="/skin-type"
                  className="type-card"
                  style={{ background: `linear-gradient(150deg, ${t.color}, ${t.color}cc)` }}
                >
                  <div className="emoji">{t.emoji}</div>
                  <h3>{t.name}</h3>
                  <p className="tagline">{t.tagline}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 진단 CTA ───────── */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <h2>
                1분이면, <em>내 피부</em>를 알 수 있어요
              </h2>
              <p>몇 가지 질문에 답하면 내 피부에 맞는 성분과 제품을 추천해 드려요.</p>
              <Link to="/skin-type" className="btn btn-ghost">
                피부 타입 진단 시작 →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
