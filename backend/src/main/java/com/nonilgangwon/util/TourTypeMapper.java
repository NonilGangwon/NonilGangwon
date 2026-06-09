package com.nonilgangwon.util;

import com.nonilgangwon.vo.TourApiParams;

import java.util.Map;

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
public class TourTypeMapper {

    // ── hotplace: 강릉(3), 속초(6), 양양(18), 춘천(1) ──────────────
    private static final Map<String, TourApiParams> hotplace = Map.ofEntries(
            Map.entry("JCAT", new TourApiParams(12, 3)),   // 계획·도시·모험·함께 → 강릉 관광지
            Map.entry("JCAL", new TourApiParams(14, 3)),   // 계획·도시·모험·혼자 → 강릉 문화시설
            Map.entry("JCRT", new TourApiParams(39, 6)),   // 계획·도시·휴양·함께 → 속초 음식점
            Map.entry("JCRL", new TourApiParams(32, 3)),   // 계획·도시·휴양·혼자 → 강릉 숙박
            Map.entry("JNAT", new TourApiParams(28, 6)),   // 계획·자연·모험·함께 → 속초 레포츠
            Map.entry("JNAL", new TourApiParams(12, 6)),   // 계획·자연·모험·혼자 → 속초 관광지
            Map.entry("JNRT", new TourApiParams(12, 18)),  // 계획·자연·휴양·함께 → 양양 관광지
            Map.entry("JNRL", new TourApiParams(32, 18)),  // 계획·자연·휴양·혼자 → 양양 숙박
            Map.entry("PCAT", new TourApiParams(28, 1)),   // 즉흥·도시·모험·함께 → 춘천 레포츠
            Map.entry("PCAL", new TourApiParams(12, 1)),   // 즉흥·도시·모험·혼자 → 춘천 관광지
            Map.entry("PCRT", new TourApiParams(39, 3)),   // 즉흥·도시·휴양·함께 → 강릉 음식점
            Map.entry("PCRL", new TourApiParams(12, 6)),   // 즉흥·도시·휴양·혼자 → 속초 관광지
            Map.entry("PNAT", new TourApiParams(28, 18)),  // 즉흥·자연·모험·함께 → 양양 레포츠
            Map.entry("PNAL", new TourApiParams(12, 1)),   // 즉흥·자연·모험·혼자 → 춘천 관광지
            Map.entry("PNRT", new TourApiParams(15, 3)),   // 즉흥·자연·휴양·함께 → 강릉 축제·행사
            Map.entry("PNRL", new TourApiParams(39, 18))   // 즉흥·자연·휴양·혼자 → 양양 음식점
    );

    // ── quiet: 평창(11), 인제(16), 고성(17), 홍천(8), 정선(12) ──────
    private static final Map<String, TourApiParams> quiet = Map.ofEntries(
            Map.entry("JCAT", new TourApiParams(15, 11)),  // 계획·도시·모험·함께 → 평창 축제·행사
            Map.entry("JCAL", new TourApiParams(14, 11)),  // 계획·도시·모험·혼자 → 평창 문화시설
            Map.entry("JCRT", new TourApiParams(39, 11)),  // 계획·도시·휴양·함께 → 평창 음식점
            Map.entry("JCRL", new TourApiParams(32, 11)),  // 계획·도시·휴양·혼자 → 평창 숙박
            Map.entry("JNAT", new TourApiParams(28, 16)),  // 계획·자연·모험·함께 → 인제 레포츠
            Map.entry("JNAL", new TourApiParams(12, 16)),  // 계획·자연·모험·혼자 → 인제 관광지
            Map.entry("JNRT", new TourApiParams(12, 11)),  // 계획·자연·휴양·함께 → 평창 관광지
            Map.entry("JNRL", new TourApiParams(32, 8)),   // 계획·자연·휴양·혼자 → 홍천 숙박
            Map.entry("PCAT", new TourApiParams(28, 17)),  // 즉흥·도시·모험·함께 → 고성 레포츠
            Map.entry("PCAL", new TourApiParams(12, 17)),  // 즉흥·도시·모험·혼자 → 고성 관광지
            Map.entry("PCRT", new TourApiParams(39, 8)),   // 즉흥·도시·휴양·함께 → 홍천 음식점
            Map.entry("PCRL", new TourApiParams(12, 17)),  // 즉흥·도시·휴양·혼자 → 고성 관광지
            Map.entry("PNAT", new TourApiParams(28, 16)),  // 즉흥·자연·모험·함께 → 인제 레포츠
            Map.entry("PNAL", new TourApiParams(12, 12)),  // 즉흥·자연·모험·혼자 → 정선 관광지
            Map.entry("PNRT", new TourApiParams(12, 17)),  // 즉흥·자연·휴양·함께 → 고성 관광지
            Map.entry("PNRL", new TourApiParams(32, 11))   // 즉흥·자연·휴양·혼자 → 평창 숙박
    );

    public static TourApiParams getParams(String typeCode, String region) {
        Map<String, TourApiParams> mapping = "quiet".equals(region) ? quiet : hotplace;
        return mapping.getOrDefault(typeCode, new TourApiParams(12, 32, null));
    }

    private TourTypeMapper() {}
}
