import React from 'react'

export default function Container({ children }: React.PropsWithChildren) {
  return <div className={'bg-white rounded p-6'}>
    {children}
  </div>
}
