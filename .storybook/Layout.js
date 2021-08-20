import React from "react";

import "./styles.css";

const Layout = ({ children }) => {
  return (
    <div className="p-4 dark:bg-gray-800 text-gray-900 dark:text-gray-50">
      {children}
    </div>
  );
};

export default Layout;
