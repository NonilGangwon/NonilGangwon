import type { Question } from './types'

// 여행 성향 13문항 — 각 문항은 4축 중 1축에 가중치를 부여
// axes: J(계획)/P(즉흥), C(도시)/N(자연), A(모험)/R(휴양), T(함께)/L(혼자)
export const QUESTIONS: Question[] = [
  {
    id: 1,
    axis: 'JP',
    prompt: '출발 한 달 전, 가방을 꺼낸 당신의 첫 행동은',
    a: { weight: 'J', label: '시간별 일정표를 짠다', caption: 'ITINERARY · 09:00 — 21:30', tone: 'ink' },
    b: { weight: 'P', label: '비행기표만 일단 끊는다', caption: 'ONE-WAY · TBD', tone: 'warm' },
  },
  {
    id: 2,
    axis: 'CN',
    prompt: '기분 전환이 절실한 주말, 어디로 향하나요',
    a: { weight: 'C', label: '새로 생긴 골목 카페로', caption: 'URBAN · LATTE 04:21', tone: 'warm' },
    b: { weight: 'N', label: '혼자만 아는 숲길로', caption: 'FOREST · 1,247m', tone: 'moss' },
  },
  {
    id: 3,
    axis: 'AR',
    prompt: '통장이 가득 찼다. 꿈에 그리던 여행은',
    a: { weight: 'A', label: '파타고니아 산악 트레킹', caption: 'EXPEDITION · DAY 07', tone: 'ink' },
    b: { weight: 'R', label: '몰디브 오버워터 빌라', caption: 'RESORT · POOL 28°C', tone: 'ocean' },
  },
  {
    id: 4,
    axis: 'TL',
    prompt: '여행에서 가장 행복했던 순간은',
    a: { weight: 'T', label: '낯선 친구와 새벽까지 술잔', caption: 'TOGETHER · 02:41', tone: 'warm' },
    b: { weight: 'L', label: '노을 앞에서 혼자 듣던 노래', caption: 'SOLO · TRACK 03', tone: 'dusk' },
  },
  {
    id: 5,
    axis: 'JP',
    prompt: '공항에서 항공편 결항 안내를 받았다',
    a: { weight: 'J', label: '백업 플랜을 펼친다', caption: 'PLAN B · ROW 14', tone: 'ink' },
    b: { weight: 'P', label: '운명이려니, 일단 머문다', caption: 'STAY · UNTITLED', tone: 'warm' },
  },
  {
    id: 6,
    axis: 'CN',
    prompt: '주말 1박, 끌리는 쪽은',
    a: { weight: 'C', label: '도심 호텔 호캉스', caption: '33F · CITYVIEW', tone: 'ink' },
    b: { weight: 'N', label: '산자락 글램핑', caption: 'GLAMP · °C 12', tone: 'moss' },
  },
  {
    id: 7,
    axis: 'AR',
    prompt: '휴양지에서의 오전 7시, 당신은',
    a: { weight: 'A', label: '서핑보드 끼고 바다로', caption: 'SWELL · 1.4m SE', tone: 'ocean' },
    b: { weight: 'R', label: '가운 입고 룸서비스', caption: 'ROOM 1208 · COFFEE', tone: 'warm' },
  },
  {
    id: 8,
    axis: 'TL',
    prompt: '예상치 못한 맛집을 발견했다',
    a: { weight: 'T', label: '친구에게 바로 전화', caption: 'CALL · 00:42', tone: 'warm' },
    b: { weight: 'L', label: '조용히 혼자 음미', caption: 'FOR ONE · TABLE 03', tone: 'ink' },
  },
  {
    id: 9,
    axis: 'JP',
    prompt: '출국 전날 밤, 여행 가방을 싸는 방식',
    a: { weight: 'J', label: '체크리스트에 ✓를 그으며', caption: '23 / 23 ITEMS', tone: 'ink' },
    b: { weight: 'P', label: '눈에 보이는대로 욱여넣기', caption: '??? / ??? ITEMS', tone: 'warm' },
  },
  {
    id: 10,
    axis: 'CN',
    prompt: '여행에서 가장 보고 싶은 야경은',
    a: { weight: 'C', label: '마천루가 빛나는 스카이라인', caption: 'SKYLINE · 21:00', tone: 'ink' },
    b: { weight: 'N', label: '별이 쏟아지는 사막의 밤', caption: 'STARS · 2,431', tone: 'dusk' },
  },
  {
    id: 11,
    axis: 'AR',
    prompt: '현지 음식을 고르는 기준',
    a: { weight: 'A', label: '간판 없는 골목 노점', caption: 'UNNAMED · ₩?,???', tone: 'warm' },
    b: { weight: 'R', label: '평점 4.5 이상 확정', caption: '★ 4.7 · 1.2k', tone: 'ink' },
  },
  {
    id: 12,
    axis: 'TL',
    prompt: '여행 사진을 남기는 방식',
    a: { weight: 'T', label: '다 같이 셀카, 표정 가득', caption: 'GROUP · 6 FACES', tone: 'warm' },
    b: { weight: 'L', label: '혼자, 풍경만 조용히', caption: 'FRAME · NO PEOPLE', tone: 'dusk' },
  },
  {
    id: 13,
    axis: 'AR',
    prompt: '한 단어로, 당신에게 여행이란',
    a: { weight: 'A', label: '도전', caption: 'CHALLENGE', tone: 'ink' },
    b: { weight: 'R', label: '회복', caption: 'RECOVERY', tone: 'ocean' },
  },
]
