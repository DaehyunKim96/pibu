import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { PRODUCT_CATEGORY_LABELS } from '../data/products'
import { INGREDIENTS_BY_ID, CATEGORY_COLORS } from '../data/ingredients'

/** 성분 INCI에서 워터마크용 영문 단어 한 개를 깔끔하게 추출 */
function watermarkWord(inci: string): string {
  const first = inci.split(/[/(,]/)[0].trim()
  const words = first.split(' ')
  const skip = new Set(['Sodium', 'Acid', 'Leaf', 'Extract'])
  return words.find((w) => !skip.has(w)) || words[0]
}

export default function ProductCard({
  product,
  index,
  featured = false,
}: {
  product: Product
  index?: number
  featured?: boolean
}) {
  const ings = product.keyIngredients.map((id) => INGREDIENTS_BY_ID[id]).filter(Boolean)
  const top = ings[0]
  const watermark = top ? watermarkWord(top.inci) : product.brand

  return (
    <Link
      to={`/products/${product.id}`}
      className={`product-card ${featured ? 'featured' : ''}`}
    >
      <div
        className="pc-media"
        style={{
          background: `linear-gradient(155deg, ${product.gradient[0]}, ${product.gradient[1]})`,
        }}
      >
        <span className="pc-grain" aria-hidden />
        <span className="pc-glow" aria-hidden />
        <span className="pc-watermark" aria-hidden>
          {watermark}
        </span>

        <div className="pc-media-top">
          <span className="pc-cat">{PRODUCT_CATEGORY_LABELS[product.category]}</span>
          {product.fragranceFree && <span className="ff">무향</span>}
        </div>

        <span className="pc-emoji">{product.emoji}</span>
        <span className="pc-shadow" aria-hidden />

        <div className="pc-ings">
          {ings.slice(0, featured ? 3 : 2).map((ing) => (
            <span
              key={ing.id}
              className="thumb-ing"
              style={{ background: CATEGORY_COLORS[ing.category] }}
            >
              {ing.name.replace(/\s*\(.*\)/, '')}
            </span>
          ))}
        </div>

        <div className="pc-overlay">
          <div className="pc-kw">
            {product.keywords.slice(0, featured ? 4 : 3).map((k) => (
              <span key={k} className="pc-kw-chip">
                {k}
              </span>
            ))}
          </div>
          <span className="pc-cta">자세히 보기 →</span>
        </div>
      </div>

      <div className="pc-info">
        <div className="pc-info-top">
          <span className="brand">{product.brand}</span>
          {typeof index === 'number' && (
            <span className="pc-index">{String(index + 1).padStart(2, '0')}</span>
          )}
        </div>
        <h3 className="pname">{product.name}</h3>
        {featured && <p className="pc-blurb">{product.blurb}</p>}
        <div className="trait-row">
          {product.traits.slice(0, featured ? 4 : 3).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        <div className="pc-foot">
          <span className="price">{product.priceKRW.toLocaleString()}원</span>
          <span className="pc-vol">{product.volume}</span>
        </div>
      </div>
    </Link>
  )
}
