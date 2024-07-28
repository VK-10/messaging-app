import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const chat = () => {

  const {userInfo} = useAppStore();
  const navigate = useNavigate();

  useEffect(() =>{
    if(!userInfo.profileSetup) {
      toast("Please setup your profile", {type: "error"});
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  
  return (
    <div>
      chat
      
    </div>
  )
}

export default chat;
