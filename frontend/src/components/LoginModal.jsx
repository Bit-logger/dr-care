import React, { useState } from 'react';
import { User, ArrowRight, Activity, Scale, Ruler, Droplet } from 'lucide-react';

export default function LoginModal({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    bloodGroup: 'O+'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onLogin(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 z-[300] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg p-8 rounded-3xl shadow-2xl relative overflow-hidden animate-fade-in">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-blue-500"></div>
        
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-teal-100">
            <Activity className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Patient Entry</h1>
          <p className="text-slate-500 text-sm">Please provide details for accurate diagnosis.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Age Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input name="name" type="text" onChange={handleChange} className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-sm font-medium" placeholder="Ex. Rahul" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
              <input name="age" type="number" onChange={handleChange} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-sm font-medium" placeholder="25" required />
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Weight (kg)</label>
              <div className="relative">
                <Scale className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input name="weight" type="number" onChange={handleChange} className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm" placeholder="70" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Height (cm)</label>
              <div className="relative">
                <Ruler className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input name="height" type="number" onChange={handleChange} className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm" placeholder="175" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
              <div className="relative">
                <Droplet className="absolute left-3 top-3 w-4 h-4 text-red-400" />
                <select name="bloodGroup" onChange={handleChange} className="w-full pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm appearance-none">
                  <option>O+</option><option>O-</option>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>AB+</option><option>AB-</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-teal-600 transition flex items-center justify-center gap-2 mt-2 shadow-lg">
            Start Session <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}