import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem("token");
  const userType = sessionStorage.getItem("userType");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userType)) {
    if (userType === "1") return <Navigate to="/admin" replace />;
    if (userType === "2") return <Navigate to="/owner" replace />;
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
