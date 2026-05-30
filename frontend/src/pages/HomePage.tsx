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
  const [places, setPlaces] = useState<TourPlace[]>([])

  // API 응답과 Loading 애니메이션 완료를 동시에 기다리기 위한 ref
  const apiDoneRef = useRef(false)
  const animDoneRef = useRef(false)
  const pendingResultRef = useRef<{ code: string; scores: Scores; places: TourPlace[] } | null>(null)

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
      // 유형 코드 계산
      const scores = emptyScores()
      next.forEach((a) => {
        if (a) scores[a.weight] = (scores[a.weight] || 0) + 1
      })
      const code =
        (scores.J >= scores.P ? 'J' : 'P') +
        (scores.C >= scores.N ? 'C' : 'N') +
        (scores.A >= scores.R ? 'A' : 'R') +
        (scores.T >= scores.L ? 'T' : 'L')

      // ref 초기화
      apiDoneRef.current = false
      animDoneRef.current = false
      pendingResultRef.current = null

      // Loading 화면으로 전환하면서 동시에 API 호출 시작
      setPhase('loading')

      fetchRecommendations(code)
        .catch(() => [])
        .then((fetched) => {
          apiDoneRef.current = true
          pendingResultRef.current = { code, scores, places: fetched }
          // 애니메이션도 끝났으면 바로 result로
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

  // Loading 애니메이션 완료 콜백
  const onLoadingDone = () => {
    animDoneRef.current = true
    // API도 끝났으면 바로 result로
    if (apiDoneRef.current && pendingResultRef.current) {
      const { code, scores, places: fetched } = pendingResultRef.current
      setPlaces(fetched)
      setResult({ code, scores })
      setPhase('result')
    }
    // API가 아직 안 끝났으면 API 완료 시점에 result로 넘어감 (위 then 블록에서 처리)
  }

  const restart = () => {
    setIndex(0)
    setAnswers([])
    setResult(null)
    setPlaces([])
    apiDoneRef.current = false
    animDoneRef.current = false
    pendingResultRef.current = null
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
          vibe={VIBE}
        />
      )}
    </div>
  )
}

export default HomePage
