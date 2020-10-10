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
  defaultValue,
  loading,
  onChange,
}: InputProps) {
  return loading ? (
    <>
      <div className={`${className} w-full px-3 my-1 md:my-3`}>
        <label
          className="shadow-s block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2 bg-gray-400 w-1/3"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className="shadow-s appearance-none w-full bg-gray-400 rounded py-3 px-4 mb-3 leading-tight border border-gray-400"
          disabled
          id={id}
        />
        {displayMessage && <p className="text-red-500 text-xs italic">{message}</p>}
      </div>
    </>
  ) : (
    <>
      <div className={`${className} w-full px-3 my-1 md:my-3`}>
        <label
          className={`${
            required && 'required'
          } block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2`}
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className="shadow-s appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:shadow-outline-gray focus:outline-none"
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
          defaultValue={defaultValue}
        />
        {displayMessage && <p className="text-red-500 text-xs italic">{message}</p>}
      </div>
    </>
  );
}

export default Input;
