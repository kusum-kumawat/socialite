import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../utils/LoadingSpinner";

function Settings() {
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(false)
  const handleLogout = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post("/api/v1/users/logout");
      if(response.statusText == "OK"){
        navigate( "/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  if(isLoading){
    return <LoadingSpinner/>
  }
  return (
    <div className="p-2">
      <ul className="text-large">
        <li className="pb-2 border-b border-gray-500">
          <button>Edit Information</button>
        </li>

        <li className="pb-2 border-b border-gray-500">
          <button>change profile</button>
        </li>

        <li className="pb-2 border-b border-gray-500">
          <button>Change Password</button>
        </li>

        <li onClick={handleLogout}>
          <button>logout</button>
        </li>
      </ul>
    </div>
  );
}
export default Settings;
