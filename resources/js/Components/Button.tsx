import React from 'react';
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'

interface Props {
  type?: "submit" | "button" | "reset" | undefined
  className?: string
  processing: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export default function Button({ type = 'submit', className = '', processing, onClick, children }: React.PropsWithChildren<Props>) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={
        `inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${processing && 'opacity-25'
        } ` + className
      }
      disabled={processing}
    >
      {children}
    </button>
  );
}

interface BackProps {
  route: string
}

export function BackButton(routes: BackProps) {
  return (
    <div className='container pb-3'>
      <Link
        className={'link'}
        href={route(`${routes.route}.index`)}>
        Kembali
      </Link>
    </div>
  )
}
