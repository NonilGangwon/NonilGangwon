declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void
      isInitialized: () => boolean
      Share: {
        sendDefault: (params: object) => void
      }
    }
  }
}

let initialized = false

function init() {
  if (initialized || !window.Kakao) return
  window.Kakao.init(import.meta.env.VITE_KAKAO_KEY)
  initialized = true
}

interface KakaoShareParams {
  typeCode: string
  typeName: string
  typeTag: string
  thumbnail?: string
}

export function shareKakao({ typeCode, typeName, typeTag, thumbnail }: KakaoShareParams) {
  init()

  if (!window.Kakao?.isInitialized()) {
    alert('카카오 SDK 초기화에 실패했어요.')
    return
  }

  const baseUrl = import.meta.env.VITE_SHARE_BASE_URL || location.origin
  const shareUrl = `${baseUrl}/?type=${typeCode}`

  try {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `나의 여행 유형은 ${typeCode}`,
        description: `${typeName} — ${typeTag}`,
        imageUrl: thumbnail && thumbnail.startsWith('http')
          ? thumbnail
          : 'https://www.visitkorea.or.kr/resources/images/common/visitkorea_og.jpg',
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: '내 유형 확인하기',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    })
  } catch (e) {
    console.error('[Kakao] 공유 실패:', e)
  }
}
