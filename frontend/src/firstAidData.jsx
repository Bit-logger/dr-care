import React from 'react';
import { HeartPulse, Flame, Zap, Droplet, Activity, AlertTriangle } from 'lucide-react';

export const firstAidData = [
  {
    id: 'cpr',
    title: 'CPR & Cardiac Arrest',
    desc: 'For unresponsive adults not breathing.',
    icon: <HeartPulse className="w-6 h-6 text-red-500" />,
    color: 'bg-red-50 border-red-200',
    steps: [
      { title: 'Check Safety', text: 'Ensure the scene is safe for you and the victim.' },
      { title: 'Check Responsiveness', text: 'Tap shoulders and shout "Are you okay?". Check for breathing.' },
      { title: 'Call Emergency', text: 'Call 911 (or 108) immediately. Ask for an AED.' },
      { title: 'Start Compressions', text: 'Push hard and fast in the center of the chest. 100-120 beats per minute.' },
      { title: 'Rescue Breaths', text: 'If trained: 30 compressions then 2 breaths. If not, continue compressions only.' }
    ]
  },
  {
    id: 'burns',
    title: 'Severe Burns',
    desc: 'Fire, chemical, or electrical burns.',
    icon: <Flame className="w-6 h-6 text-orange-500" />,
    color: 'bg-orange-50 border-orange-200',
    steps: [
      { title: 'Cool the Burn', text: 'Run cool (not cold) tap water over the burn for 10-20 minutes.' },
      { title: 'Remove Items', text: 'Remove tight items (rings, watches) from the area before swelling starts.' },
      { title: 'Do Not Break Blisters', text: 'Leave blisters intact to prevent infection.' },
      { title: 'Cover Loosely', text: 'Cover with sterile gauze or a clean cloth. Do not use cotton.' }
    ]
  },
  {
    id: 'bleeding',
    title: 'Heavy Bleeding',
    desc: 'Deep cuts and wounds.',
    icon: <Droplet className="w-6 h-6 text-rose-600" />,
    color: 'bg-rose-50 border-rose-200',
    steps: [
      { title: 'Apply Pressure', text: 'Cover wound with clean cloth and apply direct pressure.' },
      { title: 'Elevate', text: 'Raise the injured part above the heart if possible.' },
      { title: 'Add More Layers', text: 'If blood soaks through, do not remove the cloth. Add another on top.' },
      { title: 'Bandage', text: 'Secure the cloth with a bandage once bleeding slows.' }
    ]
  },
  {
    id: 'choking',
    title: 'Choking',
    desc: 'Airway blockage.',
    icon: <Activity className="w-6 h-6 text-blue-500" />,
    color: 'bg-blue-50 border-blue-200',
    steps: [
      { title: 'Encourage Coughing', text: 'If they can cough, let them cough it out.' },
      { title: 'Back Blows', text: 'Lean them forward. Give 5 sharp blows between shoulder blades.' },
      { title: 'Heimlich Maneuver', text: 'Stand behind. Wrap arms around waist. Pull inward and upward 5 times.' }
    ]
  },
  {
    id: 'shock',
    title: 'Shock',
    desc: 'After severe injury or allergy.',
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    color: 'bg-yellow-50 border-yellow-200',
    steps: [
      { title: 'Lay Down', text: 'Lay person flat on back. Elevate feet 12 inches.' },
      { title: 'Keep Warm', text: 'Cover with a coat or blanket.' },
      { title: 'No Food/Drink', text: 'Do not give anything to eat or drink.' }
    ]
  }
];