import React from 'react'
import { Route, Routes } from 'react-router'
import SideBar from './components/SideBar'
import { ChatBot } from './components/ChatBot'


const App = () => {
  return (
    <>
  <SideBar/>
    <Routes>
      <Route path='/' element={<ChatBot/>}/>
    </Routes>
    
    
    </>
  )
}

export default App