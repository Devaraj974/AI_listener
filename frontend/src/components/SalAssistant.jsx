import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { extrasAPI } from '../services/api';

export default function SalAssistant() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: '1', text: "Hi, this is SAL! I'm here to help you navigate AI Listener. Ask me anything about the platform!", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages((prev) => [...prev, { id: Date.now().toString(), text, isBot: false }]);
    setTyping(true);

    try {
      const res = await extrasAPI.salChat(text);
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), text: res.data.response, isBot: true }]);
        setTyping(false);
      }, 600);
    } catch {
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), text: "Sorry, I'm having trouble right now. Please try again!", isBot: true }]);
      setTyping(false);
    }
  };

  const quickQuestions = [
    'How do I use this?',
    'Voice features',
    'Mood tracking',
    'Emergency help',
  ];

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-calm-500 text-white border-none cursor-pointer shadow-lg shadow-primary-500/30 flex items-center justify-center"
            title="Hi, this is SAL. I'm here to help."
          >
            <FiMessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed bottom-6 right-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
              isDark ? 'bg-surface-card border border-white/10' : 'bg-white border border-gray-200'
            }`}
            style={{ maxHeight: '500px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary-500 to-calm-500 text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  S
                </div>
                <div>
                  <p className="font-semibold text-sm">SAL</p>
                  <p className="text-xs opacity-80">Your platform guide</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="bg-transparent border-none cursor-pointer text-white/80 hover:text-white p-1">
                <FiX size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5" style={{ minHeight: '250px', maxHeight: '340px' }}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`px-3 py-2 rounded-xl text-xs leading-relaxed max-w-[85%] whitespace-pre-wrap ${
                      m.isBot
                        ? isDark ? 'bg-surface-hover text-text-dark' : 'bg-gray-100 text-gray-800'
                        : 'bg-gradient-to-r from-primary-500 to-calm-500 text-white'
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className={`px-3 py-2 rounded-xl ${isDark ? 'bg-surface-hover' : 'bg-gray-100'}`}>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick questions */}
            {messages.length <= 2 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); }}
                    className={`px-2.5 py-1 rounded-full text-xs border-none cursor-pointer transition-all ${
                      isDark ? 'bg-primary-500/15 text-primary-300 hover:bg-primary-500/25' : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className={`flex items-center gap-2 p-3 border-t ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask SAL anything..."
                className="flex-1 px-3 py-2 rounded-lg text-xs"
              />
              <button
                onClick={send}
                className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-calm-500 text-white border-none cursor-pointer flex items-center justify-center hover:shadow-lg transition-all"
              >
                <FiSend size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
