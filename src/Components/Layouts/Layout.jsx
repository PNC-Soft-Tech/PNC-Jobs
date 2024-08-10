import React from "react";
import Header from "../Header/Header";
import '../../app/globals.css';
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="flex-1 container mx-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;
