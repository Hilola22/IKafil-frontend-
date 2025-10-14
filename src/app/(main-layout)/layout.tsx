import React, { ReactNode } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
