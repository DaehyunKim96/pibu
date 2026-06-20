import { useState, useMemo } from 'react'
import { PRODUCTS, PRODUCT_CATEGORY_LABELS } from '../data/products'
import type { ProductCategory } from '../data/products'
import { SKIN_TYPES } from '../data/skinTypes'
import type { SkinTypeId } from '../data/skinTypes'
import ProductCard from '../components/ProductCard'

type CatFilter = ProductCategory | 'all'
type TypeFilter = SkinTypeId | 'all'

export default function ProductsPage() {
  const [cat, setCat] = useState<CatFilter>('all')
  const [type, setType] = useState<TypeFilter>('all')
  const [fragranceFree, setFragranceFree] = useState(false)

  const categories = Object.keys(PRODUCT_CATEGORY_LABELS) as ProductCategory[]

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (cat !== 'all' && p.category !== cat) return false
      if (type !== 'all' && !p.bestFor.includes(type)) return false
      if (fragranceFree && !p.fragranceFree) return false
      return true
    })
  }, [cat, type, fragranceFree])

  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <h1>
            제품 <em>둘러보기</em>
          </h1>
          <p>
            전성분을 분석한 {PRODUCTS.length}개 제품. 카테고리·피부 타입으로 필터링하고, 카드를
            눌러 “왜 이 특성을 가지는지” 자세히 살펴보세요.
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="filter-bar">
          <button
            className={`filter-btn ${cat === 'all' ? 'active' : ''}`}
            onClick={() => setCat('all')}
          >
            전체
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-btn ${cat === c ? 'active' : ''}`}
              onClick={() => setCat(c)}
            >
              {PRODUCT_CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>

        {/* 피부 타입 필터 */}
        <div className="filter-bar">
          <button
            className={`filter-btn ${type === 'all' ? 'active' : ''}`}
            onClick={() => setType('all')}
          >
            모든 타입
          </button>
          {SKIN_TYPES.map((t) => (
            <button
              key={t.id}
              className={`filter-btn ${type === t.id ? 'active' : ''}`}
              onClick={() => setType(t.id)}
            >
              {t.emoji} {t.name}
            </button>
          ))}
          <button
            className={`filter-btn ${fragranceFree ? 'active' : ''}`}
            onClick={() => setFragranceFree((v) => !v)}
            style={{ marginLeft: 'auto' }}
          >
            무향만 보기
          </button>
        </div>

        <p style={{ color: 'var(--ink-faint)', fontSize: 14, marginBottom: 20 }}>
          {filtered.length}개 제품
        </p>

        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                featured={filtered.length > 3 && i % 5 === 0}
              />
            ))}
          </div>
        ) : (
          <div className="empty">조건에 맞는 제품이 없어요. 필터를 조정해 보세요.</div>
        )}
      </div>
    </div>
  )
}
