import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Globe, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="glass rounded-2xl flex items-center justify-between h-16 px-6">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gradient-primary">
                VoteWise
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-slate-600 hover:text-saffron-600 dark:text-slate-300 dark:hover:text-saffron-400 font-medium transition-colors">Home</Link>
            <Link to="/timeline" className="text-slate-600 hover:text-saffron-600 dark:text-slate-300 dark:hover:text-saffron-400 font-medium transition-colors">Timeline</Link>
            <Link to="/quiz" className="text-slate-600 hover:text-saffron-600 dark:text-slate-300 dark:hover:text-saffron-400 font-medium transition-colors">Quiz</Link>
            <Link to="/chat" className="text-slate-600 hover:text-saffron-600 dark:text-slate-300 dark:hover:text-saffron-400 font-medium transition-colors">AI Chat</Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors" aria-label="Toggle language">
              <Globe className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors" aria-label="Toggle theme">
              <Sun className="w-5 h-5" />
            </button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
