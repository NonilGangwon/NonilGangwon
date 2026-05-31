interface CharProps {
  code: string
}

export function CharacterMark({ code }: CharProps) {
  return (
    <img
      src={`/characters/${code}.svg`}
      alt={`${code} 여행 유형 캐릭터`}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  )
}

