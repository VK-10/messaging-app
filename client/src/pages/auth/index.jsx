import React from 'react'
// import background from "/login2.png"
import victory from "@/assets/victory.svg"
import {Tabs} from "@/components/ui/tabs.jsx"
import { TabsContent, TabsTrigger , TabsList} from "@/components/ui/tabs.jsx"
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import { apiClient }  from "@/lib/api-client"
import { LOGIN_ROUTES, SIGNUP_ROUTES } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'


const Auth = () => {
  const navigate = useNavigate()
  const { setUserInfo } = useAppStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const validateLogin = () => {
    if(!email.length) {
      toast.error("Email is reqired")
      return false;
    }
    if(!password.length){
      toast.error("Password is required")
      return false;
    }
    
    return true;
  }

  const validateSignUp = () => {
    if(!email.length) {
      toast.error("Email is reqired")
      return false;
    }
    if(!password.length){
      toast.error("Password is required")
      return false;
    }
    if(password !== confirmPassword ){
      toast.error("Password and confirm Password should be same")
    }
    return true;
  }
  const handlelogin = async() => {
    if(validateLogin()){
      const response = await apiClient.post(LOGIN_ROUTES,{email,password},{withCredentials: true});
      if(response.data.user.id){
        setUserInfo(response.data.user)
        if(response.data.user.profileSetup) navigate("/chat");
        else navigate("/profile");
      }
      console.log({response});
    }
  };
  const handleSignUp = async() => {
    if(validateSignUp()){
      try{
        const response  = await apiClient.post(SIGNUP_ROUTES, {email, password},{withCredentials: true});
        if(response.status === 201){
          setUserInfo(response.data.user);
          navigate("/profile");
        }
      console.log(response);
      } catch(error){
        console.log(error);
      }
    }
  };



  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center' >
        <div className='h-[100vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>
          <div className='flex flex-col gap-10 items-center justify-center'>
            <div className='flex items-center justify-center flex-col'>
              <div className='flex items-center justify-center'>
                <h1 className='text-5xl font-bold md:text-6xl text-gray-800'>Welcome Back</h1>
                  <img src = {victory} alt='victory emoji' className='h-[100px]'/>

              </div>
              <p className='font-medium text-center'>Fill in the details to get started</p>

            </div>

            <div className='flex items-center justify-center w-full'>
              <Tabs className ="w-3/4"  defaultValue='login'>
                  <TabsList className ="bg-transparent rounded-none w-full">
                    <TabsTrigger value ="login"
                    className='data-[state=active]: bg-transparent text-black
                     text-opacity-90  border-b-2 rounded-none w-full data-[state=active]: data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all'>Login</TabsTrigger>
                    <TabsTrigger value = "Signup"
                    className='data-[state=active]: bg-transparent text-black
                    text-opacity-90  border-b-2 rounded-none w-full data-[state=active]: data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all'>Signup</TabsTrigger>
                  </TabsList>
                  <TabsContent className='flex flex-col gap-5 mt-10' value='login'>
                    <Input placeholder='Email' type='email' className= "rounded-full p-6" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder='Password' type='password' className= "rounded-full p-6" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button className="rounded-full p-6" onClick={handlelogin}>Login</Button>
                  </TabsContent>
                  <TabsContent className='flex flex-col gap-5' value='Signup'> 
                  <Input placeholder='Email' type='email' className= "rounded-full p-6" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Input placeholder='Password' type='password' className= "rounded-full p-6" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <Input placeholder='Confirm Password' type='password' className= "rounded-full p-6" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  <Button className="rounded-full p-6" onClick={handleSignUp}>SignUp</Button>

                  </TabsContent>
              </Tabs>

            </div>

          </div>
          <div className="hidden xl :flex justify-center items-center"> img</div>
        </div>
    </div>
  )
}

export default Auth
