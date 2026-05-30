package com.nonilgangwon.tour

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty

// TourAPI areaBasedList1 응답 전체 구조
@JsonIgnoreProperties(ignoreUnknown = true)
data class TourApiRoot(
    val response: TourApiResponseBody
)

@JsonIgnoreProperties(ignoreUnknown = true)
data class TourApiResponseBody(
    val header: TourApiHeader,
    val body: TourApiBody
)

@JsonIgnoreProperties(ignoreUnknown = true)
data class TourApiHeader(
    val resultCode: String,
    val resultMsg: String
)

@JsonIgnoreProperties(ignoreUnknown = true)
data class TourApiBody(
    val items: TourApiItems?,
    val numOfRows: Int,
    val pageNo: Int,
    val totalCount: Int
)

@JsonIgnoreProperties(ignoreUnknown = true)
data class TourApiItems(
    val item: List<TourApiItem>?
)

@JsonIgnoreProperties(ignoreUnknown = true)
data class TourApiItem(
    val contentid: String?,
    val contenttypeid: String?,
    val title: String?,
    val addr1: String?,
    val addr2: String?,
    val firstimage: String?,
    val firstimage2: String?,
    val mapx: String?,
    val mapy: String?,
    @JsonProperty("cat1") val cat1: String?,
    @JsonProperty("cat2") val cat2: String?,
    @JsonProperty("cat3") val cat3: String?,
)

// 프론트에 내려줄 단순화된 DTO
data class TourPlaceDto(
    val contentId: String,
    val contentTypeId: String,
    val title: String,
    val address: String,
    val thumbnail: String,
    val lat: String,
    val lng: String,
)

fun TourApiItem.toDto() = TourPlaceDto(
    contentId = contentid ?: "",
    contentTypeId = contenttypeid ?: "",
    title = title ?: "",
    address = listOfNotNull(addr1, addr2).joinToString(" ").trim(),
    thumbnail = firstimage ?: firstimage2 ?: "",
    lat = mapy ?: "",
    lng = mapx ?: "",
)
