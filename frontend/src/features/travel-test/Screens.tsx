import { useEffect, useState, type JSX } from 'react'
import type { Answer, Axis, Choice, Question, Tone, Vibe } from './types'

// Photo card placeholder shapes — simple geometry only (editorial)
const Shapes: Record<Tone, () => JSX.Element> = {
  ink: () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.7">
      <circle cx="50" cy="50" r="34" />
      <circle cx="50" cy="50" r="22" />
      <circle cx="50" cy="50" r="10" />
    </svg>
  ),
  warm: () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.7">
      <rect x="18" y="18" width="64" height="64" />
      <rect x="30" y="30" width="40" height="40" />
      <rect x="42" y="42" width="16" height="16" />
    </svg>
  ),
  moss: () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.7">
      <polygon points="50,14 86,84 14,84" />
      <polygon points="50,32 74,76 26,76" />
      <polygon points="50,50 62,70 38,70" />
    </svg>
  ),
  ocean: () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.7">
      <path d="M5 50 Q 25 35, 50 50 T 95 50" />
      <path d="M5 62 Q 25 47, 50 62 T 95 62" />
      <path d="M5 38 Q 25 23, 50 38 T 95 38" />
    </svg>
  ),
  dusk: () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.7">
      <circle cx="32" cy="50" r="6" />
      <circle cx="58" cy="32" r="4" />
      <circle cx="72" cy="62" r="5" />
      <circle cx="44" cy="74" r="3.5" />
      <circle cx="20" cy="28" r="2.5" />
      <circle cx="80" cy="22" r="2" />
      <circle cx="50" cy="50" r="14" />
    </svg>
  ),
}

// Casual travel-themed shape set — friendly outline icons (simple primitives)
const CasualShapes: Record<Tone, () => JSX.Element> = {
  // ink → suitcase
  ink: () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="22" y="38" width="56" height="44" rx="6" />
      <path d="M40 38 v-6 a4 4 0 0 1 4 -4 h12 a4 4 0 0 1 4 4 v6" />
      <line x1="34" y1="50" x2="34" y2="70" />
      <line x1="66" y1="50" x2="66" y2="70" />
      <circle cx="50" cy="60" r="2.4" fill="currentColor" />
    </svg>
  ),
  // warm → coffee cup with steam
  warm: () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M30 50 h36 l-4 30 a6 6 0 0 1 -6 5 h-16 a6 6 0 0 1 -6 -5 z" />
      <path d="M66 56 h8 a6 6 0 0 1 0 12 h-7" />
      <path d="M40 26 q-4 6 0 12 q4 6 0 12" />
      <path d="M52 22 q-4 6 0 12 q4 6 0 12" />
    </svg>
  ),
  // moss → mountains + sun
  moss: () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="72" cy="32" r="7" />
      <path d="M10 78 L 36 42 L 56 66 L 72 50 L 90 78 Z" />
      <path d="M30 56 L 36 50 L 42 56" />
    </svg>
  ),
  // ocean → waves + sun
  ocean: () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="70" cy="30" r="8" />
      <path d="M8 60 Q 22 50, 36 60 T 64 60 T 92 60" />
      <path d="M8 72 Q 22 62, 36 72 T 64 72 T 92 72" />
      <path d="M8 84 Q 22 74, 36 84 T 64 84 T 92 84" />
    </svg>
  ),
  // dusk → moon + sparkles
  dusk: () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M64 26 a22 22 0 1 0 16 36 a18 18 0 0 1 -16 -36 z" />
      <path d="M22 30 l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 l4 -2 z" />
      <path d="M30 70 l1.6 3.2 l3.2 1.6 l-3.2 1.6 l-1.6 3.2 l-1.6 -3.2 l-3.2 -1.6 l3.2 -1.6 z" />
      <circle cx="82" cy="82" r="1.6" fill="currentColor" />
      <circle cx="14" cy="56" r="1.6" fill="currentColor" />
    </svg>
  ),
}

type CardStyle = 'marked' | 'flat'

interface PhotoCardProps {
  data: Choice
  mark: string
  selecting: boolean
  onClick: () => void
  cardStyle: CardStyle
  vibe: Vibe
}

function PhotoCard({ data, mark, selecting, onClick, cardStyle, vibe }: PhotoCardProps) {
  const set = vibe === 'casual' ? CasualShapes : Shapes
  const Shape = set[data.tone] || set.ink
  return (
    <div
      className={`pcard ${selecting ? 'selecting' : ''}`}
      data-tone={data.tone}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick()
      }}
    >
      <div className="pcard-top">
        <span>PHOTO · {data.weight}</span>
        <span>{data.caption}</span>
      </div>
      {cardStyle !== 'flat' && (
        <div className="pcard-shape">
          <Shape />
        </div>
      )}
      <div className="pcard-mark" style={{ position: 'relative', zIndex: 2, alignSelf: 'flex-start' }}>
        {mark}
      </div>
      <div className="pcard-bottom">
        <div className="caption">{data.caption}</div>
        <div className="label">{data.label}</div>
        <div className="placeholder-tag">[ image placeholder ]</div>
      </div>
    </div>
  )
}

// ── Intro ───────────────────────────────────────────
export function Intro({ onStart, vibe }: { onStart: () => void; vibe: Vibe }) {
  const typeOrder = [
    'JCAT', 'JCAL', 'JCRT', 'JCRL',
    'JNAT', 'JNAL', 'JNRT', 'JNRL',
    'PCAT', 'PCAL', 'PCRT', 'PCRL',
    'PNAT', 'PNAL', 'PNRT', 'PNRL',
  ]
  const highlights = ['JCAT', 'PNRL', 'JNRT']
  const isCasual = vibe === 'casual'

  return (
    <section className="intro fade-enter-active">
      <div>
        <div className="intro-lead">{isCasual ? '✦ 여행 성향 테스트 ✦' : 'Travel Disposition Test · 2026'}</div>
        <h1>
          {isCasual ? '당신은 어떤' : '당신은 어떤 식으로'}
          <br />
          <em>여행자</em> {isCasual ? '일까요?' : '하나요?'}
        </h1>
        <p>
          {isCasual
            ? '짧은 13가지 질문에 답해보세요. 도시인지 자연인지, 계획형인지 즉흥형인지 — 당신만의 여행 캐릭터를 찾아드려요!'
            : 'MBTI 식의 4가지 축으로 여행 성향을 들여다봅니다. 13개의 짧은 선택지를 따라가다 보면 - 도시에서 즉흥적인지, 자연 속에서 계획적인지, 혼자가 편한지 함께가 좋은지 - 당신만의 여행 유형이 드러납니다.'}
        </p>
        <div className="intro-cta">
          <button className="btn btn-accent" onClick={onStart}>
            {isCasual ? '지금 시작하기' : '테스트 시작하기'} <span className="arrow">→</span>
          </button>
        </div>
        <div className="intro-meta">
          <div className="intro-meta-item">
            <div className="label">{isCasual ? '질문' : 'Questions'}</div>
            <div className="value">13</div>
          </div>
          <div className="intro-meta-item">
            <div className="label">{isCasual ? '축' : 'Axes'}</div>
            <div className="value">4</div>
          </div>
          <div className="intro-meta-item">
            <div className="label">{isCasual ? '여행 유형' : 'Possible Types'}</div>
            <div className="value">16</div>
          </div>
        </div>
      </div>
      <div>
        <div className="type-grid">
          {typeOrder.map((code) => (
            <div
              key={code}
              className={`type-cell ${
                highlights.includes(code) ? (code === 'JCAT' ? 'accent' : 'highlight') : ''
              }`}
            >
              {code}
            </div>
          ))}
        </div>
        <div className="type-grid-caption">
          <span>{isCasual ? '16가지 여행자 유형' : '16 TRAVEL TYPES'}</span>
          <span>J · P / C · N / A · R / T · L</span>
        </div>
      </div>
    </section>
  )
}

// ── Quiz ────────────────────────────────────────────
const axisLabels: Record<Axis, [string, string]> = {
  JP: ['계획 / 즉흥', 'PLANNED · SPONTANEOUS'],
  CN: ['도시 / 자연', 'URBAN · WILD'],
  AR: ['모험 / 휴양', 'ADVENTURE · REST'],
  TL: ['함께 / 혼자', 'TOGETHER · ALONE'],
}

interface QuizProps {
  questions: Question[]
  index: number
  answers: (Answer | undefined)[]
  onAnswer: (choice: 'a' | 'b') => void
  onBack: () => void
  cardStyle: CardStyle
  vibe: Vibe
}

export function Quiz({ questions, index, onAnswer, onBack, cardStyle, answers, vibe }: QuizProps) {
  const q = questions[index]
  // 부모에서 key={index} 로 리마운트되므로 selecting 은 질문마다 자연스럽게 초기화된다
  const [selecting, setSelecting] = useState<'a' | 'b' | null>(null)

  const pick = (choice: 'a' | 'b') => {
    if (selecting) return
    setSelecting(choice)
    setTimeout(() => onAnswer(choice), 420)
  }

  const axisCounts = (['JP', 'CN', 'AR', 'TL'] as Axis[]).map((ax) => ({
    ax,
    done: answers.filter((a) => a && a.axis === ax).length,
  }))

  return (
    <section className="quiz fade-enter-active" key={index}>
      <div className="quiz-progress">
        <div className="quiz-progress-count">
          <strong>{String(index + 1).padStart(2, '0')}</strong> / {String(questions.length).padStart(2, '0')}
        </div>
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${(index / questions.length) * 100}%` }} />
        </div>
        <div className="quiz-progress-axes">
          {axisCounts.map(({ ax, done }) => (
            <span key={ax} className={ax === q.axis ? 'active' : ''}>
              {ax} {done}
            </span>
          ))}
        </div>
      </div>

      <h2 className="quiz-prompt">
        <em className="axis-tag">
          Q{String(index + 1).padStart(2, '0')} · {axisLabels[q.axis][1]}
        </em>
        {q.prompt}
      </h2>

      <div className="quiz-cards">
        <PhotoCard data={q.a} mark="A" selecting={selecting === 'a'} onClick={() => pick('a')} cardStyle={cardStyle} vibe={vibe} />
        <div className="quiz-divider">
          <span>or</span>
        </div>
        <PhotoCard data={q.b} mark="B" selecting={selecting === 'b'} onClick={() => pick('b')} cardStyle={cardStyle} vibe={vibe} />
      </div>

      <div className="quiz-footer">
        <button className="quiz-back" onClick={onBack} disabled={index === 0}>
          ← 이전 질문
        </button>
        <span className="quiz-hint">{vibe === 'casual' ? '마음에 드는 카드를 골라보세요' : '카드를 클릭해 선택하세요'}</span>
        <span>{Math.round((index / questions.length) * 100)}%</span>
      </div>
    </section>
  )
}

// ── Loading ─────────────────────────────────────────
const loadingMessagesEditorial = [
  '당신의 선택을 정리하는 중',
  '도시와 자연 사이의 균형을 재는 중',
  '계획과 즉흥의 무게를 다는 중',
  '함께와 혼자, 어느 쪽인지 살피는 중',
  '16가지 유형 중 당신을 찾는 중',
]
const loadingMessagesCasual = [
  '잠깐만요, 짐을 챙기는 중',
  '비행기표를 끊고 있어요',
  '당신만의 여행 색깔을 고르는 중',
  '딱 맞는 여행지를 찾는 중',
  '거의 다 왔어요!',
]

export function Loading({ onDone, vibe }: { onDone: () => void; vibe: Vibe }) {
  const messages = vibe === 'casual' ? loadingMessagesCasual : loadingMessagesEditorial
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => s + 1), 700)
    return () => clearInterval(id)
  }, [])
  useEffect(() => {
    const t = setTimeout(onDone, 3600)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <section className="loading fade-enter-active">
      <div className="loading-ring" />
      <div className="loading-msg">{messages[Math.min(step, messages.length - 1)]}…</div>
      <div className="loading-meta">
        <span>{vibe === 'casual' ? '분석 중' : 'ANALYZING'}</span>
        <span>13 / 13 {vibe === 'casual' ? '응답' : 'ANSWERS'}</span>
        <span>{Math.min((step + 1) * 20, 100)}%</span>
      </div>
    </section>
  )
}
