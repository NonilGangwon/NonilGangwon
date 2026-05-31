package com.nonilgangwon.tour

/**
 * 여행 유형 코드 + 지역 타입 → TourAPI 파라미터 매핑
 *
 * contentTypeId:
 *   12 = 관광지       → 자연경관, 명소, 유적지
 *   14 = 문화시설     → 박물관, 미술관, 공연장
 *   15 = 축제·공연·행사 → 지역 축제, 이벤트
 *   28 = 레포츠       → 서핑, 래프팅, 스키, 클라이밍
 *   32 = 숙박         → 호텔, 펜션, 캠핑장
 *   39 = 음식점       → 맛집, 카페, 시장
 *
 * 강원도 시군구 코드 (areaCode=32):
 *   1=춘천, 2=원주, 3=강릉, 4=동해, 5=태백
 *   6=속초, 7=삼척, 8=홍천, 9=횡성, 10=영월
 *   11=평창, 12=정선, 13=철원, 14=화천, 15=양구
 *   16=인제, 17=고성, 18=양양
 *
 * region:
 *   hotplace = 강릉·속초·양양·춘천 (핫플 도시)
 *   quiet    = 평창·인제·고성·홍천·정선 (조용한 자연)
 */
data class TourApiParams(
    val contentTypeId: Int,
    val areaCode: Int = 32,
    val sigunguCode: Int? = null,
)

object TourTypeMapper {

    // ── hotplace: 강릉(3), 속초(6), 양양(18), 춘천(1) ──────────────
    private val hotplace: Map<String, TourApiParams> = mapOf(

        // JCAT: 계획·도시·모험·함께 → 강릉 관광지 (경포·오죽헌·명소)
        "JCAT" to TourApiParams(contentTypeId = 12, sigunguCode = 3),

        // JCAL: 계획·도시·모험·혼자 → 강릉 문화시설 (박물관·미술관·공연)
        "JCAL" to TourApiParams(contentTypeId = 14, sigunguCode = 3),

        // JCRT: 계획·도시·휴양·함께 → 속초 음식점 (아바이순대·대게·시장)
        "JCRT" to TourApiParams(contentTypeId = 39, sigunguCode = 6),

        // JCRL: 계획·도시·휴양·혼자 → 강릉 숙박 (호텔·게스트하우스)
        "JCRL" to TourApiParams(contentTypeId = 32, sigunguCode = 3),

        // JNAT: 계획·자연·모험·함께 → 속초 레포츠 (설악산·클라이밍)
        "JNAT" to TourApiParams(contentTypeId = 28, sigunguCode = 6),

        // JNAL: 계획·자연·모험·혼자 → 속초 관광지 (설악산·울산바위·권금성)
        "JNAL" to TourApiParams(contentTypeId = 12, sigunguCode = 6),

        // JNRT: 계획·자연·휴양·함께 → 양양 관광지 (낙산사·하조대·해변)
        "JNRT" to TourApiParams(contentTypeId = 12, sigunguCode = 18),

        // JNRL: 계획·자연·휴양·혼자 → 양양 숙박 (해변 펜션·독채)
        "JNRL" to TourApiParams(contentTypeId = 32, sigunguCode = 18),

        // PCAT: 즉흥·도시·모험·함께 → 춘천 레포츠 (스카이워크·번지점프·레프팅)
        "PCAT" to TourApiParams(contentTypeId = 28, sigunguCode = 1),

        // PCAL: 즉흥·도시·모험·혼자 → 춘천 관광지 (남이섬·의암호·소양강)
        "PCAL" to TourApiParams(contentTypeId = 12, sigunguCode = 1),

        // PCRT: 즉흥·도시·휴양·함께 → 강릉 음식점 (순두부·커피·해산물)
        "PCRT" to TourApiParams(contentTypeId = 39, sigunguCode = 3),

        // PCRL: 즉흥·도시·휴양·혼자 → 속초 관광지 (영랑호·아바이마을·청초호)
        "PCRL" to TourApiParams(contentTypeId = 12, sigunguCode = 6),

        // PNAT: 즉흥·자연·모험·함께 → 양양 레포츠 (서핑·카약·해변액티비티)
        "PNAT" to TourApiParams(contentTypeId = 28, sigunguCode = 18),

        // PNAL: 즉흥·자연·모험·혼자 → 춘천 관광지 (삼악산·등선폭포)
        "PNAL" to TourApiParams(contentTypeId = 12, sigunguCode = 1),

        // PNRT: 즉흥·자연·휴양·함께 → 강릉 축제·행사 (커피축제·단오제·이벤트)
        "PNRT" to TourApiParams(contentTypeId = 15, sigunguCode = 3),

        // PNRL: 즉흥·자연·휴양·혼자 → 양양 음식점 (해산물·서퍼식당)
        "PNRL" to TourApiParams(contentTypeId = 39, sigunguCode = 18),
    )

    // ── quiet: 평창(11), 인제(16), 고성(17), 홍천(8), 정선(12) ──────
    private val quiet: Map<String, TourApiParams> = mapOf(

        // JCAT: 계획·도시·모험·함께 → 평창 축제·행사 (눈꽃축제·대관령음악제)
        "JCAT" to TourApiParams(contentTypeId = 15, sigunguCode = 11),

        // JCAL: 계획·도시·모험·혼자 → 평창 문화시설 (이효석문화관·뮤지엄)
        "JCAL" to TourApiParams(contentTypeId = 14, sigunguCode = 11),

        // JCRT: 계획·도시·휴양·함께 → 평창 음식점 (메밀음식·황태·한식)
        "JCRT" to TourApiParams(contentTypeId = 39, sigunguCode = 11),

        // JCRL: 계획·도시·휴양·혼자 → 평창 숙박 (한옥·리조트·온천)
        "JCRL" to TourApiParams(contentTypeId = 32, sigunguCode = 11),

        // JNAT: 계획·자연·모험·함께 → 인제 레포츠 (래프팅·MTB·트레킹)
        "JNAT" to TourApiParams(contentTypeId = 28, sigunguCode = 16),

        // JNAL: 계획·자연·모험·혼자 → 인제 관광지 (곰배령·설악·백담사)
        "JNAL" to TourApiParams(contentTypeId = 12, sigunguCode = 16),

        // JNRT: 계획·자연·휴양·함께 → 평창 관광지 (오대산·월정사·양떼목장)
        "JNRT" to TourApiParams(contentTypeId = 12, sigunguCode = 11),

        // JNRL: 계획·자연·휴양·혼자 → 홍천 숙박 (자연휴양림·산속 펜션)
        "JNRL" to TourApiParams(contentTypeId = 32, sigunguCode = 8),

        // PCAT: 즉흥·도시·모험·함께 → 고성 레포츠 (해양스포츠·짚라인)
        "PCAT" to TourApiParams(contentTypeId = 28, sigunguCode = 17),

        // PCAL: 즉흥·도시·모험·혼자 → 고성 관광지 (DMZ·화진포·통일전망대)
        "PCAL" to TourApiParams(contentTypeId = 12, sigunguCode = 17),

        // PCRT: 즉흥·도시·휴양·함께 → 홍천 음식점 (한우·닭갈비·향토음식)
        "PCRT" to TourApiParams(contentTypeId = 39, sigunguCode = 8),

        // PCRL: 즉흥·도시·휴양·혼자 → 고성 관광지 (해변·호수·자연)
        "PCRL" to TourApiParams(contentTypeId = 12, sigunguCode = 17),

        // PNAT: 즉흥·자연·모험·함께 → 인제 레포츠 (내린천 래프팅·번지점프)
        "PNAT" to TourApiParams(contentTypeId = 28, sigunguCode = 16),

        // PNAL: 즉흥·자연·모험·혼자 → 정선 관광지 (민둥산·화암동굴·오지)
        "PNAL" to TourApiParams(contentTypeId = 12, sigunguCode = 12),

        // PNRT: 즉흥·자연·휴양·함께 → 고성 관광지 (화진포해변·송지호)
        "PNRT" to TourApiParams(contentTypeId = 12, sigunguCode = 17),

        // PNRL: 즉흥·자연·휴양·혼자 → 평창 숙박 (산속 독채·자연휴양림)
        "PNRL" to TourApiParams(contentTypeId = 32, sigunguCode = 11),
    )

    fun getParams(typeCode: String, region: String = "hotplace"): TourApiParams {
        val mapping = if (region == "quiet") quiet else hotplace
        return mapping[typeCode] ?: TourApiParams(contentTypeId = 12, areaCode = 32)
    }
}
