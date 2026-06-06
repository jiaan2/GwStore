import { useState } from 'react';
import { 
  Search, Shield, CheckCircle, Smartphone, Flame, ShoppingBag, 
  UserCheck, CreditCard, Sparkles, Terminal, ChevronRight, X, Grid, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, WebhookLog } from '../types';

interface MarketplaceProps {
  isVip: boolean;
  exchangeRate: number; // dynamically adjusts prices
  onTriggerWebhook: (log: WebhookLog) => void;
  onNotification: (message: string) => void;
  gamerUser?: { username: string; balance: number; avatar: string; loggedIn: boolean } | null;
}

const DEFAULT_PRODUCTS: Product[] = [
  // Robux Packages (Price influenced by exchange rate directly)
  { id: 'rbx-400', name: '400 Robux Package', category: 'robux', originalPrice: 400, image: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=150&auto=format&fit=crop&q=60&ixlib=rb-1.2.1', isFeatured: true, stock: 12000 },
  { id: 'rbx-1000', name: '1,000 Robux Bundle', category: 'robux', originalPrice: 1000, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=60&ixlib=rb-1.2.1', isFeatured: true, stock: 4800 },
  { id: 'rbx-5000', name: '5,000 Robux Wholesale', category: 'robux', originalPrice: 5000, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&auto=format&fit=crop&q=60&ixlib=rb-1.2.1', isFeatured: false, stock: 950 },
  
  // Fisch Items (Fixed virtual worth but scales on currency)
  { id: 'fisch-kraken', name: 'Kraken Claw (Fisch Legendary Item)', category: 'fisch', originalPrice: 150, image: 'https://images.unsplash.com/photo-1551269901-5c5e14c30d74?w=150&auto=format&fit=crop&q=60&ixlib=rb-1.2.1', isFeatured: true, stock: 45 },
  { id: 'fisch-reel', name: 'Carbon Fiber Reel', category: 'fisch', originalPrice: 90, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=60&ixlib=rb-1.2.1', isFeatured: false, stock: 82 },
  { id: 'fisch-bait', name: 'Abyssal Bait Pack x50', category: 'fisch', originalPrice: 45, image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&auto=format&fit=crop&q=60&ixlib=rb-1.2.1', isFeatured: false, stock: 200 },

  // Wholesaler items
  { id: 'bulk-10k', name: '10,000 Robux Bulk Reseller Pack', category: 'wholesale', originalPrice: 10000, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&auto=format&fit=crop&q=60&ixlib=rb-1.2.1', isFeatured: true, stock: 300 },
  { id: 'bulk-fisch-kraken-x10', name: 'Kraken Claw Bulk Bundle (x10)', category: 'wholesale', originalPrice: 1200, image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&auto=format&fit=crop&q=60&ixlib=rb-1.2.1', isFeatured: false, stock: 15 },
];

export function Marketplace({ isVip, exchangeRate, onTriggerWebhook, onNotification, gamerUser }: MarketplaceProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'robux' | 'fisch' | 'wholesale'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Checkout simulator state
  const [robloxUsername, setRobloxUsername] = useState('');
  const [paymentStep, setPaymentStep] = useState<'details' | 'qris' | 'processing' | 'completed'>('details');
  const [selectedEwallet, setSelectedEwallet] = useState<'gopay' | 'dana' | 'ovo' | 'qris'>('qris');
  const [checkoutError, setCheckoutError] = useState('');
  const [webhookLogList, setWebhookLogList] = useState<string[]>([]);

  // Function to calculate final price dynamically using the slider to show immediate integration
  const calculatePrice = (product: Product): number => {
    if (product.category === 'robux') {
      return (product.originalPrice * exchangeRate) / 100 * 100; // Rp price relative to rate per Robux scale
    } else if (product.category === 'wholesale') {
      return (product.originalPrice * exchangeRate) / 100 * 95; // 5% bulk discount
    } else {
      return product.originalPrice * 300; // standard fixed conversion multiplier
    }
  };

  // Build filtered products list
  const filteredProducts = DEFAULT_PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reorder so featured/VIP items are pinned to the top row
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (isVip) {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
    }
    return 0;
  });

  const handleOpenCheckout = (product: Product) => {
    setSelectedProduct(product);
    setRobloxUsername(gamerUser?.loggedIn ? gamerUser.username : '');
    setPaymentStep('details');
    setCheckoutError('');
    setWebhookLogList([]);
  };

  const handleProceedToPayment = () => {
    if (!robloxUsername.trim()) {
      setCheckoutError('⚠️ Your public Roblox username is required.');
      return;
    }
    setCheckoutError('');
    setPaymentStep('qris');
  };

  // Trigger simulated payment success & real-time webhook flow representation
  const handleSimulatePaymentSuccess = () => {
    setPaymentStep('processing');
    onNotification("Simulating QRIS code scan. Dispatching immediate webhook payload!");

    const logs = [
      `[1] Dispatching instant webhook verify to https://api.growee.store/payment/webhook`,
      `[2] Webhook received! Signature verified for e-wallet ${selectedEwallet.toUpperCase()}`,
      `[3] Triggering Robot Delivery Node dispatch flow...`,
      `[4] Priority routing check completed: ${isVip ? 'VIP Queue bypassed (Direct Action <30s!)' : 'Standard deployment queue verified'}`,
      `[5] ${isVip ? 'VIP_BotNode_04' : 'GroweeBot-01'} joining player node for target account: "${robloxUsername}"`,
      `[6] Roblox automated transaction finalized securely in-game. Total wait time: 14.2s!`
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        const nextLogMsg = logs[currentLogIndex];
        setWebhookLogList(prev => [...prev, nextLogMsg]);
        
        onTriggerWebhook({
          timestamp: new Date().toLocaleTimeString(),
          type: currentLogIndex === 1 ? 'success' : 'info',
          message: nextLogMsg
        });

        currentLogIndex++;
      } else {
        clearInterval(interval);
        setPaymentStep('completed');
        onNotification(`Successfully delivered ${selectedProduct?.name} to user: ${robloxUsername}!`);
      }
    }, 900);
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Category Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 border border-[#e2d5fc] rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none py-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-[#cca350] to-[#b38f36] text-white border-[#f0d995] shadow-sm'
                : 'bg-[#fcfcff] text-[#4e3f6d] border-[#ebdfff] hover:text-[#2d1252]'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setActiveCategory('robux')}
            className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'robux'
                ? 'bg-gradient-to-r from-[#cca350] to-[#b38f36] text-white border-[#f0d995] shadow-sm'
                : 'bg-[#fcfcff] text-[#4e3f6d] border-[#ebdfff] hover:text-[#2d1252]'
            }`}
          >
            Robux Rates
          </button>
          <button
            onClick={() => setActiveCategory('fisch')}
            className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'fisch'
                ? 'bg-gradient-to-r from-[#cca350] to-[#b38f36] text-white border-[#f0d995] shadow-sm'
                : 'bg-[#fcfcff] text-[#4e3f6d] border-[#ebdfff] hover:text-[#2d1252]'
            }`}
          >
            Fisch Game Items
          </button>
          <button
            onClick={() => setActiveCategory('wholesale')}
            className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'wholesale'
                ? 'bg-gradient-to-r from-[#cca350] to-[#b38f36] text-white border-[#f0d995] shadow-sm'
                : 'bg-[#fcfcff] text-[#4e3f6d] border-[#ebdfff] hover:text-[#2d1252]'
            }`}
          >
            Wholesale Packs
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search virtual catalogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#e2d5fc] rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#cca350] placeholder-slate-400 font-medium shadow-inner"
          />
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
        {sortedProducts.map((product) => {
          const adjustedPrice = calculatePrice(product);
          const isBoosted = isVip && product.isFeatured;

          return (
            <motion.div
              layoutId={product.id}
              key={product.id}
              className={`rounded-2xl border p-4 flex flex-col justify-between transition-all group relative overflow-hidden shadow-sm ${
                isBoosted 
                  ? 'bg-gradient-to-br from-[#fffdfa] to-[#fcfcfe] border-2 border-[#cca350] shadow shadow-[#cca350]/15' 
                  : 'bg-white border-[#e2d5fc] hover:border-[#cca350]'
              }`}
            >
              {isBoosted && (
                <span className="absolute top-3 right-3 bg-gradient-to-r from-[#cca350] to-[#b38f36] text-white text-[8px] font-mono tracking-wider font-extrabold uppercase px-2 py-0.5 rounded shadow shadow-[#cca350]/10 border border-[#fff2cc]">
                  ★ VIP Featured Boost
                </span>
              )}

              <div className="space-y-3">
                {/* Product image mockup */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-purple-50 border border-[#e2d5fc] shadow-inner">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <span className="absolute bottom-2 left-2 bg-black/60 text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded text-white capitalize">
                    {product.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h5 className="font-display font-bold text-[13px] tracking-wide text-[#2d0082] line-clamp-2">
                    {product.name}
                  </h5>
                  
                  {/* Stock Tracker */}
                  <div className="text-[10px] text-slate-500 font-mono">
                    Stock: <span className="text-slate-800 font-bold">{product.stock.toLocaleString()} units</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#f3e8ff]">
                <div className="flex flex-col">
                  {product.category === 'robux' && (
                    <span className="text-[9px] text-[#cca350] font-mono font-bold leading-none block mb-0.5">
                      Rate: Rp {exchangeRate}
                    </span>
                  )}
                  <span className="text-[13px] font-mono font-black text-emerald-700 leading-none">
                    Rp {adjustedPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => handleOpenCheckout(product)}
                  className="bg-gradient-to-r from-[#cca350] to-[#b38f36] hover:from-[#b38f36] hover:to-[#9a700f] text-white py-2 px-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-bold shadow-sm text-[10.5px] border border-[#f0d995]"
                >
                  Fast Buy <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12 bg-white border border-[#e2d5fc] rounded-2xl shadow-sm text-slate-500 font-medium">
          <p className="text-sm">No active products match your category or query index.</p>
        </div>
      )}

      {/* 100% Privacy Checkout Modal Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (paymentStep !== 'processing') setSelectedProduct(null); }}
              className="absolute inset-0 bg-[#120e22]"
            ></motion.div>

            {/* Content modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white border-2 border-[#cca350] rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl z-10 text-slate-800"
            >
              
              {/* Closable X header */}
              <div className="flex items-center justify-between p-4 border-b border-[#f0e8ff] bg-[#fffdfa]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#cca350]" />
                  <span className="text-xs font-mono font-extrabold text-amber-900/80 uppercase tracking-wider">Express Security Checkout</span>
                </div>
                {paymentStep !== 'processing' && (
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="text-slate-400 hover:text-slate-705 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                )}
              </div>

              {/* Steps Layout */}
              <div className="p-5">

                {paymentStep === 'details' && (
                  <div className="space-y-4">
                    <div className="bg-[#fbf9ff] border border-[#d6c2fc]/50 p-3 rounded-xl flex items-center gap-3 shadow-inner">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 overflow-hidden border border-[#d6c2fc]/70 shrink-0">
                        <img src={selectedProduct.image} alt={selectedProduct.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-[#2d0082]">{selectedProduct.name}</h6>
                        <span className="text-sm font-mono font-black text-emerald-700">Rp {calculatePrice(selectedProduct).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* username text input */}
                    <div className="space-y-2">
                      <label className="text-xs text-slate-700 font-bold block">
                        Roblox / Fisch Public Username:
                      </label>
                      <input
                        type="text"
                        value={robloxUsername}
                        onChange={(e) => setRobloxUsername(e.target.value)}
                        placeholder="Public Game Username only"
                        className="w-full bg-white border border-[#e2d5fc] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-[#cca350] focus:border-[#cca350] placeholder-zinc-400 font-mono font-semibold"
                      />
                      
                      {checkoutError && (
                        <p className="text-[11px] text-red-600 font-bold">{checkoutError}</p>
                      )}

                      {/* Explicit 100% Secure micro-text disclaimer */}
                      <div className="bg-amber-50/50 border border-[#e6cca0] text-[#906b12] p-3 rounded-xl flex items-start gap-2.5 mt-2">
                        <Shield className="w-4 h-4 text-[#cca350] shrink-0 mt-0.5" />
                        <div className="text-[10.5px] leading-relaxed">
                          <span className="font-extrabold text-amber-950 bg-amber-100 border border-[#cca350]/30 rounded px-1.5 py-0.5 w-max mb-1.5 uppercase tracking-wider text-[8px] block">100% secure platform</span>
                          Growee Store NEVER requires your Roblox password. We route automated items safely via Join-Follow cluster nodes. Keep credentials entirely private!
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleProceedToPayment}
                      className="w-full bg-gradient-to-r from-[#cca350] to-[#b38f36] hover:from-[#b38f36] hover:to-[#906b12] text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow shadow-[#cca350]/20 border border-[#f0d995]"
                    >
                      Verify Username & Select Payment <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {paymentStep === 'qris' && (
                  <div className="space-y-4">
                    <div className="text-center space-y-1">
                      <h6 className="text-[13px] font-bold text-slate-800">Simulated QRIS Payment Gate</h6>
                      <p className="text-[11px] text-slate-500 uppercase font-mono font-semibold">Invoice Ref: GRW-{Math.floor(100000 + Math.random() * 900000)}</p>
                    </div>

                    {/* Custom Styled QRIS Render Box */}
                    <div className="flex flex-col items-center">
                      <div className="bg-white p-3.5 rounded-xl border-2 border-[#cca350] relative shadow-sm">
                        <div className="w-36 h-36 bg-slate-900 rounded border-2 border-[#cca350] flex items-center justify-center text-white flex-col gap-1 relative overflow-hidden">
                          <div className="absolute top-1 left-2 text-[8px] font-sans text-amber-400 tracking-wider font-extrabold uppercase">QRIS Growee</div>
                          
                          {/* Inner qr grid imitation */}
                          <div className="grid grid-cols-4 gap-2.5">
                            <div className="w-5 h-5 bg-white border border-black rounded"></div>
                            <div className="w-5 h-5 bg-[#cca350] rounded"></div>
                            <div className="w-5 h-5 bg-[#b38f36] rounded"></div>
                            <div className="w-5 h-5 bg-white border border-black rounded"></div>
                            <div className="w-5 h-5 bg-indigo-500 rounded"></div>
                            <div className="w-5 h-5 bg-purple-400 rounded"></div>
                            <div className="w-5 h-5 bg-white border border-black rounded"></div>
                            <div className="w-5 h-5 bg-indigo-700 rounded"></div>
                          </div>
                          <span className="text-[8px] font-mono font-bold text-slate-200 bg-black/60 px-1 py-0.5 rounded uppercase mt-2">Scan with E-wallet</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-700 font-bold mt-2 font-mono text-center">Amount Due: <span className="text-[#2d0082]">Rp {calculatePrice(selectedProduct).toLocaleString()}</span></div>
                    </div>

                    {/* Integrated E-Wallet Switchboard */}
                    <div className="grid grid-cols-4 gap-1.5">
                      {['qris', 'gopay', 'dana', 'ovo'].map((wallet) => (
                        <button
                          key={wallet}
                          onClick={() => setSelectedEwallet(wallet as any)}
                          className={`text-[9px] font-mono font-extrabold uppercase p-2 border rounded-lg transition-colors cursor-pointer text-center ${
                            selectedEwallet === wallet
                              ? 'bg-amber-50 text-[#906b12] border-2 border-[#cca350] font-black'
                              : 'bg-white text-slate-500 border-[#e2d5fc]'
                          }`}
                        >
                          {wallet}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleSimulatePaymentSuccess}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Smartphone className="w-4 h-4" />
                      Simulate Payment Success & Fire Webhook
                    </button>
                  </div>
                )}

                {paymentStep === 'processing' && (
                  <div className="space-y-4 py-2">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <RefreshCw className="w-8 h-8 text-[#cca350] animate-spin" />
                      <h6 className="text-xs font-bold text-[#b38f36] uppercase tracking-widest font-mono">Running Webhook Node Pipeline</h6>
                      <p className="text-[10px] text-slate-500">Connecting payment database in real-time...</p>
                    </div>

                    {/* Terminal execution log */}
                    <div className="bg-[#faf6ff] border border-[#e2d5fc] rounded-xl p-3 font-mono shadow-inner">
                      <div className="text-[10px] text-[#cca350] border-b border-[#e2d5fc] pb-1.5 flex items-center gap-1.5 mb-2 font-bold">
                        <Terminal className="w-4 h-4 text-[#cca350]" />
                        <span>payment-webhook-pipeline.sh</span>
                      </div>
                      <div className="space-y-1 h-32 overflow-y-auto pr-1 text-[9.5px]">
                        {webhookLogList.map((log, i) => (
                          <div key={i} className="text-[#4e3a70] leading-relaxed font-mono font-medium">
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {paymentStep === 'completed' && (
                  <div className="space-y-4 text-center py-4">
                    <div className="w-14 h-14 bg-emerald-50 border border-emerald-500 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce shadow-sm">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-1">
                      <h5 className="font-display font-black text-sm text-[#2d0082]">Bot Dispatch Successful!</h5>
                      <p className="text-[11px] text-emerald-700 font-mono font-bold">100% Automated transaction completed (<span className="text-indigo-950 font-black">Takes &lt;30s</span>)</p>
                    </div>

                    <div className="bg-amber-50/40 border border-[#cca350]/30 rounded-xl p-3 text-left space-y-1 font-mono text-[10.5px] text-slate-700 max-w-sm mx-auto shadow-sm">
                      <div><span className="text-slate-500">Username:</span> <span className="font-bold text-slate-800">{robloxUsername}</span></div>
                      <div><span className="text-slate-500">Game Item:</span> <span className="font-bold text-slate-800">{selectedProduct.name}</span></div>
                      <div><span className="text-slate-500">Status:</span> Delivered Successfully</div>
                      <div><span className="text-slate-500">Signature:</span> <span className="text-[#9a700f] font-bold">0xGrowee{Math.floor(1000 + Math.random() * 9000)}Bts</span></div>
                    </div>

                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white py-2 px-6 rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      Back to Marketplace
                    </button>
                  </div>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
