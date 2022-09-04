import React, { useEffect, useRef } from 'react';


interface Props {
  type?: React.HTMLInputTypeAttribute | undefined
  name: string
  value?: string | number | readonly string[] | undefined
  defaultValue?: string | number | readonly string[] | undefined
  className?: string
  autoComplete?: string | undefined
  required?: boolean
  isFocused?: boolean
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  handleSubmit?: React.FormEventHandler<HTMLInputElement>
  handleLoad?: React.ReactEventHandler<HTMLInputElement>
}

export default function Input({
  type = 'text',
  name,
  value,
  className,
  autoComplete,
  required,
  isFocused,
  handleChange,
  handleSubmit,
  handleLoad,
  defaultValue,

}: Props) {
  const input = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-start">
      <input
        type={type}
        name={name}
        value={value}
        className={
          `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
          className
        }
        ref={input}
        autoComplete={autoComplete}
        required={required}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onLoad={handleLoad}
        defaultValue={defaultValue}
      />
    </div>
  );
}
