import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, X, Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  source?: string;
  timestamp: Date;
}

const FAQ_SUGGESTIONS = [
  { label: "🤖 How do delivery bots work?", query: "How does the automated bot trade system deliver items in Roblox and Fisch?" },
  { label: "💳 Roblox Username Privacy", query: "Is my Roblox account safe? Why don't you require my password?" },
  { label: "🌟 Explain CRM & VIP Perks", query: "What are the core benefits of SaaS Premium VIP Plan for resellers?" },
  { label: "📊 What is Source vs Sink Inflation?", query: "Explain the Sink vs Source economy simulation and how Growee stabilizes virtual inflation." },
];

export function GroweeChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: "Hi there! I am your Growee AI Assistant. I can help guide you through our Automated Bot Delivery Network, Roblox login safety, the VIP merchant features, and other details from our SaaS business proposal. How can I assist you today?",
      timestamp: new Date(),
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim() || isLoading) return;

    if (!customText) {
      setInputVal('');
    }

    const userMsg: ChatMessage = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY || (process.env as any).API_KEY;
      
      if (!apiKey || apiKey === "undefined") {
        // Fallback to offline educational assistant logic if API Key is not configured
        setTimeout(() => {
          let reply = "I am operating in educational demonstration mode. Here is an immediate explanation: ";
          
          const textLower = textToSend.toLowerCase();
          if (textLower.includes("bot") || textLower.includes("deliver")) {
            reply += "Our Anti-Scam Bot Delivery Network binds to Roblox Servers. When a user checks out with only their Username, our in-game bots automatically join their server node within 30 seconds to initiate safe trading, entirely eliminating manual scams!";
          } else if (textLower.includes("privacy") || textLower.includes("username") || textLower.includes("safe")) {
            reply += "Growee utilizes a 100% Privacy Gateway. Because item routing occurs in-game via Join-Follow, we NEVER require your password. All transactions are securely synchronized with public user handles, preventing phishing and account takeover leaks.";
          } else if (textLower.includes("vip") || textLower.includes("perk") || textLower.includes("saas")) {
            reply += "For Rp 29.000/month, SaaS VIP Perks provide Merchants: 1) Top placement in the dashboard feed; 2) Zero transaction handling fees when transferring funds; 3) Priority instant bot execution queueing; and 4) A flexible live exchange rate slider to automatically adjust package pricing in real-time.";
          } else if (textLower.includes("sink") || textLower.includes("source") || textLower.includes("inflation")) {
            reply += "Growee tracks the virtual economy turnover index. The Source (coins introduced by play) vs Sink (coins burned by item sales/fees) creates virtual inflation. When the index gets too high, our Flash Sale / LiveOps system runs automatic discounts to burn internal liquidity and balance asset values!";
          } else {
            reply += "Growee Store automates Roblox digital commerce. We solve peer-to-peer scams using automated bot delivery networks (<30s delivery), guarantee high privacy (zero password requirement), and empower local merchants with interactive SaaS platform dashboards and tools.";
          }
          
          setMessages(prev => [...prev, {
            sender: 'bot',
            text: reply,
            timestamp: new Date(),
            source: 'Demonstration Preset Context'
          }]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      // Initialize Gemini Client
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: textToSend,
        config: {
          systemInstruction: `You are the friendly Growee AI Assistant, an expert virtual commerce automation tutor for "Growee Store", a brand built on a Lean Canvas cloud-business proposal. 
          Respond using clean, structured, and easy-to-read formatting (markdown/lists where applicable). Keep your answer concise (under 2-3 paragraphs).

          Key features of Growee Store to draw from:
          1. Anti-Scam Bot Delivery: Automated transaction completion within 30 seconds using in-game bot nodes, bypassing peer-to-peer manual scams.
          2. Privacy Safeguard: Only public Roblox username is required. We NEVER ask for user password.
          3. Real-Time Webhooks: QRIS and e-wallets simulate payments which instantly trigger webhooks, triggering instant bot delivery.
          4. SaaS Premium VIP Plan (Rp 29.000/month): Featured listing boost, prioritized bot delivery, zero withdrawal fee deduction, and Dynamic Exchange Rate Slider Regulator.
          5. Inflation Engine (Sink vs Source): Monitors simulated virtual coins to automate Flash Sales and stabilize game catalogs.
          6. Target Customer Segments: Buyers, Wholesale/Bulk pricing resellers, and digital merchant suppliers.

          Help answer user inquiries by referencing elements in a professional, constructive presentation. Highlight that Growee Store perfectly automates transaction pipelines safely.`,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "I was unable to calculate an answer right now. Please select one of our preset questions for immediate answers!";
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: replyText,
        timestamp: new Date(),
        source: 'Gemini 3.5 LLM'
      }]);

    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "I encountered a network problem connecting to my server brain. Here is a quick summary of the Growee Bot Delivery Network: It fulfills Roblox orders in under 30 seconds directly in-game, requires no passwords, and includes state-of-the-art SaaS admin metrics!",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          id="btn-chatbot-toggle"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-gradient-to-r from-[#cca350] to-[#b38f36] text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer border border-[#f0d995] group"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform rotate-90 duration-300" />
          ) : (
            <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
          )}
          
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        </motion.button>
      </div>

      {/* Floating chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="panel-chatbot"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[550px] bg-white border-2 border-[#cca350] rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-white via-[#fcfbff] to-[#fffdf5] p-4 border-b border-[#e2d5fc] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-[#cca350] flex items-center justify-center text-[#cca350] shadow-sm">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-sm tracking-wide text-[#2d0082]">Growee AI Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-bold text-amber-700">Fast Auto-Delivery Guide</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#fbf8ff] via-white to-white">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-[#906b12] border border-amber-300 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                      🤖
                    </div>
                  )}
                  
                  <div className="flex flex-col max-w-[78%]">
                    <div
                      className={`p-3 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#cca350] to-[#b38f36] border border-[#f0d995] text-white rounded-tr-none shadow-sm font-semibold'
                          : 'bg-[#faf6ff] border border-[#e2d5fc] text-slate-800 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.source && (
                      <span className="text-[9px] text-slate-500 self-start mt-1 flex items-center gap-1 font-mono font-bold">
                        <Sparkles className="w-2.5 h-2.5 text-[#cca350]" />
                        Brain: {msg.source}
                      </span>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-[#4e3f6d] border border-purple-200 shrink-0 mt-0.5 text-xs font-bold font-mono">
                      👤
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-[#906b12] border border-amber-300 flex items-center justify-center shrink-0 animate-pulse text-xs font-bold font-mono">
                    🤖
                  </div>
                  <div className="p-3 bg-[#faf6ff] border border-[#e2d5fc] rounded-2xl rounded-tl-none shrink-0 flex items-center gap-1.5 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#cca350] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#cca350] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#cca350] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions FAQ Tray */}
            <div className="p-2 border-t border-[#e2d5fc] bg-[#fbf9ff] flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none shadow-inner">
              {FAQ_SUGGESTIONS.map((faq, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(faq.query)}
                  className="bg-white hover:bg-purple-50 text-[11px] text-slate-700 font-bold hover:text-[#2d0082] border border-[#e2d5fc] hover:border-[#cca350] rounded-full py-1.5 px-3 whitespace-nowrap cursor-pointer transition-all max-w-xs truncate shadow-sm"
                >
                  {faq.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-[#e2d5fc] flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask Growee AI about Cloud SaaS..."
                className="flex-1 bg-white border border-[#e2d5fc] focus:outline-none focus:border-[#cca350] rounded-xl px-3 py-2 text-[13px] text-slate-800 placeholder-slate-400 font-medium"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputVal.trim() || isLoading}
                className={`p-2 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                  inputVal.trim() && !isLoading
                    ? 'bg-gradient-to-r from-[#cca350] to-[#b38f36] hover:from-[#b38f36] hover:to-[#9a700f] text-white border border-[#f0d995] shadow-sm'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
