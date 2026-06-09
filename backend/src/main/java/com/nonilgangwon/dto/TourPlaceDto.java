package com.nonilgangwon.dto;

public record TourPlaceDto(
        String contentId,
        String contentTypeId,
        String title,
        String address,
        String thumbnail,
        String lat,
        String lng
) {}
