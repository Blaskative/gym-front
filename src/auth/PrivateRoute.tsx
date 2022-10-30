
import { Navigate, Outlet, redirect, Route } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("auth");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;