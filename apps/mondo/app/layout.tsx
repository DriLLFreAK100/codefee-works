import { FC, PropsWithChildren } from 'react';
import '../styles/globals.css';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Codefee Works</title>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
