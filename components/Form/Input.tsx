import React from 'react';
import InputProps from './InputProps';

function Input({
  required,
  label,
  id,
  type,
  placeholder,
  autoComplete,
  name,
  className,
  message,
  displayMessage,
  value,
  minLength,
  maxLength,
  pattern,
  autoCapitalize,
  onChange,
}: InputProps) {
  return (
    <div className={`w-full px-3 my-1 md:my-3 ${className}`}>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:shadow-outline-gray focus:outline-none"
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        onChange={onChange}
        value={value}
        autoCapitalize={autoCapitalize}
      />
      {displayMessage && <p className="text-red-500 text-xs italic">{message}</p>}
    </div>
  );
}

export default Input;
