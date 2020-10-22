import React from 'react';
import { useRouter } from 'next/router';
import ChildrenProps from './ChildrenProps';
import { IUser, Optional } from '../lib/types';
import { Paths, useViewer } from '../lib/client';

const ViewerContext = React.createContext<{ viewer: Optional<IUser> }>({ viewer: undefined });

function ViewerProvider({ children }: ChildrenProps) {
  const { pathname, push } = useRouter();
  const { viewer, loading } = useViewer();

  React.useEffect(() => {
    if (loading) return;

    if (!viewer) {
      switch (pathname) {
        case Paths.PROFILE:
          push(Paths.SIGN_IN);
          break;
        default:
          break;
      }
    } else {
      switch (pathname) {
        case Paths.SIGN_IN:
        case Paths.SIGN_UP:
          push(Paths.PROFILE);
          break;
        default:
          break;
      }
    }
  }, [viewer, loading]);

  return <ViewerContext.Provider value={{ viewer }}>{children}</ViewerContext.Provider>;
}

const useViewerContext = () => React.useContext(ViewerContext);

export { ViewerProvider, useViewerContext };
