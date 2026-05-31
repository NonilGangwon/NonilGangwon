import type { RegionType } from './types'

interface RegionSelectProps {
  onSelect: (region: RegionType) => void
}

export function RegionSelect({ onSelect }: RegionSelectProps) {
  return (
    <section className="region-select fade-enter-active">
      <div className="region-eyebrow">
        <span className="dot"></span>
        <span>STEP 0 · 강원도 어디로 가고 싶으세요?</span>
      </div>

      <h2 className="region-title">
        어떤 강원도를<br />원하시나요?
      </h2>

      <div className="region-cards">
        <button className="region-card" onClick={() => onSelect('hotplace')}>
          <div className="region-card-tag">핫플 도시</div>
          <div className="region-card-name">강릉 · 속초 · 양양 · 춘천</div>
          <div className="region-card-desc">
            감성 카페, 맛집, 서핑, 활기찬 거리.<br />
            사람들이 모이는 강원도의 핫플을 누빈다.
          </div>
          <div className="region-card-badge">POPULAR</div>
        </button>

        <button className="region-card" onClick={() => onSelect('quiet')}>
          <div className="region-card-tag">조용한 자연</div>
          <div className="region-card-name">평창 · 인제 · 고성 · 홍천 · 정선</div>
          <div className="region-card-desc">
            한적한 산과 계곡, 별이 보이는 밤.<br />
            번잡함 없이 강원도 본연의 자연을 느낀다.
          </div>
          <div className="region-card-badge">QUIET</div>
        </button>
      </div>
    </section>
  )
}
