import { useState } from 'react'
import {
  INGREDIENTS,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from '../data/ingredients'
import type { IngredientCategory } from '../data/ingredients'

type Filter = IngredientCategory | 'all'

function ScoreDots({ score }: { score: number }) {
  return (
    <div className="score-dots">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`d ${n <= score ? 'on' : ''}`} />
      ))}
    </div>
  )
}

export default function IngredientsPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const cats = Object.keys(CATEGORY_LABELS) as IngredientCategory[]
  const list = INGREDIENTS.filter((i) => filter === 'all' || i.category === filter)

  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <h1>
            성분 <em>사전</em>
          </h1>
          <p>
            피부와 관련된 핵심 성분을 진정·장벽·활성·항산화·주의로 나누고, 각 성분이 피부에 어떤
            영향을 주는지 작용 원리와 논문 근거, 민감 피부 적합도를 정리했습니다.
          </p>
        </div>

        <div className="filter-bar">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            전체
          </button>
          {cats.map((c) => (
            <button
              key={c}
              className={`filter-btn ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
              style={
                filter === c
                  ? { background: CATEGORY_COLORS[c], borderColor: CATEGORY_COLORS[c] }
                  : undefined
              }
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>

        <div className="ing-grid">
          {list.map((ing) => (
            <div key={ing.id} className="ing-card">
              <div className="top">
                <div>
                  <div className="name">{ing.name}</div>
                  <div className="inci">{ing.inci}</div>
                </div>
                <span
                  className="cat-badge"
                  style={{ background: CATEGORY_COLORS[ing.category] }}
                >
                  {CATEGORY_LABELS[ing.category]}
                </span>
              </div>

              <p className="summary">{ing.summary}</p>

              <div className="score-bar">
                <span className="lbl">민감 피부 적합도</span>
                <ScoreDots score={ing.sensitiveScore} />
              </div>

              <p style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>{ing.mechanism}</p>

              <div className="trait-row" style={{ marginTop: 12 }}>
                {ing.confersTraits.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              {ing.cautionNote && <div className="caution-note">⚠️ {ing.cautionNote}</div>}

              <div className="ing-research">
                {ing.research.map((r) => (
                  <div key={r.citation} className="ref">
                    📄 <b>{r.citation}</b> · {r.title} <i>({r.source})</i>
                    <br />
                    {r.finding}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
