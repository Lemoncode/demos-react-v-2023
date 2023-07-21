import React from "react";

// New on React 18
interface Props {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children }) => (
  <div className="layout-app-container">
    <div className="layout-app-header">User Logged in</div>
    {children}
  </div>
);
