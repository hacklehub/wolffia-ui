import React from "react";

import "./styles.css";

const Layout = ({ children }) => {
  return (
    <div className="p-0 md:p-4 dark:bg-gray-800 text-gray-900 dark:text-gray-50 max-w-full">
      {children}
    </div>
  );
};

export default Layout;
