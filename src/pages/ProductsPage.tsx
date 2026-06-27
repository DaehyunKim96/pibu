import { useState, useMemo } from 'react'
import { BRAND_PROFILES, PRODUCTS, PRODUCT_CATEGORY_LABELS } from '../data/products'
import type { ProductCategory } from '../data/products'
import { SKIN_TYPES } from '../data/skinTypes'
import type { SkinTypeId } from '../data/skinTypes'
import ProductCard from '../components/ProductCard'

type CatFilter = ProductCategory | 'all'
type TypeFilter = SkinTypeId | 'all'
type BrandFilter = string | 'all'

export default function ProductsPage() {
  const [cat, setCat] = useState<CatFilter>('all')
  const [type, setType] = useState<TypeFilter>('all')
  const [brand, setBrand] = useState<BrandFilter>('all')
  const [fragranceFree, setFragranceFree] = useState(false)

  // 제품 데이터에서 화면에 필요한 필터 선택지를 만든다.
  // 브랜드는 별도 상수 목록을 두지 않고 실제 등록된 제품 기준으로 중복 제거한다.
  const categories = Object.keys(PRODUCT_CATEGORY_LABELS) as ProductCategory[]
  const brands = Array.from(new Set(PRODUCTS.map((p) => p.brand)))

  // 선택된 브랜드가 있으면 브랜드 설명 패널에 보여줄 메타 정보를 연결한다.
  const selectedBrand = brand === 'all' ? null : BRAND_PROFILES[brand]
  const selectedBrandCount =
    brand === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.brand === brand).length

  // 카테고리, 피부 타입, 브랜드, 무향 조건을 모두 만족하는 제품만 노출한다.
  // 각 필터가 'all'이면 해당 조건은 건너뛰어 다른 필터와 독립적으로 조합된다.
  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (cat !== 'all' && p.category !== cat) return false
      if (type !== 'all' && !p.bestFor.includes(type)) return false
      if (brand !== 'all' && p.brand !== brand) return false
      if (fragranceFree && !p.fragranceFree) return false
      return true
    })
  }, [cat, type, brand, fragranceFree])

  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <h1>
            제품 <em>둘러보기</em>
          </h1>
          <p>
            전성분을 분석한 {PRODUCTS.length}개 제품. 카테고리·피부 타입·브랜드별로 필터링하고,
            브랜드가 어떤 케어 방향과 제품 성격을 갖는지 함께 살펴보세요.
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
        </div>

        {/* 브랜드 필터 */}
        <div className="filter-bar">
          <button
            className={`filter-btn ${brand === 'all' ? 'active' : ''}`}
            onClick={() => setBrand('all')}
          >
            모든 브랜드
          </button>
          {brands.map((b) => (
            <button
              key={b}
              className={`filter-btn ${brand === b ? 'active' : ''}`}
              onClick={() => setBrand(b)}
            >
              {b}
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

        {/* 선택한 브랜드의 분류 기준과 제품 성격을 요약 */}
        <div className="brand-insight" aria-live="polite">
          <div>
            <span className="brand-insight-kicker">브랜드 분류</span>
            <h2>{brand === 'all' ? '브랜드별 케어 성격 보기' : brand}</h2>
            <p>
              {selectedBrand
                ? selectedBrand.character
                : '제품을 피부 타입으로만 나누지 않고, 브랜드가 반복해서 선택하는 성분과 제형 방향으로 다시 분류했습니다.'}
            </p>
          </div>
          <div className="brand-insight-meta">
            <div>
              <span>분류</span>
              <strong>{selectedBrand?.segment ?? '수분·진정·장벽·기능성'}</strong>
            </div>
            <div>
              <span>특징</span>
              <strong>{selectedBrand?.focus ?? '브랜드를 선택하면 핵심 특징을 보여줍니다.'}</strong>
            </div>
            <div className="brand-tag-row">
              {(selectedBrand?.tags ?? ['브랜드별', '성분특징', '제품분류']).map((tag) => (
                <span className="chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p style={{ color: 'var(--ink-faint)', fontSize: 14, marginBottom: 20 }}>
          {brand === 'all'
            ? `${filtered.length}개 제품`
            : `${brand} ${selectedBrandCount}개 중 ${filtered.length}개 제품`}
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
