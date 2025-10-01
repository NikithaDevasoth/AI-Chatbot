
import { Route, Routes, useLocation } from 'react-router'
import SideBar from './components/SideBar'
import { ChatBot } from './components/ChatBot'
import Community from './pages/Community'
import { useState } from 'react'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './pages/Loading'
import Credits from './pages/Credits'
import {Toaster} from 'react-hot-toast'

import { useAppContext } from './context/AppContext'
import Login from './pages/Login'


const App = () => {

  const {user,loadingUser}=useAppContext()
  const [isMenuOpen,setIsMenuOpen]=useState(false)
  const {pathname}=useLocation()
  if(pathname==='/loading'||loadingUser) return <Loading/>
  return (
    <>  
    <Toaster position='top-right'/>

    {!isMenuOpen&&<img src={assets.menu_icon} className='absolute top-3 left-3w-8 h-8 cursor-pointer md:hidden
    not-dark:invert' onClick={()=>setIsMenuOpen(true)} />}
    {user?(
       <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
    <div className='flex h-screen w-screen'>
  <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
    <Routes>
      <Route path='/' element={<ChatBot/>}/>
     <Route path='/credits' element={<Credits/>}/>
     <Route path='/community' element={<Community/>}/>
    </Routes>
    
    </div>
    </div>
    ):(
      <div className='bg-gradient-to-b from-[#242124] to-[#000000] flex *:items-center
      justify-center h-screen w-screen'>
        <Login/>
      </div>
    )}
    
    </>
  )
}

export default App