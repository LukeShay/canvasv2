import React from 'react';
import { useRouter } from 'next/router';
import ChildrenProps from './ChildrenProps';
import { IUser, Optional } from '~/lib/types';
import { Paths, useViewer } from '~/lib/client';

const ViewerContext = React.createContext<{ viewer: Optional<IUser> }>({ viewer: undefined });

function ViewerProvider({ children }: ChildrenProps) {
  const { pathname, push } = useRouter();
  const { viewer, loading } = useViewer();

  React.useEffect(() => {
    if (loading) return;

    if (pathname === Paths.PROFILE && !viewer) {
      push(Paths.SIGN_IN);
    } else if (pathname === Paths.SIGN_IN || (pathname === Paths.SIGN_UP && viewer)) {
      push(Paths.PROFILE);
    }
  }, [viewer, loading]);

  return <ViewerContext.Provider value={{ viewer }}>{children}</ViewerContext.Provider>;
}

const useViewerContext = () => React.useContext(ViewerContext);

export { ViewerProvider, useViewerContext };
