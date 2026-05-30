package com.nonilgangwon.tour

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.net.URI

@Service
class TourService {

    private val log = LoggerFactory.getLogger(TourService::class.java)
    private val restTemplate = RestTemplate()

    @Value("\${tour.api.key}")
    private lateinit var apiKey: String

    @Value("\${tour.api.base-url}")
    private lateinit var baseUrl: String

    fun getRecommendations(typeCode: String, numOfRows: Int = 6): List<TourPlaceDto> {
        val params = TourTypeMapper.getParams(typeCode)

        val url = "$baseUrl/areaBasedList2" +
            "?serviceKey=$apiKey" +
            "&MobileOS=ETC" +
            "&MobileApp=NonilGangwon" +
            "&_type=json" +
            "&areaCode=${params.areaCode}" +
            "&contentTypeId=${params.contentTypeId}" +
            "&numOfRows=$numOfRows" +
            "&pageNo=1" +
            "&arrange=Q"

        log.info("TourAPI 호출: typeCode=$typeCode")

        return try {
            val root: TourApiRoot? = restTemplate.getForObject(URI(url), TourApiRoot::class.java)
            val items = root?.response?.body?.items?.item

            if (items.isNullOrEmpty()) {
                log.warn("TourAPI 결과 없음: typeCode=$typeCode")
                emptyList()
            } else {
                val result = items.map { it.toDto() }
                log.info("TourAPI 결과 ${result.size}건 반환")
                result
            }
        } catch (e: Exception) {
            log.error("TourAPI 호출 실패: ${e.message}", e)
            emptyList()
        }
    }
}
