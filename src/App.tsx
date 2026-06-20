import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import IngredientsPage from './pages/IngredientsPage'
import SkinTypePage from './pages/SkinTypePage'
import GuidePage from './pages/GuidePage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

type Theme = 'light' | 'dark'

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('pibu-theme') as Theme | null
    if (saved) return saved
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pibu-theme', theme)
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))]
}

const NAV_ITEMS = [
  { to: '/products', label: '제품', icon: '🧴' },
  { to: '/skin-type', label: '피부 타입', icon: '🧭' },
  { to: '/ingredients', label: '성분 사전', icon: '🔬' },
  { to: '/guide', label: '가이드', icon: '🌿' },
]

function ThemeToggle({ theme, toggle }: { theme: Theme; toggle: () => void }) {
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
      title={theme === 'light' ? '다크 모드' : '라이트 모드'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

function Header() {
  const [theme, toggle] = useTheme()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <header className="site-header">
        <div className="container inner">
          <Link to="/" className="logo">
            <span className="dot" />
            pibu
          </Link>
          <nav className="nav">
            {NAV_ITEMS.map((n) => (
              <NavLink key={n.to} to={n.to}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <ThemeToggle theme={theme} toggle={toggle} />
            <button
              className="menu-btn"
              onClick={() => setOpen((v) => !v)}
              aria-label="메뉴 열기"
              aria-expanded={open}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
        {open && (
          <div className="mobile-menu">
            {NAV_ITEMS.map((n) => (
              <NavLink key={n.to} to={n.to}>
                <span>{n.icon}</span>
                {n.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* 모바일 하단 탭바 */}
      <nav className="bottom-nav" aria-label="모바일 내비게이션">
        <NavLink to="/" end>
          <span className="ico">🏠</span>
          <span className="lbl">홈</span>
        </NavLink>
        {NAV_ITEMS.map((n) => (
          <NavLink key={n.to} to={n.to}>
            <span className="ico">{n.icon}</span>
            <span className="lbl">{n.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container inner">
        <div>
          <div className="logo">
            <span className="dot" />
            pibu
          </div>
          <p className="disclaimer">
            pibu는 민감·트러블 피부를 위한 성분 기반 제품 큐레이션 정보 서비스입니다. 제공되는
            정보는 교육·참고용이며 의학적 진단·처방을 대체하지 않습니다. 지속되는 피부 문제는
            피부과 전문의와 상담하세요.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link to="/products">제품 둘러보기</Link>
          <Link to="/skin-type">내 피부 타입 진단</Link>
          <Link to="/ingredients">성분 사전</Link>
          <Link to="/guide">트러블 피부 가이드</Link>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/skin-type" element={<SkinTypePage />} />
          <Route path="/guide" element={<GuidePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
