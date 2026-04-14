import React, { useEffect, useRef, useState } from 'react'
import TaskZenVisual from '../assets/frame.png'
import FeatureOverviewModal from '../Modals/FeatureOverviewModal'

const PHRASES = ['organized.', 'focused.', 'productive.', 'unstoppable.', 'in control.']
const PHRASE_HOLD = 3400
const PHRASE_FADE = 320

const FEATURES = [
  { icon: '★', label: 'Star favourites' },
  { icon: '◎', label: 'Track progress' },
  { icon: '⌖', label: 'Filter & sort' },
  { icon: '⏱', label: 'Due date alerts' },
  { icon: '☁', label: 'Saves locally' },
]

const HeroSection = () => {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [phraseWidths, setPhraseWidths] = useState([])
  const [featureTasks, setFeatureTasks] = useState([])
  const [showFeaturesModal, setShowFeaturesModal] = useState(false)
  const timeoutRef = useRef(null)
  const intervalRef = useRef(null)
  const measureRefs = useRef([])

  const handleOpenFeaturesModal = () => {
    try {
      const savedTasks = localStorage.getItem('taskzen-tasks')
      setFeatureTasks(savedTasks ? JSON.parse(savedTasks) : [])
    } catch {
      setFeatureTasks([])
    }

    setShowFeaturesModal(true)
  }

  useEffect(() => {
    const measurePhrases = () => {
      const widths = PHRASES.map((_, index) => {
        const element = measureRefs.current[index]
        return element ? Math.ceil(element.getBoundingClientRect().width) : 0
      })

      setPhraseWidths(widths)
    }

    measurePhrases()
    document.fonts?.ready?.then(measurePhrases)
    window.addEventListener('resize', measurePhrases)

    return () => window.removeEventListener('resize', measurePhrases)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)

      timeoutRef.current = setTimeout(() => {
        setPhraseIdx((prev) => (prev + 1) % PHRASES.length)
        setIsTransitioning(false)
      }, PHRASE_FADE)
    }, PHRASE_HOLD)

    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const displayed = PHRASES[phraseIdx]

  return (
    <>
      {showFeaturesModal && (
        <FeatureOverviewModal
          tasks={featureTasks}
          onClose={() => setShowFeaturesModal(false)}
        />
      )}

      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-reveal {
          opacity: 0;
          animation: hero-fade-up .65s cubic-bezier(.22,1,.36,1) forwards;
        }

        @keyframes dot-pulse {
          0%, 100% { opacity: .15; }
          50% { opacity: .35; }
        }

        @keyframes hero-visual-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .hero-word-slot {
          display: inline-grid;
          position: relative;
          text-align: left;
        }

        .hero-word {
          position: relative;
          display: inline-block;
          padding-bottom: 0.12em;
          white-space: nowrap;
          transition:
            width 560ms cubic-bezier(.22,1,.36,1),
            opacity ${PHRASE_FADE}ms ease,
            transform ${PHRASE_FADE}ms ease,
            filter ${PHRASE_FADE}ms ease;
        }

        .hero-word::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 3px;
          border-radius: 999px;
          background: rgba(56,189,248,0.4);
        }

        .hero-word.is-transitioning {
          opacity: 0;
          transform: translateY(10px);
          filter: blur(6px);
        }

        .hero-measure-box {
          position: absolute;
          left: 0;
          top: 0;
          visibility: hidden;
          pointer-events: none;
          white-space: nowrap;
        }

        .hero-measure {
          display: block;
          width: max-content;
        }

        .hero-visual-float {
          animation: hero-visual-float 6s ease-in-out infinite;
        }
      `}</style>

      <section className="relative w-full overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28 md:pb-24 md:pt-36 lg:pb-28 lg:pt-40" id="home">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(56,189,248,0.18) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)',
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: '640px',
            height: '320px',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.10) 0%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div
              className="hero-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/8 px-4 py-1.5 text-xs font-medium text-sky-300"
              style={{ animationDelay: '0ms' }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-sky-400"
                style={{ animation: 'dot-pulse 2s ease-in-out infinite' }}
              />
              Your personal productivity board
            </div>

            <h1
              className="hero-reveal mb-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              style={{
                animationDelay: '80ms',
                fontFamily: '"DM Serif Display", Georgia, serif',
              }}
            >
              Stay{' '}
              <span className="relative inline-block">
                <span aria-hidden="true" className="hero-measure-box">
                  {PHRASES.map((phrase, index) => (
                    <span
                      key={phrase}
                      ref={(element) => {
                        measureRefs.current[index] = element
                      }}
                      className="hero-measure"
                    >
                      {phrase}
                    </span>
                  ))}
                </span>
                <span className="hero-word-slot">
                  <span
                    className={`hero-word text-sky-300 ${isTransitioning ? 'is-transitioning' : ''}`}
                    style={phraseWidths[phraseIdx] ? { width: `${phraseWidths[phraseIdx]}px` } : undefined}
                  >
                    {displayed}
                  </span>
                </span>
              </span>
            </h1>

            <p
              className="hero-reveal mx-auto mb-10 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg lg:mx-0"
              style={{ animationDelay: '180ms' }}
            >
              TaskZen turns your chaos into clarity with one focused board for planning, prioritizing, and finishing
              meaningful work without the clutter.
            </p>

            <div
              className="hero-reveal mb-8 flex flex-wrap items-center justify-center gap-2 sm:mb-10 sm:gap-3 lg:justify-start"
              style={{ animationDelay: '280ms' }}
            >
              <a
                href="#tasks"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-sky-300 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95 sm:w-auto"
              >
                Open my board
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <button
                type="button"
                onClick={handleOpenFeaturesModal}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95 sm:w-auto"
              >
                See features
              </button>
            </div>

            <div
              className="hero-reveal flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 lg:justify-start"
              style={{ animationDelay: '360ms' }}
            >
              {FEATURES.map(({ icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/4 px-3.5 py-1.5 text-xs text-slate-400 transition-colors hover:border-white/15 hover:text-slate-300"
                >
                  <span className="text-[11px] text-sky-300/80">{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-reveal relative mx-auto w-full max-w-xl lg:max-w-none" style={{ animationDelay: '220ms' }}>
            <div className="pointer-events-none absolute -left-10 top-12 h-24 w-24 rounded-full bg-sky-400/16 blur-3xl" />
            <div className="pointer-events-none absolute -right-6 top-6 h-28 w-28 rounded-full bg-indigo-400/16 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,26,37,0.98),rgba(10,15,23,0.98))] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="rounded-[26px] border border-white/8 bg-[#0b1016]/95 p-5 sm:p-6">
                <div className="relative overflow-hidden rounded-[24px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_58%),linear-gradient(180deg,#121926_0%,#0b1016_100%)] px-6 py-8 sm:px-8 sm:py-10">
                  <div className="pointer-events-none absolute inset-x-10 top-8 h-24 rounded-full bg-sky-400/12 blur-3xl" />
                  <img
                    src={TaskZenVisual}
                    alt="TaskZen task planning illustration"
                    className="hero-visual-float relative z-10 mx-auto w-full max-w-[390px] drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection
