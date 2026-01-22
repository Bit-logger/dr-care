import React, { useState } from 'react';
// FIX: Added 'AlertTriangle' to the imports below
import { X, ArrowLeft, ChevronRight, BookOpen, AlertTriangle } from 'lucide-react';
import { firstAidData } from '../firstAidData'; 

export default function FirstAidModal({ onClose }) {
  const [activeGuide, setActiveGuide] = useState(null);

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-2xl h-[600px] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* --- HEADER --- */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          {activeGuide ? (
            <button 
              onClick={() => setActiveGuide(null)} 
              className="flex items-center text-slate-500 hover:text-teal-600 font-medium transition"
            >
              <ArrowLeft className="w-5 h-5 mr-1" /> Back
            </button>
          ) : (
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="text-red-500" /> First Aid Guide
            </h2>
          )}
          
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          
          {/* VIEW 1: LIST OF EMERGENCIES */}
          {!activeGuide && (
            <div className="grid gap-4">
              <p className="text-slate-500 mb-2">Select an emergency to see step-by-step instructions.</p>
              {firstAidData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveGuide(item)}
                  className={`flex items-center p-4 rounded-xl border-2 transition-all hover:shadow-md text-left ${item.color} border-transparent hover:border-teal-500/30 group`}
                >
                  <div className="bg-white p-3 rounded-full shadow-sm mr-4 group-hover:scale-110 transition">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-lg">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-teal-500" />
                </button>
              ))}
            </div>
          )}

          {/* VIEW 2: STEP-BY-STEP GUIDE */}
          {activeGuide && (
            <div className="animate-slide-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  {React.cloneElement(activeGuide.icon, { className: "w-10 h-10" })}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{activeGuide.title}</h2>
                  <p className="text-slate-500">Follow these steps carefully.</p>
                </div>
              </div>

              <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:h-full before:w-0.5 before:bg-slate-200">
                {activeGuide.steps.map((step, idx) => (
                  <div key={idx} className="relative flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold z-10 shadow-lg border-4 border-white">
                      {idx + 1}
                    </div>
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex-1">
                      <h4 className="font-bold text-slate-800 text-lg mb-1">{step.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-start gap-3">
                {/* This AlertTriangle was causing the error before */}
                <AlertTriangle className="flex-shrink-0" />
                <p className="text-sm font-medium">Disclaimer: This is an AI guide. Always call professional emergency services (911/108) for critical situations.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}