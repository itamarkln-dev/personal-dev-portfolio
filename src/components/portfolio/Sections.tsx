import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Trans, useTranslation } from 'react-i18next'
import { GithubMark, LinkedinMark, MailIcon, SendIcon } from './icons'
import Typewriter from './Typewriter'
import { EASE, SPRING, rise, stagger } from './motion'
import { Reveal } from './Reveal'

import { SITE } from '../../config'

type Project = { n: string; key: string; title: string; tags: string[]; url: string }

const PROJECTS: Project[] = [
  {
    n: '01',
    key: 'vaulter',
    title: 'Vaulter',
    tags: ['Markdown', 'Local-first', 'Obsidian', 'AI Context'],
    url: 'https://vaulter.itamarklein.com',
  },
]

type ExperienceItem = { role: string; points: string[]; from: string; to: string | null }

/** Shared section header — kicker + title, revealed together. */
function Head({ kick, title, sub, center }: { kick: string; title: string; sub?: string; center?: boolean }) {
  return (
    <Reveal className="shead">
      <motion.div variants={rise} className="kick" style={center ? { justifyContent: 'center' } : undefined}>
        {kick}
      </motion.div>
      <motion.h2 variants={rise} className="title">
        {title}
      </motion.h2>
      {sub && (
        <motion.p variants={rise} className="sub" style={center ? { marginInline: 'auto' } : undefined}>
          {sub}
        </motion.p>
      )}
    </Reveal>
  )
}

function Hero() {
  const { t } = useTranslation()
  const heroRef = useRef<HTMLElement>(null)
  // watermark drifts at ~15% of scroll speed — depth without a parallax library
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const wmY = useTransform(scrollYProgress, [0, 1], [0, 120])

  const name = t('hero.name')
  const roles = t('hero.roles', { returnObjects: true }) as string[]

  return (
    <header id="home" className="hero" ref={heroRef}>
      <motion.div className="watermark" style={{ y: wmY }}>
        <span>IK</span>
      </motion.div>

      <motion.div className="hero-left" variants={stagger} initial="hidden" animate="shown">
        <motion.span variants={rise} className="status">
          <span className="ping">
            <i className="a" />
            <i />
          </span>
          {t('hero.status')}
        </motion.span>

        <h1 className="name">
          {/* letter-by-letter so the name assembles itself on load */}
          <motion.span
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } } }}
            style={{ display: 'inline-block' }}
          >
            {name.split('').map((c, i) => (
              <motion.span
                key={`${c}-${i}`}
                className="ch"
                variants={{
                  hidden: { opacity: 0, y: '0.4em', rotateX: -60 },
                  shown: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: EASE } },
                }}
              >
                {c}
              </motion.span>
            ))}
          </motion.span>
          <motion.span variants={rise} className="role">
            <Typewriter phrases={roles} />
          </motion.span>
        </h1>

        <motion.p variants={rise} className="desc">
          <Trans i18nKey="hero.desc" components={{ b: <b /> }} />
        </motion.p>

        <motion.div variants={rise} className="actions">
          <motion.a
            href="#contact"
            className="btn btn-primary"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={SPRING}
          >
            {t('hero.ctaPrimary')}
            <SendIcon />
          </motion.a>
          <motion.a
            href="#projects"
            className="btn btn-ghost"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={SPRING}
          >
            {t('hero.ctaSecondary')}
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="avatar-wrap"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
      >
        <div className="corner tl" />
        <div className="corner br" />
        <div className="avatar">
          <img src="https://avatars.githubusercontent.com/u/293653803?v=4" alt={name} />
          <div className="ov" />
        </div>
      </motion.div>
    </header>
  )
}

function About() {
  const { t } = useTranslation()
  return (
    <section id="about" className="block wrap">
      <Head kick={t('about.kick')} title={t('about.title')} />
      <Reveal className="about">
        <motion.div variants={rise}>
          <p>
            <Trans i18nKey="about.p1" components={{ b: <b /> }} />
          </p>
          <p>
            <Trans i18nKey="about.p2" components={{ b: <b /> }} />
          </p>
          <p>
            <Trans i18nKey="about.p3" components={{ b: <b /> }} />
          </p>
        </motion.div>
        <motion.div variants={rise} className="facts">
          <div className="r">
            <span className="k">{t('about.facts.role')}</span>
            <span className="v">{t('about.facts.roleValue')}</span>
          </div>
          <div className="r">
            <span className="k">{t('about.facts.focus')}</span>
            <span className="v">{t('about.facts.focusValue')}</span>
          </div>
          <div className="r">
            <span className="k">{t('about.facts.experience')}</span>
            <span className="v num">{t('about.facts.experienceValue')}</span>
          </div>
          <div className="r">
            <span className="k">{t('about.facts.status')}</span>
            <span className="v ok">
              <span className="ping">
                <i className="a" />
                <i />
              </span>
              {t('about.facts.statusValue')}
            </span>
          </div>
        </motion.div>
      </Reveal>
    </section>
  )
}

function Projects() {
  const { t } = useTranslation()
  return (
    <section id="projects" className="block wrap">
      <Head
        kick={t('projects.kick')}
        title={t('projects.title')}
        sub={PROJECTS.length ? t('projects.subWithItems') : t('projects.subEmpty')}
      />

      <Reveal className="pgrid">
        {PROJECTS.map((p) => (
          <motion.div
            key={p.n}
            className="pcard"
            variants={rise}
            whileHover={{ y: -4 }}
            transition={SPRING}
          >
            <span className="pn num">{p.n}</span>
            <span className="cat">{t(`projects.${p.key}.cat`)}</span>
            <h3>
              {p.title}{' '}
              <a href={p.url} target="_blank" rel="noopener" className="arrow">
                ↗
              </a>
            </h3>
            <p>{t(`projects.${p.key}.desc`)}</p>
            <div className="tags">
              {p.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
        <motion.div variants={rise} className="pcard pbuilding">
          <span className="cat">{t('projects.buildingCat')}</span>
          <h3>{t('projects.buildingTitle')}</h3>
          <p>{t('projects.buildingDesc')}</p>
        </motion.div>
      </Reveal>

      <Reveal>
        <motion.a
          variants={rise}
          className="allbtn"
          href={SITE.githubReposUrl}
          target="_blank"
          rel="noopener"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          {t('projects.exploreAll')}
          <span className="arrow">↗</span>
        </motion.a>
      </Reveal>
    </section>
  )
}

function Experience() {
  const { t } = useTranslation()
  const items = t('experience.items', { returnObjects: true }) as ExperienceItem[]
  const present = t('experience.present')
  const railRef = useRef<HTMLDivElement>(null)
  // the violet rail fills as this block scrolls through the middle of the viewport
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 70%', 'end 60%'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" className="block wrap">
      <Head kick={t('experience.kick')} title={t('experience.title')} />
      <div className="xp" ref={railRef}>
        <div className="xp-track">
          <motion.div className="xp-fill" style={{ scaleY: fill }} />
        </div>
        {items.map((x, i) => (
          <motion.div
            key={i}
            className="xp-item"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span
              className="dot"
              variants={{
                hidden: { scale: 0.5, borderColor: 'var(--border-strong)' },
                shown: {
                  scale: 1,
                  borderColor: 'var(--primary)',
                  transition: { ...SPRING, delay: 0.1 },
                },
              }}
            />
            <motion.div variants={rise} className="dt">
              <span className="num">{x.from}</span> —{' '}
              {x.to ? <span className="num">{x.to}</span> : present}
            </motion.div>
            <motion.h3 variants={rise}>{x.role}</motion.h3>
            <ul>
              {x.points.map((pt, j) => (
                <motion.li key={j} variants={rise}>
                  {pt}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const { t } = useTranslation()
  return (
    <section id="contact" className="block wrap" style={{ textAlign: 'center' }}>
      <Head kick={t('contact.kick')} title={t('contact.title')} sub={t('contact.sub')} center />
      <Reveal>
        <motion.div variants={rise} className="csoc" style={{ justifyContent: 'center' }}>
          {[
            { href: SITE.githubUrl, label: t('contact.aria.github'), icon: <GithubMark />, ext: true },
            { href: SITE.linkedinUrl, label: t('contact.aria.linkedin'), icon: <LinkedinMark />, ext: true },
            { href: `mailto:${SITE.email}`, label: t('contact.aria.email'), icon: <MailIcon />, ext: false },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              title={s.label}
              {...(s.ext ? { target: '_blank', rel: 'noopener' } : {})}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.92 }}
              transition={SPRING}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
      </Reveal>
    </section>
  )
}

function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="wrap">
      <span className="num">
        © {new Date().getFullYear()} {t('hero.name')}
      </span>
      <span>{t('footer.builtWith')}</span>
    </footer>
  )
}

export default function Sections() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  )
}
