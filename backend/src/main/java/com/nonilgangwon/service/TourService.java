package com.nonilgangwon.service;

import com.nonilgangwon.dto.TourPlaceDto;
import com.nonilgangwon.util.TourTypeMapper;
import com.nonilgangwon.vo.TourApiParams;
import com.nonilgangwon.vo.TourApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Collections;
import java.util.List;

@Service
public class TourService {

    private static final Logger log = LoggerFactory.getLogger(TourService.class);
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${tour.api.key}")
    private String apiKey;

    @Value("${tour.api.base-url}")
    private String baseUrl;

    public List<TourPlaceDto> getRecommendations(String typeCode, String region, int numOfRows) {
        TourApiParams params = TourTypeMapper.getParams(typeCode, region);

        String url = baseUrl + "/areaBasedList2"
                + "?serviceKey=" + apiKey
                + "&MobileOS=ETC"
                + "&MobileApp=NonilGangwon"
                + "&_type=json"
                + "&areaCode=" + params.areaCode()
                + (params.sigunguCode() != null ? "&sigunguCode=" + params.sigunguCode() : "")
                + "&contentTypeId=" + params.contentTypeId()
                + "&numOfRows=" + numOfRows
                + "&pageNo=1"
                + "&arrange=Q";

        log.info("TourAPI 호출: typeCode={}, region={}, sigunguCode={}, contentTypeId={}",
                typeCode, region, params.sigunguCode(), params.contentTypeId());
        log.info("TourAPI URL: {}", url);

        try {
            TourApiResponse.Root root = restTemplate.getForObject(URI.create(url), TourApiResponse.Root.class);
            if (root == null || root.getResponse() == null) return Collections.emptyList();

            TourApiResponse.Items items = root.getResponse().getBody().getItems();
            if (items == null || items.getItem() == null || items.getItem().isEmpty()) {
                log.warn("TourAPI 결과 없음: typeCode={}", typeCode);
                return Collections.emptyList();
            }

            List<TourPlaceDto> result = items.getItem().stream()
                    .map(TourApiResponse.Item::toDto)
                    .toList();
            log.info("TourAPI 결과 {}건 반환", result.size());
            return result;
        } catch (Exception e) {
            log.error("TourAPI 호출 실패: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }
}
