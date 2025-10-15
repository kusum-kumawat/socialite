import axios from "axios";
import { Navigate, useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";

export const loader = async () => {
  try {
    const user = await axios.get("/api/v1/users/auth/me");
    if (user && user.statusText == "OK") {
      return user.data?.data;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const UserContext = createContext();

function ProtectRoute({ children }) {
  const data = useLoaderData();
  console.log(data);

  if (data) {
    return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
  }
  return <Navigate to={"/login"} replace />;
}

export const useUserContext = () => {
  return useContext(UserContext);
};
export default ProtectRoute;
