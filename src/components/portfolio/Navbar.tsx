import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './icons'
import { SPRING } from './motion'
import { applyLangAttrs, initialLang, LANG_KEY, type Lang } from '../../i18n'

const LINK_IDS = ['home', 'about', 'projects', 'contact'] as const
const LINK_KEYS: Record<(typeof LINK_IDS)[number], string> = {
  home: 'nav.home',
  about: 'nav.about',
  projects: 'nav.work',
  contact: 'nav.contact',
}

function initialTheme(): 'dark' | 'light' {
  return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme)
  const [lang, setLang] = useState<Lang>(initialLang)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      let cur = 'home'
      LINK_IDS.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  // close the mobile menu when clicking outside the navbar
  useEffect(() => {
    if (!menuOpen) return
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [menuOpen])

  function toggleLang() {
    const next: Lang = lang === 'en' ? 'he' : 'en'
    i18n.changeLanguage(next)
    applyLangAttrs(next)
    localStorage.setItem(LANG_KEY, next)
    setLang(next)
  }

  const links = LINK_IDS.map((id) => (
    <a
      key={id}
      href={`#${id}`}
      className={`nav-link${active === id ? ' on' : ''}`}
      onClick={() => setMenuOpen(false)}
    >
      {/* one pill, shared across links — Motion slides it to the active one */}
      {active === id && <motion.span layoutId="nav-pill" className="nav-pill" transition={SPRING} />}
      {t(LINK_KEYS[id])}
    </a>
  ))

  return (
    <motion.nav
      ref={navRef}
      className={scrolled ? 'scrolled' : ''}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.7, 0.2, 1], delay: 0.1 }}
    >
      <div className="navbar">
        <div className="navbar-inner">
          <a href="#home" className="logo">
            <span className="box">IK</span>
            <span className="wm">
              Itamar <span className="last">Klein</span>
            </span>
          </a>

          {/* desktop: always-on row. mobile: CSS turns .nav-links into a dropdown,
              so it only renders while open. */}
          <div className="nav-links desktop-only">{links}</div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="nav-links mobile-only"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.22, 0.7, 0.2, 1] }}
              >
                {LINK_IDS.map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`nav-link${active === id ? ' on' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(LINK_KEYS[id])}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="nav-ctrls">
            <motion.button
              className="nav-btn nav-btn-lang"
              onClick={toggleLang}
              title={t('aria.language')}
              aria-label={t('aria.language')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={SPRING}
            >
              {lang === 'en' ? 'עב' : 'EN'}
            </motion.button>
            <motion.button
              className="nav-btn"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              title={theme === 'dark' ? t('aria.themeToLight') : t('aria.themeToDark')}
              aria-label={t('aria.toggleTheme')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={SPRING}
            >
              {/* the icon spins through the swap */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  style={{ display: 'flex' }}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <motion.button
              className="nav-btn nav-toggle"
              onClick={() => setMenuOpen((o) => !o)}
              title={t('aria.toggleMenu')}
              aria-label={t('aria.toggleMenu')}
              aria-expanded={menuOpen}
              whileTap={{ scale: 0.92 }}
              transition={SPRING}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
