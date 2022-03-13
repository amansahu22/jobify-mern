import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { user } = useAppContext();

  if (!user) {
    return <Navigate to="/landing" />;
  }

  return props.children;
};

export default ProtectedRoute;
