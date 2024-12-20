import { MouseEvent } from 'react'

interface Props {
  text: string
  iconSrc: string
  iconPosition: 'left' | 'right'
  inactive: boolean
  onClick: (event: MouseEvent) => void
}

export default function Button({
  text,
  iconSrc,
  iconPosition,
  inactive,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      tabIndex={inactive ? -1 : 0}
      className={`flex h-[5vh] w-[13vw] items-center rounded-full border-[0.25vh] border-[#664326] bg-[#E3E4B2] bg-texture font-game text-[1.5vh] transition-all hover:scale-110 focus:scale-110 focus:outline-none ${iconPosition === 'left' ? 'justify-start' : 'justify-end'}`}
    >
      <img
        src={iconSrc}
        alt=""
        width={96}
        height={96}
        className="pointer-events-none absolute z-10 size-[8vh]"
      />
      <span
        className={`pointer-events-none w-full -translate-y-2 text-center text-[#522c13] ${iconPosition === 'left' ? 'ml-12' : 'mr-12'}`}
      >
        {text}
      </span>
    </button>
  )
}
