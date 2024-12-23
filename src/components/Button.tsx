import clsx from 'clsx'
import { MouseEvent } from 'react'

interface Props {
  text: string
  icon?: string
  selectable: boolean
  className?: string
  onClick: (event: MouseEvent) => void
}

export default function Button({
  text,
  icon,
  selectable,
  className,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      tabIndex={selectable ? 0 : -1}
      disabled={!selectable}
      onClick={onClick}
      className={clsx(
        className,
        'text-outline text-nana group flex flex-col items-center font-game',
      )}
    >
      <span className="pointer-events-none absolute -top-10 mb-2 select-none opacity-0 transition-opacity group-hover:opacity-100">
        {text}
      </span>

      <img
        src={'/assets/icon_' + icon + '.png'}
        alt=""
        width={96}
        height={96}
        className="transition-scale pointer-events-none size-20 select-none group-hover:scale-110"
      />
    </button>
  )
}
