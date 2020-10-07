import React from 'react';
import Link from 'next/link';
import LightLogo from './Logo';
import { Paths } from '../lib/web/paths';

function NavBar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 py-3 px-6">
      <Link href={Paths.HOME}>
        <div className="flex items-center flex-shrink-0 text-white mr-6 cursor-pointer">
          <LightLogo size={40} className="mr-4" />
          <span className="font-semibold text-l tracking-tight">Canvas V2</span>
        </div>
      </Link>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          type="button"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href={Paths.CLASSES}>
            <a className="inline-block text-sm px-4 py-2 text-teal-200 leading-none rounded hover:text-white hover:bg-teal-400 lg:mt-0 mr-4">
              Classes
            </a>
          </Link>
          <Link href={Paths.CALENDAR}>
            <a className="inline-block text-sm px-4 py-2 text-teal-200 leading-none rounded hover:text-white hover:bg-teal-400 lg:mt-0 mr-4">
              Calendar
            </a>
          </Link>
          <Link href={Paths.TODO}>
            <a className="inline-block text-sm px-4 py-2 text-teal-200 leading-none rounded hover:text-white hover:bg-teal-400 lg:mt-0 mr-4">
              To-do
            </a>
          </Link>
        </div>
        <div>
          <Link href={Paths.SIGN_UP}>
            <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0 mr-4">
              Sign Up
            </a>
          </Link>
          <Link href={Paths.SIGN_IN}>
            <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0">
              Sign In
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
