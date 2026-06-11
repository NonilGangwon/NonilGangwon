package com.nonilgangwon.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.nonilgangwon.dto.TourPlaceDto;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// TourAPI areaBasedList2 응답 전체 구조
public class TourApiResponse {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Root {
        private Body response;
        public Body getResponse() { return response; }
        public void setResponse(Body response) { this.response = response; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Body {
        private Header header;
        private BodyContent body;
        public Header getHeader() { return header; }
        public void setHeader(Header header) { this.header = header; }
        public BodyContent getBody() { return body; }
        public void setBody(BodyContent body) { this.body = body; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Header {
        private String resultCode;
        private String resultMsg;
        public String getResultCode() { return resultCode; }
        public void setResultCode(String resultCode) { this.resultCode = resultCode; }
        public String getResultMsg() { return resultMsg; }
        public void setResultMsg(String resultMsg) { this.resultMsg = resultMsg; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class BodyContent {
        private Items items;
        private int numOfRows;
        private int pageNo;
        private int totalCount;
        public Items getItems() { return items; }
        public void setItems(Items items) { this.items = items; }
        public int getNumOfRows() { return numOfRows; }
        public void setNumOfRows(int numOfRows) { this.numOfRows = numOfRows; }
        public int getPageNo() { return pageNo; }
        public void setPageNo(int pageNo) { this.pageNo = pageNo; }
        public int getTotalCount() { return totalCount; }
        public void setTotalCount(int totalCount) { this.totalCount = totalCount; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Items {
        private List<Item> item;
        public List<Item> getItem() { return item; }
        public void setItem(List<Item> item) { this.item = item; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Item {
        private String contentid;
        private String contenttypeid;
        private String title;
        private String addr1;
        private String addr2;
        private String firstimage;
        private String firstimage2;
        private String mapx;
        private String mapy;
        @JsonProperty("cat1") private String cat1;
        @JsonProperty("cat2") private String cat2;
        @JsonProperty("cat3") private String cat3;

        public String getContentid() { return contentid; }
        public void setContentid(String contentid) { this.contentid = contentid; }
        public String getContenttypeid() { return contenttypeid; }
        public void setContenttypeid(String contenttypeid) { this.contenttypeid = contenttypeid; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getAddr1() { return addr1; }
        public void setAddr1(String addr1) { this.addr1 = addr1; }
        public String getAddr2() { return addr2; }
        public void setAddr2(String addr2) { this.addr2 = addr2; }
        public String getFirstimage() { return firstimage; }
        public void setFirstimage(String firstimage) { this.firstimage = firstimage; }
        public String getFirstimage2() { return firstimage2; }
        public void setFirstimage2(String firstimage2) { this.firstimage2 = firstimage2; }
        public String getMapx() { return mapx; }
        public void setMapx(String mapx) { this.mapx = mapx; }
        public String getMapy() { return mapy; }
        public void setMapy(String mapy) { this.mapy = mapy; }
        public String getCat1() { return cat1; }
        public void setCat1(String cat1) { this.cat1 = cat1; }
        public String getCat2() { return cat2; }
        public void setCat2(String cat2) { this.cat2 = cat2; }
        public String getCat3() { return cat3; }
        public void setCat3(String cat3) { this.cat3 = cat3; }

        public TourPlaceDto toDto() {
            String address = Stream.of(addr1, addr2)
                    .filter(s -> s != null && !s.isBlank())
                    .collect(Collectors.joining(" "))
                    .trim();
            String thumbnail = (firstimage != null && !firstimage.isBlank()) ? firstimage
                    : (firstimage2 != null ? firstimage2 : "");
            return new TourPlaceDto(
                    contentid != null ? contentid : "",
                    contenttypeid != null ? contenttypeid : "",
                    title != null ? title : "",
                    address,
                    thumbnail,
                    mapy != null ? mapy : "",
                    mapx != null ? mapx : ""
            );
        }
    }
}
