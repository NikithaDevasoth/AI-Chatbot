
import { Route, Routes } from 'react-router'
import SideBar from './components/SideBar'
import { ChatBot } from './components/ChatBot'
import Credit from './pages/Credit'
import Community from './pages/Community'


const App = () => {
  return (
    <>
    <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
    <div className='flex h-screen w-screen'>
  <SideBar/>
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