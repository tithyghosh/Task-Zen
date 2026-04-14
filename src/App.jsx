import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import HeroSection from './Components/HeroSection'
import TaskBoard from './Components/TaskBoard'

const App = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="flex flex-col justify-center items-center overflow-hidden">
        <HeroSection />
        <TaskBoard />
      </main>
      <Footer />
    </div>
  );
}

export default App
