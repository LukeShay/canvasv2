import React from 'react';
import ChildrenProps from '../ChildrenProps';
import InputProps from './InputProps';

function Select({
  required,
  label,
  id,
  placeholder,
  autoComplete,
  name,
  className,
  children,
  message,
  displayMessage,
  value,
  onChange,
}: InputProps<HTMLSelectElement> & ChildrenProps) {
  return (
    <div className={`${className} w-full px-3 my-1 md:my-3`}>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <select
          className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 mb-3 pr-8 rounded leading-tight focus:shadow-outline-gray focus:outline-none focus:border-gray-500"
          id={id}
          name={name}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {displayMessage && <p className="text-red-500 text-xs italic">{message}</p>}
    </div>
  );
}

export default Select;
