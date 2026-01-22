import { useState, useEffect, useRef } from 'react';

export const useVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Stop after one sentence
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognitionRef.current = recognition;
    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }
  }, []);

  const listen = (onResult) => {
    if (!recognitionRef.current) {
      alert("Voice recognition is not supported in this browser. Try Chrome or Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      setIsListening(true);
      recognitionRef.current.start();
    } catch (error) {
      console.error("Mic start error:", error);
      setIsListening(false);
    }

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      onResult(transcript);
    };

    // --- IMPROVED ERROR HANDLING ---
    recognitionRef.current.onerror = (event) => {
      console.error("Speech error:", event.error);
      setIsListening(false);

      if (event.error === 'network') {
        alert("Network Error: Voice recognition requires an active internet connection. Please check your WiFi or try a different network.");
      } else if (event.error === 'not-allowed') {
        alert("Microphone Blocked: Please allow microphone access in your browser settings.");
      } else if (event.error === 'no-speech') {
        // User didn't say anything, just ignore
      } else {
        alert(`Voice Error: ${event.error}`);
      }
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  };

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    
    // Try to find a pleasant female voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Microsoft Zira'));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error("Speak error:", e);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return { isListening, isSpeaking, listen, speak, stopSpeaking };
};