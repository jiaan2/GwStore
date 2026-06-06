import { useState } from 'react';
import { 
  Crown, CheckCircle, HelpCircle, ArrowRight, ShieldCheck, 
  Settings, Percent, AlertTriangle, Coins, RefreshCw, Calculator, Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface SellerSaaSProps {
  isVip: boolean;
  onVipToggle: (val: boolean) => void;
  exchangeRate: number; // 70 to 130 Rp/Robux
  onExchangeRateChange: (val: number) => void;
  onNotification: (message: string) => void;
}

export function SellerSaaS({ 
  isVip, 
  onVipToggle, 
  exchangeRate, 
  onExchangeRateChange,
  onNotification 
}: SellerSaaSProps) {
  const [withdrawAmount, setWithdrawAmount] = useState<number>(350000);

  // Fee calculations
  const standardFeeRate = 0.055; // 5.5%
  const standardFlatFee = 6500; // Rp 6,500 Bank Transfer cost

  const standardDeduction = isVip ? 0 : Math.floor(withdrawAmount * standardFeeRate + standardFlatFee);
  const finalPayout = withdrawAmount - standardDeduction;

  const handleSubscribeVip = (activate: boolean) => {
    onVipToggle(activate);
    if (activate) {
      onNotification("Welcome to VIP SaaS! Premium Boosters & Rate Regulator unlocked!");
    } else {
      onNotification("Downgraded to Regular Account. Slider features locked.");
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      
      {/* SaaS Pricing & Activation Banner */}
      <div className="bg-gradient-to-r from-white via-[#f7f3ff] to-[#fffef0] border-2 border-[#e6cca0] rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#cca350]/5 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-7 space-y-3">
            <span className="bg-[#fffbf0] border border-[#cca350] text-[#cca350] text-[10px] font-mono tracking-wider font-extrabold px-2.5 py-1 rounded-full uppercase inline-flex items-center gap-1.5 shadow-sm">
              <Crown className="w-3.5 h-3.5" />
              Growee VIP Subscription Portal
            </span>
            <h3 className="font-display font-black text-xl sm:text-2xl text-[#2d0082] tracking-wide">
              Unlock the SaaS Premium VIP Plan
            </h3>
            <p className="text-xs text-slate-650 leading-relaxed max-w-xl">
              Ramp up Roblox revenue & wholesale automation pipelines. Priced at just <span className="text-[#a58129] font-bold">Rp 29.000/month</span> via Automatic Recurring Debet. Bypass queues, eliminate admin withdrawal penalties, and gain complete control over your catalog conversion rates.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
                <CheckCircle className="w-4 h-4 text-[#cca350] shrink-0" />
                <span>Zero Admin/Handling Fees</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
                <CheckCircle className="w-4 h-4 text-[#cca350] shrink-0" />
                <span>Exclusive Products Booster Priority</span>
              </div>
            </div>
          </div>

          {/* Plan Status Card Toggle */}
          <div className="md:col-span-5 bg-[#faf6ff] border-2 border-[#e2d5fc] rounded-2xl p-5 shadow-inner">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#ebdfff]">
              <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Subscription Level</div>
              <span className={`text-[10px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded ${
                isVip 
                  ? 'bg-amber-100 text-[#906b12] border border-[#cca350] font-black' 
                  : 'bg-slate-205 text-slate-600 border border-slate-300'
              }`}>
                {isVip ? 'SaaS VIP Tier Active' : 'Regular Store'}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-[#2d0082] font-mono">Rp 29.000</span>
                <span className="text-xs text-slate-500 font-bold">/ month</span>
              </div>

              {isVip ? (
                <button
                  onClick={() => handleSubscribeVip(false)}
                  className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer border border-slate-300 text-center"
                >
                  Downgrade to Free Tier (Simulate cancellation)
                </button>
              ) : (
                <button
                  onClick={() => handleSubscribeVip(true)}
                  className="w-full bg-gradient-to-r from-[#cca350] to-[#b38f36] hover:from-[#b38f36] hover:to-[#9a700f] text-white text-xs font-extrabold py-2.5 px-4 rounded-xl transition-all shadow border border-[#f0d995] cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  Activate VIP Plan (Rp 29.000/mo) <ArrowRight className="w-4 h-4" />
                </button>
              )}
              
              <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#cca350]" />
                Guaranteed safe recurring card check
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Main VIP Features Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Dynamic Slider Regulator component (Critical Component) */}
        <div className="lg:col-span-6 bg-white border-2 border-[#e6cca0] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-1.5 mb-5">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#cca350]" />
              <h4 className="font-display font-bold text-sm tracking-wide text-[#2d0082]">VIP Slider Regulator</h4>
            </div>
            <p className="text-xs text-slate-500">
              Only VIP suppliers can dynamically change exchange rate multipliers to offset wholesale marketplace swings.
            </p>
          </div>

          {/* Slider Display Component */}
          <div className="bg-[#faf6ff] border-2 border-[#e2d5fc] rounded-xl p-5 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 uppercase font-bold">Live Robux Exchange Standard</span>
              <span className="text-xs font-mono font-bold text-[#2d0082]">Default base rate: 100 Rp</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] text-purple-950 uppercase font-extrabold">Dynamic Adjuster Slider:</span>
                <div className="text-lg font-mono font-black text-[#2d0082] flex items-baseline gap-1 bg-white px-3 py-1 rounded-md border border-[#cca350]">
                  <span className="text-[#a58129] font-sans text-xs">Rp</span> {exchangeRate}
                  <span className="text-xs text-slate-500 font-sans font-normal"> / Robux</span>
                </div>
              </div>

              {/* Slider Input */}
              <div className="relative pt-1">
                <input
                  type="range"
                  min="70"
                  max="130"
                  value={exchangeRate}
                  disabled={!isVip}
                  onChange={(e) => onExchangeRateChange(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none ${
                    isVip 
                      ? 'bg-gradient-to-r from-[#e6cca0] via-[#cca350] to-[#9a700f] accent-[#cca350]' 
                      : 'bg-[#faf6ff] accent-gray-400 cursor-not-allowed'
                  }`}
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1 px-1 font-bold">
                  <span>Economic Min: Rp 70</span>
                  <span>Equilibrium: Rp 100</span>
                  <span>Premium Max: Rp 130</span>
                </div>
              </div>
            </div>

            {/* Locked feature overlay conditional display */}
            {!isVip ? (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg flex items-start gap-2.5 shadow-sm">
                <AlertTriangle className="w-4 h-4 text-[#cca350] shrink-0 mt-0.5" />
                <div className="text-[11px] text-[#906b12] leading-normal">
                  <span className="font-bold text-amber-950 block mb-0.5">Slider Regulator Locked</span>
                  You must upgrade to the SaaS Premium VIP Plan to unlock manual rate adjustment sliders. Your current rate is locked at standard Rp 100 per Robux.
                </div>
              </div>
            ) : (
              <div className="p-3 bg-[#fdfdf7] border border-[#e6cca0] rounded-lg flex items-start gap-2.5 shadow-sm">
                <CheckCircle className="w-4.5 h-4.5 text-[#cca350] shrink-0 mt-0.5 animate-pulse" />
                <div className="text-[11px] text-[#a58129] leading-normal font-medium">
                  <span className="font-extrabold text-amber-950 block mb-0.5">Exchange Rate Adjuster Active!</span>
                  Drag the slider to adjust conversion multipliers in real-time. This changes Roblox Robux & Fisch Kraken item package pricing across your store catalog instantly.
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-[10px] text-slate-500 flex items-center gap-1.5 font-mono font-bold">
            <RefreshCw className="w-3.5 h-3.5 text-[#cca350]" />
            Live sync: instant pricing adjustments triggered globally.
          </div>
        </div>

        {/* Right: Zero withdrawal fees simulator (Admin Fee Deduction Solution) */}
        <div className="lg:col-span-6 bg-white border-2 border-[#e6cca0] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-1.5 mb-5">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#cca350]" />
              <h4 className="font-display font-bold text-sm tracking-wide text-[#2d0082]">Zero Withdrawal Fee Checker</h4>
            </div>
            <p className="text-xs text-slate-500 font-sans">
              Test how withdrawal fees drain digital microservices compared to our absolute 100% free VIP extraction.
            </p>
          </div>

          {/* Interactive Calculator Box */}
          <div className="bg-[#faf6ff] border border-[#e2d5fc] rounded-xl p-4.5 space-y-4 shadow-inner">
            
            {/* Input field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Simulate Transfer Value (Rp)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-[#cca350]">Rp</span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Math.max(10000, Number(e.target.value)))}
                  className="w-full bg-white border-2 border-[#e2d5fc] focus:border-[#cca350] focus:ring-1 focus:ring-[#cca350] rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none font-mono font-bold"
                  placeholder="Enter withdrawal sum"
                />
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-[11px] font-mono border-t border-b border-[#e2d5fc] py-3 font-semibold">
              <div className="flex justify-between">
                <span className="text-slate-500">Requested Withdrawal</span>
                <span className="text-slate-800">Rp {withdrawAmount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-slate-500 flex items-center gap-1">
                  E-wallet admin fees (5.5%)
                  {!isVip && <span className="text-rose-600 font-bold">*</span>}
                </span>
                <span className={isVip ? 'text-slate-400 line-through' : 'text-rose-600 font-bold'}>
                  Rp {(withdrawAmount * standardFeeRate).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500 flex items-center gap-1">
                  Inter-bank flat escrow
                  {!isVip && <span className="text-rose-600 font-bold">*</span>}
                </span>
                <span className={isVip ? 'text-slate-400 line-through' : 'text-rose-600 font-bold'}>
                  Rp {standardFlatFee.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Final Outcome Payout Display */}
            <div className="flex items-center justify-between bg-white rounded-xl p-3 border border-[#cca350]">
              <div>
                <div className="text-[9px] text-slate-500 uppercase font-mono font-bold">Net Paid Amount</div>
                <div className="text-base font-black text-emerald-700 font-mono mt-0.5">Rp {finalPayout.toLocaleString()}</div>
              </div>
              
              <div className="text-right">
                <div className="text-[9px] text-slate-500 uppercase font-mono font-bold">Total Deducted</div>
                <div className="text-xs font-bold text-rose-600 font-mono mt-0.5">Rp {standardDeduction.toLocaleString()}</div>
              </div>
            </div>

            {/* Comparative CTA banner info */}
            {isVip ? (
              <div className="text-[10px] text-emerald-800 bg-[#fdfdf7] border border-emerald-300 p-2.5 rounded-lg flex items-center gap-1.5 shadow-sm font-medium">
                <Sparkles className="w-4 h-4 shrink-0 text-[#cca350]" />
                <span><span className="font-extrabold text-[#2d0082]">SaaS VIP Savings Activated!</span> You are preserving Rp {Number(withdrawAmount * standardFeeRate + standardFlatFee).toLocaleString()} on this single transfer!</span>
              </div>
            ) : (
              <div className="text-[10px] text-[#906b12] bg-amber-50 border border-amber-300/80 p-2.5 rounded-lg font-medium shadow-sm">
                <span className="font-extrabold text-amber-950">Withholding Alert:</span> Upgrade to Growee VIP Platform to completely eliminate transfer penalties and bypass payment withdrawal admin costs.
              </div>
            )}

          </div>

          <div className="mt-4 text-[10px] text-[#906b12] bg-amber-50/50 border border-[#e6cca0]/80 rounded-lg p-2.5 flex items-center gap-2 font-semibold">
            <Coins className="w-4.5 h-4.5 text-[#cca350] shrink-0" />
            <span>VIP Sellers receive 100.00% payout instantly to any bank/e-wallet option.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
