# Frontend — 노닐 강원

강원도 관광 정보 서비스의 프론트엔드.

## 스택
- React 19 + TypeScript + Vite
- 라우팅: react-router-dom v7
- 스타일: Tailwind CSS v4 (`@tailwindcss/vite`). 단, 디자인 시안을 그대로 옮긴 기능은 전용 `styles.css`를 함께 둘 수 있다.
- HTTP: axios (`src/api`)
- 경로 별칭: `@/` → `src/` (`vite.config.ts`, `tsconfig.json`에 설정됨)

## 폴더 구조 규칙 (하이브리드)

**공용은 타입(역할)별 / 기능은 features별**로 나눈다. 백엔드의 controller-service-repository처럼 "역할을 섞지 않는다"가 핵심이다.

```
src/
  pages/        화면(라우트) 진입점. 얇게 유지 — 라우팅 + 기능 조립만. 로직 금지.
  features/     기능(도메인) 단위 폴더. 한 기능에 필요한 컴포넌트/훅/데이터/타입/스타일을 모두 이 안에 둔다.
  components/   여러 기능이 공유하는 범용 UI 조각 (버튼, 카드 등)
  hooks/        여러 기능이 공유하는 로직 훅 (useXxx)
  api/          서버 통신 계층. axios 설정 및 호출 함수.
  types/        여러 기능이 공유하는 공용 타입
  assets/       이미지/폰트
```

### 대응 관계 (백엔드 비유)
| 백엔드 | 프론트 | 역할 |
|---|---|---|
| Controller | `pages/` | URL 진입점, 화면 조립 |
| Service | `hooks/`, `features/*` | 비즈니스 로직/상태 |
| Repository | `api/` | 외부(서버) 통신 |
| DTO/Entity | `types/` | 데이터 모양 정의 |
| View | `components/`, `features/*` | 실제 UI |

### 작성 규칙
1. **페이지는 얇게.** `pages/`는 라우팅과 "어떤 feature를 보여줄지" 조립만 한다. 비즈니스 로직은 feature/hook으로 내린다.
2. **새 기능은 `features/<기능명>/` 폴더 하나로.** 그 기능의 컴포넌트·훅·데이터·타입·스타일을 한곳에 모은다. (예: `features/travel-test/`)
3. **여러 기능이 공유하는 것만** 공용 폴더(`components/`, `hooks/`, `api/`, `types/`)로 올린다. 한 기능에서만 쓰면 그 feature 폴더 안에 둔다.
4. **서버 통신은 항상 `api/`를 거친다.** 컴포넌트에서 `axios.get(...)`을 직접 호출하지 말고, `api/`에 함수로 만들어 hook/feature에서 호출한다.
5. **의존 방향은 위에서 아래로만.** `page → feature/hook → api`. 하위 계층(`api`, `components`)이 상위(`pages`)를 import하면 안 된다.
6. **import는 `@/` 별칭 사용.** 상대경로(`../../`) 대신 `@/features/...`처럼 쓴다.

### 현재 예시
- `pages/HomePage.tsx` — 홈(`/`) 진입점. `features/travel-test`를 조립해 보여주는 얇은 컨테이너.
- `features/travel-test/` — 여행 성향 테스트 기능 일체 (`questions.ts`, `typeData.ts`, `Screens.tsx`, `Result.tsx`, `types.ts`, `styles.css`).
- `api/index.ts` — 공용 axios 인스턴스(baseURL `/api`). 모든 기능이 공유.
- `types/index.ts` — `TourItem` 등 공용 타입.

## 명령어
- `npm run dev` — 개발 서버 (Vite, `/api`는 `localhost:8080`으로 프록시)
- `npm run build` — 타입체크(`tsc -b`) + 프로덕션 빌드
- `npm run lint` — ESLint

## 주의
- ESLint `react-hooks` 규칙이 엄격하다. **effect 안에서 setState 직접 호출 금지**(`set-state-in-effect`). 초기값은 `useState`의 lazy initializer로, 질문 전환 등 리셋은 `key` prop 리마운트로 처리한다.
- 코드를 추가할 때 주변 코드의 스타일(따옴표, 세미콜론 생략 등)을 따른다.
