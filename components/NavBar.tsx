import React from 'react';
import Link from 'next/link';
import Logo from './logos/Logo';
import { Paths } from '../lib/web/paths';
import { useViewer } from '../lib/web/hooks';

function NavBar() {
  const [open, setOpen] = React.useState(false);
  const { viewer } = useViewer();

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-white py-3 px-6 mb-8">
        <Link href={Paths.HOME}>
          <div
            aria-label="Home"
            className="flex items-center flex-shrink-0 text-gray-500 mr-6 cursor-pointer"
          >
            <Logo size={40} className="mr-4" />
          </div>
        </Link>
        <div className="md:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-indigo-500 hover:border-gray-900"
            type="button"
            id="main-menu"
            aria-label="Main menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/5000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex w-auto flex-grow items-center">
          <div className="text-sm flex-grow">
            <Link href={Paths.CLASSES}>
              <a className="inline-block text-sm px-4 py-2 text-gray-500 hover:text-indigo-500 leading-none rounded mr-4 transition duration-150 ease-in-out">
                Classes
              </a>
            </Link>
            <Link href={Paths.CALENDAR}>
              <a className="inline-block text-sm px-4 py-2 text-gray-500 hover:text-indigo-500 leading-none rounded mr-4 transition duration-150 ease-in-out">
                Calendar
              </a>
            </Link>
            <Link href={Paths.TODO}>
              <a className="inline-block text-sm px-4 py-2 text-gray-500 hover:text-indigo-500 leading-none rounded mr-4 transition duration-150 ease-in-out">
                To-do
              </a>
            </Link>
          </div>
          <div className="md:mt-0 mt-2 pl-4">
            {viewer ? (
              <Link href={Paths.PROFILE}>
                <a className="inline-block text-sm px-4 py-2 leading-none text-indigo-500 hover:text-indigo-900 border rounded border-indigo-500 hover:border-indigo-900 mr-4 transition duration-150 ease-in-out">
                  Profile
                </a>
              </Link>
            ) : (
              <>
                <Link href={Paths.SIGN_UP}>
                  <a className="inline-block text-sm px-4 py-2 leading-none text-indigo-500 hover:text-indigo-900 border rounded border-indigo-500 hover:border-indigo-900 mr-4 transition duration-150 ease-in-out">
                    Sign Up
                  </a>
                </Link>
                <Link href={Paths.SIGN_IN}>
                  <a className="inline-block text-sm px-4 py-2 leading-none text-indigo-500 hover:text-indigo-900 border rounded border-indigo-500 hover:border-indigo-900 transition duration-150 ease-in-out">
                    Sign In
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {open && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-md">
            <div
              className="rounded-lg shadow-xs overflow-hidden bg-white"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="main-menu"
            >
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <Logo size={40} />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-indigo-500 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                    aria-label="Close menu"
                    onClick={handleClick}
                  >
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3">
                <Link href={Paths.CLASSES}>
                  <a
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 leading-none hover:text-indigo-500 transition duration-150 ease-in-out"
                    role="menuitem"
                    onClick={handleClick}
                  >
                    Classes
                  </a>
                </Link>
                <Link href={Paths.CALENDAR}>
                  <a
                    href="#"
                    className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-500 leading-none hover:text-indigo-500 transition duration-150 ease-in-out"
                    role="menuitem"
                    onClick={handleClick}
                  >
                    Calendar
                  </a>
                </Link>
                <Link href={Paths.TODO}>
                  <a
                    href="#"
                    className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-500 leading-none hover:text-indigo-500 transition duration-150 ease-in-out"
                    role="menuitem"
                    onClick={handleClick}
                  >
                    Todo
                  </a>
                </Link>
                <Link href={viewer ? Paths.PROFILE : Paths.SIGN_UP}>
                  <a
                    href="#"
                    className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-500 leading-none hover:text-indigo-500 transition duration-150 ease-in-out"
                    role="menuitem"
                    onClick={handleClick}
                  >
                    {viewer ? 'Profile' : 'Sign up'}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
