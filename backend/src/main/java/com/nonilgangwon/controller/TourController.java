package com.nonilgangwon.controller;

import com.nonilgangwon.dto.TourPlaceDto;
import com.nonilgangwon.service.TourService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tour")
public class TourController {

    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    /**
     * GET /api/tour/recommendations?type=JCAT&region=hotplace&size=6
     *
     * 여행 유형 코드 + 지역 타입을 받아 TourAPI에서 추천 장소 리스트를 반환합니다.
     */
    @GetMapping("/recommendations")
    public ResponseEntity<List<TourPlaceDto>> getRecommendations(
            @RequestParam String type,
            @RequestParam(defaultValue = "hotplace") String region,
            @RequestParam(defaultValue = "6") int size
    ) {
        if (!type.matches("^[JP][CN][AR][TL]$")) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(tourService.getRecommendations(type, region, size));
    }
}
