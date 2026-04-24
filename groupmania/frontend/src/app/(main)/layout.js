'use client';

import Header from '@/components/Header/Header';
import { ThemeProvider } from '@/context/theme-context';
import './main.scss';

function Layout({ children }) {
  return (
    <div className="mainLayout__container">
      <ThemeProvider>
        <div className="mainLayout__header">
          <Header />
        </div>
        <div className="mainLayout__body">
          <div className="mainLayout__content">{children}</div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Layout;
