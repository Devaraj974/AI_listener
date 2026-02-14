import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  FiHeart, FiMic, FiUsers, FiShield, FiSun, FiMoon,
  FiMessageCircle, FiActivity, FiHeadphones
} from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
};

const features = [
  { icon: <FiHeart size={28} />, title: 'Empathetic AI', desc: 'Receive responses that truly understand how you feel' },
  { icon: <FiMic size={28} />, title: 'Voice Support', desc: 'Speak your feelings and hear calming AI responses' },
  { icon: <FiUsers size={28} />, title: 'Real Connections', desc: 'Match with people who understand your emotions' },
  { icon: <FiActivity size={28} />, title: 'Mood Tracking', desc: 'Visualize your emotional journey over time' },
  { icon: <FiShield size={28} />, title: 'Safe Space', desc: 'A judgment-free zone for emotional expression' },
  { icon: <FiHeadphones size={28} />, title: 'Always Listening', desc: 'Available 24/7 whenever you need support' },
];

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full glass cursor-pointer transition-transform hover:scale-110"
        aria-label="Toggle theme"
      >
        {isDark ? <FiSun size={20} className="text-yellow-300" /> : <FiMoon size={20} className="text-primary-700" />}
      </button>

      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'linear-gradient(135deg, #5c7cfa, #845ef7)', top: '-10%', left: '-5%' }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'linear-gradient(135deg, #3bc9db, #5c7cfa)', bottom: '10%', right: '-5%' }}
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: 'linear-gradient(135deg, #b197fc, #ff8787)', top: '40%', left: '30%' }}
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className="relative z-10 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-calm-400 flex items-center justify-center">
            <FiHeart className="text-white" size={20} />
          </div>
          <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-primary-800'}`}>
            AI Listener
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className={`px-5 py-2 rounded-xl font-medium transition-all no-underline ${
              isDark ? 'text-primary-300 hover:text-white' : 'text-primary-600 hover:text-primary-800'
            }`}
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2.5 rounded-xl font-medium bg-gradient-to-r from-primary-500 to-calm-500 text-white no-underline hover:shadow-lg hover:shadow-primary-500/25 transition-all hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-16 pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-6"
          >
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
              isDark ? 'bg-primary-500/10 text-primary-300 border border-primary-500/20' : 'bg-primary-50 text-primary-600 border border-primary-200'
            }`}>
              <FiMessageCircle size={14} />
              Your safe space to be heard
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className={`text-5xl md:text-7xl font-bold leading-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            You deserve to be{' '}
            <span className="bg-gradient-to-r from-primary-400 via-calm-400 to-accent-400 bg-clip-text text-transparent gradient-animate">
              listened to
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-text-muted' : 'text-gray-500'}`}
          >
            AI Listener is a calming digital space where you can express your emotions freely,
            receive empathetic AI support, and connect with others who truly understand.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-2xl font-semibold text-lg bg-gradient-to-r from-primary-500 to-calm-500 text-white no-underline hover:shadow-xl hover:shadow-primary-500/30 transition-all hover:scale-105 animate-pulse-glow"
            >
              Start Your Journey
            </Link>
            <Link
              to="/login"
              className={`px-8 py-3.5 rounded-2xl font-semibold text-lg glass no-underline transition-all hover:scale-105 ${
                isDark ? 'text-white' : 'text-primary-700'
              }`}
            >
              I have an account
            </Link>
          </motion.div>
        </div>

        {/* Floating emotion badges */}
        <div className="relative mt-20 flex justify-center">
          {['😌 Calm', '💙 Supported', '🌱 Growing', '✨ Hopeful', '🤝 Connected'].map((label, i) => (
            <motion.div
              key={label}
              className={`absolute px-4 py-2 rounded-full glass text-sm font-medium ${isDark ? 'text-text-dark' : 'text-gray-700'}`}
              style={{
                left: `${15 + i * 17}%`,
                top: `${i % 2 === 0 ? 0 : 30}px`,
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
            >
              {label}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Everything you need to feel better
          </h2>
          <p className={`text-lg ${isDark ? 'text-text-muted' : 'text-gray-500'}`}>
            A comprehensive emotional support platform built with care
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`p-6 rounded-2xl glass cursor-default transition-all ${
                isDark ? 'hover:bg-surface-hover' : 'hover:bg-white hover:shadow-lg'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-calm-500/20 flex items-center justify-center text-primary-400 mb-4">
                {f.icon}
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{f.title}</h3>
              <p className={isDark ? 'text-text-muted' : 'text-gray-500'}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 py-24">
        <motion.div
          className="text-center p-12 rounded-3xl glass"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ready to start healing?
          </h2>
          <p className={`text-lg mb-8 ${isDark ? 'text-text-muted' : 'text-gray-500'}`}>
            Join thousands who have found comfort and connection through AI Listener.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-3.5 rounded-2xl font-semibold text-lg bg-gradient-to-r from-primary-500 to-calm-500 text-white no-underline hover:shadow-xl hover:shadow-primary-500/30 transition-all hover:scale-105"
          >
            Create Free Account
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 text-center py-8 text-sm ${isDark ? 'text-text-muted' : 'text-gray-400'}`}>
        <p>&copy; 2024 AI Listener. Built with empathy and care.</p>
        <p className="mt-1">If you are in crisis, please contact emergency services or a crisis helpline.</p>
      </footer>
    </div>
  );
}
