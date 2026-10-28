import React, { useState } from 'react';
import { 
  Trophy, 
  Bot, 
  User, 
  MessageSquare, 
  Send, 
  Check, 
  Lock, 
  Code2, 
  Database, 
  Cpu, 
  BarChart3, 
  Flame, 
  Sparkles, 
  Calendar,
  LogOut,
  Heart,
  Mail,
  UserCheck
} from 'lucide-react';

// --- OFFICIAL TEAM CRESTS (GOOGLE SPORTS CDN) ---
const CRESTS = {
  Flamengo: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/orE554NToSkH6nuwofe7Yg_500x500.png',
  Palmeiras: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/7spurne-xDt2p6C0imYYNA_500x500.png',
  Cruzeiro: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/Tcv9X__nIh-6wFNJPMwIXQ_500x500.png',
  'Athletico-PR': 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/9LkdBR4L5plovKM8eIy7nQ_500x500.png',
  Fluminense: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/fCMxMMDF2AZPU7LzYKSlig_500x500.png',
  'Atlético-MG': 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/q9fhEsgpuyRq58OgmSndcQ_500x500.png',
  Bahia: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/nIdbR6qIUDyZUBO9vojSPw_500x500.png',
  Santos: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/VHdNOT6wWOw_vJ38GMjMzg_500x500.png',
  'São Paulo': 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/4w2Z97Hf9CSOqICK3a8AxQ_500x500.png',
  'Red Bull Bragantino': 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/lMyw2zn1Z4cdkaxKJWnsQw_500x500.png',
  Botafogo: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/KLDWYp-H8CAOT9H_JgizRg_500x500.png',
  Coritiba: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/LaFlBADLmsjHfGTehCYtuA_500x500.png',
  'Vasco da Gama': 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/hHwT8LwRmYCAGxQ-STLxYA_500x500.png',
  Vitória: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/LHSM6VchpkI4NIptoSTHOg_500x500.png',
  Mirassol: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/5J3JY7fcdiDYU5rbPW7AKA_500x500.png',
  Internacional: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/OWVFKuHrQuf4q2Wk0hEmSA_500x500.png',
  Grêmio: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/Ku-73v_TW9kpex-IEGb0ZA_500x500.png',
  Corinthians: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/tCMSqgXVHROpdCpQhzTo1g_500x500.png',
  Remo: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/bENrK5iSMF6sXrEkDNNxng_500x500.png',
  Chapecoense: 'https://ssl.gstatic.com/onebox/media/sports/logos/optimized/K7JQUKTRsuXfO9YrD5dq5g_500x500.png'
};

const TEAMS_LIST = Object.keys(CRESTS);

// --- REAL MATCHES FOR TODAY (28/10/2026 - RODADA 33) ---
const INITIAL_MATCHES = [
  {
    id: 'm1',
    round: 33,
    homeTeam: 'Santos',
    awayTeam: 'Palmeiras',
    homeLogo: CRESTS['Santos'],
    awayLogo: CRESTS['Palmeiras'],
    date: 'Hoje (28/10), 19:30',
    stadium: 'Vila Belmiro, Santos',
    status: 'SCHEDULED',
    homeScore: null,
    awayScore: null,
    lockMinutes: 120,
    aiPrediction: { home: 1, away: 2, probHome: 28, probDraw: 30, probAway: 42, reasoning: 'Palmeiras briga ponto a ponto pelo título com o Flamengo. Santos tenta estabilidade na Série A.' }
  },
  {
    id: 'm2',
    round: 33,
    homeTeam: 'Fluminense',
    awayTeam: 'Internacional',
    homeLogo: CRESTS['Fluminense'],
    awayLogo: CRESTS['Internacional'],
    date: 'Hoje (28/10), 19:30',
    stadium: 'Maracanã, Rio de Janeiro',
    status: 'SCHEDULED',
    homeScore: null,
    awayScore: null,
    lockMinutes: 120,
    aiPrediction: { home: 2, away: 1, probHome: 48, probDraw: 28, probAway: 24, reasoning: 'Fluminense busca consolidar vaga no G6. Internacional tenta fugir da aproximação da Z4.' }
  },
  {
    id: 'm3',
    round: 33,
    homeTeam: 'Red Bull Bragantino',
    awayTeam: 'Chapecoense',
    homeLogo: CRESTS['Red Bull Bragantino'],
    awayLogo: CRESTS['Chapecoense'],
    date: 'Hoje (28/10), 19:30',
    stadium: 'Cícero Marques, Bragança Paulista',
    status: 'SCHEDULED',
    homeScore: null,
    awayScore: null,
    lockMinutes: 120,
    aiPrediction: { home: 3, away: 0, probHome: 68, probDraw: 20, probAway: 12, reasoning: 'Massa Bruta é forte mandante contra a lanterna Chapecoense em crise defensiva.' }
  },
  {
    id: 'm4',
    round: 33,
    homeTeam: 'Remo',
    awayTeam: 'Botafogo',
    homeLogo: CRESTS['Remo'],
    awayLogo: CRESTS['Botafogo'],
    date: 'Hoje (28/10), 21:30',
    stadium: 'Baenão / Mangueirão, Belém',
    status: 'SCHEDULED',
    homeScore: null,
    awayScore: null,
    lockMinutes: 240,
    aiPrediction: { home: 1, away: 1, probHome: 35, probDraw: 35, probAway: 30, reasoning: 'Remo em situação crítica na 19ª posição atua sob forte pressão da torcida no Pará.' }
  },
  {
    id: 'm5',
    round: 33,
    homeTeam: 'Bahia',
    awayTeam: 'São Paulo',
    homeLogo: CRESTS['Bahia'],
    awayLogo: CRESTS['São Paulo'],
    date: 'Hoje (28/10), 21:30',
    stadium: 'Arena Fonte Nova, Salvador',
    status: 'SCHEDULED',
    homeScore: null,
    awayScore: null,
    lockMinutes: 240,
    aiPrediction: { home: 2, away: 1, probHome: 45, probDraw: 30, probAway: 25, reasoning: 'Bahia com bom retrospecto na Fonte Nova mirando vaga direta na Libertadores.' }
  }
];

// --- REAL STANDINGS TABLE (OCTOBER 28, 2026 - 32 MATCHES) ---
const INITIAL_STANDINGS = [
  { pos: 1, name: 'Flamengo', pts: 70, j: 32, v: 21, e: 7, d: 4, sg: 37, form: ['V', 'V', 'E', 'V', 'V'], logo: CRESTS['Flamengo'] },
  { pos: 2, name: 'Palmeiras', pts: 69, j: 32, v: 20, e: 9, d: 3, sg: 34, form: ['V', 'V', 'V', 'E', 'V'], logo: CRESTS['Palmeiras'] },
  { pos: 3, name: 'Cruzeiro', pts: 54, j: 32, v: 16, e: 6, d: 10, sg: 5, form: ['D', 'V', 'E', 'V', 'V'], logo: CRESTS['Cruzeiro'] },
  { pos: 4, name: 'Athletico-PR', pts: 54, j: 32, v: 15, e: 9, d: 8, sg: 12, form: ['V', 'E', 'V', 'D', 'E'], logo: CRESTS['Athletico-PR'] },
  { pos: 5, name: 'Fluminense', pts: 51, j: 32, v: 14, e: 9, d: 9, sg: 9, form: ['E', 'V', 'V', 'D', 'V'], logo: CRESTS['Fluminense'] },
  { pos: 6, name: 'Atlético-MG', pts: 50, j: 32, v: 14, e: 8, d: 10, sg: 6, form: ['V', 'D', 'E', 'V', 'D'], logo: CRESTS['Atlético-MG'] },
  { pos: 7, name: 'Bahia', pts: 50, j: 32, v: 13, e: 11, d: 8, sg: 5, form: ['E', 'V', 'D', 'V', 'E'], logo: CRESTS['Bahia'] },
  { pos: 8, name: 'Santos', pts: 46, j: 32, v: 12, e: 10, d: 10, sg: 2, form: ['V', 'E', 'D', 'E', 'V'], logo: CRESTS['Santos'] },
  { pos: 9, name: 'São Paulo', pts: 43, j: 32, v: 12, e: 7, d: 13, sg: 1, form: ['D', 'V', 'D', 'V', 'D'], logo: CRESTS['São Paulo'] },
  { pos: 10, name: 'Red Bull Bragantino', pts: 41, j: 32, v: 11, e: 8, d: 13, sg: 1, form: ['E', 'D', 'V', 'D', 'E'], logo: CRESTS['Red Bull Bragantino'] },
  { pos: 11, name: 'Botafogo', pts: 39, j: 32, v: 10, e: 9, d: 13, sg: -7, form: ['D', 'E', 'D', 'D', 'V'], logo: CRESTS['Botafogo'] },
  { pos: 12, name: 'Coritiba', pts: 39, j: 32, v: 10, e: 9, d: 13, sg: -12, form: ['V', 'D', 'E', 'V', 'D'], logo: CRESTS['Coritiba'] },
  { pos: 13, name: 'Vasco da Gama', pts: 38, j: 31, v: 10, e: 8, d: 13, sg: -6, form: ['E', 'V', 'D', 'E', 'D'], logo: CRESTS['Vasco da Gama'] },
  { pos: 14, name: 'Vitória', pts: 38, j: 32, v: 10, e: 8, d: 14, sg: -11, form: ['V', 'D', 'V', 'D', 'V'], logo: CRESTS['Vitória'] },
  { pos: 15, name: 'Mirassol', pts: 37, j: 32, v: 9, e: 10, d: 13, sg: -8, form: ['E', 'E', 'D', 'V', 'D'], logo: CRESTS['Mirassol'] },
  { pos: 16, name: 'Internacional', pts: 35, j: 32, v: 8, e: 11, d: 13, sg: -4, form: ['D', 'E', 'D', 'E', 'V'], logo: CRESTS['Internacional'] },
  { pos: 17, name: 'Grêmio', pts: 34, j: 32, v: 8, e: 10, d: 14, sg: -9, form: ['D', 'D', 'V', 'E', 'D'], logo: CRESTS['Grêmio'] },
  { pos: 18, name: 'Corinthians', pts: 33, j: 32, v: 8, e: 9, d: 15, sg: -8, form: ['D', 'V', 'D', 'D', 'E'], logo: CRESTS['Corinthians'] },
  { pos: 19, name: 'Remo', pts: 26, j: 32, v: 5, e: 11, d: 16, sg: -16, form: ['E', 'D', 'E', 'D', 'D'], logo: CRESTS['Remo'] },
  { pos: 20, name: 'Chapecoense', pts: 21, j: 31, v: 4, e: 9, d: 18, sg: -31, form: ['D', 'D', 'D', 'E', 'D'], logo: CRESTS['Chapecoense'] }
];

const TOP_SCORERS = [
  { rank: 1, name: 'Pedro', team: 'Flamengo', goals: 18, logo: CRESTS['Flamengo'] },
  { rank: 2, name: 'Estêvão', team: 'Palmeiras', goals: 15, logo: CRESTS['Palmeiras'] },
  { rank: 3, name: 'Kaio Jorge', team: 'Cruzeiro', goals: 13, logo: CRESTS['Cruzeiro'] },
  { rank: 4, name: 'Hulk', team: 'Atlético-MG', goals: 12, logo: CRESTS['Atlético-MG'] },
  { rank: 5, name: 'Luciano', team: 'São Paulo', goals: 11, logo: CRESTS['São Paulo'] }
];

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authTab, setAuthTab] = useState('LOGIN'); // 'LOGIN' | 'REGISTER'
  
  // Login/Signup Form Inputs
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [selectedFavoriteTeam, setSelectedFavoriteTeam] = useState('Flamengo');

  // User Profile State
  const [currentUser, setCurrentUser] = useState(null);

  // App Navigation & User Data State
  const [viewMode, setViewMode] = useState('APP');
  const [activeTab, setActiveTab] = useState('PALPITES');
  const [userPoints, setUserPoints] = useState(0);
  const [userPredictions, setUserPredictions] = useState({});
  const [savedStatus, setSavedStatus] = useState({});

  // Dynamic Leaderboard driven by registered users
  const [leaderboardUsers, setLeaderboardUsers] = useState([]);

  // Chat Messages initialized with welcoming system message
  const [chatMessages, setChatMessages] = useState([
    { id: 'c1', user: 'Sistema', team: 'Flamengo', text: 'Bem-vindo ao Chat Oficial do Brasileirão 2026! Crie sua conta para palpitar e entrar no Ranking.', time: '18:00', avatar: '🤖' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Handle Login or Registration
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!inputEmail || !inputPassword) return;

    const userName = inputName.trim() || inputEmail.split('@')[0];
    const userObj = {
      name: userName,
      email: inputEmail,
      favoriteTeam: selectedFavoriteTeam,
      avatar: '⚽',
      joinedDate: '28/10/2026'
    };

    setCurrentUser(userObj);
    setIsAuthenticated(true);
    setUserPoints(0);
    setUserPredictions({});

    // Register user in empty leaderboard if not present
    setLeaderboardUsers(prev => {
      const exists = prev.some(u => u.email === userObj.email);
      if (exists) return prev;
      return [
        ...prev,
        {
          name: userObj.name,
          email: userObj.email,
          team: userObj.favoriteTeam,
          pts: 0,
          exactCount: 0,
          accuracy: 0,
          avatar: userObj.avatar
        }
      ];
    });

    // Add welcoming message to chat for the newly logged in user
    setChatMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        user: userName,
        team: selectedFavoriteTeam,
        text: `Olá galera! Acabei de entrar no app. Pra cima, ${selectedFavoriteTeam}! 🚀`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: '⚽'
      }
    ]);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleScoreChange = (matchId, team, delta) => {
    setUserPredictions(prev => {
      const current = prev[matchId] || { home: 0, away: 0 };
      const newVal = Math.max(0, (current[team] || 0) + delta);
      return {
        ...prev,
        [matchId]: {
          ...current,
          [team]: newVal
        }
      };
    });
    setSavedStatus(prev => ({ ...prev, [matchId]: false }));
  };

  const handleSavePrediction = (matchId) => {
    setSavedStatus(prev => ({ ...prev, [matchId]: true }));
    setTimeout(() => {
      setSavedStatus(prev => ({ ...prev, [matchId]: false }));
    }, 2500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;
    const msg = {
      id: Date.now().toString(),
      user: currentUser.name,
      team: currentUser.favoriteTeam,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: currentUser.avatar
    };
    setChatMessages([...chatMessages, msg]);
    setNewMessage('');
  };

  // --- SCREEN 1: LOGIN / AUTHENTICATION MODAL (REQUIRED BEFORE ACCESS) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0D1117] text-gray-100 flex items-center justify-center p-4 antialiased selection:bg-[#00E676] selection:text-black">
        <div className="w-full max-w-md bg-[#161B22] rounded-3xl border border-gray-800 p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Subtle Glow Background */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#00E676]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#FFD600]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Logo & Header */}
          <div className="text-center space-y-2 relative z-10">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#00E676] to-[#FFD600] p-0.5 shadow-lg shadow-[#00E676]/20">
              <div className="w-full h-full bg-[#0D1117] rounded-[14px] flex items-center justify-center">
                <Trophy className="w-8 h-8 text-[#00E676]" />
              </div>
            </div>
            <h1 className="font-extrabold text-xl tracking-tight text-white">
              Brasileirão <span className="text-[#00E676]">Stats</span> & <span className="text-[#FFD600]">Palpites</span>
            </h1>
            <p className="text-xs text-gray-400">Edição Série A 2026 • Entre para dar seus palpites</p>
          </div>

          {/* Auth Tab Selector */}
          <div className="grid grid-cols-2 p-1 bg-[#0D1117] rounded-xl border border-gray-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => setAuthTab('LOGIN')}
              className={`py-2.5 rounded-lg transition-all ${
                authTab === 'LOGIN' ? 'bg-[#21262D] text-[#00E676] shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setAuthTab('REGISTER')}
              className={`py-2.5 rounded-lg transition-all ${
                authTab === 'REGISTER' ? 'bg-[#21262D] text-[#00E676] shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Criar Conta
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4 relative z-10">
            
            {authTab === 'REGISTER' && (
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Nome Completo / Usuário</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Lucas Silva"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full bg-[#0D1117] border border-gray-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E676]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">E-mail</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  className="w-full bg-[#0D1117] border border-gray-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E676]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Senha (Mín. 6 caracteres)</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full bg-[#0D1117] border border-gray-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E676]"
                />
              </div>
            </div>

            {/* Favorite Team Selection with Logos */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1 flex items-center justify-between">
                <span>Time do Coração (Brasileirão 2026)</span>
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              </label>
              <div className="bg-[#0D1117] border border-gray-800 rounded-xl p-2.5 max-h-36 overflow-y-auto grid grid-cols-2 gap-2">
                {TEAMS_LIST.map((team) => (
                  <button
                    key={team}
                    type="button"
                    onClick={() => setSelectedFavoriteTeam(team)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all text-xs font-bold ${
                      selectedFavoriteTeam === team
                        ? 'bg-[#00E676]/10 border-[#00E676] text-[#00E676]'
                        : 'bg-[#161B22] border-gray-800 text-gray-300 hover:border-gray-700'
                    }`}
                  >
                    <img src={CRESTS[team]} alt={team} className="w-5 h-5 object-contain" />
                    <span className="truncate">{team}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#00E676] hover:bg-[#00C853] text-black font-extrabold text-xs rounded-xl shadow-lg shadow-[#00E676]/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <UserCheck className="w-4 h-4" />
              {authTab === 'LOGIN' ? 'Entrar na Plataforma' : 'Criar Minha Conta'}
            </button>
          </form>

          {/* Social Logins */}
          <div className="space-y-3 pt-2 border-t border-gray-800 relative z-10 text-center">
            <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider">Ou continue com</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setInputEmail('usuario.google@gmail.com');
                  setInputName('Torcedor Google');
                  setInputPassword('123456');
                }}
                className="bg-[#0D1117] hover:bg-gray-800 border border-gray-800 text-gray-300 font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                Google ID
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputEmail('usuario.apple@icloud.com');
                  setInputName('Torcedor Apple');
                  setInputPassword('123456');
                }}
                className="bg-[#0D1117] hover:bg-gray-800 border border-gray-800 text-gray-300 font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                Apple ID
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // --- SCREEN 2: MAIN APPLICATION AFTER AUTHENTICATION ---
  return (
    <div className="min-h-screen bg-[#0D1117] text-gray-100 font-sans flex flex-col antialiased selection:bg-[#00E676] selection:text-black">
      
      {/* HEADER WITH LOGGED USER INFO */}
      <header className="sticky top-0 z-50 bg-[#161B22]/95 backdrop-blur-md border-b border-gray-800 px-4 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00E676] to-[#FFD600] p-0.5 flex items-center justify-center shadow-lg shadow-[#00E676]/20">
              <div className="w-full h-full bg-[#0D1117] rounded-[10px] flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#00E676]" />
              </div>
            </div>
            <div>
              <h1 className="font-extrabold text-lg leading-tight tracking-wide flex items-center gap-2">
                BRASILEIRÃO <span className="text-[#00E676]">STATS</span> & <span className="text-[#FFD600]">PALPITES</span>
              </h1>
              <p className="text-xs text-gray-400">Edição 2026 • 33ª Rodada (28/10/2026)</p>
            </div>
          </div>

          {/* ACTIVE USER BAR IN HEADER */}
          <div className="flex items-center gap-3 bg-[#0D1117] p-1.5 rounded-2xl border border-gray-800">
            
            <div className="flex items-center gap-2 pl-2">
              <div className="w-7 h-7 rounded-lg bg-[#21262D] border border-gray-700 flex items-center justify-center text-sm font-bold">
                {currentUser.avatar}
              </div>
              <div className="text-left leading-tight">
                <div className="font-bold text-xs text-gray-200 flex items-center gap-1.5">
                  <span>{currentUser.name}</span>
                  <img src={CRESTS[currentUser.favoriteTeam]} alt={currentUser.favoriteTeam} className="w-4 h-4 object-contain" />
                </div>
                <div className="text-[10px] text-[#00E676] font-extrabold">
                  {userPoints} Pts • {currentUser.favoriteTeam}
                </div>
              </div>
            </div>

            <div className="h-6 w-px bg-gray-800 mx-1"></div>

            <button
              onClick={() => setViewMode('APP')}
              className={`px-3 py-1.5 rounded-xl font-semibold text-xs transition-all ${
                viewMode === 'APP' 
                  ? 'bg-[#00E676] text-black font-bold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              App
            </button>
            <button
              onClick={() => setViewMode('BLUEPRINT')}
              className={`px-3 py-1.5 rounded-xl font-semibold text-xs transition-all ${
                viewMode === 'BLUEPRINT' 
                  ? 'bg-[#FFD600] text-black font-bold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Blueprint
            </button>

            <button
              onClick={handleLogout}
              title="Sair da Conta"
              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 md:p-6 pb-24 md:pb-8">
        
        {viewMode === 'APP' && (
          <div className="space-y-6">

            {/* TAB NAVIGATION */}
            <div className="grid grid-cols-4 gap-2 bg-[#161B22] p-1.5 rounded-2xl border border-gray-800">
              <button
                onClick={() => setActiveTab('PALPITES')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${
                  activeTab === 'PALPITES'
                    ? 'bg-[#21262D] text-[#00E676] border border-[#00E676]/30 shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Flame className="w-4 h-4 text-[#FFD600]" />
                <span>Palpites de Hoje</span>
              </button>

              <button
                onClick={() => setActiveTab('TABELA')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${
                  activeTab === 'TABELA'
                    ? 'bg-[#21262D] text-[#00E676] border border-[#00E676]/30 shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-[#00E676]" />
                <span>Tabela 2026</span>
              </button>

              <button
                onClick={() => setActiveTab('IA')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${
                  activeTab === 'IA'
                    ? 'bg-[#21262D] text-[#00E676] border border-[#00E676]/30 shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>IA Gemini</span>
              </button>

              <button
                onClick={() => setActiveTab('PERFIL')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${
                  activeTab === 'PERFIL'
                    ? 'bg-[#21262D] text-[#00E676] border border-[#00E676]/30 shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <User className="w-4 h-4 text-purple-400" />
                <span>Meu Perfil</span>
              </button>
            </div>

            {/* TAB 1: PALPITES & CHAT */}
            {activeTab === 'PALPITES' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* MATCH CARDS */}
                <div className="lg:col-span-2 space-y-4">
                  
                  <div className="flex items-center justify-between bg-[#161B22] p-4 rounded-2xl border border-gray-800">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#00E676]" />
                      <div>
                        <h2 className="font-bold text-sm text-gray-100">Rodada 33 • 28 de Outubro de 2026</h2>
                        <p className="text-xs text-gray-400">Palpites vinculados a {currentUser.name}</p>
                      </div>
                    </div>

                    <span className="text-xs font-extrabold bg-[#0D1117] px-3 py-1.5 rounded-lg border border-gray-700 text-[#FFD600]">
                      JOGOS HOJE
                    </span>
                  </div>

                  {INITIAL_MATCHES.map((match) => {
                    const pred = userPredictions[match.id] || { home: 0, away: 0 };
                    const isSaved = savedStatus[match.id];

                    return (
                      <div key={match.id} className="bg-[#161B22] rounded-2xl border border-gray-800 p-4 md:p-5 hover:border-gray-700 transition-all shadow-md relative overflow-hidden">
                        
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                          
                          {/* Match Info */}
                          <div className="text-center sm:text-left space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFD600]">
                              {match.date} • {match.stadium}
                            </span>
                            <div className="text-xs text-gray-400">
                              33ª Rodada • Serie A 2026
                            </div>
                          </div>

                          {/* Predictor Selector */}
                          <div className="flex items-center gap-3 w-full sm:w-auto justify-center bg-[#0D1117] p-3 rounded-xl border border-gray-800">
                            
                            {/* Home Team */}
                            <div className="flex items-center gap-2 text-right">
                              <span className="font-bold text-xs sm:text-sm text-gray-200">{match.homeTeam}</span>
                              <img src={match.homeLogo} alt={match.homeTeam} className="w-8 h-8 object-contain" />
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-2">
                              <div className="flex flex-col items-center gap-1">
                                <button 
                                  onClick={() => handleScoreChange(match.id, 'home', 1)}
                                  className="text-xs bg-[#21262D] hover:bg-gray-700 w-6 h-5 rounded text-gray-300 font-bold"
                                >
                                  +
                                </button>
                                <span className="w-8 h-8 rounded-lg bg-[#21262D] border border-gray-700 font-extrabold text-base flex items-center justify-center text-[#00E676]">
                                  {pred.home}
                                </span>
                                <button 
                                  onClick={() => handleScoreChange(match.id, 'home', -1)}
                                  className="text-xs bg-[#21262D] hover:bg-gray-700 w-6 h-5 rounded text-gray-300 font-bold"
                                >
                                  -
                                </button>
                              </div>

                              <span className="text-xs font-bold text-gray-500">X</span>

                              <div className="flex flex-col items-center gap-1">
                                <button 
                                  onClick={() => handleScoreChange(match.id, 'away', 1)}
                                  className="text-xs bg-[#21262D] hover:bg-gray-700 w-6 h-5 rounded text-gray-300 font-bold"
                                >
                                  +
                                </button>
                                <span className="w-8 h-8 rounded-lg bg-[#21262D] border border-gray-700 font-extrabold text-base flex items-center justify-center text-[#00E676]">
                                  {pred.away}
                                </span>
                                <button 
                                  onClick={() => handleScoreChange(match.id, 'away', -1)}
                                  className="text-xs bg-[#21262D] hover:bg-gray-700 w-6 h-5 rounded text-gray-300 font-bold"
                                >
                                  -
                                </button>
                              </div>
                            </div>

                            {/* Away Team */}
                            <div className="flex items-center gap-2 text-left">
                              <img src={match.awayLogo} alt={match.awayTeam} className="w-8 h-8 object-contain" />
                              <span className="font-bold text-xs sm:text-sm text-gray-200">{match.awayTeam}</span>
                            </div>

                          </div>

                          <button
                            onClick={() => handleSavePrediction(match.id)}
                            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                              isSaved
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#00E676] hover:bg-[#00C853] text-black shadow-md shadow-[#00E676]/20'
                            }`}
                          >
                            {isSaved ? (
                              <>
                                <Check className="w-4 h-4" /> Salvo!
                              </>
                            ) : (
                              'Salvar Palpite'
                            )}
                          </button>

                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* SIDEBAR: CHAT & LEADERBOARD */}
                <div className="space-y-6">
                  
                  {/* FAN CHAT INTEGRATED WITH LOGGED-IN USER */}
                  <div className="bg-[#161B22] rounded-2xl border border-gray-800 p-4 space-y-3 flex flex-col h-[380px]">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#00E676]" />
                        <h3 className="font-bold text-xs">Resenha dos Torcedores</h3>
                      </div>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                        Ao Vivo
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className="bg-[#0D1117] p-2.5 rounded-xl border border-gray-800/80">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-gray-200 flex items-center gap-1.5">
                              <span>{msg.avatar}</span>
                              <span>{msg.user}</span>
                              {msg.team && (
                                <img src={CRESTS[msg.team]} alt={msg.team} className="w-3.5 h-3.5 object-contain inline-block ml-0.5" />
                              )}
                            </span>
                            <span className="text-[10px] text-gray-500">{msg.time}</span>
                          </div>
                          <p className="text-gray-300 leading-snug">{msg.text}</p>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendMessage} className="flex gap-2 pt-1">
                      <input
                        type="text"
                        placeholder={`Comentar como ${currentUser.name}...`}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 bg-[#0D1117] border border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-100 focus:outline-none focus:border-[#00E676]"
                      />
                      <button
                        type="submit"
                        className="bg-[#00E676] hover:bg-[#00C853] text-black px-3 rounded-xl font-bold transition-all flex items-center justify-center"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>

                  {/* LEADERBOARD */}
                  <div className="bg-[#161B22] rounded-2xl border border-gray-800 p-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-[#FFD600]" />
                        <h3 className="font-bold text-xs">Ranking dos Palpitantes</h3>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {leaderboardUsers.length} Participante(s)
                      </span>
                    </div>

                    <div className="space-y-2">
                      {leaderboardUsers.length === 0 ? (
                        <div className="bg-[#0D1117] p-4 rounded-xl border border-gray-800/60 text-center text-xs text-gray-400 space-y-1">
                          <p className="font-bold text-gray-300">Nenhum palpitante cadastrado ainda.</p>
                          <p className="text-[10px]">Crie sua conta para aparecer no topo do ranking!</p>
                        </div>
                      ) : (
                        leaderboardUsers.map((user, index) => (
                          <div key={user.email} className="flex items-center justify-between bg-[#0D1117] p-2.5 rounded-xl border border-gray-800/60 text-xs">
                            <div className="flex items-center gap-2.5">
                              <span className="font-extrabold text-[#FFD600] w-5 text-center">#{index + 1}</span>
                              <span className="text-base">{user.avatar}</span>
                              <div>
                                <div className="font-bold text-gray-200 flex items-center gap-1.5">
                                  <span>{user.name}</span>
                                  {user.team && (
                                    <img src={CRESTS[user.team]} alt={user.team} className="w-3.5 h-3.5 object-contain" />
                                  )}
                                </div>
                                <div className="text-[10px] text-gray-400">{user.exactCount} cravadas</div>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="font-extrabold text-[#00E676]">{user.pts} pts</span>
                              <div className="text-[10px] text-gray-400">{user.accuracy}% prec.</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 2: TABELA DE CLASSIFICAÇÃO */}
            {activeTab === 'TABELA' && (
              <div className="space-y-6">
                
                {/* STANDINGS TABLE */}
                <div className="bg-[#161B22] rounded-2xl border border-gray-800 p-4 overflow-x-auto space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-gray-800">
                    <div>
                      <h3 className="font-extrabold text-sm text-gray-100 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-[#FFD600]" /> Tabela Oficial Série A (28/10/2026)
                      </h3>
                      <p className="text-xs text-gray-400">Classificação após a 32ª rodada</p>
                    </div>

                    {/* LEGEND BADGES */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold">
                      <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> G4 Libertadores
                      </span>
                      <span className="flex items-center gap-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> Pré-Libertadores
                      </span>
                      <span className="flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Sul-Americana
                      </span>
                      <span className="flex items-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Rebaixamento (Z4)
                      </span>
                    </div>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 px-2 text-center">Pos</th>
                        <th className="py-2.5 px-2">Clube</th>
                        <th className="py-2.5 px-2 text-center">Pts</th>
                        <th className="py-2.5 px-2 text-center">J</th>
                        <th className="py-2.5 px-2 text-center">V</th>
                        <th className="py-2.5 px-2 text-center">E</th>
                        <th className="py-2.5 px-2 text-center">D</th>
                        <th className="py-2.5 px-2 text-center">SG</th>
                        <th className="py-2.5 px-2 text-center">Forma</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60 font-medium text-gray-200">
                      {INITIAL_STANDINGS.map((team) => {
                        let rowBorder = 'border-l-4 border-l-transparent';
                        if (team.pos <= 4) rowBorder = 'border-l-4 border-l-emerald-500 bg-emerald-950/10';
                        else if (team.pos <= 6) rowBorder = 'border-l-4 border-l-cyan-500 bg-cyan-950/10';
                        else if (team.pos <= 12) rowBorder = 'border-l-4 border-l-amber-500 bg-amber-950/10';
                        else if (team.pos >= 17) rowBorder = 'border-l-4 border-l-rose-500 bg-rose-950/10';

                        return (
                          <tr key={team.name} className={`hover:bg-[#21262D]/60 transition-all ${rowBorder}`}>
                            <td className="py-2.5 px-2 text-center font-extrabold text-gray-300">
                              {team.pos}º
                            </td>
                            <td className="py-2.5 px-2 font-bold text-gray-100 flex items-center gap-2.5">
                              <img src={team.logo} alt={team.name} className="w-5 h-5 object-contain" />
                              <span>{team.name}</span>
                            </td>
                            <td className="py-2.5 px-2 text-center font-extrabold text-[#00E676]">{team.pts}</td>
                            <td className="py-2.5 px-2 text-center text-gray-400">{team.j}</td>
                            <td className="py-2.5 px-2 text-center">{team.v}</td>
                            <td className="py-2.5 px-2 text-center">{team.e}</td>
                            <td className="py-2.5 px-2 text-center">{team.d}</td>
                            <td className="py-2.5 px-2 text-center font-semibold">{team.sg > 0 ? `+${team.sg}` : team.sg}</td>
                            <td className="py-2.5 px-2 text-center">
                              <div className="flex items-center justify-center gap-1">
                                {team.form.map((res, i) => (
                                  <span
                                    key={i}
                                    className={`w-4 h-4 rounded-full text-[9px] font-extrabold flex items-center justify-center text-black ${
                                      res === 'V' ? 'bg-emerald-400' : res === 'E' ? 'bg-amber-400' : 'bg-rose-500 text-white'
                                    }`}
                                  >
                                    {res}
                                  </span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* ARTILHARIA 2026 */}
                <div className="bg-[#161B22] rounded-2xl border border-gray-800 p-4 space-y-4">
                  <div className="pb-3 border-b border-gray-800">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <Flame className="w-4 h-4 text-[#FFD600]" /> Artilharia Atualizada 2026
                    </h3>
                    <p className="text-xs text-gray-400">Principais goleadores até a 33ª rodada</p>
                  </div>

                  <div className="space-y-3">
                    {TOP_SCORERS.map((scorer) => (
                      <div key={scorer.rank} className="flex items-center justify-between bg-[#0D1117] p-3 rounded-xl border border-gray-800">
                        <div className="flex items-center gap-3">
                          <span className="font-extrabold text-sm text-[#FFD600]">#{scorer.rank}</span>
                          <img src={scorer.logo} alt={scorer.team} className="w-8 h-8 object-contain" />
                          <div>
                            <h4 className="font-bold text-xs text-gray-100">{scorer.name}</h4>
                            <p className="text-[10px] text-gray-400">{scorer.team}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-extrabold text-base text-[#00E676]">{scorer.goals}</span>
                          <span className="text-[10px] text-gray-400 block">gols</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: PALPITES DE IA */}
            {activeTab === 'IA' && (
              <div className="space-y-6">
                
                <div className="bg-gradient-to-r from-cyan-950/40 via-[#161B22] to-emerald-950/30 rounded-2xl border border-cyan-500/20 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-base text-gray-100">Análise Preditiva Gemini 1.5 Pro (28/10/2026)</h2>
                      <p className="text-xs text-gray-400 max-w-xl">
                        Projeções estatísticas avançadas da IA ajustadas para a 33ª Rodada do Campeonato Brasileiro.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INITIAL_MATCHES.map((match) => (
                    <div key={match.id} className="bg-[#161B22] rounded-2xl border border-gray-800 p-5 space-y-4">
                      
                      <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                        <div className="flex items-center gap-2">
                          <img src={match.homeLogo} alt={match.homeTeam} className="w-6 h-6 object-contain" />
                          <span className="font-bold text-xs">{match.homeTeam}</span>
                        </div>
                        <span className="text-xs font-extrabold text-[#00E676] bg-[#0D1117] px-3 py-1 rounded-lg border border-gray-800">
                          IA: {match.aiPrediction.home} x {match.aiPrediction.away}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs">{match.awayTeam}</span>
                          <img src={match.awayLogo} alt={match.awayTeam} className="w-6 h-6 object-contain" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                          <span>Casa: {match.aiPrediction.probHome}%</span>
                          <span>Empate: {match.aiPrediction.probDraw}%</span>
                          <span>Fora: {match.aiPrediction.probAway}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-[#0D1117] overflow-hidden flex">
                          <div style={{ width: `${match.aiPrediction.probHome}%` }} className="bg-emerald-500 h-full"></div>
                          <div style={{ width: `${match.aiPrediction.probDraw}%` }} className="bg-amber-500 h-full"></div>
                          <div style={{ width: `${match.aiPrediction.probAway}%` }} className="bg-cyan-500 h-full"></div>
                        </div>
                      </div>

                      <div className="bg-[#0D1117] p-3 rounded-xl border border-gray-800 text-xs text-gray-300 space-y-1">
                        <div className="font-bold text-cyan-400 text-[10px] flex items-center gap-1">
                          <Bot className="w-3 h-3" /> Justificativa da IA:
                        </div>
                        <p className="leading-relaxed">{match.aiPrediction.reasoning}</p>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 4: PERFIL COMPLETO DO USUÁRIO LOGADO */}
            {activeTab === 'PERFIL' && (
              <div className="max-w-3xl mx-auto space-y-6">
                
                {/* PROFILE CARD */}
                <div className="bg-[#161B22] rounded-3xl border border-gray-800 p-6 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative overflow-hidden">
                  
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#00E676] to-[#FFD600] p-0.5 flex items-center justify-center shadow-lg shadow-[#00E676]/10">
                    <div className="w-full h-full bg-[#0D1117] rounded-[22px] flex items-center justify-center text-4xl">
                      {currentUser.avatar}
                    </div>
                  </div>
                  
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                      <h2 className="font-extrabold text-xl text-gray-100">{currentUser.name}</h2>
                      <span className="bg-emerald-500/10 text-[#00E676] text-[10px] font-bold px-3 py-1 rounded-lg border border-[#00E676]/30">
                        Conta Ativa (Série A 2026)
                      </span>
                    </div>

                    <p className="text-xs text-gray-400">{currentUser.email}</p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3">
                      <div className="flex items-center gap-2 bg-[#0D1117] px-3 py-1.5 rounded-xl border border-gray-800 text-xs">
                        <span className="text-gray-400">Time do Coração:</span>
                        <img src={CRESTS[currentUser.favoriteTeam]} alt={currentUser.favoriteTeam} className="w-4 h-4 object-contain" />
                        <span className="font-bold text-gray-200">{currentUser.favoriteTeam}</span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-[#0D1117] px-3 py-1.5 rounded-xl border border-gray-800 text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5 text-[#FFD600]" />
                        <span>Membro desde: {currentUser.joinedDate}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* USER METRICS / STATS (RESET TO ZERO FOR NEW LOGIN) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#161B22] p-4 rounded-2xl border border-gray-800 text-center space-y-1">
                    <span className="text-xs text-gray-400 block">Pontos Totais</span>
                    <span className="font-extrabold text-2xl text-[#00E676]">{userPoints} pts</span>
                  </div>
                  <div className="bg-[#161B22] p-4 rounded-2xl border border-gray-800 text-center space-y-1">
                    <span className="text-xs text-gray-400 block">Cravadas (+3)</span>
                    <span className="font-extrabold text-2xl text-[#FFD600]">0</span>
                  </div>
                  <div className="bg-[#161B22] p-4 rounded-2xl border border-gray-800 text-center space-y-1">
                    <span className="text-xs text-gray-400 block">Precisão</span>
                    <span className="font-extrabold text-2xl text-cyan-400">0%</span>
                  </div>
                  <div className="bg-[#161B22] p-4 rounded-2xl border border-gray-800 text-center space-y-1">
                    <span className="text-xs text-gray-400 block">Posição Ranking</span>
                    <span className="font-extrabold text-2xl text-purple-400">
                      {leaderboardUsers.findIndex(u => u.email === currentUser.email) !== -1 
                        ? `#${leaderboardUsers.findIndex(u => u.email === currentUser.email) + 1}` 
                        : '--'}
                    </span>
                  </div>
                </div>

                {/* LOGOUT BUTTON */}
                <div className="pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair da Conta ({currentUser.email})
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

        {/* BLUEPRINT FLUTTERFLOW VIEW */}
        {viewMode === 'BLUEPRINT' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-950/30 via-[#161B22] to-emerald-950/20 p-6 rounded-2xl border border-[#FFD600]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#FFD600]">
                <Code2 className="w-5 h-5" />
                <span className="font-extrabold text-sm uppercase tracking-wider">Documentação Técnica FlutterFlow</span>
              </div>
              <h2 className="font-extrabold text-xl text-gray-100">Arquitetura de Usuários & Auth Flow (Firebase)</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#161B22] rounded-2xl border border-gray-800 p-5 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-800 text-[#00E676]">
                  <Database className="w-5 h-5" />
                  <h3 className="font-extrabold text-sm text-gray-100">Collection Users (Firestore)</h3>
                </div>

                <div className="bg-[#0D1117] p-3 rounded-xl border border-gray-800 font-mono text-[11px] text-gray-300">
                  <pre>{`collection("users") {
  uid: String (PK),
  displayName: String, // ex: "${currentUser ? currentUser.name : 'Lucas Silva'}"
  email: String,
  favoriteTeam: String, // ex: "${currentUser ? currentUser.favoriteTeam : 'Flamengo'}"
  totalPoints: Integer, // default: 0
  correctPredictions: Integer, // default: 0
  accuracyRate: Double // default: 0.0
}`}</pre>
                </div>
              </div>

              <div className="bg-[#161B22] rounded-2xl border border-gray-800 p-5 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-800 text-cyan-400">
                  <Cpu className="w-5 h-5" />
                  <h3 className="font-extrabold text-sm text-gray-100">Fluxo de Autenticação FlutterFlow</h3>
                </div>

                <div className="bg-[#0D1117] p-3 rounded-xl border border-gray-800 font-mono text-[11px] text-emerald-400 overflow-x-auto">
                  <pre>{`1. Action: Firebase Authentication (Create Account)
2. Action: Create Document in 'users' collection
   - displayName: WidgetState.NameInput
   - email: WidgetState.EmailInput
   - favoriteTeam: WidgetState.SelectedTeam
   - totalPoints: 0
3. Action: Navigate To (HomePage)`}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <footer className="bg-[#161B22] border-t border-gray-800 py-4 px-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Brasileirão Stats & Palpites © 2026 • Atualizado em 28/10/2026</span>
          <span className="text-gray-400">Usuário Logado: {currentUser.name} ({currentUser.favoriteTeam})</span>
        </div>
      </footer>

    </div>
  );
}