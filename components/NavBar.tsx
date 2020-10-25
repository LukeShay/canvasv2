import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { Paths } from '../lib/client';
import { IUser, UserRole } from '../lib/types';
import Logo from './logos/Logo';

function NavBar() {
  const router = useRouter();

  const [session, loading] = useSession();

  const [open, setOpen] = React.useState(false);
  const [viewer, setViewer] = React.useState<IUser | null>(null);

  React.useEffect(() => {
    if (!loading && session?.user) {
      setViewer((session.user as unknown) as IUser);
    }
  }, [loading, session]);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div>
      <div className="flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-100 h-16 items-center">
        <div className="w-full max-w-screen-xl relative mx-auto px-6">
          <nav className="flex items-center -mx-6 justify-between">
            <Link href={Paths.HOME}>
              <div aria-label="Home" className="ml-3 mr-6 cursor-pointer">
                <Logo size={40} />
              </div>
            </Link>
            <button
              className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-indigo-500 hover:border-gray-900 md:hidden mr-6"
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
            <div className="hidden md:flex flex-grow min-w-0 lg:w-3/4 xl:w-4/5 mr-3">
              <div className="w-full min-w-0">
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
                {viewer?.role === UserRole.ADMIN && (
                  <a className="inline-block text-sm px-4 py-2 text-red-500 leading-none rounded mr-4 transition duration-150 ease-in-out">
                    Admin
                  </a>
                )}
              </div>
              <div className="hidden md:flex md:items-center md:justify-between">
                <Link href={viewer ? Paths.PROFILE : Paths.SIGN_UP}>
                  <button
                    className="inline-block text-sm px-4 py-2 leading-none text-indigo-500 hover:text-indigo-900 border rounded border-indigo-500 hover:border-indigo-900transition duration-150 ease-in-out w-24 mr-4"
                    type="button"
                  >
                    {viewer ? 'Profile' : 'Sign up'}
                  </button>
                </Link>
                {!viewer && (
                  <Link href={viewer ? router.pathname : Paths.SIGN_IN}>
                    <button
                      className="inline-block text-sm px-4 py-2 leading-none text-indigo-500 hover:text-indigo-900 border rounded border-indigo-500 hover:border-indigo-900 transition duration-150 ease-in-out w-24"
                      type="button"
                    >
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
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
                <Logo size={40} />
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
