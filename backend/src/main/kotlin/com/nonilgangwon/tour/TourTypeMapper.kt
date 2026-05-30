package com.nonilgangwon.tour

/**
 * 여행 유형 코드 [J|P][C|N][A|R][T|L] → TourAPI 파라미터 매핑
 *
 * contentTypeId:
 *   12 = 관광지, 14 = 문화시설, 28 = 레포츠, 32 = 숙박, 39 = 음식점
 *
 * areaCode (강원도 특화 서비스이므로 강원 우선, 보조 지역 추가):
 *   32 = 강원, 6 = 부산, 5 = 광주, 39 = 제주
 */
data class TourApiParams(
    val contentTypeId: Int,
    val areaCode: Int,
    val keyword: String,
)

object TourTypeMapper {

    private val mapping: Map<String, TourApiParams> = mapOf(
        // J(계획) + C(도시) + A(모험) + T(함께) → 도시 레포츠 + 문화 그룹
        "JCAT" to TourApiParams(contentTypeId = 14, areaCode = 32, keyword = "축제"),
        "JCAL" to TourApiParams(contentTypeId = 14, areaCode = 32, keyword = "미술관"),
        "JCRT" to TourApiParams(contentTypeId = 39, areaCode = 32, keyword = "맛집"),
        "JCRL" to TourApiParams(contentTypeId = 32, areaCode = 32, keyword = "호텔"),

        // J(계획) + N(자연) → 자연 관광지 / 레포츠
        "JNAT" to TourApiParams(contentTypeId = 28, areaCode = 32, keyword = "트레킹"),
        "JNAL" to TourApiParams(contentTypeId = 12, areaCode = 32, keyword = "등산"),
        "JNRT" to TourApiParams(contentTypeId = 12, areaCode = 32, keyword = "캠핑"),
        "JNRL" to TourApiParams(contentTypeId = 32, areaCode = 32, keyword = "자연휴양림"),

        // P(즉흥) + C(도시) → 도시 탐방
        "PCAT" to TourApiParams(contentTypeId = 14, areaCode = 32, keyword = "야시장"),
        "PCAL" to TourApiParams(contentTypeId = 12, areaCode = 32, keyword = "거리"),
        "PCRT" to TourApiParams(contentTypeId = 39, areaCode = 32, keyword = "카페"),
        "PCRL" to TourApiParams(contentTypeId = 14, areaCode = 32, keyword = "미술관"),

        // P(즉흥) + N(자연) → 자연 모험 / 휴양
        "PNAT" to TourApiParams(contentTypeId = 28, areaCode = 32, keyword = "래프팅"),
        "PNAL" to TourApiParams(contentTypeId = 12, areaCode = 32, keyword = "오지"),
        "PNRT" to TourApiParams(contentTypeId = 12, areaCode = 32, keyword = "해변"),
        "PNRL" to TourApiParams(contentTypeId = 12, areaCode = 32, keyword = "섬"),
    )

    fun getParams(typeCode: String): TourApiParams =
        mapping[typeCode] ?: TourApiParams(contentTypeId = 12, areaCode = 32, keyword = "관광지")
}
