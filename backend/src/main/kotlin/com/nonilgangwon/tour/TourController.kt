package com.nonilgangwon.tour

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/tour")
class TourController(
    private val tourService: TourService,
) {

    /**
     * GET /api/tour/recommendations?type=JCAT&size=6
     *
     * 여행 유형 코드를 받아 TourAPI에서 추천 장소 리스트를 반환합니다.
     */
    @GetMapping("/recommendations")
    fun getRecommendations(
        @RequestParam type: String,
        @RequestParam(defaultValue = "6") size: Int,
    ): ResponseEntity<List<TourPlaceDto>> {
        val validTypePattern = Regex("^[JP][CN][AR][TL]$")
        if (!type.matches(validTypePattern)) {
            return ResponseEntity.badRequest().build()
        }

        val result = tourService.getRecommendations(typeCode = type, numOfRows = size)
        return ResponseEntity.ok(result)
    }
}
