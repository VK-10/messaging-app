import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import Auth from "./pages/auth";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";
import { useAppStore } from "./store";

const PrivateRoute = ({children}) => {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({children}) => {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ?  <Navigate to="/chat" /> : children;
};

const App = () => {
  const {userInfo, setUserInfo} = useAppStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserData = async () => {
      try{
        const response = await apiClient.get(GET_USER_INFO,{withCredentials: true});
        if(response.status == 200 && response.data.id){
          setUserInfo(response.data);
          
        }else {
          setUserInfo(undefined);
        }
      }catch(error){
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };
    if(!userInfo){
      getUserData();
    }else{
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/chat" element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
            
            } />
          <Route path="/profile" element={
            <PrivateRoute>
                <Profile />
            </PrivateRoute>
            
            } />
          <Route path="/auth" element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
           
            } />
          <Route path ="*" element = {<Navigate to={"/auth"} />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;