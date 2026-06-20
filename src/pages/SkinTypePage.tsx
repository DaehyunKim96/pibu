import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  QUIZ,
  SKIN_TYPES,
  SKIN_TYPES_BY_ID,
  classifySkinType,
  emptyResult,
} from '../data/skinTypes'
import type { QuizResult, SkinTypeId } from '../data/skinTypes'
import { INGREDIENTS_BY_ID } from '../data/ingredients'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/ProductCard'

type Stage = 'intro' | 'quiz' | 'result'

export default function SkinTypePage() {
  const [stage, setStage] = useState<Stage>('intro')
  const [step, setStep] = useState(0)
  const [result, setResult] = useState<QuizResult>(emptyResult())
  const [typeId, setTypeId] = useState<SkinTypeId | null>(null)

  function start() {
    setResult(emptyResult())
    setStep(0)
    setStage('quiz')
  }

  function answer(optIndex: number) {
    const q = QUIZ[step]
    const scores = q.options[optIndex].scores
    const next: QuizResult = { ...result }
    for (const [k, v] of Object.entries(scores)) {
      next[k as keyof QuizResult] += v as number
    }
    setResult(next)
    if (step + 1 < QUIZ.length) {
      setStep(step + 1)
    } else {
      setTypeId(classifySkinType(next))
      setStage('result')
    }
  }

  // ── 인트로: 타입 둘러보기 + 진단 시작 ──
  if (stage === 'intro') {
    return (
      <div className="page">
        <div className="container">
          <div className="page-head" style={{ textAlign: 'center' }}>
            <h1>
              내 <em>피부 타입</em> 찾기
            </h1>
            <p style={{ maxWidth: '38em', margin: '0 auto' }}>
              pibu는 유분·민감도·트러블·홍조 4가지 축으로 피부를 7가지 타입으로 분류합니다.
              간단한 진단으로 내 유형을 찾고, 맞는 성분과 제품을 추천받아 보세요.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <button className="btn btn-primary" onClick={start}>
              1분 진단 시작하기 →
            </button>
          </div>

          <h2 style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>
            7가지 피부 타입
          </h2>
          <div className="type-grid">
            {SKIN_TYPES.map((t) => (
              <div
                key={t.id}
                className="type-card"
                style={{ background: `linear-gradient(150deg, ${t.color}, ${t.color}dd)` }}
                onClick={() => {
                  setTypeId(t.id)
                  setStage('result')
                }}
              >
                <div className="emoji">{t.emoji}</div>
                <h3>{t.name}</h3>
                <p className="tagline">{t.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── 퀴즈 ──
  if (stage === 'quiz') {
    const q = QUIZ[step]
    const progress = ((step + 1) / QUIZ.length) * 100
    return (
      <div className="page">
        <div className="container">
          <div className="quiz-wrap">
            <div className="quiz-progress">
              <div className="fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="quiz-q">
              <span className="qnum">
                Q{step + 1} / {QUIZ.length}
              </span>
              <h2>{q.question}</h2>
              <div className="quiz-options">
                {q.options.map((opt, i) => (
                  <button key={i} className="quiz-option" onClick={() => answer(i)}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            {step > 0 && (
              <button className="quiz-back" onClick={() => setStep(step - 1)}>
                ← 이전 질문
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── 결과 ──
  const type = typeId ? SKIN_TYPES_BY_ID[typeId] : null
  if (!type) return null

  const recommended = PRODUCTS.filter((p) => p.bestFor.includes(type.id)).slice(0, 6)

  return (
    <div className="page">
      <div className="container">
        <div className="result-card">
          <div
            className="result-banner"
            style={{ background: `linear-gradient(150deg, ${type.color}, ${type.color}cc)` }}
          >
            <div className="emoji">{type.emoji}</div>
            <span style={{ opacity: 0.9, fontSize: 14 }}>당신의 피부 타입은</span>
            <h1>{type.name}</h1>
            <p className="tagline">{type.tagline}</p>
          </div>
          <div className="result-body">
            <p className="desc">{type.description}</p>

            <div className="trait-row" style={{ marginBottom: 24 }}>
              {type.traits.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>

            <div className="result-cols">
              <div className="result-col good">
                <h4>✅ 챙기면 좋은 성분</h4>
                <div className="trait-row">
                  {type.recommendIngredients.map((iid) => {
                    const ing = INGREDIENTS_BY_ID[iid]
                    return ing ? (
                      <span key={iid} className="chip">
                        {ing.name}
                      </span>
                    ) : null
                  })}
                </div>
              </div>
              <div className="result-col avoid">
                <h4>⚠️ 조심할 성분</h4>
                <div className="trait-row">
                  {type.avoidIngredients.map((iid) => {
                    const ing = INGREDIENTS_BY_ID[iid]
                    return ing ? (
                      <span key={iid} className="chip warn">
                        {ing.name}
                      </span>
                    ) : null
                  })}
                </div>
              </div>
            </div>

            <h4 style={{ marginBottom: 12 }}>💡 케어 팁</h4>
            <ul className="tip-list">
              {type.careTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 추천 제품 */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 26, marginBottom: 8, textAlign: 'center' }}>
            {type.emoji} {type.name}에게 맞는 제품
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--ink-soft)', marginBottom: 28 }}>
            이 타입에 잘 맞는 성분을 담은 제품들이에요.
          </p>
          {recommended.length > 0 ? (
            <div className="product-grid">
              {recommended.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty">곧 더 많은 제품이 추가될 예정이에요.</div>
          )}
        </section>

        <div style={{ textAlign: 'center', marginTop: 40, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={start}>
            다시 진단하기
          </button>
          <Link to="/products" className="btn btn-ghost">
            전체 제품 보기
          </Link>
        </div>
      </div>
    </div>
  )
}
