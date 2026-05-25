import { useEffect, useState } from 'react'
import { QUESTIONS } from '@/features/travel-test/questions'
import { TYPES } from '@/features/travel-test/typeData'
import { Intro, Loading, Quiz } from '@/features/travel-test/Screens'
import { Result } from '@/features/travel-test/Result'
import type { Answer, Scores, TestResult, Vibe } from '@/features/travel-test/types'
import '@/features/travel-test/styles.css'

type Phase = 'intro' | 'quiz' | 'loading' | 'result'

// 분위기 고정 (디자인 기본값: casual). 'editorial' 로 바꾸면 잡지풍 톤이 된다.
const VIBE: Vibe = 'casual'

const emptyScores = (): Scores => ({ J: 0, P: 0, C: 0, N: 0, A: 0, R: 0, T: 0, L: 0 })

// ?type=CODE 로 들어온 공유 링크를 위한 점수 합성
function synthScores(code: string): Scores {
  const s = emptyScores()
  const pairs: Record<string, string> = {
    J: 'P', P: 'J', C: 'N', N: 'C', A: 'R', R: 'A', T: 'L', L: 'T',
  }
  code.split('').forEach((l) => {
    s[l as keyof Scores] = 3
  })
  code.split('').forEach((l) => {
    s[pairs[l] as keyof Scores] = 1
  })
  return s
}

// 공유 링크(?type=)로 들어오면 결과 화면으로 시작
function initialResult(): TestResult | null {
  const code = new URL(location.href).searchParams.get('type')
  return code && TYPES[code] ? { code, scores: synthScores(code) } : null
}

function HomePage() {
  const shared = initialResult()
  const [phase, setPhase] = useState<Phase>(shared ? 'result' : 'intro')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(Answer | undefined)[]>([])
  const [result, setResult] = useState<TestResult | null>(shared)

  // 팔레트(warm) + 분위기(casual) 고정
  useEffect(() => {
    document.documentElement.setAttribute('data-palette', 'warm')
    document.documentElement.setAttribute('data-vibe', VIBE)
  }, [])

  const start = () => {
    setIndex(0)
    setAnswers([])
    setPhase('quiz')
  }

  const answer = (choice: 'a' | 'b') => {
    const q = QUESTIONS[index]
    const weight = choice === 'a' ? q.a.weight : q.b.weight
    const next = [...answers]
    next[index] = { axis: q.axis, choice, weight }
    setAnswers(next)
    if (index + 1 < QUESTIONS.length) {
      setIndex((i) => i + 1)
    } else {
      setPhase('loading')
    }
  }

  const back = () => {
    if (index > 0) setIndex((i) => i - 1)
  }

  const finalize = () => {
    const scores = emptyScores()
    answers.forEach((a) => {
      if (a) scores[a.weight] = (scores[a.weight] || 0) + 1
    })
    const code =
      (scores.J >= scores.P ? 'J' : 'P') +
      (scores.C >= scores.N ? 'C' : 'N') +
      (scores.A >= scores.R ? 'A' : 'R') +
      (scores.T >= scores.L ? 'T' : 'L')
    setResult({ code, scores })
    setPhase('result')
  }

  const restart = () => {
    setIndex(0)
    setAnswers([])
    setResult(null)
    setPhase('intro')
    history.replaceState(null, '', location.pathname)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">노닐 강원</div>
          <div className="brand-sub">TRAVEL DISPOSITION</div>
        </div>
        <div className="topbar-meta">
          {phase === 'intro' && <span>READY</span>}
          {phase === 'quiz' && (
            <span>
              Q {index + 1} / {QUESTIONS.length}
            </span>
          )}
          {phase === 'loading' && <span>ANALYZING</span>}
          {phase === 'result' && (
            <>
              <span>RESULT</span>
              <button className="quiz-back" onClick={restart}>
                다시 →
              </button>
            </>
          )}
        </div>
      </header>

      {phase === 'intro' && <Intro onStart={start} vibe={VIBE} />}
      {phase === 'quiz' && (
        <Quiz
          key={index}
          questions={QUESTIONS}
          index={index}
          answers={answers}
          onAnswer={answer}
          onBack={back}
          cardStyle="marked"
          vibe={VIBE}
        />
      )}
      {phase === 'loading' && <Loading onDone={finalize} vibe={VIBE} />}
      {phase === 'result' && result && (
        <Result code={result.code} scores={result.scores} onRestart={restart} vibe={VIBE} />
      )}
    </div>
  )
}

export default HomePage
