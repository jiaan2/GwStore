import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Building2, Users, Bot, ShoppingCart, Library, ShieldCheck, 
  HelpCircle, Sparkles, Server, Zap, ArrowUpRight, Crown, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents import
import { Marketplace } from './src/components/Marketplace';
import { AntiScamWidget } from './src/components/AntiScamWidget';
import { GrowthFunnel } from './src/components/GrowthFunnel';
import { SellerSaaS } from './src/components/SellerSaaS';
import { GroweeChatbot } from './src/components/GroweeChatbot';
import { HubLogin } from './src/components/HubLogin';
import { GatewayLounge } from './src/components/GatewayLounge';
import { WebhookLog } from './src/types';

function App() {
  const [activeTab, setActiveTab] = useState<'buyer' | 'wholesale' | 'seller'>('buyer');
  const [isVip, setIsVip] = useState<boolean>(false); // starts as regular, premium gets unlocked dynamically on subscriber/partner sync
  const [exchangeRate, setExchangeRate] = useState<number>(105); // base Rp multiplier per Robux package
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Individual Hub Persona Session states
  const [gamerUser, setGamerUser] = useState<{ username: string; balance: number; avatar: string; loggedIn: boolean } | null>(null);
  const [resellerUser, setResellerUser] = useState<{ username: string; partnerName: string; level: string; discountCode: string; loggedIn: boolean } | null>(null);
  const [merchantUser, setMerchantUser] = useState<{ email: string; name: string; role: string; loggedIn: boolean } | null>(null);

  const triggerNotification = (message: string) => {
    setNotifications(prev => [...prev, message]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 4000);
  };

  const handleTriggerWebhook = (newLog: WebhookLog) => {
    setWebhookLogs(prev => [...prev, newLog]);
  };

  const isPreAuthenticated = gamerUser !== null || resellerUser !== null || merchantUser !== null;

  const handleGatewaySuccess = (role: 'gamer' | 'reseller' | 'merchant', userData: any) => {
    if (role === 'gamer') {
      setGamerUser(userData);
      setActiveTab('buyer');
    } else if (role === 'reseller') {
      setResellerUser(userData);
      setIsVip(true);
      setActiveTab('wholesale');
    } else if (role === 'merchant') {
      setMerchantUser(userData);
      setIsVip(true);
      setActiveTab('seller');
    }
  };

  return (
    <div className="min-h-screen bg-[#f1ebff] text-[#1c1924] flex flex-col font-sans selection:bg-[#cca350]/35 selection:text-white">
      
      {/* Top Notification Stack */}
      <div className="fixed top-5 right-5 z-50 space-y-2 pointer-events-none max-w-sm">
        <AnimatePresence>
          {notifications.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className="bg-white/95 backdrop-blur border-l-4 border-[#cca350] text-[#2d0082] p-4 rounded-r-xl shadow-2xl flex items-start gap-3 pointer-events-auto border border-[#cca350]/20"
            >
              <Sparkles className="w-5 h-5 text-[#cca350] shrink-0 mt-0.5 animate-pulse" />
              <div className="text-[12px] font-sans pr-4 font-semibold">{note}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {!isPreAuthenticated ? (
          <motion.div
            key="gateway-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <GatewayLounge 
              onLoginSuccess={handleGatewaySuccess} 
              onNotification={triggerNotification} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="app-main-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* Primary Header/Console Info bar */}
            <header className="bg-white/90 backdrop-blur border-b-2 border-[#e6cca0] sticky top-0 z-40 px-4 py-3 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand / Business Title */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e6c15c] to-[#b38f36] flex items-center justify-center shadow-md shadow-[#b38f36]/20 border border-[#fff2cc]">
              <Crown className="w-5 h-5 text-[#fff8e7] fill-[#fff2cc]/20 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-lg tracking-wider text-[#3c1e82] uppercase text-left m-0 leading-none">
                  Growee Store
                </h1>
                <span className="bg-[#b38f36] text-white text-[8px] font-mono tracking-wider font-extrabold uppercase px-1.5 py-0.5 rounded border border-[#e6c15c]">
                  SaaS v1.4
                </span>
              </div>
              <p className="text-[10px] text-purple-900/60 font-sans tracking-wide mt-1">Roblox virtual commerce automation platform</p>
            </div>
          </div>

          {/* Action Center (Navigation & Session Badge) */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
            {/* Tab Navigation Menu (Targeting segmented business model roles) */}
            <nav className="flex flex-wrap items-center gap-1 bg-[#ecdfff] border border-[#d6c2fc] rounded-xl p-1 w-full sm:w-auto overflow-x-auto">
              
              {/* Buyer tab */}
              <button
                onClick={() => {
                  if (gamerUser) {
                    setActiveTab('buyer');
                  } else {
                    triggerNotification("Access denied. Please disconnect your current session first.");
                  }
                }}
                disabled={!gamerUser}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  gamerUser ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                } ${
                  activeTab === 'buyer'
                    ? 'bg-gradient-to-r from-[#cca350] to-[#b38f36] text-white shadow-md font-bold border border-[#f0d995]'
                    : 'text-[#4e3f6d] hover:text-[#2d1252]'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Gamer Shop</span>
                {!gamerUser && <span className="text-[9px] font-mono opacity-80">(Locked)</span>}
              </button>

              {/* Wholesale tab */}
              <button
                onClick={() => {
                  if (resellerUser) {
                    setActiveTab('wholesale');
                  } else {
                    triggerNotification("Access denied. Please disconnect your current session first.");
                  }
                }}
                disabled={!resellerUser}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  resellerUser ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                } ${
                  activeTab === 'wholesale'
                    ? 'bg-gradient-to-r from-[#cca350] to-[#b38f36] text-white shadow-md font-bold border border-[#f0d995]'
                    : 'text-[#4e3f6d] hover:text-[#2d1252]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Reseller Hub</span>
                {!resellerUser && <span className="text-[9px] font-mono opacity-80">(Locked)</span>}
              </button>

              {/* Seller/Merchant admin dashboard tab */}
              <button
                onClick={() => {
                  if (merchantUser) {
                    setActiveTab('seller');
                  } else {
                    triggerNotification("Access denied. Please disconnect your current session first.");
                  }
                }}
                disabled={!merchantUser}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  merchantUser ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                } ${
                  activeTab === 'seller'
                    ? 'bg-gradient-to-r from-[#cca350] to-[#b38f36] text-white shadow-md font-bold border border-[#f0d995]'
                    : 'text-[#4e3f6d] hover:text-[#2d1252]'
                }`}
              >
                <Server className="w-4 h-4" />
                <span>Merchant Portal</span>
                {!merchantUser && <span className="text-[9px] font-mono opacity-80">(Locked)</span>}
              </button>
              
            </nav>

            {/* Dynamic Active Session Badge */}
            <div className="flex items-center gap-2 bg-[#f4efff] border border-[#ebdfff] rounded-xl px-3 py-1.5 shrink-0 shadow-sm text-xs w-full sm:w-auto justify-center select-none">
              {activeTab === 'buyer' && gamerUser ? (
                <div className="flex items-center gap-2 animate-fadeIn text-left">
                  <img src={gamerUser.avatar} alt="gamer avatar" className="w-5.5 h-5.5 rounded-full border border-[#cca350] object-cover shrink-0" />
                  <div className="leading-none">
                    <p className="font-mono font-bold text-[#2d0082] text-[11px] truncate max-w-[85px]">{gamerUser.username}</p>
                    <span className="text-[8px] text-[#cca350] font-mono font-black">{gamerUser.balance} R$</span>
                  </div>
                </div>
              ) : activeTab === 'wholesale' && resellerUser ? (
                <div className="flex items-center gap-1.5 animate-fadeIn text-left">
                  <span className="text-[11px] shrink-0">🛡️</span>
                  <div className="leading-none">
                    <p className="font-mono font-extrabold text-[#2d0082] text-[11px] truncate max-w-[95px]">{resellerUser.username}</p>
                    <span className="text-[8.5px] text-[#cca350] font-sans font-black uppercase tracking-wider">Gold Reseller</span>
                  </div>
                </div>
              ) : activeTab === 'seller' && merchantUser ? (
                <div className="flex items-center gap-1.5 animate-fadeIn text-left">
                  <span className="text-[11px] shrink-0">👑</span>
                  <div className="leading-none">
                    <p className="font-sans font-extrabold text-emerald-950 text-[11px] truncate max-w-[95px]">{merchantUser.name}</p>
                    <span className="text-[8.5px] text-emerald-700 font-mono font-black">SAAS OWNER</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-purple-900/40 font-semibold text-[10.5px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                  <span>Credentials Locked</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Anti-Scam Bot delivery status widget shown at a critical global level for all buyers & suppliers to observe */}
        <AntiScamWidget 
          isVip={isVip} 
          webhookLogs={webhookLogs} 
          onTriggerWebhook={handleTriggerWebhook} 
        />

        {/* Tab views with animated transitions */}
        <AnimatePresence mode="wait">
          {activeTab === 'buyer' && (
            <motion.div
              key="buyer-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Marketplace intro hero */}
              <div className="bg-gradient-to-br from-white to-[#f7f2ff] border-2 border-dashed border-[#cca350] rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="space-y-2 max-w-xl">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#947419] bg-[#fffbf0] border border-[#e6cca0] px-2 py-1 rounded">
                    ★ Active Roblox & Fisch Segment
                  </span>
                  <h2 className="font-display font-extrabold text-xl tracking-tight text-[#2d0082] sm:text-2xl mt-2">
                    Robux & Legendary Game Treasures
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Immediate automatic in-game items exchange using custom bot servers. No password requirements, no waiting intervals, and complete protection from trading fraud in Roblox, Fisch, and other major open worlds.
                  </p>
                </div>
                
                {/* Micro safety indicator badge */}
                <div className="bg-white border border-[#e6cca0] rounded-xl p-4 flex items-center gap-3 shrink-0 shadow-sm">
                  <ShieldCheck className="w-8 h-8 text-[#cca350] shrink-0" />
                  <div>
                    <h6 className="text-xs font-bold text-slate-800">100% Privacy Gateway</h6>
                    <p className="text-[10px] text-slate-500 mt-0.5">Passwordless API transfers only</p>
                  </div>
                </div>
              </div>

              {!gamerUser ? (
                <div className="py-4">
                  <HubLogin 
                    mode="gamer" 
                    onLoginSuccess={(user) => setGamerUser(user)} 
                    onNotification={triggerNotification} 
                  />
                </div>
              ) : (
                <>
                  {/* Gamer Active Member Sync Card */}
                  <div className="bg-[#f2fcf5] border-2 border-emerald-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fadeIn">
                    <div className="flex items-center gap-3.5">
                      <img 
                        src={gamerUser.avatar} 
                        alt="Roblox User Avatar" 
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-full border-2 border-[#cca350] object-cover shadow-sm bg-amber-50 shrink-0" 
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs font-mono font-extrabold text-emerald-950 uppercase tracking-wider">Connected Gamer Handle:</h4>
                          <span className="bg-[#3c1e82] text-white text-[11px] font-mono leading-none font-extrabold px-2 py-1 rounded shadow-sm font-bold">
                            {gamerUser.username}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-emerald-800 font-mono font-bold mt-1.5 flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                          Exchange Sync: Ready | Simulated Account Balance: <span className="text-[#b38f36] font-extrabold text-[11px]">{gamerUser.balance} Robux</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setGamerUser(null);
                        triggerNotification("Linked Roblox gamer account disconnected.");
                      }}
                      className="cursor-pointer bg-white hover:bg-rose-50 text-[10.5px] font-extrabold text-rose-600 border border-rose-200 hover:border-rose-300 px-4 py-2 rounded-xl transition-all shrink-0 shadow-sm"
                    >
                      Disconnect Profile
                    </button>
                  </div>

                  {/* Core responsive shop component */}
                  <Marketplace 
                    isVip={isVip} 
                    exchangeRate={exchangeRate} 
                    onTriggerWebhook={handleTriggerWebhook} 
                    onNotification={triggerNotification} 
                    gamerUser={gamerUser}
                  />
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'wholesale' && (
            <motion.div
              key="wholesale-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Wholesaler introductory info */}
              <div className="bg-gradient-to-br from-white to-[#f8f5ff] border border-[#cca350] rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="space-y-2 max-w-xl">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#947419] bg-[#fffbf0] border border-[#e6cca0] px-2 py-1 rounded">
                    ★ Wholesale Resellers Segment
                  </span>
                  <h2 className="font-display font-extrabold text-xl tracking-tight text-[#2d0082] sm:text-2xl mt-1">
                    Bulk Digital Inventory Procurement Portal
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Designed for digital power traders and gaming wholesalers. Buy batches of Robux packages or rare Fisch game items at heavy volume discount rates directly dispensed by our regional node clusters.
                  </p>
                </div>

                <div className="bg-white border-2 border-[#cca350] rounded-xl p-4 shrink-0 text-center shadow-sm">
                  <div className="text-[10px] text-slate-500 font-mono uppercase">Wholesale Volume index</div>
                  <div className="text-xl font-mono font-black text-[#2d0082] mt-1">Rp 76 - Rp 85</div>
                  <span className="text-[9px] text-amber-800/70 font-mono block mt-1 font-bold">Active batch exchange limits</span>
                </div>
              </div>

              {!resellerUser ? (
                <div className="py-4">
                  <HubLogin 
                    mode="reseller" 
                    onLoginSuccess={(user) => {
                      setResellerUser(user);
                      setIsVip(true); // Auto-elevate reseller partner to VIP premium state
                    }} 
                    onNotification={triggerNotification} 
                  />
                </div>
              ) : (
                <>
                  {/* Wholesaler Partner Level Card */}
                  <div className="bg-[#fffdf5] border-2 border-[#e6cca0] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fadeIn">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-full bg-amber-50 border border-[#cca350] sm:flex items-center justify-center shrink-0 hidden text-xl shadow-inner">💰</div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs font-mono font-extrabold text-amber-950 uppercase tracking-wider">Authorized Corp Wholesaler:</h4>
                          <span className="bg-amber-100 text-amber-900 border border-[#cca350] text-[11px] font-mono leading-none font-bold px-2 py-1 rounded shadow-sm">
                            {resellerUser.partnerName}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-amber-700 font-sans mt-1.5 font-semibold">
                          ✨ Partner Level: <span className="text-purple-950 font-black">{resellerUser.level}</span> | Discount: <span className="bg-[#4e3f6d] text-white px-1.5 py-0.5 rounded text-[9.5px]">5% Contract Rate</span> | Coupon Applied: <span className="font-mono font-bold text-[#b38f36]">{resellerUser.discountCode}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setResellerUser(null);
                        setIsVip(false); // Restore standard non-VIP status if not logged as merchant either
                        triggerNotification("Partner bulk session disconnected.");
                      }}
                      className="cursor-pointer bg-white hover:bg-rose-50 text-[10.5px] font-extrabold text-rose-600 border border-rose-200 hover:border-rose-300 px-4 py-2 rounded-xl transition-all shrink-0 shadow-sm"
                    >
                      Revoke Credentials
                    </button>
                  </div>

                  {/* Catalog filtered precisely to wholesale bulk items */}
                  <Marketplace 
                    isVip={isVip} 
                    exchangeRate={exchangeRate} 
                    onTriggerWebhook={handleTriggerWebhook} 
                    onNotification={triggerNotification} 
                    gamerUser={gamerUser}
                  />
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'seller' && (
            <motion.div
              key="seller-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* SaaS Controls Header */}
              <div className="bg-gradient-to-br from-white to-[#f7f2ff] border border-[#d6c2fc] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-5.5 h-5.5 text-[#cca350] hover:text-[#b38f36] cursor-pointer animate-pulse fill-[#cca350]/10" />
                    <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#2d0082] tracking-wide">
                      Merchant Hub & Growee Cloud Infrastructure
                    </h2>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Welcome, Digital Merchant & Veteran Player. This is your live cloud console where you monitor funnel metrics, adjust index catalogs, set automated economy turnover rates, and handle withdrawals.
                  </p>
                </div>

                {/* Switcher to simulate VIP Active on and off state so evaluators can inspect regular vs premium states */}
                <div className="flex items-center gap-3 bg-white border border-[#cca350] rounded-xl p-2.5 shadow-sm">
                  <span className="text-xs font-mono font-bold text-[#2d0082]">Simulate VIP Account:</span>
                  <button
                    onClick={() => {
                      setIsVip(!isVip);
                      triggerNotification(isVip ? "Simulating regular account status" : "Simulating premium VIP merchant account status");
                    }}
                    className={`cursor-pointer text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg transition-all ${
                      isVip
                        ? 'bg-gradient-to-r from-[#cca350] to-[#b38f36] text-white shadow shadow-purple-200 border border-[#f0d995]'
                        : 'bg-slate-200 text-slate-650 hover:text-slate-900'
                    }`}
                  >
                    {isVip ? 'VIP Mode (UNLOCKED)' : 'Normal Mode (PREMIUM LOCKED)'}
                  </button>
                </div>
              </div>

              {!merchantUser ? (
                <div className="py-4">
                  <HubLogin 
                    mode="merchant" 
                    onLoginSuccess={(user) => {
                      setMerchantUser(user);
                      setIsVip(true); // Server host qualify as VIP
                    }} 
                    onNotification={triggerNotification} 
                  />
                </div>
              ) : (
                <>
                  {/* Active Admin Session Status Banner */}
                  <div className="bg-[#f0f4ff] border-2 border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fadeIn">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-300 flex items-center justify-center text-blue-600 shrink-0 text-xl shadow-inner">👑</div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs font-mono font-extrabold text-[#2d0082] uppercase tracking-wider">Subscribed Merchant:</h4>
                          <span className="bg-blue-100 text-blue-900 border border-blue-300 text-[11px] font-mono leading-none font-bold px-2 py-1 rounded shadow-sm">
                            {merchantUser.name} ({merchantUser.email})
                          </span>
                        </div>
                        <p className="text-[10.5px] text-blue-750 font-sans mt-1.5 font-semibold flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#cca350] animate-ping"></span>
                          Node Status: Southeast-Asia Core Active | SaaS Subscribed Plan: <span className="font-extrabold text-[#947419]">VIP Reseller Executive (Rp 29.000/mo)</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMerchantUser(null);
                        setIsVip(false);
                        triggerNotification("Secure administrator session ended.");
                      }}
                      className="cursor-pointer bg-white hover:bg-rose-50 text-[10.5px] font-extrabold text-rose-600 border border-rose-200 hover:border-rose-300 px-4 py-2 rounded-xl transition-all shrink-0 shadow-sm"
                    >
                      Term Admin Session
                    </button>
                  </div>

                  {/* CRM Conversion Funnels, Sink vs Source and Smart Churn Systems */}
                  <GrowthFunnel onNotification={triggerNotification} />

                  {/* Exchange rate Sliders and zero fee drawers */}
                  <SellerSaaS 
                    isVip={isVip} 
                    onVipToggle={setIsVip} 
                    exchangeRate={exchangeRate} 
                    onExchangeRateChange={setExchangeRate}
                    onNotification={triggerNotification}
                  />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Elegant minimalist footer */}
      <footer className="bg-transparent border-t border-[#e2d5fc]/60 px-4 py-8 text-center text-xs text-purple-900/70 mt-12 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Growee Store. Final Term Project UAS Cloud Computing. All Roblox brand assets reserved.</p>
          <div className="flex gap-4 font-mono text-[10px]">
            <span className="text-[#a58129] font-bold">Node Cluster: Ready</span>
            <span className="text-purple-300">-</span>
            <span className="text-emerald-600 font-bold">Security Gate: Active</span>
          </div>
        </div>
      </footer>

      {/* Floating interactive Growee Chatbot AI Assistant */}
      <GroweeChatbot />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
