import { MouseEvent } from 'react'

interface Props {
  text: string
  iconSrc: string
  iconPosition: 'left' | 'right'
  onClick: (event: MouseEvent) => void
}

export default function Button({
  text,
  iconSrc,
  iconPosition,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`bg-texture flex h-12 w-60 items-center rounded-full border-2 border-[#704B2C] bg-[#E3E4B2] font-game transition-all hover:scale-110 ${iconPosition === 'left' ? 'justify-start' : 'justify-end'}`}
    >
      <img
        src={iconSrc}
        alt=""
        width={96}
        height={96}
        className="pointer-events-none absolute z-10 size-20"
      />
      <span
        className={`pointer-events-none w-full -translate-y-2 text-center text-[#522c13] ${iconPosition === 'left' ? 'ml-12' : 'mr-12'}`}
      >
        {text}
      </span>
    </button>
  )
}
