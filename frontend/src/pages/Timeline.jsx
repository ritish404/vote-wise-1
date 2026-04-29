import React from 'react';
import { motion } from 'framer-motion';
import { 
  BellRing, 
  FileSignature, 
  CheckSquare, 
  UserMinus, 
  Megaphone, 
  Vote, 
  Trophy 
} from 'lucide-react';

const timelineStages = [
  {
    id: 1,
    title: "Election Notification",
    description: "The Election Commission of India (ECI) formally announces the election schedule. The Model Code of Conduct (MCC) comes into effect immediately, ensuring a level playing field.",
    icon: BellRing,
    color: "bg-saffron-500",
    dateStr: "Day 1"
  },
  {
    id: 2,
    title: "Filing Nominations",
    description: "Candidates submit their nomination papers along with an affidavit detailing their criminal antecedents, assets, liabilities, and educational qualifications.",
    icon: FileSignature,
    color: "bg-blue-500",
    dateStr: "Days 2-8"
  },
  {
    id: 3,
    title: "Scrutiny of Nominations",
    description: "Returning Officers strictly examine the submitted nomination papers and affidavits. Invalid or incomplete nominations are rejected.",
    icon: CheckSquare,
    color: "bg-purple-500",
    dateStr: "Day 9"
  },
  {
    id: 4,
    title: "Withdrawal of Candidature",
    description: "Candidates are given a final window (usually 2 days) to withdraw their names if they decide not to contest the election.",
    icon: UserMinus,
    color: "bg-slate-500",
    dateStr: "Days 10-11"
  },
  {
    id: 5,
    title: "Campaigning",
    description: "Political parties and candidates hold rallies, roadshows, and public meetings. All campaigning must end exactly 48 hours before polling begins.",
    icon: Megaphone,
    color: "bg-orange-500",
    dateStr: "Days 12-25"
  },
  {
    id: 6,
    title: "Polling Day",
    description: "Citizens cast their votes using Electronic Voting Machines (EVMs) equipped with Voter Verifiable Paper Audit Trails (VVPAT) for transparency.",
    icon: Vote,
    color: "bg-india-green-500",
    dateStr: "Day 27"
  },
  {
    id: 7,
    title: "Counting & Results",
    description: "Votes are counted under strict security and CCTV surveillance. The candidate with the highest number of valid votes in a constituency is declared the winner.",
    icon: Trophy,
    color: "bg-yellow-500",
    dateStr: "Day 30+"
  }
];

export default function Timeline() {
  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4"
          >
            The <span className="text-gradient-primary">Election Timeline</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Follow the democratic journey from the first official announcement to the final declaration of results.
          </motion.p>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-700 transform md:-translate-x-1/2 rounded-full"></div>

          <div className="space-y-12">
            {timelineStages.map((stage, index) => {
              const isEven = index % 2 === 0;
              const Icon = stage.icon;
              
              return (
                <div key={stage.id} className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-4 border-white dark:border-brand-dark transform -translate-x-1/2 flex items-center justify-center bg-slate-100 dark:bg-slate-800 z-10 shadow-md">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                  </div>

                  {/* Content Box */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    className={`w-full md:w-1/2 pl-12 pr-4 md:px-12 ${isEven ? 'md:text-left' : 'md:text-right'}`}
                  >
                    <div className="glass p-6 rounded-2xl hover:shadow-xl transition-shadow border-t-4" style={{ borderTopColor: 'var(--color-saffron-500)' }}>
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? 'justify-start' : 'md:justify-end justify-start'}`}>
                        <div className={`p-3 rounded-lg ${stage.color} text-white shadow-md flex-shrink-0`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-500 dark:text-slate-400 block mb-1">Step {stage.id} • {stage.dateStr}</span>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{stage.title}</h3>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-left md:text-justify">
                        {stage.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </div>
  );
}
