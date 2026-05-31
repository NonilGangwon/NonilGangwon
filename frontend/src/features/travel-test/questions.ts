import type { Question } from './types'

// 여행 성향 13문항 — 지역 무관, 성향만 판단
// axes: J(계획)/P(즉흥), C(도시)/N(자연), A(모험)/R(휴양), T(함께)/L(혼자)
export const QUESTIONS: Question[] = [
  {
    id: 1,
    axis: 'JP',
    prompt: '여행을 떠나기로 했다. 나의 첫 행동은',
    a: { weight: 'J', label: '숙소·동선·맛집을 미리 확정한다', caption: 'PLAN · D-14', tone: 'ink' },
    b: { weight: 'P', label: '일단 짐 싸고 차에 올라탄다', caption: 'JUST GO · NOW', tone: 'warm' },
  },
  {
    id: 2,
    axis: 'CN',
    prompt: '도착한 첫날 오후, 어디로 향하나요',
    a: { weight: 'C', label: '골목 카페에서 커피 한 잔', caption: 'CAFÉ · LOCAL PICK', tone: 'warm' },
    b: { weight: 'N', label: '가장 가까운 산길·해안길로', caption: 'TRAIL · FRESH AIR', tone: 'moss' },
  },
  {
    id: 3,
    axis: 'AR',
    prompt: '오늘 하루를 어떻게 보내고 싶나요',
    a: { weight: 'A', label: '체력 쓰는 액티비티로 짜릿하게', caption: 'ACTIVE · ALL DAY', tone: 'ink' },
    b: { weight: 'R', label: '아무것도 안 해도 좋은 그런 하루', caption: 'REST · ∞', tone: 'ocean' },
  },
  {
    id: 4,
    axis: 'TL',
    prompt: '여행지에서 우연히 맛있는 식당을 발견했다',
    a: { weight: 'T', label: '같이 온 사람들 불러서 함께 먹는다', caption: 'TOGETHER · NOW', tone: 'warm' },
    b: { weight: 'L', label: '혼자 조용히 그 맛을 음미한다', caption: 'SOLO · SAVOR', tone: 'ink' },
  },
  {
    id: 5,
    axis: 'JP',
    prompt: '예약한 숙소가 갑자기 취소됐다',
    a: { weight: 'J', label: '미리 조사해둔 백업 리스트를 꺼낸다', caption: 'PLAN B · READY', tone: 'ink' },
    b: { weight: 'P', label: '근처 간판 보고 그냥 들어간다', caption: 'WALK-IN · ?', tone: 'warm' },
  },
  {
    id: 6,
    axis: 'CN',
    prompt: '하룻밤을 보낼 숙소라면',
    a: { weight: 'C', label: '시내 감성 호텔, 루프탑 야경', caption: 'CITY VIEW · NIGHT', tone: 'ink' },
    b: { weight: 'N', label: '산속·바닷가 펜션, 창밖엔 자연', caption: 'NATURE · QUIET', tone: 'moss' },
  },
  {
    id: 7,
    axis: 'AR',
    prompt: '자유 시간이 생겼다. 지금 하고 싶은 건',
    a: { weight: 'A', label: '새로운 것에 몸을 던져본다', caption: 'TRY · FIRST TIME', tone: 'ocean' },
    b: { weight: 'R', label: '좋아하는 자리에서 멍 때린다', caption: 'CHILL · NO PLANS', tone: 'warm' },
  },
  {
    id: 8,
    axis: 'TL',
    prompt: '여행 중 가장 기억에 남는 식사는',
    a: { weight: 'T', label: '다 같이 왁자지껄 나눠 먹던 그 밥', caption: 'SHARED · LOUD', tone: 'warm' },
    b: { weight: 'L', label: '혼자 창가에서 조용히 먹던 그 한 끼', caption: 'SOLO · WINDOW', tone: 'ink' },
  },
  {
    id: 9,
    axis: 'JP',
    prompt: '여행 가방을 싸는 스타일은',
    a: { weight: 'J', label: '체크리스트 작성 후 하나씩 확인', caption: '23 / 23 CHECKED', tone: 'ink' },
    b: { weight: 'P', label: '눈에 보이는 것부터 일단 던져넣기', caption: '??? ITEMS', tone: 'warm' },
  },
  {
    id: 10,
    axis: 'CN',
    prompt: '저녁 시간, 어떤 풍경 앞에 있고 싶나요',
    a: { weight: 'C', label: '불빛 가득한 도시의 야경', caption: 'SKYLINE · GLOW', tone: 'ink' },
    b: { weight: 'N', label: '별 쏟아지는 어둡고 조용한 하늘', caption: 'STARS · SILENCE', tone: 'dusk' },
  },
  {
    id: 11,
    axis: 'AR',
    prompt: '현지 음식을 고르는 기준은',
    a: { weight: 'A', label: '처음 보는 이름, 일단 시켜본다', caption: 'UNKNOWN · ORDER', tone: 'warm' },
    b: { weight: 'R', label: '후기 좋고 검증된 메뉴로 안전하게', caption: '★ 4.7 · SAFE', tone: 'ink' },
  },
  {
    id: 12,
    axis: 'TL',
    prompt: '여행 사진을 남기는 방식은',
    a: { weight: 'T', label: '다 같이 찍은 단체 사진이 진리', caption: 'GROUP · SMILES', tone: 'warm' },
    b: { weight: 'L', label: '사람 없는 풍경 사진이 내 스타일', caption: 'LANDSCAPE · ONLY', tone: 'dusk' },
  },
  {
    id: 13,
    axis: 'AR',
    prompt: '한 단어로, 나에게 여행이란',
    a: { weight: 'A', label: '도전', caption: 'CHALLENGE', tone: 'ink' },
    b: { weight: 'R', label: '회복', caption: 'RECOVERY', tone: 'ocean' },
  },
]
