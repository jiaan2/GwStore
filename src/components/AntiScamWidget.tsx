import { useState, useEffect } from 'react';
import { Bot, RefreshCw, Zap, Server, ShieldCheck, Activity, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { WebhookLog } from '../types';

interface AntiScamWidgetProps {
  isVip: boolean;
  webhookLogs: WebhookLog[];
  onTriggerWebhook: (log: WebhookLog) => void;
}

const BOT_NODES = [
  { id: 'GroweeBot-01', region: 'Roblox SEA-01', status: 'Idle', target: '-', type: 'Standard' },
  { id: 'GroweeBot-02', region: 'Roblox US-East', status: 'In Trade', target: 'MikuRoblox', type: 'Standard' },
  { id: 'GroweeBot-03', region: 'Roblox EU-West', status: 'Idle', type: 'Standard', target: '-' },
  { id: 'GroweeBot-VIP-01', region: 'Premium Nodes', status: 'Waiting Urgent', target: 'WholesaleKing', type: 'VIP Priority' },
];

export function AntiScamWidget({ isVip, webhookLogs, onTriggerWebhook }: AntiScamWidgetProps) {
  const [activeBots, setActiveBots] = useState(BOT_NODES);
  const [deliveryCounter, setDeliveryCounter] = useState(12.8);
  const [networkCapacity, setNetworkCapacity] = useState(100);

  // Simulate network changes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBots(prev => prev.map(bot => {
        if (Math.random() > 0.7) {
          const statuses = ['Idle', 'In Trade', 'Dispatching'];
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
          const gameUsernames = ['GamerPro99', 'BloxSupp', 'ResellMaster', 'RobuxHunter', 'KrakenFisch'];
          const randomUser = randomStatus !== 'Idle' ? gameUsernames[Math.floor(Math.random() * gameUsernames.length)] : '-';
          return { ...bot, status: randomStatus, target: randomUser };
        }
        return bot;
      }));
      setDeliveryCounter(prev => {
        const val = prev + (Math.random() * 2 - 1);
        return Math.max(9.5, Math.min(22.4, Number(val.toFixed(1))));
      });
      setNetworkCapacity(prev => Math.floor(95 + Math.random() * 5));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border-2 border-[#e6cca0] rounded-2xl p-6 shadow-md relative overflow-hidden text-slate-800">
      {/* Decorative pulse background */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-[#cca350]/10 rounded-full filter blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f0e8ff] pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#fffbf0] border border-[#cca350]/40 flex items-center justify-center text-[#cca350]">
            <Bot className="w-5.5 h-5.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-base tracking-wide text-[#2d0082]">Bot Delivery Network</h3>
              <span className="bg-emerald-50 border border-emerald-300 text-emerald-700 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase flex items-center gap-1 font-bold shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                Online
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Automated Roblox & Fisch In-Game Delivery Node Sync</p>
          </div>
        </div>

        {/* Speed latency gauge */}
        <div className="flex items-center gap-5">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase text-slate-500">Average Speed</div>
            <div className="text-lg font-mono font-black text-[#2d0082] flex items-center gap-1 justify-end">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              {deliveryCounter}s
            </div>
          </div>
          <div className="h-8 w-px bg-[#f0e8ff] hidden sm:block"></div>
          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-mono uppercase text-slate-500">Fast Queue</div>
            <div className="text-lg font-mono font-bold text-slate-700">
              {isVip ? (
                <span className="text-[#cca350] font-extrabold">Bypassed (0s wait)</span>
              ) : (
                <span className="font-semibold text-slate-700">No. 1 in Line</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Anti-Scam Verification Board */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="bg-gradient-to-br from-[#fbf8ff] to-[#f4eeff] border border-[#d6c2fc]/70 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase text-[#947419] tracking-wide">
              <ShieldCheck className="w-4 h-4 text-[#cca350]" />
              Anti-Scam Guard Active
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Traditional trade systems require password disclosures or high-risk manual handoffs, often resulting in credential theft and scam runaways.
            </p>
            <div className="bg-white border border-[#e6cca0] rounded-lg p-2.5 mt-3.5 flex items-start gap-2 shadow-sm">
              <Activity className="w-4 h-4 text-[#cca350] mt-0.5 shrink-0" />
              <div className="text-[11px] text-slate-650">
                <span className="text-[#2d0082] font-bold">Secure Delivery Loop:</span> We leverage custom Gamepass APIs & Join-Follow bot mechanics to finalize Roblox transfers in under <span className="text-slate-800 font-bold">30 seconds</span> simply via public Username reference.
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="bg-gradient-to-br from-white to-[#f7f2ff] border border-[#e2d5fc] rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Auto Gamepass API Gateway</div>
              <div className="text-lg font-black text-[#2d0082] mt-1">100% Automated</div>
              <div className="text-[10px] text-[#cca350] font-mono mt-0.5 font-bold">Zero Human Escrows</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[#fffbf0] border-2 border-[#cca350] flex items-center justify-center text-[#cca350] font-bold text-sm font-mono shadow-sm">
              {networkCapacity}%
            </div>
          </div>
        </div>

        {/* Bot Node Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Automated Bot Node Cluster</span>
            <span className="text-[10px] text-[#2d0082] font-mono flex items-center gap-1 select-none font-bold">
              <Server className="w-3 h-3 text-[#cca350]" />
              Nodes: {BOT_NODES.length} Active
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeBots.map((bot, i) => {
              const isBotVip = bot.type.toLowerCase().includes('vip');
              const isWorking = bot.status !== 'Idle';
              return (
                <div 
                  key={bot.id} 
                  className={`border rounded-xl p-3.5 transition-all flex items-center justify-between shadow-sm ${
                    isBotVip 
                      ? 'bg-gradient-to-br from-[#fffdf5] to-[#fcfcf0] border-2 border-[#cca350]' 
                      : 'bg-gradient-to-r from-white to-[#f7f3ff] border-[#e2d5fc]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isBotVip 
                        ? 'bg-[#fffbf0] border border-[#cca350] text-[#cca350]' 
                        : 'bg-[#f4eeff] border border-[#e2d5fc] text-purple-600'
                    }`}>
                      <Bot className={`w-4 h-4 ${isWorking ? 'animate-bounce' : ''}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800 font-mono">{bot.id}</span>
                        {isBotVip && (
                          <span className="bg-gradient-to-r from-[#cca350] to-[#b38f36] text-[8px] font-mono tracking-wider font-extrabold px-1.5 py-0.5 rounded text-white uppercase shadow-sm border border-[#fff2cc]">
                            VIP Priority
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <span className={`inline-block h-1.5 w-1.5 rounded-full ${
                          bot.status === 'Idle' ? 'bg-zinc-400' : 'bg-purple-500'
                        }`}></span>
                        Status: <span className="text-slate-700 font-medium">{bot.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 font-mono">Region</div>
                    <div className="text-xs font-semibold text-slate-700 font-mono mt-0.5">{bot.region}</div>
                    {isWorking && (
                      <div className="text-[9px] text-[#cca350] font-mono font-bold">➡ {bot.target}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mini simulation status log */}
          <div className="bg-[#faf6ff] border border-[#e2d5fc] rounded-xl p-3 font-mono shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-[#cca350] mb-2 pb-1 border-b border-[#e2d5fc] font-bold">
              <span className="flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" />
                Live Bot Delivery Console Logs
              </span>
              <span className="text-[9px] text-slate-400">Auto Scroll</span>
            </div>
            <div className="space-y-1.5 h-20 overflow-y-auto text-[10px] select-none text-[#4c3a70] pr-2">
              <div className="text-slate-500 flex justify-between">
                <span>[System] Synchronizing Roblox Gamepass API Gateway...</span>
                <span className="font-bold text-[#cca350]">Active</span>
              </div>
              
              {webhookLogs.length === 0 ? (
                <>
                  <div className="flex justify-between text-slate-500">
                    <span>[Bot] GroweeBot-01 awaiting next payment verification signal...</span>
                    <span>Awaiting</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>[AntiScam] Auto-Escrow watching node transactions... </span>
                    <span className="font-semibold text-purple-700">100% Guarded</span>
                  </div>
                </>
              ) : (
                webhookLogs.slice(-4).map((log, index) => {
                  let colorClass = "text-slate-700";
                  if (log.type === "success") colorClass = "text-emerald-700 font-semibold";
                  if (log.type === "warning") colorClass = "text-amber-700 font-semibold";
                  return (
                    <div key={index} className={`flex justify-between ${colorClass}`}>
                      <span>{log.message}</span>
                      <span>{log.timestamp}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
