import { useState } from 'react';
import { 
  User, ShieldCheck, KeyRound, LockKeyhole, ArrowRight, Sparkles, 
  RefreshCw, Terminal, CheckCircle, HelpCircle, Loader2, Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HubLoginProps {
  mode: 'gamer' | 'reseller' | 'merchant';
  onLoginSuccess: (userData: any) => void;
  onNotification: (message: string) => void;
}

export function HubLogin({ mode, onLoginSuccess, onNotification }: HubLoginProps) {
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorHeader, setErrorHeader] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authLogs, setAuthLogs] = useState<string[]>([]);

  // Random preset avatars to personalize the gamer session
  const GAMER_AVATARS = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80'
  ];

  const handleAutofill = () => {
    setErrorHeader('');
    if (mode === 'gamer') {
      setUsername('BloxWarrior_2026');
    } else if (mode === 'reseller') {
      setPasscode('GROWEE-WHOLESALE-VIP');
    } else if (mode === 'merchant') {
      setEmail('admin@growee.store');
      setPassword('groweeseller2026');
    }
    onNotification("Demo credentials autofilled!");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorHeader('');

    if (mode === 'gamer') {
      if (!username.trim() || username.trim().length < 3) {
        setErrorHeader('⚠️ Roblox Username must be at least 3 characters long.');
        return;
      }
      if (/[^a-zA-Z0-9_]/.test(username)) {
        setErrorHeader('⚠️ Roblox Username can only contain letters, numbers, and underscores.');
        return;
      }
      triggerMockAuth([
        `[Sync] Pinging Roblox Server Node Cluster asia-southeast...`,
        `[Sync] Username lookup matching "${username}"... Found!`,
        `[Sync] Verifying join-follow compatibility: READY`,
        `[Access] Building temporary session secure handshake...`,
        `[Success] Profile loaded with 0 active payment disputes.`
      ], {
        username: username.trim(),
        balance: 1450, // Simulated Points
        avatar: GAMER_AVATARS[Math.floor(Math.random() * GAMER_AVATARS.length)],
        role: 'gamer',
        loggedIn: true
      });
    }

    else if (mode === 'reseller') {
      if (!passcode.trim()) {
        setErrorHeader('⚠️ Reseller Partner Passcode is required.');
        return;
      }
      if (passcode.trim().toUpperCase() !== 'GROWEE-WHOLESALE-VIP') {
        setErrorHeader('❌ Invalid Partner Passcode. Use autofill for evaluation.');
        return;
      }
      triggerMockAuth([
        `[Licensing] Requesting authorization for Passcode: GROWEE-WHOLESALE-VIP...`,
        `[Licensing] Match found in Regional Distributor database.`,
        `[Security] Verifying SaaS Wholesaler volume allocation limits...`,
        `[Security] Signature verified: BloxSupplier ID Ltd. (Tier-3 Authorized)`,
        `[Success] Wholesale Bulk Catalog prices unlocked with 5% baseline discount.`
      ], {
        username: 'BloxSupplier_ID_Ltd',
        partnerName: 'BloxSupplier ID Ltd.',
        level: 'Gold Partner (Tier-3)',
        discountCode: 'GROWEE-GOLD-5',
        role: 'reseller',
        loggedIn: true
      });
    }

    else if (mode === 'merchant') {
      if (!email.trim() || !password.trim()) {
        setErrorHeader('⚠️ Email and password are both required.');
        return;
      }
      // Simple verification for proposal demonstration
      if (email.trim() !== 'admin@growee.store' || password !== 'groweeseller2026') {
        setErrorHeader('❌ Invalid Email or Password. Tap Autofill below for quick credentials.');
        return;
      }
      triggerMockAuth([
        `[Auth] Connecting to Growee Core secure admin gateway...`,
        `[Auth] Session signature check: SSL_ECDHE_RSA_WITH_AES_256...`,
        `[Access] Checking corporate database permissions for admin role...`,
        `[Access] Verified Admin Jihan Caesar (UID: 10421)`,
        `[Success] Full SaaS live metrics, inflation regulators, and webhooks unlocked.`
      ], {
        email: email.trim(),
        name: 'Jihan Caesar',
        role: 'merchant',
        loggedIn: true
      });
    }
  };

  const triggerMockAuth = (logs: string[], finalUserData: any) => {
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
          onLoginSuccess(finalUserData);
          onNotification(`Successfully logged in to ${mode === 'gamer' ? 'Gamer Shop' : mode === 'reseller' ? 'Reseller Hub' : 'Merchant Portal'}!`);
        }, 500);
      }
    }, 450);
  };

  return (
    <div className="bg-white border-2 border-[#e6cca0] rounded-2xl p-6 sm:p-8 max-w-md mx-auto shadow-md relative overflow-hidden animate-fadeIn">
      {/* Visual top border glow */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#cca350] via-[#ffd68a] to-[#b38f36]"></div>

      <AnimatePresence mode="wait">
        {!isAuthenticating ? (
          <motion.div
            key="login-form-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Form Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center bg-[#fffbf0] border border-[#cca350] text-[#cca350] shadow-sm">
                {mode === 'gamer' && <User className="w-6 h-6" />}
                {mode === 'reseller' && <KeyRound className="w-6 h-6" />}
                {mode === 'merchant' && <LockKeyhole className="w-6 h-6" />}
              </div>
              
              <h3 className="font-display font-black text-base text-[#2d0082] uppercase tracking-wider">
                {mode === 'gamer' && 'Connect Gamer Profile'}
                {mode === 'reseller' && 'Unlock Partner Portal'}
                {mode === 'merchant' && 'Merchant Cloud Access'}
              </h3>
              
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto font-medium">
                {mode === 'gamer' && 'Enter your Roblox username to sync safe passwordless automated trade bot networks.'}
                {mode === 'reseller' && 'Access wholesale bulk inventory listings using your corporate partner authentication passcode.'}
                {mode === 'merchant' && 'Access the premium live administrative telemetry, economy indices, and webhook controls.'}
              </p>
            </div>

            {/* Error banner */}
            {errorHeader && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl font-bold flex items-start gap-2.5"
              >
                <span>{errorHeader}</span>
              </motion.div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {mode === 'gamer' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Roblox Username (Public only)</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. RobloxGamer2026"
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-[#cca350] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 font-mono font-bold placeholder-slate-400 focus:outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>
              )}

              {mode === 'reseller' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Wholesale Partner Passcode</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      required
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter licensed partner passkey"
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-[#cca350] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-850 font-mono font-bold placeholder-slate-400 focus:outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>
              )}

              {mode === 'merchant' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Admin Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. admin@growee.store"
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-[#cca350] rounded-xl px-4 py-2.5 text-xs text-slate-800 font-bold placeholder-slate-400 focus:outline-none transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Portal Security Password</label>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••••"
                        className="w-full bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-[#cca350] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 font-mono placeholder-slate-400 focus:outline-none transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#cca350] to-[#b38f36] hover:from-[#b38f36] hover:to-[#906b12] text-white font-extrabold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow shadow-[#cca350]/20 border border-[#f0d995]"
              >
                Connect & Synchronize Access <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Autofill Switchboard */}
            <div className="bg-[#fcfcff] border border-[#e2d5fc] rounded-xl p-3.5 text-center space-y-2">
              <span className="text-[10px] font-mono text-purple-950 uppercase font-extrabold tracking-wider block">🎓 Evaluation Assist</span>
              <p className="text-[10px] text-slate-500">Click below to bypass inputting manually and automatically load preset demo credentials.</p>
              
              <button
                type="button"
                onClick={handleAutofill}
                className="w-full bg-white hover:bg-purple-50 text-[10.5px] font-bold text-[#b38f36] hover:text-[#906b12] border border-[#cca350] py-2 rounded-lg cursor-pointer transition-colors shadow-sm inline-flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Autofill Test Profile
              </button>
            </div>

            {/* Micro security assurance footer */}
            <div className="flex items-center justify-center gap-1 text-[9.5px] text-slate-400 font-mono font-bold leading-none select-none">
              <ShieldCheck className="w-3.5 h-3.5 text-[#cca350]" />
              SECURE HANDSHAKE NODE VERIFIED (SSL 256-BIT)
            </div>
          </motion.div>
        ) : (
          /* Real-time Secure Handshake Logs View */
          <motion.div
            key="authenticating-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4 py-3"
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <Loader2 className="w-8 h-8 text-[#cca350] animate-spin" />
              <h4 className="font-display font-extrabold text-xs text-[#b38f36] uppercase tracking-widest font-mono">Securing Gateway Handshake</h4>
              <p className="text-[10px] text-slate-500 font-medium">Validating credentials against LiveOps nodes...</p>
            </div>

            {/* Mini Console window */}
            <div className="bg-[#FAF6FF] border border-[#e2d5fc] rounded-xl p-3 shadow-inner">
              <div className="text-[9.5px] text-[#cca350] border-b border-[#e2d5fc] pb-1.5 flex items-center gap-1.5 mb-2 font-bold font-mono">
                <Terminal className="w-3.5 h-3.5" />
                <span>growee-auth-client.sh</span>
              </div>
              <div className="space-y-1 h-36 overflow-y-auto pr-1 text-[9px] font-mono leading-relaxed">
                {authLogs.map((log, index) => (
                  <div key={index} className="text-[#3c1e82] font-semibold flex items-start gap-1">
                    <span className="text-[#cca350] shrink-0">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
