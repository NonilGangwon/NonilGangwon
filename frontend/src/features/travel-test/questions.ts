import type { Question } from './types'

// 여행 성향 13문항 — 강원도 맥락 특화
// axes: J(계획)/P(즉흥), C(도시)/N(자연), A(모험)/R(휴양), T(함께)/L(혼자)
export const QUESTIONS: Question[] = [
  {
    id: 1,
    axis: 'JP',
    prompt: '강원도 여행을 결정했다. 나의 첫 행동은',
    a: { weight: 'J', label: '숙소·식당 예약부터 확정', caption: 'PLAN · D-14', tone: 'ink' },
    b: { weight: 'P', label: '일단 차 키 들고 출발', caption: 'JUST GO · NOW', tone: 'warm' },
  },
  {
    id: 2,
    axis: 'CN',
    prompt: '강릉에 도착한 첫날 오후, 어디로 향하나요',
    a: { weight: 'C', label: '안목해변 카페거리 아이스 아메리카노', caption: 'CAFÉ · OCEAN VIEW', tone: 'warm' },
    b: { weight: 'N', label: '소금강 계곡 트레일 첫 구간', caption: 'TRAIL · 4.2km', tone: 'moss' },
  },
  {
    id: 3,
    axis: 'AR',
    prompt: '설악산 앞에 섰다. 오늘 당신의 선택은',
    a: { weight: 'A', label: '공룡능선 종주 — 일출 전 출발', caption: 'RIDGE · 07:31', tone: 'ink' },
    b: { weight: 'R', label: '케이블카 타고 권금성 전망대', caption: 'CABLE · ↑1,708', tone: 'ocean' },
  },
  {
    id: 4,
    axis: 'TL',
    prompt: '속초 새벽 시장에서 오징어순대를 발견했다',
    a: { weight: 'T', label: '같이 온 사람들 깨워서 같이 먹는다', caption: 'TOGETHER · 06:12', tone: 'warm' },
    b: { weight: 'L', label: '혼자 조용히 한 판 해치운다', caption: 'SOLO · TABLE 02', tone: 'ink' },
  },
  {
    id: 5,
    axis: 'JP',
    prompt: '예약한 숙소가 갑자기 취소됐다',
    a: { weight: 'J', label: '백업 숙소 리스트를 꺼낸다', caption: 'PLAN B · READY', tone: 'ink' },
    b: { weight: 'P', label: '근처 펜션 간판 보고 들어간다', caption: 'WALK-IN · ?', tone: 'warm' },
  },
  {
    id: 6,
    axis: 'CN',
    prompt: '하룻밤을 보낼 강원도 숙소라면',
    a: { weight: 'C', label: '강릉 시내 감성 호텔, 루프탑 야경', caption: 'ROOFTOP · 22:00', tone: 'ink' },
    b: { weight: 'N', label: '평창 산자락 통나무 펜션, 별 가득', caption: 'CABIN · STARS', tone: 'moss' },
  },
  {
    id: 7,
    axis: 'AR',
    prompt: '동해 바다가 눈앞에 펼쳐졌다. 지금 하고 싶은 건',
    a: { weight: 'A', label: '서핑보드 빌려서 파도 속으로', caption: 'SURF · SWELL 1.2m', tone: 'ocean' },
    b: { weight: 'R', label: '해변에 누워 파도 소리 들으며 멍', caption: 'REST · TIDE IN', tone: 'warm' },
  },
  {
    id: 8,
    axis: 'TL',
    prompt: '춘천 닭갈비 골목, 어떻게 즐기나요',
    a: { weight: 'T', label: '여러 명이 큰 판 시켜 와글와글', caption: 'GROUP · 6 PAX', tone: 'warm' },
    b: { weight: 'L', label: '1인용 미니 팬으로 혼자 조용히', caption: 'FOR ONE · QUIET', tone: 'ink' },
  },
  {
    id: 9,
    axis: 'CN',
    prompt: '강원도 여행 마지막 날 아침',
    a: { weight: 'C', label: '강릉 중앙시장 짬뽕 순두부로 마무리', caption: 'MARKET · 08:30', tone: 'warm' },
    b: { weight: 'N', label: '오대산 전나무 숲길 마지막 산책', caption: 'FOREST · MIST', tone: 'moss' },
  },
  {
    id: 10,
    axis: 'JP',
    prompt: '2박 3일 강원 여행, 동선을 짠다면',
    a: { weight: 'J', label: '속초→강릉→평창 구간별 시간 배분', caption: '19 / 19 CHECK', tone: 'ink' },
    b: { weight: 'P', label: '기분 따라 그냥 가다 보면 되지', caption: 'FREE · WHEREVER', tone: 'warm' },
  },
  {
    id: 11,
    axis: 'AR',
    prompt: '평창 겨울 여행, 나의 메인 액티비티는',
    a: { weight: 'A', label: '스키 슬로프 최상급 코스 정복', caption: 'BLACK RUN · ↓38°', tone: 'ink' },
    b: { weight: 'R', label: '온천 족욕탕에서 설경 구경', caption: 'HOT SPRING · 42°C', tone: 'ocean' },
  },
  {
    id: 12,
    axis: 'TL',
    prompt: '강원도에서 찍은 사진, 어떻게 남기나요',
    a: { weight: 'T', label: '단체 사진 여러 장, 다들 표정 담아서', caption: 'GROUP · 5 SMILES', tone: 'warm' },
    b: { weight: 'L', label: '혼자, 풍경 위주로 조용히', caption: 'LANDSCAPE · ONLY', tone: 'dusk' },
  },
  {
    id: 13,
    axis: 'AR',
    prompt: '강원도 여행에서 가장 기억에 남는 건',
    a: { weight: 'A', label: '심장 쫄깃했던 그 순간', caption: 'THRILL · ★★★★★', tone: 'ink' },
    b: { weight: 'R', label: '아무것도 안 해도 좋았던 그 시간', caption: 'PEACE · ∞', tone: 'ocean' },
  },
]
