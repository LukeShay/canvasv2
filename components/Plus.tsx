import React from 'react';
import { CommonProps } from './CommonProps';

function Plus({ size, className }: CommonProps & { size: number }) {
  return (
    <div className={`${className} rounded-full shadow-lg w-max-content p-2 border border-gray-200`}>
      <svg
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 455 455"
        width={size}
        height={size}
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5   455,242.5 " />
      </svg>
    </div>
  );
}

export default Plus;
