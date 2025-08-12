import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux'
import Detail from './pages/Detail';
import { Outlet } from 'react-router';


function App() {

  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.className = mode; // tailwind: class="dark"
  }, [mode]);

  return (
    <div className='flex flex-col'>
      <header className='z-50'>
        <Navbar />
      </header>

      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
