import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ title, description, icon: Icon, delay = 0, colorClass = "text-saffron-500" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl p-8 flex flex-col items-start transition-all hover:shadow-2xl"
    >
      <div className={`p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md ${colorClass} mb-6`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        {description}
      </p>
      <button className="mt-6 font-medium text-india-green-600 dark:text-india-green-500 hover:underline flex items-center gap-1">
        Learn more →
      </button>
    </motion.div>
  );
}
