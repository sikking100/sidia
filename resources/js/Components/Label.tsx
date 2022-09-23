import React from 'react';

interface Props {
  forInput: string | undefined
  value: string
  className?: string
  required?: boolean
}

export default function Label({ forInput, value, className = '', children, required = true }: React.PropsWithChildren<Props>) {
  return (
    <label htmlFor={forInput} className={`block font-medium text-sm text-gray-700 ` + className}>
      {value ? value : children} {required ? <p className={'text-red-900 inline-block'}>*</p> : ''}
    </label>
  );
}
