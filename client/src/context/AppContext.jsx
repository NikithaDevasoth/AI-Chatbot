import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AppContext=createContext();
export const AppContextProvider=({children})=>{
    const navigate=useNavigate();
    const [user,setUser]=useState(null)
    const [chats,setChats]=useState([])
    const [selectChat,setSelectedChat]=useState(null)
    const [theme,setTheme]=useState(localStorage.getItem('theme')||'light')
    const fetchUser=async()=>{
        setUser(dummyUserData)
    }
    const fetchUsersChat=async ()=>{
        setChats(dummyChats)
        setSelectedChat(dummyChats[0])
    }
    useEffect(()=>{if(user){
        fetchUsersChat()
    }
else{
    setChats([])
    setSelectedChat(null)
}},[user])
useEffect(()=>{
    if(theme==='dark'){
        document.documentElement.classList.add('dark');

    }
    else{
        document.documentElement.classList.remove('dark')
    }
},[theme])
    useEffect(()=>{
        fetchUser()

    },[])
    const value={
        navigate,user,setUser,fetchUser,chats,setChats,selectChat,setSelectedChat,theme
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext=()=>useContext(AppContext)