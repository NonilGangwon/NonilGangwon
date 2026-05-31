import { useEffect, useState } from 'react'
import { TYPES } from './typeData'
import type { Letter, Scores } from './types'
import type { TourPlace } from '../../api/tour'
import { shareKakao } from '../../utils/kakao'
import { CharacterMark } from './characters'

function AxisBars({ scores }: { scores: Scores }) {
  const axes: { key: string; left: string; right: string; leftKey: Letter; rightKey: Letter }[] = [
    { key: 'JP', left: 'J · 계획', right: 'P · 즉흥', leftKey: 'J', rightKey: 'P' },
    { key: 'CN', left: 'C · 도시', right: 'N · 자연', leftKey: 'C', rightKey: 'N' },
    { key: 'AR', left: 'A · 모험', right: 'R · 휴양', leftKey: 'A', rightKey: 'R' },
    { key: 'TL', left: 'T · 함께', right: 'L · 혼자', leftKey: 'T', rightKey: 'L' },
  ]
  return (
    <div className="axis-bars">
      {axes.map(({ key, left, right, leftKey, rightKey }) => {
        const total = (scores[leftKey] || 0) + (scores[rightKey] || 0)
        const leftPct = total === 0 ? 50 : Math.round(((scores[leftKey] || 0) / total) * 100)
        const dominant = leftPct >= 50 ? 'left' : 'right'
        return (
          <div key={key} className={`axis-row dominant-${dominant}`}>
            <div className="left">{left} {leftPct}%</div>
            <div className="axis-track">
              <div
                className="axis-fill"
                style={dominant === 'left' ? { left: 0, width: `${leftPct}%` } : { right: 0, width: `${100 - leftPct}%` }}
              />
            </div>
            <div className="right">{100 - leftPct}% {right}</div>
          </div>
        )
      })}
    </div>
  )
}

// 이미지 모달 — ESC 키로도 닫힘
function ImageModal({ place, onClose }: { place: TourPlace; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, cursor: 'zoom-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--paper)',
          borderRadius: 16, overflow: 'hidden',
          maxWidth: 480, width: '100%',
          cursor: 'default',
          boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
        }}
      >
        <img
          src={place.thumbnail}
          alt={place.title}
          style={{ width: '100%', display: 'block', maxHeight: 320, objectFit: 'cover' }}
        />
        <div style={{ padding: '20px 24px 24px' }}>
          <div style={{ fontWeight: 500, fontSize: 17, marginBottom: 6, color: 'var(--ink)' }}>
            {place.title}
          </div>
          {place.address && (
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{place.address}</div>
          )}
          <button
            onClick={onClose}
            style={{
              marginTop: 20, width: '100%', padding: '12px',
              border: '1.5px solid var(--line-strong)',
              borderRadius: 999, background: 'transparent',
              cursor: 'pointer', fontSize: 14,
              color: 'var(--ink)', fontFamily: 'var(--sans)',
              transition: 'background .15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--line)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

interface ResultProps {
  code: string
  scores: Scores
  places: TourPlace[]
  onRestart: () => void
}

export function Result({ code, scores, places, onRestart }: ResultProps) {
  const t = TYPES[code]
  const [checks, setChecks] = useState<Record<number, boolean>>({})
  const [toast, setToast] = useState('')
  const [modalPlace, setModalPlace] = useState<TourPlace | null>(null)

  if (!t) return <div className="result">유형을 찾을 수 없습니다.</div>

  const bestType = TYPES[t.bestWith]
  const worstType = TYPES[t.worstWith]

  const flashToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 1800)
  }

  const onShareKakao = () => shareKakao({
    typeCode: code,
    typeName: t.name,
    typeTag: t.tag,
  })
  // const onShareInsta = () => flashToast('인스타 스토리 이미지 생성 (프로토타입)')
  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${location.origin}${location.pathname}?type=${code}`)
      flashToast('링크가 복사되었습니다')
    } catch {
      flashToast('링크 복사 실패')
    }
  }

  return (
    <section className="result layout-a fade-enter-active">
      {/* 이미지 모달 */}
      {modalPlace && (
        <ImageModal place={modalPlace} onClose={() => setModalPlace(null)} />
      )}

      <div className="result-eyebrow">
        <span className="dot"></span>
        <span>RESULT · YOUR TRAVEL DISPOSITION</span>
        <span style={{ marginLeft: 'auto' }}>analyzed in 3.6s</span>
      </div>

      <div className="result-hero">
        <div className="result-portrait">
          <div className="code-stamp">
            <span>TYPE</span>
            <span className="strong">{code}</span>
          </div>
          <div className="character">
            <CharacterMark code={code} />
          </div>
          <div className="stamp-bottom">
            <span>NO. {Object.keys(TYPES).indexOf(code) + 1} / 16</span>
            <span>2026 EDITION</span>
          </div>
        </div>
        <div className="result-headline">
          <div className="code">{code.split('').join(' · ')}</div>
          <h2>{t.name}</h2>
          <div className="en">{t.en}</div>
          <div className="tag">{t.tag}</div>
          <div className="summary">{t.summary}</div>
          <AxisBars scores={scores} />
        </div>
      </div>

      <div className="result-sections">
        {/* 01 매칭 여행지 */}
        <div className="section-block" id="cities">
          <h3>
            <span className="num">01</span> 매칭 여행지
          </h3>
          {places.length > 0 ? (
            <ul className="cities">
              {places.map((place, i) => (
                <li
                  key={place.contentId}
                  className={place.thumbnail ? 'has-image' : ''}
                  onClick={() => place.thumbnail && setModalPlace(place)}
                >
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                  <span>{place.title}</span>
                  {place.address && (
                    <span className="addr">{place.address}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="cities">
              {t.cities.map((c, i) => (
                <li key={i}>
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="section-block">
          <h3><span className="num">02</span> 궁합 유형</h3>
          <div className="compat">
            <div className="compat-card good">
              <div className="lbl">최고의 동행</div>
              <div className="code">{t.bestWith}</div>
              <div className="name">{bestType?.name || ''}</div>
            </div>
            <div className="compat-card">
              <div className="lbl">상극 유형</div>
              <div className="code">{t.worstWith}</div>
              <div className="name">{worstType?.name || ''}</div>
            </div>
          </div>
          <div style={{ marginTop: 28 }}>
            <h3 style={{ margin: '0 0 16px' }}>
              <span className="num">03</span> 추천 동행자
            </h3>
            <div className="companion">{t.companion}</div>
          </div>
        </div>

        <div className="section-block" style={{ gridColumn: '1 / -1', maxWidth: 640, marginTop: 16 }}>
          <h3><span className="num">04</span> 여행 체크리스트</h3>
          <ul className="checklist">
            {t.checklist.map((item, i) => (
              <li key={i}>
                <span
                  className={`checkbox ${checks[i] ? 'checked' : ''}`}
                  onClick={() => setChecks((c) => ({ ...c, [i]: !c[i] }))}
                >
                  {checks[i] && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5 L 4 7 L 8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="share-strip">
        <div>
          <h4>결과를 공유해 보세요</h4>
          <div className="sub">친구에게 보내고, 누가 가장 잘 맞는 동행자인지 비교해 봅니다.</div>
        </div>
        <div className="share-actions">
          <button className="share-btn kakao" onClick={onShareKakao}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M7 1.5C3.4 1.5.5 3.8.5 6.6c0 1.8 1.2 3.4 3 4.3-.1.5-.5 1.8-.5 2 0 .2.2.4.4.3.2-.1 1.9-1.2 2.4-1.5h1.2c3.6 0 6.5-2.3 6.5-5.1S10.6 1.5 7 1.5z" />
            </svg>
            카카오톡
          </button>
          {/*<button className="share-btn" onClick={onShareInsta}>*/}
          {/*  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">*/}
          {/*    <rect x="1.5" y="1.5" width="11" height="11" rx="3" />*/}
          {/*    <circle cx="7" cy="7" r="2.5" />*/}
          {/*    <circle cx="10" cy="4" r=".6" fill="currentColor" />*/}
          {/*  </svg>*/}
          {/*  인스타 스토리*/}
          {/*</button>*/}
          <button className="share-btn" onClick={onCopyLink}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M5.5 3 H4 a2.5 2.5 0 0 0 0 5 H5.5 M8.5 11 H10 a2.5 2.5 0 0 0 0-5 H8.5 M5 7 H9" />
            </svg>
            링크 복사
          </button>
        </div>
      </div>

      <div className="result-actions">
        <button className="btn btn-ghost" onClick={onRestart}>다시 테스트하기</button>
      </div>

      {toast && (
        <div style={{
          position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--ink)', color: 'var(--bg)', padding: '12px 20px',
          borderRadius: 999, fontFamily: 'var(--mono)', fontSize: 12,
          letterSpacing: '0.08em', zIndex: 1000,
        }}>
          {toast}
        </div>
      )}
    </section>
  )
}
