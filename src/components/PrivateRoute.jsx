// components/PrivateRoute.js
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userJSON = localStorage.getItem("user");
  const storedUser = userJSON ? JSON.parse(userJSON) : null;

  return storedUser && storedUser.email ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
