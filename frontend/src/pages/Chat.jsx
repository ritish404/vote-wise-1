import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, ShieldQuestion } from 'lucide-react';
import ChatMessage from '../components/ui/ChatMessage';

export default function Chat() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! I am your VoteWise AI Assistant. I can help you understand the Indian election process, voter eligibility, and polling procedures. How can I assist you today?",
      isAi: true
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newUserMsg = { id: Date.now(), text: input, isAi: false };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newUserMsg.text })
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { id: Date.now(), text: data.response, isAi: true }]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: "Error: Could not reach the backend server. Please make sure the Spring Boot server is running on port 8080.", 
        isAi: true 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto w-full pt-6 px-4">
      
      {/* Header Info */}
      <div className="flex flex-col items-center mb-6 text-center">
        <div className="bg-india-green-500/10 p-3 rounded-full mb-3">
          <Bot className="w-8 h-8 text-india-green-600 dark:text-india-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">VoteWise Assistant</h1>
        <p className="text-sm text-slate-500 flex items-center justify-center gap-1 mt-1">
          <ShieldQuestion className="w-4 h-4" />
          Ask neutral, factual questions about elections
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass rounded-3xl overflow-hidden flex flex-col shadow-lg mb-8 border border-white/40 dark:border-slate-700/50">
        
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg.text} isAi={msg.isAi} />
          ))}
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex w-full mb-4 justify-start"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-india-green-500 to-emerald-600 flex items-center justify-center shadow-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="glass px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about voter IDs, polling stations, rules..."
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-india-green-500 shadow-inner"
              disabled={isTyping}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2 bg-india-green-500 text-white rounded-full hover:bg-india-green-600 disabled:opacity-50 disabled:hover:bg-india-green-500 transition-colors shadow-sm"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </form>
          <div className="text-center mt-2">
             <span className="text-xs text-slate-400">AI can make mistakes. Verify important information with ECI guidelines.</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}
