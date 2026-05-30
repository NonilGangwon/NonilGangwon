import { useEffect, useState } from 'react'
import { fetchRecommendations, type TourPlace } from '../api/tour'

interface UseTourRecommendationsResult {
  places: TourPlace[]
  loading: boolean
  error: string | null
}

export function useTourRecommendations(typeCode: string): UseTourRecommendationsResult {
  const [places, setPlaces] = useState<TourPlace[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    setError(null)

    fetchRecommendations(typeCode)
      .then(setPlaces)
      .catch(() => setError('추천 여행지를 불러오지 못했어요.'))
      .finally(() => setLoading(false))
  }, [typeCode])

  return { places, loading, error }
}
