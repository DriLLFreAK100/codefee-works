import { FunctionComponent, Suspense } from 'react';
import { CircularProgress } from 'codefee-kit';
import { FcWithChildren } from 'typings/react-ext';

const SuspenseLoader: FcWithChildren = ({ children }) => {
  return (
    <Suspense fallback={<CircularProgress size={60} />}>{children}</Suspense>
  );
};

export const withSuspense = (Component: FunctionComponent) => {
  return (
    <SuspenseLoader>
      <Component />
    </SuspenseLoader>
  );
};

export default SuspenseLoader;
