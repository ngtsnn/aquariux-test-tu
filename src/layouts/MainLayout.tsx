import Header from '@/components/Header/Header'
import React, { FC, PropsWithChildren } from 'react'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-background text-foreground">
      <Header/>
      <div className="h-12"></div>
      <main>{children}</main>
    </div>
  );
}

export default MainLayout