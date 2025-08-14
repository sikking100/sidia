import React from 'react';
import { Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { ArrowLeftIcon, Button } from 'flowbite-react';

interface Props {
  type?: "submit" | "button" | "reset" | undefined
  className?: string
  processing: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

// export default function Button({ type = 'submit', className = '', processing, onClick, children }: React.PropsWithChildren<Props>) {
//   return (
//     <button
//       onClick={onClick}
//       type={type}
//       className={
//         `inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${processing && 'opacity-25'
//         } ` + className
//       }
//       disabled={processing}
//     >
//       {children}
//     </button>
//   );
// }

interface BackProps {
  route: string
  routess?: string | null
  id?: number | null
}

export function BackButton(routes: BackProps) {
  return (
    <Button
      // as={Link}
      href={(routes.routess !== null && routes.routess !== undefined) ? route((routes.routess ?? ''), routes.id ?? 0) : route(`${routes.route}.index`)}
      size='xs'
      className='w-fit'
      color={'dark'}
    >
      <ArrowLeftIcon />
    </Button>
  )
}
