// 여행 성향 테스트 공통 타입
export type Letter = 'J' | 'P' | 'C' | 'N' | 'A' | 'R' | 'T' | 'L'
export type Axis = 'JP' | 'CN' | 'AR' | 'TL'
export type Tone = 'ink' | 'warm' | 'moss' | 'ocean' | 'dusk'
export type Vibe = 'editorial' | 'casual'

export interface Choice {
  weight: Letter
  label: string
  caption: string
  tone: Tone
}

export interface Question {
  id: number
  axis: Axis
  prompt: string
  a: Choice
  b: Choice
}

export interface TravelType {
  code: string
  name: string
  en: string
  tag: string
  summary: string
  cities: string[]
  bestWith: string
  worstWith: string
  companion: string
  checklist: string[]
}

export type RegionType = 'hotplace' | 'quiet'

export type Scores = Record<Letter, number>

export type Answer = { axis: Axis; choice: 'a' | 'b'; weight: Letter }

export interface TestResult {
  code: string
  scores: Scores
  region: RegionType
}
