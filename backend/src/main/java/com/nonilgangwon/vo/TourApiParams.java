package com.nonilgangwon.vo;

public record TourApiParams(int contentTypeId, int areaCode, Integer sigunguCode) {
    public TourApiParams(int contentTypeId, Integer sigunguCode) {
        this(contentTypeId, 32, sigunguCode);
    }
}
