import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MessageSquare, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/ui/FeatureCard';

export default function Home() {
  return (
    <div className="min-h-screen pt-10">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-saffron-100 dark:bg-saffron-600/20 text-saffron-600 dark:text-saffron-400 text-sm font-semibold mb-6">
              Empowering Indian Voters
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8">
              Your Complete Guide to <br className="hidden md:block" />
              <span className="text-gradient-primary">Indian Elections</span>
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-slate-600 dark:text-slate-300 mx-auto mb-10">
              Understand the democratic process through our interactive timeline, test your knowledge with civic quizzes, and get neutral answers from our AI assistant.
            </p>
            <div className="flex justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/timeline"
                  className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-saffron-500 to-orange-500 text-white font-bold text-lg shadow-lg hover:shadow-orange-500/30 transition-all cursor-pointer"
                >
                  Explore Timeline
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/chat"
                  className="inline-block px-8 py-4 rounded-xl glass font-bold text-lg text-slate-800 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer"
                >
                  Ask AI Assistant
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Everything you need to be an informed voter</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Interactive Timeline" 
              description="Visualize the entire election lifecycle from official notification, model code of conduct, polling phases, to the final results day."
              icon={CalendarDays}
              colorClass="text-saffron-500"
              delay={0.1}
            />
            <FeatureCard 
              title="Neutral AI Assistant" 
              description="Ask questions about voting procedures, candidate eligibility, or EVM machines and get unbiased, factual answers in English or Hindi."
              icon={MessageSquare}
              colorClass="text-india-green-500"
              delay={0.2}
            />
            <FeatureCard 
              title="Civic Knowledge Quiz" 
              description="Test your understanding of the Indian Constitution and electoral rules with our gamified learning module."
              icon={BrainCircuit}
              colorClass="text-blue-500"
              delay={0.3}
            />
          </div>
        </div>

      </main>
    </div>
  );
}
