# NonilGangwon 🏔️

강원도 관광 정보 서비스 (2026 관광데이터 활용 공모전)

## 기술 스택

- **Backend**: Kotlin + Spring Boot 4.0
- **Frontend**: React
- **DB**: PostgreSQL (AWS RDS)
- **Infra**: AWS EC2 + RDS
- **CI/CD**: GitHub Actions

## 프로젝트 구조

```
NonilGangwon/
├── .github/workflows/   # GitHub Actions CI/CD
├── backend/             # Kotlin + Spring Boot
├── frontend/            # React
└── scripts/             # 배포 스크립트
```

## 로컬 실행

### Backend
```bash
cd backend
./gradlew bootRun
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
