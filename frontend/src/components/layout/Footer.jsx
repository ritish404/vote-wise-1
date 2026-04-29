import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 mt-20">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex justify-center space-x-6 md:order-2 text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 text-sm">
              Built with <Heart className="w-4 h-4 text-saffron-500" /> for Indian Civic Education
            </span>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} VoteWise Assistant. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
