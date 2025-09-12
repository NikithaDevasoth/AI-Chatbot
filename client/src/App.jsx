
import { Route, Routes } from 'react-router'
import SideBar from './components/SideBar'
import { ChatBot } from './components/ChatBot'
import Credit from './pages/Credit'
import Community from './pages/Community'
import { useState } from 'react'
import { assets } from './assets/assets'


const App = () => {
  const [isMenuOpen,setIsMenuOpen]=useState(false)
  return (
    <>
    {!isMenuOpen&&<img src={assets.menu_icon} className='absolute top-3 left-3w-8 h-8 cursor-pointer md:hidden
    not-dark:invert' onClick={()=>setIsMenuOpen(true)} />}
    <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
    <div className='flex h-screen w-screen'>
  <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
    <Routes>
      <Route path='/' element={<ChatBot/>}/>
     <Route path='/credits' element={<Credit/>}/>
     <Route path='/community' element={<Community/>}/>
    </Routes>
    
    </div>
    </div>
    </>
  )
}

export default App