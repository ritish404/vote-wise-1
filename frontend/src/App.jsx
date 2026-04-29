import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import Chat from './pages/Chat'
import Quiz from './pages/Quiz'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-brand-light dark:bg-brand-dark text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/quiz" element={<Quiz />} />
            {/* Future routes will go here */}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
