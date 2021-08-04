import React from "react";

import "./styles.css";

const Layout = ({ children }) => {
  return (
    <div className="px-20 py-10 bg-gray-100 container mx-auto">{children}</div>
  );
};

export default Layout;
