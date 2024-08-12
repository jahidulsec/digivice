'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NextProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar height="2px" color="#0ea5e9" options={{ showSpinner: false }} shallowRouting />
    </>
  );
};

export default NextProgressProvider;
