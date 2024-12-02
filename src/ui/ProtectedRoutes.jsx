/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  //load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //if no authenticated user redirectto /login
  useEffect(
    function () {
      if (!isAuthenticated && isLoading) navigate("/login");
    },
    [isLoading, isAuthenticated, navigate]
  );

  //show spinner
  if (isLoading) return <Spinner />;

  if (isAuthenticated) return children;
};

export default ProtectedRoutes;
