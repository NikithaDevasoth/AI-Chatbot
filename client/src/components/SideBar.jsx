import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'

const SideBar = () => {
  const{chats,setSelectedChat,tehme,setTheme,user}=useAppContext()
  const[search,setSearch]=useState('')
  return (
    <div>SideBar</div>
  )
}

export default SideBar