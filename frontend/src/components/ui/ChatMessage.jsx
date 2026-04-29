import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

export default function ChatMessage({ message, isAi }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex w-full mb-6 ${isAi ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          {isAi ? (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-india-green-500 to-emerald-600 flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shadow-sm">
              <User className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </div>
          )}
        </div>

        {/* Message Bubble */}
        <div 
          className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed
            ${isAi 
              ? 'glass rounded-tl-sm text-slate-800 dark:text-slate-200 border-l-4 border-l-india-green-500' 
              : 'bg-saffron-500 text-white rounded-tr-sm'
            }`}
        >
          {message}
        </div>
      </div>
    </motion.div>
  );
}
