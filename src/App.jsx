import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import HeroSection from './Components/HeroSection'
import TaskBoard from './Components/TaskBoard'

const App = () => {
  return (
    <>
     <Header/>
     <div className='flex flex-col justify-center items-center'>
      <HeroSection/>
     <TaskBoard/>
     </div>
     <Footer/>
    </>
  )
}

export default App
