import { useState, useEffect } from 'react';
import { 
  BarChart, TrendingUp, Users, DollarSign, Wallet, ShieldAlert, 
  Flame, ToggleLeft, ToggleRight, Sparkles, Send, Percent, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FunnelMetric, ChurnMetric } from '../types';

interface GrowthFunnelProps {
  onNotification: (message: string) => void;
}

const FUNNEL_DATA: FunnelMetric[] = [
  { stage: '1. Platform Visitors', count: 12000, percentage: 100, color: 'bg-gradient-to-r from-[#cca350] to-[#b38f36]' },
  { stage: '2. Configurator Engagement', count: 5400, percentage: 45, color: 'bg-gradient-to-r from-purple-500 to-indigo-500' },
  { stage: '3. QRIS Generated', count: 2640, percentage: 22, color: 'bg-[#9862ff]' },
  { stage: '4. Webhook Conversions', count: 840, percentage: 7, color: 'bg-[#cca350]' },
];

const INITIAL_CHURN_DATA: ChurnMetric[] = [
  { username: 'SlayerRoblox', lastActiveDays: 9, risk: 'High', lastTransaction: 'Bought Kraken Claw - Rp 15k' },
  { username: 'KrakenTrader', lastActiveDays: 8, risk: 'High', lastTransaction: 'Resell Batch Robux - Rp 29k' },
  { username: 'LuffyGamer', lastActiveDays: 7, risk: 'High', lastTransaction: 'Robux Pack 1000 - Rp 120k' },
  { username: 'BloxSupplier_ID', lastActiveDays: 12, risk: 'High', lastTransaction: 'Fisch Bait Batch - Rp 75k' }
];

export function GrowthFunnel({ onNotification }: GrowthFunnelProps) {
  // LiveOps Simulator state
  const [liveOpsActive, setLiveOpsActive] = useState(false);
  const [sourceCoins, setSourceCoins] = useState(1850000);
  const [sinkCoins, setSinkCoins] = useState(1200000);
  const [inflationIndex, setInflationIndex] = useState(154.2);
  const [liveOpsLogs, setLiveOpsLogs] = useState<string[]>([]);

  // Retention state
  const [churnUsers, setChurnUsers] = useState<ChurnMetric[]>(INITIAL_CHURN_DATA);
  const [couponsDispatched, setCouponsDispatched] = useState(false);

  // Economy simulation interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (liveOpsActive) {
      setLiveOpsLogs(prev => ["[LiveOps API] Auto Flash Sale active: Burning speculative source coins...", ...prev.slice(0, 3)]);
      interval = setInterval(() => {
        setSourceCoins(prev => {
          const reduction = Math.floor(Math.random() * 5000) + 8000;
          const nextVal = Math.max(1280000, prev - reduction);
          return nextVal;
        });
        setSinkCoins(prev => {
          const addition = Math.floor(Math.random() * 3000) + 4000;
          return prev + addition;
        });
      }, 1500);
    } else {
      interval = setInterval(() => {
        setSourceCoins(prev => prev + Math.floor(Math.random() * 2000) - 800);
        setSinkCoins(prev => prev + Math.floor(Math.random() * 800) - 300);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [liveOpsActive]);

  // Recalculate Inflation Index
  useEffect(() => {
    const ratio = (sourceCoins / sinkCoins) * 100;
    setInflationIndex(Number(ratio.toFixed(1)));
    if (liveOpsActive && ratio < 110) {
      setLiveOpsActive(false);
      onNotification("Virtual economy stabilized at equilibrium!");
      setLiveOpsLogs(prev => ["[LiveOps API] Inflation stabilized. Flash Sale concluded.", ...prev.slice(0, 3)]);
    }
  }, [sourceCoins, sinkCoins, liveOpsActive]);

  const handleSendCoupons = () => {
    setCouponsDispatched(true);
    setChurnUsers(prev => prev.map(user => ({ ...user, risk: 'Low', savedByCoupon: true })));
    onNotification("Discount coupons sent! Saved high churn risk users.");
  };

  return (
    <div className="space-y-6 text-slate-800">
      
      {/* Target Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Rev Metric */}
        <div className="bg-white border border-[#e2d5fc] hover:border-[#cca350] rounded-xl p-4 flex flex-col justify-between shadow-sm transition-all">
          <div>
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider flex items-center justify-between font-bold">
              Gross Revenue
              <span className="text-emerald-600 font-sans font-bold text-xs flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +14.2%
              </span>
            </div>
            <div className="text-base sm:text-lg font-black text-[#2d0082] mt-1.5 font-mono">Rp 24.580.000</div>
            <p className="text-[10px] text-slate-500 mt-1">Target monthly GMV</p>
          </div>
        </div>

        {/* Users Metric */}
        <div className="bg-white border border-[#e2d5fc] hover:border-[#cca350] rounded-xl p-4 flex flex-col justify-between shadow-sm transition-all">
          <div>
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold">Total Active</div>
            <div className="text-base sm:text-lg font-black text-[#9862ff] mt-1.5 font-mono">12,000 players</div>
            <p className="text-[10px] text-slate-500 mt-1">Roblox & Fisch gamers</p>
          </div>
        </div>

        {/* ARPU */}
        <div className="bg-white border border-[#e2d5fc] hover:border-[#cca350] rounded-xl p-4 flex flex-col justify-between shadow-sm transition-all">
          <div>
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold">ARPU</div>
            <div className="text-base sm:text-lg font-black text-slate-700 mt-1.5 font-mono">Rp 2.042</div>
            <p className="text-[10px] text-slate-500 mt-1">Per engaged visitor</p>
          </div>
        </div>

        {/* ARPPU */}
        <div className="bg-white border border-[#e2d5fc] hover:border-[#cca350] rounded-xl p-4 flex flex-col justify-between shadow-sm transition-all">
          <div>
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold">ARPPU</div>
            <div className="text-base sm:text-lg font-black text-purple-700 mt-1.5 font-mono">Rp 29.167</div>
            <p className="text-[10px] text-slate-500 mt-1">Per paying player</p>
          </div>
        </div>

        {/* Conversion rate */}
        <div className="bg-white border border-[#e2d5fc] hover:border-[#cca350] rounded-xl p-4 flex flex-col justify-between col-span-2 lg:col-span-1 shadow-sm transition-all">
          <div>
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold">Conversion Ratio</div>
            <div className="text-base sm:text-lg font-black text-emerald-600 mt-1.5 font-mono">7.8%</div>
            <p className="text-[10px] text-slate-500 mt-1">Webhook payout rate</p>
          </div>
        </div>

      </div>

      {/* Main Analysis Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 1. Live Funnel Analytics Chart */}
        <div className="lg:col-span-7 bg-white border-2 border-[#e6cca0] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <BarChart className="w-5 h-5 text-[#cca350]" />
              <h4 className="font-display font-bold text-sm tracking-wide text-[#2d0082]">Live Funnel Analytics</h4>
            </div>
            <p className="text-xs text-slate-500 mb-5">Roblox Buyer Conversion Stream (SaaS Metric Model)</p>
          </div>

          <div className="space-y-4">
            {FUNNEL_DATA.map((item, idx) => {
              const countVal = idx === 3 ? 840 : (idx === 2 ? 2640 : (idx === 1 ? 5400 : 12000));
              const percentVal = item.percentage;
              return (
                <div key={item.stage} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono font-semibold">
                    <span className="text-slate-700">{item.stage}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600">{countVal.toLocaleString()} Users</span>
                      <span className="text-[#a58129] font-bold bg-amber-50 border border-[#e6cca0] px-1.5 py-0.5 rounded text-[10px]">{percentVal}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#f4ebff] rounded-full h-3 overflow-hidden border border-[#e2d5fc]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentVal}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full ${item.color} rounded-full`}
                    ></motion.div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-3 border-t border-[#f3e8ff] flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Overall Conversion: 7.0%</span>
            <span>Target Payout Threshold: 840 Validated Orders</span>
          </div>
        </div>

        {/* 2. Economy Turnover Ratio (Sink vs Source Simulator) */}
        <div className="lg:col-span-5 bg-white border-2 border-[#e6cca0] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#cca350]" />
                <h4 className="font-display font-bold text-sm tracking-wide text-[#2d0082]">Economy Turnover Ratio</h4>
              </div>

              {/* Toggle switch for LiveOps automation */}
              <button 
                onClick={() => setLiveOpsActive(!liveOpsActive)}
                className="flex items-center gap-1 text-xs cursor-pointer focus:outline-none"
              >
                <span className={`text-[10px] font-mono font-bold ${liveOpsActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {liveOpsActive ? 'Flash Sale ON' : 'Flash Sale OFF'}
                </span>
                {liveOpsActive ? (
                  <ToggleRight className="w-8 h-8 text-[#cca350]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-zinc-300" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">Balance virtual coins circulation to combat trade inflation</p>
          </div>

          {/* Simulator indicators */}
          <div className="space-y-4">
            
            {/* Index Display */}
            <div className="bg-[#faf6ff] border-2 border-[#e2d5fc] rounded-xl p-3 text-center shadow-inner">
              <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Virtual Inflation Index</div>
              <div className={`text-2xl font-mono font-black mt-1 tracking-tight ${
                inflationIndex > 130 ? 'text-[#b38f36] animate-pulse' : 'text-emerald-700'
              }`}>
                {inflationIndex}%
              </div>
              <p className="text-[10px] text-slate-600 mt-1 font-sans font-medium px-1">
                {inflationIndex > 130 ? '⚠️ High internal inflation index (Requires Flash Sale sink burning)' : '✅ Healthy circulation equilibrium reached'}
              </p>
            </div>

            {/* Source and Sink bars */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-white to-[#fbfbff] border border-[#e2d5fc] rounded-xl p-3 text-center shadow-sm">
                <div className="text-[9px] font-mono uppercase text-slate-500 font-bold">Source (Inflow)</div>
                <div className="text-sm font-black text-slate-800 font-mono mt-1">{sourceCoins.toLocaleString()}</div>
                <span className="text-[9px] text-[#cca350] font-mono font-bold">Coins Minted</span>
              </div>
              
              <div className="bg-gradient-to-br from-white to-[#fbfbff] border border-[#e2d5fc] rounded-xl p-3 text-center shadow-sm">
                <div className="text-[9px] font-mono uppercase text-purple-700 font-bold">Sink (Gold Burn)</div>
                <div className="text-sm font-black text-slate-800 font-mono mt-1">{sinkCoins.toLocaleString()}</div>
                <span className="text-[9px] text-[#b38f36] font-mono font-bold">Commission Burned</span>
              </div>
            </div>

            {/* LiveOps log console */}
            <div className="bg-[#faf6ff] border border-[#e2d5fc] rounded-xl p-2.5 font-mono text-[9px] text-slate-600 h-16 overflow-y-auto space-y-1 shadow-inner">
              {liveOpsLogs.length === 0 ? (
                <div className="text-slate-400 italic font-medium">[Status] Monitoring coin ratios... Toggle Flash Sale above to auto balance.</div>
              ) : (
                liveOpsLogs.map((log, offset) => (
                  <div key={offset} className={`font-semibold ${log.includes('active') ? 'text-[#cca350]' : 'text-slate-500'}`}>{log}</div>
                ))
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Smart Retention & Churn Panel */}
      <div className="bg-white border-2 border-[#e6cca0] rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#cca350]" />
              <h4 className="font-display font-bold text-sm tracking-wide text-[#2d0082]">Smart Retention & CRM Churn system</h4>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Detect inactive players (7+ days) & issue promotional recovery coupons</p>
          </div>

          <button
            onClick={handleSendCoupons}
            disabled={couponsDispatched}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 border shadow-sm ${
              couponsDispatched
                ? 'bg-[#e2fcd6] border-emerald-300 text-emerald-800 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#cca350] to-[#b38f36] hover:from-[#b38f36] hover:to-[#9a700f] text-white border-[#f0d995]'
            }`}
          >
            {couponsDispatched ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Coupons Dispatched & Saved
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Trigger In-App Retention Coupons
              </>
            )}
          </button>
        </div>

        {/* Churn Users Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {churnUsers.map((user, idx) => (
            <div 
              key={idx} 
              className={`p-3.5 rounded-xl border transition-all shadow-sm ${
                user.savedByCoupon 
                  ? 'bg-[#f4fdf0] border-emerald-300/60' 
                  : 'bg-gradient-to-br from-[#fbf8ff] to-[#f5eeff] border-[#e2d5fc]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-800">{user.username}</span>
                <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full ${
                  user.savedByCoupon
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-400/30'
                    : 'bg-red-100 text-red-700 border border-red-300/30 animate-pulse'
                }`}>
                  {user.savedByCoupon ? 'Saved & Active' : `${user.lastActiveDays}d Inactive`}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 mt-2">Last transaction:</div>
              <div className="text-[11px] text-slate-700 truncate font-sans font-medium">{user.lastTransaction}</div>
              {user.savedByCoupon && (
                <div className="text-[10px] text-emerald-700 font-extrabold mt-2 flex items-center gap-1">
                  <Percent className="w-3" /> Dispensed: -15% Flash Voucher
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
