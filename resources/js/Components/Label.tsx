import React from 'react';

interface Props {
  forInput: string | undefined
  value: string
  className?: string
}

export default function Label({ forInput, value, className = '', children }: React.PropsWithChildren<Props>) {
  return (
    <label htmlFor={forInput} className={`block font-medium text-sm text-gray-700 ` + className}>
      {value ? value : children}
    </label>
  );
}
