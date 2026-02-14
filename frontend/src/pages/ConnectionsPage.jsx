import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiArrowLeft, FiUserPlus, FiCheck, FiMessageCircle, FiSend, FiUsers
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { connectAPI } from '../services/api';

const MOOD_EMOJI = {
  happy: '😊', sad: '😢', anxious: '😰', angry: '😠',
  confused: '😕', tired: '😴', grateful: '🙏', neutral: '😐',
};

export default function ConnectionsPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [tab, setTab] = useState('discover');
  const [users, setUsers] = useState([]);
  const [connections, setConnections] = useState([]);
  const [pending, setPending] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState('');
  const [moodFilter, setMoodFilter] = useState('');

  useEffect(() => {
    if (tab === 'discover') loadDiscover();
    else if (tab === 'connections') loadConnections();
    else if (tab === 'pending') loadPending();
  }, [tab, moodFilter]);

  const loadDiscover = async () => {
    try {
      const res = await connectAPI.discover(moodFilter || undefined);
      setUsers(res.data);
    } catch {}
  };

  const loadConnections = async () => {
    try {
      const res = await connectAPI.myConnections();
      setConnections(res.data);
    } catch {}
  };

  const loadPending = async () => {
    try {
      const res = await connectAPI.pending();
      setPending(res.data);
    } catch {}
  };

  const sendRequest = async (userId) => {
    try {
      await connectAPI.request(userId);
      setUsers(users.map((u) => u.id === userId ? { ...u, requested: true } : u));
    } catch {}
  };

  const acceptRequest = async (connId) => {
    try {
      await connectAPI.accept(connId);
      loadPending();
    } catch {}
  };

  const openChat = async (u) => {
    setSelectedUser(u);
    try {
      const res = await connectAPI.getMessages(u.id);
      setMessages(res.data);
    } catch {}
  };

  const sendMsg = async () => {
    if (!msgInput.trim() || !selectedUser) return;
    try {
      const res = await connectAPI.sendMessage({ receiver_id: selectedUser.id, content: msgInput, message_type: 'text' });
      setMessages([...messages, res.data]);
      setMsgInput('');
    } catch {}
  };

  const tabClass = (t) => `px-4 py-2 rounded-xl text-sm font-medium cursor-pointer border-none transition-all ${
    tab === t
      ? 'bg-gradient-to-r from-primary-500 to-calm-500 text-white'
      : isDark ? 'bg-surface-hover text-text-muted hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'
  }`;

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/dashboard" className={`p-2 rounded-xl glass no-underline hover:scale-105 transition-all ${isDark ? 'text-text-muted' : 'text-gray-500'}`}>
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Connections</h1>
            <p className={`text-sm ${isDark ? 'text-text-muted' : 'text-gray-500'}`}>Find people who understand what you're going through</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('discover')} className={tabClass('discover')}>Discover</button>
          <button onClick={() => setTab('connections')} className={tabClass('connections')}>My Connections</button>
          <button onClick={() => setTab('pending')} className={tabClass('pending')}>
            Pending {pending.length > 0 && `(${pending.length})`}
          </button>
        </div>

        {/* Direct message panel */}
        <AnimatePresence>
          {selectedUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass rounded-2xl p-4 mb-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-calm-400 flex items-center justify-center text-white text-xs font-bold">
                    {selectedUser.display_name?.[0] || selectedUser.username[0]}
                  </div>
                  <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedUser.display_name || selectedUser.username}
                  </span>
                </div>
                <button onClick={() => setSelectedUser(null)} className="text-xs text-text-muted bg-transparent border-none cursor-pointer">Close</button>
              </div>

              <div className={`max-h-60 overflow-y-auto space-y-2 mb-3 p-2 rounded-xl ${isDark ? 'bg-surface-dark/50' : 'bg-gray-50'}`}>
                {messages.length === 0 && (
                  <p className={`text-xs text-center py-4 ${isDark ? 'text-text-muted' : 'text-gray-400'}`}>No messages yet. Say hi!</p>
                )}
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender_id === user.id ? 'justify-end' : 'justify-start'}`}>
                    <span className={`inline-block px-3 py-1.5 rounded-xl text-xs max-w-xs ${
                      m.sender_id === user.id
                        ? 'bg-gradient-to-r from-primary-500 to-calm-500 text-white'
                        : isDark ? 'bg-surface-hover text-text-dark' : 'bg-white text-gray-800'
                    }`}>
                      {m.content}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 rounded-xl text-sm"
                />
                <button onClick={sendMsg} className="w-9 h-9 rounded-xl bg-gradient-to-r from-primary-500 to-calm-500 text-white border-none cursor-pointer flex items-center justify-center">
                  <FiSend size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Discover */}
        {tab === 'discover' && (
          <>
            <div className="flex gap-2 mb-4 flex-wrap">
              {['', 'happy', 'sad', 'anxious', 'angry', 'confused', 'tired'].map((mood) => (
                <button
                  key={mood}
                  onClick={() => setMoodFilter(mood)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border-none cursor-pointer transition-all ${
                    moodFilter === mood
                      ? 'bg-primary-500 text-white'
                      : isDark ? 'bg-surface-hover text-text-muted hover:text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {mood ? `${MOOD_EMOJI[mood] || ''} ${mood}` : 'All'}
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((u) => (
                <motion.div
                  key={u.id}
                  whileHover={{ y: -3 }}
                  className={`glass rounded-2xl p-4 transition-all ${isDark ? 'hover:bg-surface-hover' : 'hover:shadow-lg'}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-calm-400 flex items-center justify-center text-white font-bold text-sm">
                      {u.display_name?.[0] || u.username[0]}
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{u.display_name || u.username}</p>
                      {u.current_mood && (
                        <span className={`text-xs ${isDark ? 'text-text-muted' : 'text-gray-500'}`}>
                          Feeling {MOOD_EMOJI[u.current_mood]} {u.current_mood}
                        </span>
                      )}
                    </div>
                  </div>
                  {u.bio && <p className={`text-xs mb-3 ${isDark ? 'text-text-muted' : 'text-gray-500'}`}>{u.bio}</p>}
                  <button
                    onClick={() => sendRequest(u.id)}
                    disabled={u.requested}
                    className={`w-full py-2 rounded-xl text-xs font-medium border-none cursor-pointer transition-all ${
                      u.requested
                        ? isDark ? 'bg-surface-hover text-text-muted' : 'bg-gray-100 text-gray-400'
                        : 'bg-gradient-to-r from-primary-500 to-calm-500 text-white hover:shadow-lg'
                    }`}
                  >
                    {u.requested ? <><FiCheck size={12} className="inline mr-1" /> Requested</> : <><FiUserPlus size={12} className="inline mr-1" /> Connect</>}
                  </button>
                </motion.div>
              ))}
              {users.length === 0 && (
                <div className={`col-span-full text-center py-12 ${isDark ? 'text-text-muted' : 'text-gray-500'}`}>
                  <FiUsers size={40} className="mx-auto mb-3 opacity-30" />
                  <p>No users found. Try a different mood filter!</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* My Connections */}
        {tab === 'connections' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {connections.map((u) => (
              <motion.div key={u.id} whileHover={{ y: -3 }} className={`glass rounded-2xl p-4 ${isDark ? 'hover:bg-surface-hover' : 'hover:shadow-lg'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-calm-400 flex items-center justify-center text-white font-bold text-sm">
                    {u.display_name?.[0] || u.username[0]}
                  </div>
                  <div>
                    <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{u.display_name || u.username}</p>
                    <span className={`text-xs ${u.is_online ? 'text-green-400' : isDark ? 'text-text-muted' : 'text-gray-400'}`}>
                      {u.is_online ? '● Online' : '○ Offline'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => openChat(u)}
                  className="w-full py-2 rounded-xl text-xs font-medium bg-gradient-to-r from-primary-500 to-calm-500 text-white border-none cursor-pointer hover:shadow-lg transition-all"
                >
                  <FiMessageCircle size={12} className="inline mr-1" /> Message
                </button>
              </motion.div>
            ))}
            {connections.length === 0 && (
              <div className={`col-span-full text-center py-12 ${isDark ? 'text-text-muted' : 'text-gray-500'}`}>
                <FiUsers size={40} className="mx-auto mb-3 opacity-30" />
                <p>No connections yet. Discover people to connect with!</p>
              </div>
            )}
          </div>
        )}

        {/* Pending */}
        {tab === 'pending' && (
          <div className="space-y-3">
            {pending.map((p) => (
              <motion.div key={p.connection_id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-calm-400 flex items-center justify-center text-white font-bold text-sm">
                    {p.user.display_name?.[0] || p.user.username[0]}
                  </div>
                  <div>
                    <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{p.user.display_name || p.user.username}</p>
                    <span className={`text-xs ${isDark ? 'text-text-muted' : 'text-gray-500'}`}>Matched on: {p.matched_on}</span>
                  </div>
                </div>
                <button
                  onClick={() => acceptRequest(p.connection_id)}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-gradient-to-r from-primary-500 to-calm-500 text-white border-none cursor-pointer hover:shadow-lg transition-all"
                >
                  <FiCheck size={12} className="inline mr-1" /> Accept
                </button>
              </motion.div>
            ))}
            {pending.length === 0 && (
              <div className={`text-center py-12 ${isDark ? 'text-text-muted' : 'text-gray-500'}`}>
                <p>No pending requests.</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
