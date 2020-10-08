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
  onChange,
}: InputProps) {
  return (
    <>
      <div className={`${className} w-full px-3 my-1 md:my-3`}>
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
          defaultValue={defaultValue}
        />
        {displayMessage && <p className="text-red-500 text-xs italic">{message}</p>}
      </div>
      {required && (
        <style jsx>
          {`
            label:after {
              content: ' *';
              color: red;
            }
          `}
        </style>
      )}
    </>
  );
}

export default Input;
