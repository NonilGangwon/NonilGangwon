import { useEffect, useRef, useState } from 'react'
import { QUESTIONS } from '@/features/travel-test/questions'
import { TYPES } from '@/features/travel-test/typeData'
import { Intro, Loading, Quiz } from '@/features/travel-test/Screens'
import { Result } from '@/features/travel-test/Result'
import type { Answer, Scores, TestResult, Vibe } from '@/features/travel-test/types'
import { fetchRecommendations, type TourPlace } from '@/api/tour'
import '@/features/travel-test/styles.css'

type Phase = 'intro' | 'quiz' | 'loading' | 'result'

const VIBE: Vibe = 'casual'
const SESSION_KEY = 'nonilgangwon_result'

const emptyScores = (): Scores => ({ J: 0, P: 0, C: 0, N: 0, A: 0, R: 0, T: 0, L: 0 })

function synthScores(code: string): Scores {
  const s = emptyScores()
  const pairs: Record<string, string> = {
    J: 'P', P: 'J', C: 'N', N: 'C', A: 'R', R: 'A', T: 'L', L: 'T',
  }
  code.split('').forEach((l) => { s[l as keyof Scores] = 3 })
  code.split('').forEach((l) => { s[pairs[l] as keyof Scores] = 1 })
  return s
}

// 공유 링크 ?type= 파라미터 처리
function initialFromUrl(): TestResult | null {
  const code = new URL(location.href).searchParams.get('type')
  return code && TYPES[code] ? { code, scores: synthScores(code) } : null
}

// 세션에서 이전 결과 복원
function restoreSession(): { result: TestResult; places: TourPlace[] } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.result?.code || !TYPES[parsed.result.code]) return null
    return parsed
  } catch {
    return null
  }
}

function HomePage() {
  // 1순위: URL ?type= 파라미터 / 2순위: 세션 복원 / 3순위: 처음 시작
  const fromUrl = initialFromUrl()
  const fromSession = !fromUrl ? restoreSession() : null

  const [phase, setPhase] = useState<Phase>(
    fromUrl || fromSession ? 'result' : 'intro'
  )
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(Answer | undefined)[]>([])
  const [result, setResult] = useState<TestResult | null>(
    fromUrl ?? fromSession?.result ?? null
  )
  const [places, setPlaces] = useState<TourPlace[]>(
    fromSession?.places ?? []
  )

  const apiDoneRef = useRef(false)
  const animDoneRef = useRef(false)
  const pendingResultRef = useRef<{ code: string; scores: Scores; places: TourPlace[] } | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-palette', 'warm')
    document.documentElement.setAttribute('data-vibe', VIBE)
  }, [])

  // result + places가 바뀔 때마다 세션에 저장
  useEffect(() => {
    if (result && phase === 'result') {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ result, places }))
    }
  }, [result, places, phase])

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
      const scores = emptyScores()
      next.forEach((a) => {
        if (a) scores[a.weight] = (scores[a.weight] || 0) + 1
      })
      const code =
        (scores.J >= scores.P ? 'J' : 'P') +
        (scores.C >= scores.N ? 'C' : 'N') +
        (scores.A >= scores.R ? 'A' : 'R') +
        (scores.T >= scores.L ? 'T' : 'L')

      apiDoneRef.current = false
      animDoneRef.current = false
      pendingResultRef.current = null

      setPhase('loading')

      fetchRecommendations(code)
        .catch(() => [])
        .then((fetched) => {
          apiDoneRef.current = true
          pendingResultRef.current = { code, scores, places: fetched }
          if (animDoneRef.current) {
            setPlaces(fetched)
            setResult({ code, scores })
            setPhase('result')
          }
        })
    }
  }

  const back = () => {
    if (index > 0) setIndex((i) => i - 1)
  }

  const onLoadingDone = () => {
    animDoneRef.current = true
    if (apiDoneRef.current && pendingResultRef.current) {
      const { code, scores, places: fetched } = pendingResultRef.current
      setPlaces(fetched)
      setResult({ code, scores })
      setPhase('result')
    }
  }

  const restart = () => {
    setIndex(0)
    setAnswers([])
    setResult(null)
    setPlaces([])
    apiDoneRef.current = false
    animDoneRef.current = false
    pendingResultRef.current = null
    sessionStorage.removeItem(SESSION_KEY)
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
          {phase === 'quiz' && <span>Q {index + 1} / {QUESTIONS.length}</span>}
          {phase === 'loading' && <span>ANALYZING</span>}
          {phase === 'result' && (
            <>
              <span>RESULT</span>
              <button className="quiz-back" onClick={restart}>다시 →</button>
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
      {phase === 'loading' && <Loading onDone={onLoadingDone} vibe={VIBE} />}
      {phase === 'result' && result && (
        <Result
          code={result.code}
          scores={result.scores}
          places={places}
          onRestart={restart}
        />
      )}
    </div>
  )
}

export default HomePage
