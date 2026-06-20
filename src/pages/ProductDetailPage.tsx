import { useParams, Link } from 'react-router-dom'
import { PRODUCTS_BY_ID, PRODUCT_CATEGORY_LABELS, PRODUCTS } from '../data/products'
import { INGREDIENTS_BY_ID, CATEGORY_COLORS, CATEGORY_LABELS } from '../data/ingredients'
import { SKIN_TYPES_BY_ID } from '../data/skinTypes'
import ProductCard from '../components/ProductCard'

export default function ProductDetailPage() {
  const { id } = useParams()
  const product = id ? PRODUCTS_BY_ID[id] : undefined

  if (!product) {
    return (
      <div className="page">
        <div className="container empty">
          <p>제품을 찾을 수 없어요.</p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: 16 }}>
            제품 목록으로
          </Link>
        </div>
      </div>
    )
  }

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.bestFor.some((t) => product.bestFor.includes(t)),
  ).slice(0, 3)

  return (
    <div className="page">
      <div className="container">
        <Link to="/products" className="back-link">
          ← 제품 목록으로
        </Link>

        <div className="detail-hero">
          <div
            className="detail-thumb"
            style={{
              background: `linear-gradient(150deg, ${product.gradient[0]}, ${product.gradient[1]})`,
            }}
          >
            {product.emoji}
          </div>

          <div className="detail-info">
            <span className="chip cat">{PRODUCT_CATEGORY_LABELS[product.category]}</span>{' '}
            {product.fragranceFree && <span className="chip">무향</span>}
            <div className="brand" style={{ marginTop: 14 }}>
              {product.brand}
            </div>
            <h1>{product.name}</h1>
            <div className="price">
              {product.priceKRW.toLocaleString()}원{' '}
              <span style={{ fontSize: 14, color: 'var(--ink-faint)', fontWeight: 400 }}>
                / {product.volume}
              </span>
            </div>
            <p style={{ color: 'var(--ink-soft)' }}>{product.blurb}</p>

            {/* 특성 */}
            <div className="detail-section">
              <h3>🏷️ 피부 특성</h3>
              <div className="trait-row">
                {product.traits.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* 키워드 */}
            <div className="detail-section">
              <h3>🔖 피부 키워드</h3>
              <div className="kw-row">
                {product.keywords.map((k) => (
                  <span key={k} className="chip kw">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* 성분 → 특성 근거 (자세히 보기 핵심) */}
            <div className="detail-section">
              <h3>🔬 왜 이런 특성을 가질까?</h3>
              {product.highlights.map((h) => {
                const ing = INGREDIENTS_BY_ID[h.ingredientId]
                if (!ing) return null
                return (
                  <div
                    key={h.ingredientId}
                    className="highlight-item"
                    style={{ borderLeftColor: CATEGORY_COLORS[ing.category] }}
                  >
                    <div className="ing-name">
                      {ing.name}
                      <span className="sci">{ing.inci}</span>
                    </div>
                    <p className="effect">{h.effect}</p>
                  </div>
                )
              })}
            </div>

            {/* 주의 성분 */}
            {product.cautionIngredients.length > 0 && (
              <div className="detail-section">
                <h3>⚠️ 함께 확인할 점</h3>
                {product.cautionIngredients.map((cid) => {
                  const ing = INGREDIENTS_BY_ID[cid]
                  if (!ing) return null
                  return (
                    <div key={cid} className="caution-note">
                      <b>{ing.name}</b> · {ing.cautionNote ?? ing.summary}
                    </div>
                  )
                })}
              </div>
            )}

            {/* 긴 설명 */}
            <div className="detail-section">
              <h3>📖 자세한 설명</h3>
              <div className="detail-prose">{product.detail}</div>
            </div>

            {/* 적합 타입 */}
            <div className="detail-section">
              <h3>🧭 이런 피부에 잘 맞아요</h3>
              <div className="trait-row">
                {product.bestFor.map((tid) => {
                  const t = SKIN_TYPES_BY_ID[tid]
                  return (
                    <Link
                      key={tid}
                      to="/skin-type"
                      className="chip"
                      style={{ background: t.color, color: '#fff' }}
                    >
                      {t.emoji} {t.name}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* 전체 핵심 성분 분류 */}
            <div className="detail-section">
              <h3>🧪 핵심 성분 구성</h3>
              <div className="trait-row">
                {product.keyIngredients.map((kid) => {
                  const ing = INGREDIENTS_BY_ID[kid]
                  if (!ing) return null
                  return (
                    <span
                      key={kid}
                      className="chip"
                      style={{
                        background: CATEGORY_COLORS[ing.category],
                        color: '#fff',
                      }}
                      title={CATEGORY_LABELS[ing.category]}
                    >
                      {ing.name}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 관련 제품 */}
        {related.length > 0 && (
          <section style={{ marginTop: 64 }}>
            <h2 style={{ fontSize: 24, marginBottom: 20 }}>비슷한 피부에 맞는 제품</h2>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
