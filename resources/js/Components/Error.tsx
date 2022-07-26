import React from 'react'

interface Props {
  message: string
}

export function ErrorText(props: Props) {
  return (
    <div>
      {props.message && <p className="text-red-500 text-xs italic">{props.message}</p>}
    </div>
  )
}
