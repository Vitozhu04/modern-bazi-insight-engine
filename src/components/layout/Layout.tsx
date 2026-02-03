import React from "react";
import Header from "@/components/layout/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
