export interface TourItem {
  contentId: string
  title: string
  addr1: string
  addr2?: string
  areaCode: string
  sigunguCode?: string
  cat1: string
  cat2: string
  cat3: string
  firstImage?: string
  firstImage2?: string
  mapX: string
  mapY: string
  tel?: string
  contentTypeId: string
  createdTime: string
  modifiedTime: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
}
