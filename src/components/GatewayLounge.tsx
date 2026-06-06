import { useState } from 'react';
import { 
  User, ShieldCheck, KeyRound, LockKeyhole, ArrowRight, Sparkles, 
  Terminal, Loader2, Crown, Zap, ShieldAlert, Cpu, HeartPulse, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GatewayLoungeProps {
  onLoginSuccess: (role: 'gamer' | 'reseller' | 'merchant', userData: any) => void;
  onNotification: (message: string) => void;
}

export function GatewayLounge({ onLoginSuccess, onNotification }: GatewayLoungeProps) {
  const [selectedRole, setSelectedRole] = useState<'gamer' | 'reseller' | 'merchant'>('gamer');
  
  // Form input states
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Handshake states
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authLogs, setAuthLogs] = useState<string[]>([]);

  const GAMER_AVATARS = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80'
  ];

  const handleRoleSelect = (role: 'gamer' | 'reseller' | 'merchant') => {
    setSelectedRole(role);
    setErrorMessage('');
    // Clear inputs
    setUsername('');
    setPasscode('');
    setEmail('');
    setPassword('');
  };

  const handleAutofill = () => {
    setErrorMessage('');
    if (selectedRole === 'gamer') {
      setUsername('BloxWarrior_2026');
    } else if (selectedRole === 'reseller') {
      setPasscode('GROWEE-WHOLESALE-VIP');
    } else if (selectedRole === 'merchant') {
      setEmail('admin@growee.store');
      setPassword('groweeseller2026');
    }
    onNotification("Demo parameters loaded correctly!");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (selectedRole === 'gamer') {
      if (!username.trim() || username.trim().length < 3) {
        setErrorMessage('⚠️ Roblox Username should exceed 2 characters.');
        return;
      }
      if (/[^a-zA-Z0-9_]/.test(username)) {
        setErrorMessage('⚠️ Only alphanumeric characters and underscores are allowed.');
        return;
      }
      
      triggerMockAuth([
        `[Node] Initializing remote handshake with Roblox Server Node Cluster.`,
        `[Verify] Lookup Roblox username handle "${username}"...`,
        `[Verify] Match found! 100% Join-Follow capability established.`,
        `[Sync] Generating session keys (AES-256 GCM)...`,
        `[Security] Multi-channel safety verification: CLEAN.`,
        `[Success] Authenticated! Syncing gamer store catalog and assets.`
      ], 'gamer', {
        username: username.trim(),
        balance: 1450,
        avatar: GAMER_AVATARS[Math.floor(Math.random() * GAMER_AVATARS.length)],
        role: 'gamer',
        loggedIn: true
      });
    }

    else if (selectedRole === 'reseller') {
      if (!passcode.trim()) {
        setErrorMessage('⚠️ Wholesale passcode required for wholesale clearance.');
        return;
      }
      if (passcode.trim().toUpperCase() !== 'GROWEE-WHOLESALE-VIP') {
        setErrorMessage('❌ Invalid passcode. Click "Autofill Test Profile" below to test.');
        return;
      }
      
      triggerMockAuth([
        `[Partner] Handshake request for Wholesaler: GROWEE-WHOLESALE-VIP`,
        `[Database] Querying digital distributor licensing records...`,
        `[License] Validated: BloxSupplier ID Ltd. (Active Tier-3 Reseller Token)`,
        `[Security] Signature verified by Growee Master Server.`,
        `[Success] Access granted. Syncing volume discount rates and bulk listings.`
      ], 'reseller', {
        username: 'BloxSupplier_ID_Ltd',
        partnerName: 'BloxSupplier ID Ltd.',
        level: 'Gold Partner (Tier-3)',
        discountCode: 'GROWEE-GOLD-5',
        role: 'reseller',
        loggedIn: true
      });
    }

    else if (selectedRole === 'merchant') {
      if (!email.trim() || !password.trim()) {
        setErrorMessage('⚠️ Admin email and security key are required.');
        return;
      }
      if (email.trim() !== 'admin@growee.store' || password !== 'groweeseller2026') {
        setErrorMessage('❌ Invalid Admin credentials. Please use the Autofill shortcut.');
        return;
      }
      
      triggerMockAuth([
        `[Admin] Initializing secure telemetry handshake core...`,
        `[Admin] Authentication validation: 256-bit ECDHE encryption check.`,
        `[Admin] Verified ID: Jihan Caesar (Account: admin@growee.store)`,
        `[LiveOps] Establishing connection to simulated digital inflation registers.`,
        `[Success] All metrics unlocked! Initializing SaaS manager dashboard.`
      ], 'merchant', {
        email: email.trim(),
        name: 'Jihan Caesar',
        role: 'merchant',
        loggedIn: true
      });
    }
  };

  const triggerMockAuth = (logs: string[], role: 'gamer' | 'reseller' | 'merchant', finalUserData: any) => {
    setIsAuthenticating(true);
    setAuthLogs([]);
    
    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx < logs.length) {
        setAuthLogs(prev => [...prev, logs[currentLogIdx]]);
        currentLogIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAuthenticating(false);
          onLoginSuccess(role, finalUserData);
          onNotification(`Access synchronized to ${role === 'gamer' ? 'Gamer Shop' : role === 'reseller' ? 'Reseller Hub' : 'Merchant Portal'}!`);
        }, 500);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center relative overflow-hidden font-sans py-12 px-4 selection:bg-[#cca350]/30 select-none">
      
      {/* Absolute Ambient Background Lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-950/20 blur-[120px] pointer-events-none"></div>
      
      {/* Tech grid mesh background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      {/* Main Content Card Container */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left Aspect: Brand, Pitch & Live Performance Telemetry */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-8 p-6 sm:p-8 bg-slate-900/65 backdrop-blur-xl border border-slate-800 rounded-3xl shrink-0">
          
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#cca350] via-[#ffd68a] to-[#b38f36] flex items-center justify-center shadow-lg shadow-amber-950/40 border border-amber-300/30">
                <Crown className="w-6 h-6 text-slate-950 animate-pulse fill-slate-950/10" />
              </div>
              <div>
                <h1 className="font-display font-black text-xl tracking-wider text-white uppercase leading-none">
                  Growee Store
                </h1>
                <span className="text-[9px] font-mono text-amber-400 font-extrabold block tracking-widest uppercase mt-1">SAAS AUTOMATION PLATFORM</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans font-medium">
              A premium Cloud-Native digital commerce solution resolving peer-to-peer scams using automated, password-less Roblox item trade server nodes.
            </p>
          </div>

          {/* SaaS Lean Canvas USP Highlight Cards */}
          <div className="space-y-3.5">
            <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-950/40 border border-teal-800/30 flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Instant Bot Dispatch</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Automated queue checks trigger in-game follow-delivery within 30 seconds.</p>
              </div>
            </div>

            <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-950/40 border border-indigo-800/30 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">No Account Takeover Phishing</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">We route strictly via public names. Your Roblox password is never requested or stored.</p>
              </div>
            </div>

            <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-950/40 border border-amber-800/30 flex items-center justify-center shrink-0 mt-0.5">
                <Cpu className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Inflation Monitor Engine</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Sinks & source virtual economy telemetry feeds dynamic Flash Sales dynamically.</p>
              </div>
            </div>
          </div>

          {/* Simulated Node Stats footer */}
          <div className="pt-4 border-t border-slate-800/70 flex justify-between items-center text-[10px] font-mono text-slate-500 font-bold shrink-0">
            <div className="flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>SERVERS: ONLINE</span>
            </div>
            <span>UAS CLOUD V1.4</span>
          </div>

        </div>

        {/* Right Aspect: Portal selector & Authentication fields */}
        <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          
          <div className="space-y-6">
            
            {/* Upper Gate Indicator */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-sm font-mono font-extrabold text-amber-500 uppercase tracking-wider">Gateway Synchronization</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Select your designated node entry and verify security keys.</p>
              </div>
            </div>

            {/* Selector Grid (3 roles) */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleRoleSelect('gamer')}
                disabled={isAuthenticating}
                className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  selectedRole === 'gamer'
                    ? 'bg-amber-950/40 border-[#cca350] text-[#ffdf9e] shadow'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="text-[10.5px] font-extrabold tracking-wide">Gamer Shop</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('reseller')}
                disabled={isAuthenticating}
                className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  selectedRole === 'reseller'
                    ? 'bg-purple-950/40 border-purple-500 text-purple-200 shadow'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span className="text-[10.5px] font-extrabold tracking-wide">Reseller Hub</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('merchant')}
                disabled={isAuthenticating}
                className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  selectedRole === 'merchant'
                    ? 'bg-blue-950/40 border-blue-500 text-blue-200 shadow'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <LockKeyhole className="w-4 h-4" />
                <span className="text-[10.5px] font-extrabold tracking-wide">SaaS Portal</span>
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-950/30 border border-red-900/50 text-red-400 text-[11px] p-3 rounded-xl font-bold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login fields and Terminal logs inside AnimatePresence */}
            <div className="relative min-h-[190px]">
              <AnimatePresence mode="wait">
                
                {!isAuthenticating ? (
                  <motion.form
                    key="fields-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleLoginSubmit}
                    className="space-y-4"
                  >
                    {/* Gamer Mode Fields */}
                    {selectedRole === 'gamer' && (
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Roblox Username (Public Profile Name)</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
                          <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g. BloxWarrior_2026"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-[#cca350] rounded-xl pl-11 pr-4 py-3 text-xs text-slate-200 font-mono font-bold placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#cca350]/20"
                          />
                        </div>
                        <div className="flex justify-between items-center text-[9.5px] mt-1 text-slate-500 font-mono">
                          <span>✨ Test Account: <span className="text-amber-400 font-bold bg-amber-950/20 px-1.5 py-0.5 rounded">BloxWarrior_2026</span></span>
                          <span>🔒 No password required!</span>
                        </div>
                      </div>
                    )}

                    {/* Reseller Partner Fields */}
                    {selectedRole === 'reseller' && (
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Reseller Wholesaler Passcode</label>
                        <div className="relative">
                          <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
                          <input
                            type="text"
                            required
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            placeholder="GROWEE-WHOLESALE-VIP"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl pl-11 pr-4 py-3 text-xs text-purple-200 font-mono font-bold placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500/20"
                          />
                        </div>
                        <div className="text-[9.5px] text-slate-500 font-mono mt-1">
                          ✨ Valid Passcode: <span className="text-purple-400 font-bold bg-purple-950/20 px-1.5 py-0.5 rounded">GROWEE-WHOLESALE-VIP</span>
                        </div>
                      </div>
                    )}

                    {/* Merchant Administrator Fields */}
                    {selectedRole === 'merchant' && (
                      <div className="space-y-3.5">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Admin E-mail Signature</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. admin@growee.store"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-xs text-blue-200 font-semibold placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Administrative Security Key</label>
                          <div className="relative">
                            <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
                            <input
                              type="password"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••••••••"
                              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-xs text-blue-200 font-mono placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                            />
                          </div>
                        </div>
                        
                        <div className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-3 text-[10px] font-mono text-blue-300 space-y-1.5">
                          <div className="flex justify-between">
                            <span>📧 Admin Email:</span>
                            <span className="font-bold text-white selection:bg-blue-500/30">admin@growee.store</span>
                          </div>
                          <div className="flex justify-between">
                            <span>🔑 Admin Password:</span>
                            <span className="font-bold text-white selection:bg-blue-500/30">groweeseller2026</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Connect Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#cca350] to-[#b38f36] hover:from-[#b38f36] hover:to-[#906b12] text-slate-950 font-black py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-950/20 border border-amber-400/40 uppercase tracking-wider"
                    >
                      Authenticate and Enter Platform <ArrowRight className="w-4 h-4 stroke-[3px]" />
                    </button>
                  </motion.form>
                ) : (
                  
                  /* REAL-TIME ENCRYPTED TERMINAL HANDSHAKE */
                  <motion.div
                    key="handshake-logs"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="space-y-3"
                  >
                    <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 shadow-inner">
                      <div className="text-[10px] text-amber-500 border-b border-slate-800 pb-1.5 flex items-center gap-2 mb-2.5 font-bold font-mono">
                        <Terminal className="w-4 h-4 animate-pulse text-amber-400" />
                        <span>sec_handshake_auth.sh</span>
                        <span className="ml-auto flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                      </div>
                      <div className="space-y-1.5 h-32 overflow-y-auto pr-1 text-[9px] font-mono leading-relaxed text-slate-400">
                        {authLogs.map((log, index) => (
                          <div key={index} className="text-slate-300 font-medium flex items-start gap-1">
                            <span className="text-[#cca350] shrink-0 font-extrabold">&gt;</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2.5 px-1 py-1 text-slate-400 justify-center">
                      <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                      <span className="text-[10px] font-semibold text-slate-400 font-mono">Processing signature verification handshake ...</span>
                    </div>
                  </motion.div>
                )}
                
              </AnimatePresence>
            </div>

          </div>

          {/* Quick Demo Autofill Switchboard */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 bg-slate-950/30 rounded-2xl p-4 text-center space-y-2.5">
            <span className="text-[10px] font-mono text-amber-500 uppercase font-black tracking-widest block">🎓 Academic Evaluation Area</span>
            <p className="text-[10px] text-slate-400 max-w-sm mx-auto font-medium">Bypass manual parameters completely. Click below to load simulated, pre-configured accounts immediately into memory.</p>
            
            <button
              type="button"
              onClick={handleAutofill}
              disabled={isAuthenticating}
              className="w-full bg-slate-950/80 hover:bg-slate-900 border border-[#cca350]/30 hover:border-[#cca350]/65 text-[10.5px] font-extrabold text-amber-300 py-2.5 rounded-lg cursor-pointer transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4.5 h-4.5 text-amber-400 shrink-0" />
              Autofill Selected Profile Template
            </button>
          </div>

        </div>

      </div>

      {/* Floating background noise / visual touch */}
      <div className="absolute bottom-6 left-6 text-[10px] font-mono text-slate-600 font-black tracking-wider flex items-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5" /> SECURE GATEWAY ENFORCED
      </div>
    </div>
  );
}
