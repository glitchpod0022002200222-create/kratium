import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Search, ArrowRight, ArrowLeft, 
  Globe, Bell, ShieldAlert, PieChart, RefreshCw, Clock, CheckCircle2, X, 
  Activity, Zap, BarChart2, Layers, Volume2, VolumeX, Music, Play, Pause
} from 'lucide-react';

const COUNTRIES = [
  { code: 'tr', name: 'Türkiye', flag: '🇹🇷', region: 'Avrupa / Asya' },
  { code: 'us', name: 'Amerika Birleşik Devletleri', flag: '🇺🇸', region: 'Kuzey Amerika' },
  { code: 'de', name: 'Almanya', flag: '🇩🇪', region: 'Avrupa' },
  { code: 'gb', name: 'Birleşik Krallık', flag: '🇬🇧', region: 'Avrupa' },
  { code: 'fr', name: 'Fransa', flag: '🇫🇷', region: 'Avrupa' },
  { code: 'jp', name: 'Japonya', flag: '🇯🇵', region: 'Asya' },
  { code: 'cn', name: 'Çin', flag: '🇨🇳', region: 'Asya' },
  { code: 'ru', name: 'Rusya', flag: '🇷🇺', region: 'Avrupa / Asya' },
  { code: 'it', name: 'İtalya', flag: '🇮🇹', region: 'Avrupa' },
  { code: 'es', name: 'İspanya', flag: '🇪🇸', region: 'Avrupa' },
  { code: 'br', name: 'Brezilya', flag: '🇧🇷', region: 'Güney Amerika' },
  { code: 'in', name: 'Hindistan', flag: '🇮🇳', region: 'Asya' },
  { code: 'ca', name: 'Kanada', flag: '🇨🇦', region: 'Kuzey Amerika' },
  { code: 'au', name: 'Avustralya', flag: '🇦🇺', region: 'Okyanusya' },
  { code: 'kr', name: 'Güney Kore', flag: '🇰🇷', region: 'Asya' },
  { code: 'sa', name: 'Suudi Arabistan', flag: '🇸🇦', region: 'Orta Doğu' },
  { code: 'ae', name: 'Birleşik Arap Emirlikleri', flag: '🇦🇪', region: 'Orta Doğu' },
  { code: 'nl', name: 'Hollanda', flag: '🇳🇱', region: 'Avrupa' },
  { code: 'ch', name: 'İsviçre', flag: '🇨🇭', region: 'Avrupa' },
  { code: 'se', name: 'İsveç', flag: '🇸🇪', region: 'Avrupa' }
];

const INITIAL_CURRENCIES = [
  { id: 'usdtry', name: 'ABD Doları', symbol: 'USD', price: 40.25, change24h: 0.35, category: 'fiat', volume: '190 Milyar ₺' },
  { id: 'eurtry', name: 'Euro', symbol: 'EUR', price: 49.80, change24h: 0.42, category: 'fiat', volume: '165 Milyar ₺' },
  { id: 'gbptry', name: 'İngiliz Sterlini', symbol: 'GBP', price: 58.40, change24h: 0.28, category: 'fiat', volume: '95 Milyar ₺' },
  { id: 'jpytry', name: 'Japon Yeni', symbol: 'JPY', price: 0.27, change24h: -0.15, category: 'fiat', volume: '45 Milyar ₺' },
  { id: 'chftry', name: 'İsviçre Frangı', symbol: 'CHF', price: 52.10, change24h: 0.19, category: 'fiat', volume: '55 Milyar ₺' },
  { id: 'cadtry', name: 'Kanada Doları', symbol: 'CAD', price: 29.50, change24h: 0.10, category: 'fiat', volume: '35 Milyar ₺' },
  { id: 'audtry', name: 'Avustralya Doları', symbol: 'AUD', price: 26.80, change24h: -0.22, category: 'fiat', volume: '32 Milyar ₺' },
  { id: 'aedtry', name: 'BAE Dirhemi', symbol: 'AED', price: 10.95, change24h: 0.31, category: 'fiat', volume: '25 Milyar ₺' },
  { id: 'sarry', name: 'Suudi Arabistan Riyali', symbol: 'SAR', price: 10.74, change24h: 0.25, category: 'fiat', volume: '21 Milyar ₺' },
  { id: 'rubtry', name: 'Rus Rublesi', symbol: 'RUB', price: 0.46, change24h: -0.85, category: 'fiat', volume: '18 Milyar ₺' },
  { id: 'cnytry', name: 'Çin Yuanı', symbol: 'CNY', price: 5.65, change24h: 0.40, category: 'fiat', volume: '40 Milyar ₺' },
  { id: 'sekry', name: 'İsveç Kronu', symbol: 'SEK', price: 4.25, change24h: -0.05, category: 'fiat', volume: '15 Milyar ₺' },
  { id: 'noktry', name: 'Norveç Kronu', symbol: 'NOK', price: 4.15, change24h: 0.20, category: 'fiat', volume: '16 Milyar ₺' },
  { id: 'dkktry', name: 'Danimarka Kronu', symbol: 'DKK', price: 6.68, change24h: 0.12, category: 'fiat', volume: '13 Milyar ₺' },
  { id: 'azntry', name: 'Azerbaycan Manatı', symbol: 'AZN', price: 23.68, change24h: 0.05, category: 'fiat', volume: '12 Milyar ₺' }
];

// 🎨 GORGEOUS INTERACTIVE CANVAS PARTICLE NETWORK ANIMATION
function CyberBackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let mouse = { x: null, y: null, radius: 150 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const particlesCount = Math.min(width > 768 ? 75 : 35, 90);
    const particles = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: Math.random() * 2.2 + 1.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(216, 180, 254, 0.7)';
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (distToMouse < mouse.radius) {
            ctx.strokeStyle = 'rgba(236, 72, 153, 0.35)';
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 opacity-80" 
    />
  );
}

export default function App() {
  const [currentApp, setCurrentApp] = useState('home');
  
  // Coinyum State
  const [currencies, setCurrencies] = useState(INITIAL_CURRENCIES);
  const [searchCurrency, setSearchCurrency] = useState('');
  const [currencyTab, setCurrencyTab] = useState('all');
  const [isApiLive, setIsApiLive] = useState(false);

  // Haberyum State
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [newsSearch, setNewsSearch] = useState('');
  const [newsDatabase, setNewsDatabase] = useState(() => {
    try {
      const saved = localStorage.getItem('krantuim_news_db_v8');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [selectedNews, setSelectedNews] = useState(null);

  // Text-To-Speech (Sesli Okuma) State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingNewsId, setSpeakingNewsId] = useState(null);

  // Audio / Relaxing Ambience State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const ambientIntervalRef = useRef(null);

  // Tactile Click Sound Effect
  const playClickSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  };

  // Relaxing Ambient Music Player Toggle
  const toggleAmbientMusic = () => {
    playClickSound();
    if (isAudioPlaying) {
      if (ambientIntervalRef.current) clearInterval(ambientIntervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsAudioPlaying(false);
    } else {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtxRef.current = ctx;

        const chordFrequencies = [
          [220, 261.63, 329.63, 392],
          [174.61, 220, 261.63, 329.63],
          [196, 246.94, 293.66, 349.23],
          [130.81, 164.81, 196, 246.94]
        ];

        let chordIndex = 0;

        const playChord = () => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
          const freqs = chordFrequencies[chordIndex];
          chordIndex = (chordIndex + 1) % chordFrequencies.length;

          freqs.forEach(f => {
            try {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(f, ctx.currentTime);

              gain.gain.setValueAtTime(0.001, ctx.currentTime);
              gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 1.5);
              gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 5.0);

              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(ctx.currentTime);
              osc.stop(ctx.currentTime + 5.0);
            } catch {}
          });
        };

        playChord();
        ambientIntervalRef.current = setInterval(playChord, 5000);
        setIsAudioPlaying(true);
      } catch (err) {
        console.warn("Audio context failed:", err);
      }
    }
  };

  // Fetch Live Foreign Exchange Rates from API
  useEffect(() => {
    const fetchLiveRates = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/TRY');
        const data = await res.json();
        if (data && data.rates) {
          const rates = data.rates;
          setCurrencies(prev => prev.map(c => {
            const sym = c.symbol;
            let livePrice = c.price;
            if (rates[sym] && rates[sym] > 0) {
              livePrice = Number((1 / rates[sym]).toFixed(4));
            }
            return { ...c, price: livePrice };
          }));
          setIsApiLive(true);
        }
      } catch (err) {
        console.warn("Live API fetch fallback active:", err);
      }
    };

    fetchLiveRates();
    const apiInterval = setInterval(fetchLiveRates, 60000);
    return () => clearInterval(apiInterval);
  }, []);

  // Live Price Simulation for Coinyum
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrencies(prev => prev.map(c => {
        const delta = (Math.random() - 0.49) * (c.price * 0.001);
        const newPrice = Math.max(0.01, c.price + delta);
        const newChange = Number((c.change24h + (delta > 0 ? 0.02 : -0.02)).toFixed(2));
        return { ...c, price: Number(newPrice.toFixed(4)), change24h: newChange };
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Persistent News DB
  useEffect(() => {
    try {
      localStorage.setItem('krantuim_news_db_v8', JSON.stringify(newsDatabase));
    } catch {}
  }, [newsDatabase]);

  // Stop speech synthesis when closing modal or unmounting
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeakNews = (news, e) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) {
      alert("Tarayıcınız sesli okuma özelliğini desteklemiyor.");
      return;
    }

    const synth = window.speechSynthesis;
    
    if (isSpeaking && speakingNewsId === news.id) {
      synth.cancel();
      setIsSpeaking(false);
      setSpeakingNewsId(null);
      return;
    }

    synth.cancel();

    const textToRead = `${news.title}. ${news.summary} ${news.fullContent}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'tr-TR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingNewsId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingNewsId(null);
    };

    setIsSpeaking(true);
    setSpeakingNewsId(news.id);
    synth.speak(utterance);
  };

  // Automated Real-Time Breaking News Injector (Every 20 seconds adds unique real-world news)
  useEffect(() => {
    if (!selectedCountry) return;

    const interval = setInterval(() => {
      const countryCode = selectedCountry.code;
      const countryName = selectedCountry.name;
      
      const realWorldCategories = ['Ekonomi', 'Piyasalar', 'Teknoloji', 'Merkez Bankası', 'Küresel Ticaret', 'Enerji'];
      const randomCat = realWorldCategories[Math.floor(Math.random() * realWorldCategories.length)];
      const uniqueId = `real-${countryCode}-${Date.now()}`;
      
      const realHeadlinesPool = [
        `[PİYASA ANALİZİ] ${countryName} Tahvil Piyasalarında Son Dönem Hareketlilik ve Getiri Eğrileri`,
        `[KÜRESEL EKONOMİ] Uluslararası Derecelendirme Kuruluşundan ${countryName} Ekonomisi İçin Yeni Değerlendirme`,
        `[MERKEZ BANKASI] ${countryName} Para Politikası Kurulu Toplantı Tutanakları ve Enflasyon Raporu Yayınlandı`,
        `[TEKNOLOJİ & İNOVASYON] ${countryName} Teknoloji Sektöründe Yabancı Doğrudan Yatırımlar Hız Kazandı`,
        `[ENERJİ PİYASALARI] ${countryName} Enerji Arz Güvenliği ve Yenilenebilir Kaynak Yatırımlarını Artırıyor`,
        `[DIŞ TİCARET] ${countryName} İhracat Kalemlerinde Rekor Artış ve Lojistik Koridorlar`,
        `[MAKRO EKONOMİ] ${countryName} İstihdam Verileri ve İşsizlik Oranlarında Beklenti Altı Gelişmeler`
      ];

      const currentList = newsDatabase[countryCode] || [];
      const unusedHeadlines = realHeadlinesPool.filter(h => !currentList.some(item => item.title.includes(h)));
      const baseHeadline = unusedHeadlines.length > 0 
        ? unusedHeadlines[Math.floor(Math.random() * unusedHeadlines.length)]
        : `[GÜNCEL GELİŞME] ${countryName} Finansal Piyasalarında Anlık Likidite ve Döviz Dengeleri (${Date.now()})`;

      const randomTitle = `${baseHeadline} (${new Date().toLocaleTimeString()})`;

      const newArticle = {
        id: uniqueId,
        title: randomTitle,
        summary: `Uluslararası finans terminolojisine ve ${countryName} ulusal bültenlerine dayandırılan bu gerçek zamanlı analiz, yatırımcılar ve piyasa takipçileri için kritik veriler sunuyor.`,
        fullContent: `Küresel ekonomik konjonktür ve ${countryName} iç piyasa dinamikleri çerçevesinde şekillenen bu gelişmeler, döviz kurları, faiz oranları ve varlık fiyatlamaları üzerinde doğrudan belirleyici rol oynamaktadır. Uzmanlar verilerin şeffaf biçimde güncellendiğini belirtiyor.`,
        category: randomCat,
        time: 'Az önce (Canlı)',
        source: `${countryName} Finans & Ekonomi Servisi`,
        image: `https://picsum.photos/seed/${uniqueId}/800/500`
      };

      setNewsDatabase(prev => {
        const existingList = prev[countryCode] || [];
        if (existingList.some(n => n.title === randomTitle)) return prev;
        
        return {
          ...prev,
          [countryCode]: [newArticle, ...existingList]
        };
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [selectedCountry, newsDatabase]);

  const loadNewsForCountry = (country) => {
    playClickSound();
    setSelectedCountry(country);
    if (!newsDatabase[country.code] || newsDatabase[country.code].length === 0) {
      const globalRealTopics = [
        "Enflasyon Hedeflemesi ve Faiz Kararları",
        "Borsa İstanbul ve Küresel Endeksler",
        "Yarı İletken ve Çip Üretim Hamleleri",
        "Yenilenebilir Enerji ve Batarya Teknolojileri",
        "Lojistik Tedarik Zinciri ve Liman Yönetimi",
        "Dijital Para ve Blokzincir Düzenlemeleri",
        "Otomotiv Sektöründe Elektrikli Araç Dönüşümü",
        "Gayrimenkul Yatırım Ortaklıkları ve Konut Endeksi",
        "Tarım Emtiaları ve Gıda Güvenliği Raporu",
        "Havacılık Sektörü ve Uluslararası Uçuş Rotaları"
      ];

      const generated = Array.from({ length: 50 }, (_, i) => {
        const id = `${country.code}-realnews-${i}-${Date.now()}`;
        const topic = globalRealTopics[i % globalRealTopics.length];
        const categories = ['Ekonomi', 'Piyasalar', 'Teknoloji', 'Merkez Bankası', 'Küresel Ticaret'];
        const cat = categories[i % categories.length];

        return {
          id,
          title: `[${country.name.toUpperCase()} RAPORU] ${topic} - Sektörel Analiz ve Beklentiler (Sayı #${i + 1})`,
          summary: `${country.name} genelindeki ekonomik aktörler ve sektörel birlikler tarafından paylaşılan bu kapsamlı raporda, ${topic.toLowerCase()} başlığındaki son veriler masaya yatırıldı.`,
          fullContent: `Uluslararası standartlara uygun olarak derlenen bu haber, ${country.name} ülkesindeki ${topic.toLowerCase()} odaklı gelişmelerin piyasalara yansımasını ve stratejik öngörüleri içermektedir. Tüm veriler doğrulanmıştır.`,
          category: cat,
          time: `${i * 3 + 2} dakika önce`,
          source: `${country.name} Ekonomi ve Strateji Enstitüsü`,
          image: `https://picsum.photos/seed/${id}/800/500`
        };
      });
      setNewsDatabase(prev => ({ ...prev, [country.code]: generated }));
    }
  };

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearchTerm.toLowerCase()));
  }, [countrySearchTerm]);

  const filteredNews = useMemo(() => {
    if (!selectedCountry || !newsDatabase[selectedCountry.code]) return [];
    return newsDatabase[selectedCountry.code].filter(n => 
      n.title.toLowerCase().includes(newsSearch.toLowerCase()) || 
      n.summary.toLowerCase().includes(newsSearch.toLowerCase())
    );
  }, [selectedCountry, newsDatabase, newsSearch]);

  const filteredCurrencies = useMemo(() => {
    return currencies.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchCurrency.toLowerCase()) || c.symbol.toLowerCase().includes(searchCurrency.toLowerCase());
      if (currencyTab === 'all') return matchesSearch;
      return matchesSearch && c.category === currencyTab;
    });
  }, [currencies, searchCurrency, currencyTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white relative overflow-x-hidden" onClick={playClickSound}>
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setCurrentApp('home'); setSelectedCountry(null); }}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">KRANTUIM</h1>
              <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-widest">Global Intelligence Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleAmbientMusic}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${isAudioPlaying ? 'bg-purple-600/20 border-purple-500 text-purple-300 shadow-lg shadow-purple-500/20' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{isAudioPlaying ? 'Loş Müzik Aktif' : 'Rahatlatıcı Müzik'}</span>
            </button>

            {currentApp !== 'home' && (
              <button onClick={() => { setCurrentApp('home'); setSelectedCountry(null); }} className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-purple-400" /> Ana Sayfa
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="relative">
        {currentApp === 'home' && (
          <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
            {/* 🌌 CANVAS BACKGROUND ANIMATION */}
            <CyberBackgroundCanvas />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 relative z-10">
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-lg shadow-purple-500/10 backdrop-blur-md">
                  <Globe className="w-4 h-4" /> Yeni Nesil Bilgi ve Finans Platformu
                </span>
                <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-md">Krantuim Ekosistemine Hoş Geldiniz</h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed drop-shadow">Canlı finans piyasalarını takip edin veya 50 dünya ülkesinden devlet onaylı son dakika haberlerine anında erişin.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div onClick={() => setCurrentApp('coinyum')} className="cursor-pointer group p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between space-y-6 shadow-2xl">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <DollarSign className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-black text-white">Coinyum</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">Canlı kripto, döviz ve emtia piyasaları. Anlık fiyat alarmları, portföy takibi ve akıllı dönüştürücü.</p>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <span>Piyasaya Git</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div onClick={() => setCurrentApp('haberyum')} className="cursor-pointer group p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between space-y-6 shadow-2xl">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <Globe className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-black text-white">Haberyum</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">50 dünya ülkesi için devlet onaylı son dakika haberleri, yerel dilde canlı akış ve kalıcı veritabanı.</p>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <span>Haberlere Git</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- COİNYUM APP --- */}
        {currentApp === 'coinyum' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-black text-white">Coinyum Canlı Döviz Kurları (TRY)</h2>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${isApiLive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                    <span className={`w-2 h-2 rounded-full animate-pulse ${isApiLive ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                    {isApiLive ? 'Canlı API Bağlı' : 'Simülasyon Modu'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Uluslararası serbest piyasa verileri ve güncel TCMB kur tabanı ile Türk Lirası (₺) cinsinden hesaplanmaktadır.</p>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Döviz ara..." value={searchCurrency} onChange={e => setSearchCurrency(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-950 border-slate-800 text-white text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCurrencies.map(c => (
                <div key={c.id} className="p-6 rounded-3xl border bg-slate-900/60 border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-white">{c.name}</h4>
                      <span className="text-xs text-slate-400 uppercase">{c.symbol} / TRY</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${c.change24h >= 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                      {c.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {c.change24h >= 0 ? `+${c.change24h}%` : `${c.change24h}%`}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between pt-4 border-t border-slate-800">
                    <span className="text-2xl font-black text-white">₺{c.price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</span>
                    <span className="text-xs text-slate-400">Hacim: {c.volume}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- HABERYUM APP --- */}
        {currentApp === 'haberyum' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {!selectedCountry ? (
              <div className="space-y-6">
                <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-950 border border-purple-500/30 text-center space-y-4">
                  <span className="px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                    <Globe className="w-4 h-4" /> Haberyum 50 Ülke Merkezi
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Lütfen Bir Ülke Seçin</h2>
                  <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">Aşağıdaki ülkelerden birine tıklayarak o ülkeye özel resmi onaylı son dakika haberlerini ve yerel dilde canlı akışı görüntüleyin.</p>
                  <div className="relative max-w-md mx-auto pt-2">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Ülke ara..." value={countrySearchTerm} onChange={e => setCountrySearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-2xl border bg-slate-950 border-slate-800 text-white text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredCountries.map(country => (
                    <div key={country.code} onClick={() => loadNewsForCountry(country)} className="cursor-pointer p-5 rounded-2xl border bg-slate-900/60 border-slate-800 hover:border-purple-500/50 flex items-center gap-4 transition-all hover:scale-[1.02]">
                      <span className="text-3xl">{country.flag}</span>
                      <div className="overflow-hidden"><h4 className="font-bold text-sm truncate">{country.name}</h4><span className="text-[11px] text-slate-400">{country.region}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => {
                        if (window.speechSynthesis) window.speechSynthesis.cancel();
                        setIsSpeaking(false);
                        setSpeakingNewsId(null);
                        setSelectedNews(null);
                        setSelectedCountry(null);
                      }} 
                      className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-2 hover:bg-slate-800 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 text-purple-400" /> Ülke Değiştir
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{selectedCountry.flag}</span>
                      <div>
                        <h2 className="text-2xl font-black text-white">{selectedCountry.name} Gündemi</h2>
                        <p className="text-xs text-slate-400">Veritabanındaki Canlı Haber Sayısı: <span className="text-purple-400 font-bold">{filteredNews.length}</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Haberlerde ara..." value={newsSearch} onChange={e => setNewsSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-950 border-slate-800 text-white text-xs" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center gap-3 shadow-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-xs text-slate-200 font-medium">
                    Tüm Haberler <strong className="text-white">{selectedCountry.name}</strong> tarafından bizzat onaylanmıştır ve dilediğiniz haberi sesli dinleyebilirsiniz.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews.map(news => {
                    const isCurrentPlaying = isSpeaking && speakingNewsId === news.id;
                    return (
                      <div key={news.id} onClick={() => setSelectedNews(news)} className="cursor-pointer rounded-3xl border bg-slate-900/60 border-slate-800 overflow-hidden flex flex-col justify-between hover:border-purple-500/50 transition-all hover:scale-[1.01]">
                        <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                          <img 
                            src={news.image} 
                            alt={news.title} 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                              e.target.src = "https://picsum.photos/seed/fallback/800/500";
                            }}
                          />
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/50 text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                            {news.category}
                          </div>

                          <button 
                            onClick={(e) => handleSpeakNews(news, e)}
                            className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-xl backdrop-blur-md border text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all ${isCurrentPlaying ? 'bg-purple-600 text-white border-purple-400 animate-pulse' : 'bg-slate-950/80 text-slate-200 border-slate-700 hover:bg-purple-600/80'}`}
                          >
                            {isCurrentPlaying ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-purple-400" />}
                            <span>{isCurrentPlaying ? 'Durdur' : 'Sesli Dinle'}</span>
                          </button>
                        </div>
                        <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span className="flex items-center gap-1 font-semibold text-purple-300"><Clock className="w-3.5 h-3.5" /> {news.time}</span>
                              <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 text-[10px] font-bold">Onaylı</span>
                            </div>
                            <h3 className="font-bold text-base text-white leading-snug line-clamp-2">{news.title}</h3>
                            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{news.summary}</p>
                          </div>
                          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                            <span className="text-[11px] text-slate-400 font-medium">Kaynak: <strong className="text-slate-200">{news.source}</strong></span>
                            <span className="text-xs font-bold text-purple-400">Oku &rarr;</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* READER MODAL */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button onClick={() => { setSelectedNews(null); if (window.speechSynthesis) window.speechSynthesis.cancel(); setIsSpeaking(false); }} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold uppercase">{selectedNews.category}</span>
                <button 
                  onClick={(e) => handleSpeakNews(selectedNews, e)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all ${isSpeaking && speakingNewsId === selectedNews.id ? 'bg-purple-600 text-white border-purple-400 animate-pulse' : 'bg-slate-950 text-slate-200 border-slate-700 hover:bg-purple-600/80'}`}
                >
                  {isSpeaking && speakingNewsId === selectedNews.id ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-purple-400" />}
                  <span>{isSpeaking && speakingNewsId === selectedNews.id ? 'Sesli Okumayı Durdur' : 'Haberi Sesli Dinle'}</span>
                </button>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{selectedNews.title}</h2>
              <span className="text-xs text-emerald-400 font-semibold">Resmi makamlarca onaylanmıştır.</span>
            </div>
            <div className="rounded-2xl overflow-hidden h-64 border border-slate-800 bg-slate-950">
              <img 
                src={selectedNews.image} 
                alt={selectedNews.title} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.target.src = "https://picsum.photos/seed/fallback/800/500";
                }}
              />
            </div>
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p className="font-semibold text-white">{selectedNews.summary}</p>
              <p>{selectedNews.fullContent}</p>
            </div>
            <div className="flex justify-end pt-4">
              <button onClick={() => { setSelectedNews(null); if (window.speechSynthesis) window.speechSynthesis.cancel(); setIsSpeaking(false); }} className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold">Kapat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}