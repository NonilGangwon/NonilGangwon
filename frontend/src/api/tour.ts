import apiClient from './index'

export interface TourPlace {
  contentId: string
  contentTypeId: string
  title: string
  address: string
  thumbnail: string
  lat: string
  lng: string
}

export async function fetchRecommendations(typeCode: string, size = 6): Promise<TourPlace[]> {
  const { data } = await apiClient.get<TourPlace[]>('/tour/recommendations', {
    params: { type: typeCode, size },
  })
  return data
}
