import { useState, useEffect, useRef } from "react";

type Screen = "loading" | "home" | "register" | "login" | "feed";
type NavTab = "settings" | "ai" | "messenger" | "feed" | "music" | "premium";
type Lang = "ru" | "en" | "de" | "zh";

const translations = {
  ru: {
    welcome: "Добро пожаловать!",
    meow: "Meow =)",
    register: "Зайти в систему",
    hasAccount: "Уже имеется вход в систему",
    registerTitle: "Регистрация в систему",
    emailPlaceholder: "Enter email",
    passwordPlaceholder: "Enter password",
    backToLogin: "Уже имеется вход в систему",
    enterSystem: "Зайти в систему",
    loginTitle: "Вход в систему",
    forgotPassword: "Забыли пароль?",
    loginBtn: "Вход в систему",
    backToRegister: "Вернуться к регистрации",
    loading: "Загрузка",
    feedWelcome: "Добро пожаловать в сеть!",
    feedTitle: "Лента kisLanka",
    addAccount: "Добавить аккаунт",
    settings: "Настройки", ai: "Нейросеть", messenger: "Мессенджер",
    feed: "Лента", music: "Музыка", premium: "Премиум",
  },
  en: {
    welcome: "Welcome!",
    meow: "Meow =)",
    register: "Sign Up",
    hasAccount: "Already have an account",
    registerTitle: "Registration",
    emailPlaceholder: "Enter email",
    passwordPlaceholder: "Enter password",
    backToLogin: "Already have an account",
    enterSystem: "Sign Up",
    loginTitle: "Login",
    forgotPassword: "Forgot password?",
    loginBtn: "Sign In",
    backToRegister: "Back to registration",
    loading: "Loading",
    feedWelcome: "Welcome to the network!",
    feedTitle: "kisLanka Feed",
    addAccount: "Add account",
    settings: "Settings", ai: "AI", messenger: "Chats",
    feed: "Feed", music: "Music", premium: "Premium",
  },
  de: {
    welcome: "Willkommen!",
    meow: "Meow =)",
    register: "Ins System einloggen",
    hasAccount: "Bereits ein Login vorhanden",
    registerTitle: "Registrierung",
    emailPlaceholder: "E-Mail eingeben",
    passwordPlaceholder: "Passwort eingeben",
    backToLogin: "Bereits ein Login vorhanden",
    enterSystem: "Ins System einloggen",
    loginTitle: "Anmeldung",
    forgotPassword: "Passwort vergessen?",
    loginBtn: "Anmelden",
    backToRegister: "Zurück zur Registrierung",
    loading: "Laden",
    feedWelcome: "Willkommen im Netzwerk!",
    feedTitle: "kisLanka Feed",
    addAccount: "Konto hinzufügen",
    settings: "Einstellungen", ai: "KI", messenger: "Nachrichten",
    feed: "Feed", music: "Musik", premium: "Premium",
  },
  zh: {
    welcome: "欢迎！",
    meow: "喵 =)",
    register: "登录系统",
    hasAccount: "已有账户",
    registerTitle: "注册",
    emailPlaceholder: "输入邮箱",
    passwordPlaceholder: "输入密码",
    backToLogin: "已有账户",
    enterSystem: "登录系统",
    loginTitle: "登录",
    forgotPassword: "忘记密码？",
    loginBtn: "登录",
    backToRegister: "返回注册",
    loading: "加载中",
    feedWelcome: "欢迎加入网络！",
    feedTitle: "kisLanka 动态",
    addAccount: "添加账户",
    settings: "设置", ai: "人工智能", messenger: "消息",
    feed: "动态", music: "音乐", premium: "高级版",
  },
};

const BG_STYLE = {
  background: "linear-gradient(135deg, #40EFFC 0%, #0FB653 100%)",
  minHeight: "100vh",
};

export default function Index() {
  const [screen, setScreen] = useState<Screen>("loading");
  const [progress, setProgress] = useState(0);
  const [lang, setLang] = useState<Lang>("ru");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<NavTab>("feed");
  const [circleColor, setCircleColor] = useState("#0FB653");
  const circleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const t = translations[lang];
  const canSubmit = email.trim() !== "" && password.trim() !== "";

  useEffect(() => {
    if (screen !== "loading") return;
    const duration = 5000 + Math.random() * 5000;
    const interval = 80;
    const step = (interval / duration) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setScreen("home"), 400);
          return 100;
        }
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [screen]);

  useEffect(() => {
    circleRef.current = setInterval(() => {
      setCircleColor((c) => (c === "#0FB653" ? "#40EFFC" : "#0FB653"));
    }, 1200);
    return () => { if (circleRef.current) clearInterval(circleRef.current); };
  }, []);

  const handleAuth = () => {
    if (canSubmit) setScreen("feed");
  };

  const LangButtons = () => (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
      <button
        onClick={() => setLang("ru")}
        title="Русский"
        className={`w-12 h-12 rounded-full overflow-hidden shadow-lg transition-all hover:scale-110 ${
          lang === "ru" ? "ring-4 ring-white scale-110" : "ring-2 ring-white/40"
        }`}
      >
        <img
          src="https://cdn.poehali.dev/files/c364c501-1114-4dbe-9ad2-c95cd91bcfc6.png"
          alt="RU"
          className="w-full h-full object-cover"
        />
      </button>
      <button
        onClick={() => setLang("en")}
        title="English"
        className={`w-12 h-12 rounded-full overflow-hidden shadow-lg transition-all hover:scale-110 ${
          lang === "en" ? "ring-4 ring-white scale-110" : "ring-2 ring-white/40"
        }`}
      >
        <img
          src="https://cdn.poehali.dev/files/17a39291-a18e-4541-9e69-3a61bedee99d.jpg"
          alt="EN"
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );

  // LOADING
  if (screen === "loading") {
    return (
      <div style={BG_STYLE} className="flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-25 pointer-events-none" style={{ background: "#40EFFC", filter: "blur(70px)" }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-20 pointer-events-none" style={{ background: "#0FB653", filter: "blur(90px)" }} />
        <div className="relative z-10 flex flex-col items-center gap-8 px-8">
          <h1 className="font-display text-6xl font-black text-white drop-shadow-xl tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            kisLanka
          </h1>
          <div className="flex flex-col items-center gap-3 w-80">
            <div className="w-full h-4 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.3)" }}>
              <div
                className="h-full rounded-full transition-all duration-100 shadow-sm"
                style={{ width: `${progress}%`, background: "#FC6740" }}
              />
            </div>
            <span className="text-white font-bold text-xl drop-shadow" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {t.loading}... {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    );
  }

  // NAV ICONS (SVG custom)
  const NavIcon = ({ tab }: { tab: NavTab }) => {
    const active = activeTab === tab;
    const color = active ? "#0FB653" : "#aaa";
    const icons: Record<NavTab, JSX.Element> = {
      settings: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          {/* Шестерёнка */}
          <circle cx="14" cy="14" r="4" stroke={color} strokeWidth="2" fill="none"/>
          <path d="M14 4v3M14 21v3M4 14h3M21 14h3M6.34 6.34l2.12 2.12M19.54 19.54l2.12 2.12M6.34 21.66l2.12-2.12M19.54 8.46l2.12-2.12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          {/* Кисточки — две диагональные линии с кружком на конце */}
          <circle cx="5" cy="23" r="1.5" fill={color}/>
          <line x1="7" y1="21" x2="10" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="23" cy="23" r="1.5" fill={color}/>
          <line x1="21" y1="21" x2="18" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      ai: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          {/* Мордашка кота */}
          <ellipse cx="14" cy="15" rx="7" ry="6" stroke={color} strokeWidth="2" fill="none"/>
          {/* Ушки */}
          <polygon points="8,10 6,5 11,9" fill={color} opacity="0.7"/>
          <polygon points="20,10 22,5 17,9" fill={color} opacity="0.7"/>
          {/* Глазки */}
          <ellipse cx="11.5" cy="14" rx="1" ry="1.3" fill={color}/>
          <ellipse cx="16.5" cy="14" rx="1" ry="1.3" fill={color}/>
          {/* Носик */}
          <path d="M13.2 16.5 L14 17.3 L14.8 16.5" stroke={color} strokeWidth="1" fill="none"/>
          {/* Два пышных хвоста сзади */}
          <path d="M7 18 Q2 15 3 10 Q4 7 6 9" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M21 18 Q26 15 25 10 Q24 7 22 9" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
          <circle cx="3" cy="10" r="2" fill={color} opacity="0.5"/>
          <circle cx="25" cy="10" r="2" fill={color} opacity="0.5"/>
        </svg>
      ),
      messenger: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          {/* Ромбики-смс */}
          <rect x="7" y="7" width="8" height="8" rx="1" transform="rotate(45 11 11)" stroke={color} strokeWidth="1.8" fill="none"/>
          <rect x="13" y="13" width="7" height="7" rx="1" transform="rotate(45 16.5 16.5)" stroke={color} strokeWidth="1.8" fill="none"/>
          <circle cx="11" cy="11" r="1.2" fill={color}/>
          <circle cx="17" cy="17" r="1" fill={color}/>
        </svg>
      ),
      feed: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          {/* Магические линии */}
          <path d="M4 14 Q8 8 14 14 Q20 20 24 14" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
          <path d="M4 10 Q9 5 14 10 Q19 15 24 10" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
          <path d="M4 18 Q9 13 14 18 Q19 23 24 18" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
          <circle cx="14" cy="14" r="2.5" fill={color} opacity="0.8"/>
          <circle cx="7" cy="11" r="1.2" fill={color} opacity="0.5"/>
          <circle cx="21" cy="17" r="1.2" fill={color} opacity="0.5"/>
        </svg>
      ),
      music: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          {/* Электро-гитара в форме кошачьей мордочки */}
          <ellipse cx="14" cy="17" rx="6" ry="5" stroke={color} strokeWidth="2" fill="none"/>
          {/* Ушки гитары = кошачьи */}
          <polygon points="9,13 7,8 12,12" fill={color} opacity="0.6"/>
          <polygon points="19,13 21,8 16,12" fill={color} opacity="0.6"/>
          {/* Гриф */}
          <line x1="14" y1="12" x2="14" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="5" x2="16" y2="5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="11.5" y1="7.5" x2="16.5" y2="7.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
          {/* Резонаторное отверстие */}
          <circle cx="14" cy="17" r="1.5" fill={color} opacity="0.7"/>
          {/* Струны */}
          <line x1="11" y1="15" x2="11" y2="19" stroke={color} strokeWidth="1" opacity="0.5"/>
          <line x1="14" y1="14" x2="14" y2="20" stroke={color} strokeWidth="1" opacity="0.5"/>
          <line x1="17" y1="15" x2="17" y2="19" stroke={color} strokeWidth="1" opacity="0.5"/>
        </svg>
      ),
      premium: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          {/* Корона */}
          <path d="M8 12 L6 7 L10 10 L14 5 L18 10 L22 7 L20 12 Z" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
          <rect x="8" y="12" width="12" height="3" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
          {/* Хитрый кошачий глаз — вертикальный зрачок */}
          <ellipse cx="14" cy="20" rx="5" ry="4" stroke={color} strokeWidth="1.8" fill="none"/>
          <ellipse cx="14" cy="20" rx="1.2" ry="2.8" fill={color} opacity="0.8"/>
          <circle cx="12.5" cy="18.5" r="0.6" fill="white" opacity="0.8"/>
        </svg>
      ),
    };
    return icons[tab];
  };

  const navTabs: NavTab[] = ["settings", "ai", "messenger", "feed", "music", "premium"];

  const langFlags: { code: Lang; src: string; title: string }[] = [
    { code: "ru", src: "https://cdn.poehali.dev/files/c364c501-1114-4dbe-9ad2-c95cd91bcfc6.png", title: "Русский" },
    { code: "en", src: "https://cdn.poehali.dev/files/17a39291-a18e-4541-9e69-3a61bedee99d.jpg", title: "English" },
    { code: "de", src: "https://cdn.poehali.dev/projects/10a289aa-fbf2-4834-87d3-de0e27d8e93b/bucket/e143cdb3-8428-4713-aa87-06de0414b4e5.png", title: "Deutsch" },
    { code: "zh", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/255px-Flag_of_the_People%27s_Republic_of_China.svg.png", title: "中文" },
  ];

  // FEED
  if (screen === "feed") {
    const yandexLangMap: Record<Lang, string> = { ru: "ru", en: "en", de: "de", zh: "zh" };
    const yl = yandexLangMap[lang];

    return (
      <div className="flex flex-col bg-white" style={{ minHeight: "100vh" }}>

        {/* Яндекс Переводчик виджет — скрытый iframe */}
        <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
          <iframe
            key={lang}
            src={`https://translate.yandex.com/translate?lang=${yl}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
            title="yandex-translate"
            style={{ width: 1, height: 1, opacity: 0 }}
          />
        </div>

        {/* Яндекс Переводчик — встроенный виджет скрипт */}
        {lang !== "ru" && (
          <div
            id="ytWidget"
            style={{ position: "fixed", bottom: 80, left: 4, zIndex: 100, background: "#111", borderRadius: 12, padding: "6px 10px", color: "#0FB653", fontSize: 11, fontFamily: "Montserrat", boxShadow: "0 2px 12px #0004", cursor: "pointer" }}
            onClick={() => {
              const url = `https://translate.yandex.com/translate?lang=${yl}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`;
              window.open(url, "_blank");
            }}
          >
            🌐 {lang.toUpperCase()}
          </div>
        )}

        {/* HEADER — чёрная полоса */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3" style={{ background: "#111" }}>
          {/* Флаги языков */}
          <div className="flex items-center gap-2">
            {langFlags.map(({ code, src, title }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                title={title}
                className="overflow-hidden transition-all hover:scale-110"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: lang === code ? "2.5px solid #0FB653" : "2px solid rgba(255,255,255,0.2)",
                  flexShrink: 0,
                }}
              >
                <img src={src} alt={code} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </button>
            ))}
          </div>

          {/* kisLanka — без контура */}
          <h1
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: "#0FB653",
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: "-0.5px",
              lineHeight: 1,
            }}
          >
            kisLanka
          </h1>

          {/* Добавить аккаунт — правый бок хедера */}
          <div className="flex items-center gap-2">
            <div className="relative flex-shrink-0" style={{ width: 40, height: 40 }}>
              <div
                style={{
                  position: "absolute",
                  inset: -5,
                  borderRadius: "50%",
                  border: "2px dashed #444",
                  pointerEvents: "none",
                }}
              />
              <button
                className="transition-all hover:scale-105"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: `2.5px solid ${circleColor}`,
                  background: "#222",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 1,
                  transition: "border-color 0.6s ease",
                }}
              >
                <span
                  style={{
                    color: circleColor,
                    fontSize: 20,
                    fontWeight: 700,
                    lineHeight: 1,
                    transition: "color 0.6s ease",
                  }}
                >
                  +
                </span>
              </button>
            </div>
            <span style={{ color: "#aaa", fontSize: 11, fontFamily: "Montserrat", whiteSpace: "nowrap" }}>
              {t.addAccount}
            </span>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28">

          {/* Лента — заглушка постов */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                  <div className="flex flex-col gap-1">
                    <div className="w-24 h-3 rounded bg-gray-200 animate-pulse" />
                    <div className="w-16 h-2 rounded bg-gray-100 animate-pulse" />
                  </div>
                </div>
                <div className="w-full h-32 rounded-xl bg-gray-200 animate-pulse" />
                <div className="w-3/4 h-3 rounded bg-gray-200 animate-pulse" />
                <div className="w-1/2 h-3 rounded bg-gray-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM NAV — чёрный фон */}
        <div
          className="fixed bottom-0 left-0 right-0 z-40"
          style={{ background: "#111", paddingBottom: "env(safe-area-inset-bottom, 8px)", borderTop: "1px solid #222" }}
        >
          <div className="flex items-end justify-between px-2 pt-1 pb-2">
            {navTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex flex-col items-center gap-0.5 flex-1 py-1 transition-all hover:scale-110 active:scale-95"
              >
                <NavIcon tab={tab} />
                <span
                  className="text-[9px] font-semibold leading-tight"
                  style={{
                    color: activeTab === tab ? "#0FB653" : "#555",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {t[tab]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* FAB */}
        <button
          className="fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
          style={{ background: "linear-gradient(135deg, #40EFFC, #0FB653)" }}
        >
          <span className="text-white text-3xl font-bold" style={{ lineHeight: 1 }}>+</span>
        </button>
      </div>
    );
  }

  // HOME
  if (screen === "home") {
    return (
      <div style={BG_STYLE} className="flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-16 left-16 w-52 h-52 rounded-full opacity-25" style={{ background: "#40EFFC", filter: "blur(55px)" }} />
          <div className="absolute bottom-16 right-16 w-72 h-72 rounded-full opacity-20" style={{ background: "#0FB653", filter: "blur(75px)" }} />
        </div>

        <LangButtons />

        <div className="relative z-10 flex flex-col items-center gap-6 px-6 animate-fade-in">
          <h1 className="font-black text-6xl text-white drop-shadow-xl tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            kisLanka
          </h1>
          <p className="text-white text-2xl font-semibold drop-shadow">{t.welcome}</p>

          <div
            className="w-28 h-28 rounded-full border-4 border-white/60 shadow-2xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(12px)" }}
          >
            <span className="text-5xl">🐱</span>
          </div>

          <p className="text-white text-xl font-medium drop-shadow">{t.meow}</p>

          <div className="flex flex-col gap-3 w-72 mt-2">
            <button
              onClick={() => setScreen("register")}
              className="w-full py-3.5 rounded-2xl font-bold text-white text-lg shadow-xl transition-all hover:scale-105 hover:brightness-110 active:scale-95"
              style={{ background: "#FC6740", fontFamily: "'Montserrat', sans-serif" }}
            >
              {t.register}
            </button>
            <button
              onClick={() => setScreen("login")}
              className="w-full py-3.5 rounded-2xl font-bold text-black text-lg border-2 border-black/20 transition-all hover:scale-105 hover:bg-white/20 active:scale-95"
              style={{ background: "transparent", fontFamily: "'Montserrat', sans-serif" }}
            >
              {t.hasAccount}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // REGISTER
  if (screen === "register") {
    return (
      <div style={BG_STYLE} className="flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-56 h-56 rounded-full opacity-20" style={{ background: "#40EFFC", filter: "blur(60px)" }} />
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full opacity-20" style={{ background: "#0FB653", filter: "blur(80px)" }} />
        </div>

        <LangButtons />

        <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm mx-4 flex flex-col gap-4 animate-fade-in">
          <h2
            className="text-2xl font-black text-center"
            style={{ color: "#0FB653", fontFamily: "'Montserrat', sans-serif" }}
          >
            {t.registerTitle}
          </h2>

          <input
            type="email"
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0FB653] outline-none text-gray-800 transition-colors text-base"
          />
          <input
            type="password"
            placeholder={t.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0FB653] outline-none text-gray-800 transition-colors text-base"
          />

          <button
            onClick={() => setScreen("login")}
            className="text-black/70 font-medium text-sm text-center py-2 rounded-xl transition-all hover:bg-gray-50 active:scale-95"
          >
            {t.backToLogin}
          </button>

          <button
            onClick={handleAuth}
            disabled={!canSubmit}
            className="w-full py-3.5 rounded-2xl font-bold text-white text-lg shadow-lg transition-all hover:scale-105 hover:brightness-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ background: "#34E7AE", fontFamily: "'Montserrat', sans-serif" }}
          >
            {t.enterSystem}
          </button>
        </div>
      </div>
    );
  }

  // LOGIN
  if (screen === "login") {
    return (
      <div style={BG_STYLE} className="flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-56 h-56 rounded-full opacity-20" style={{ background: "#40EFFC", filter: "blur(60px)" }} />
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full opacity-20" style={{ background: "#0FB653", filter: "blur(80px)" }} />
        </div>

        <LangButtons />

        <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm mx-4 flex flex-col gap-4 animate-fade-in">
          <h2
            className="text-2xl font-black text-center"
            style={{ color: "#0FB653", fontFamily: "'Montserrat', sans-serif" }}
          >
            {t.loginTitle}
          </h2>

          <input
            type="email"
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0FB653] outline-none text-gray-800 transition-colors text-base"
          />
          <input
            type="password"
            placeholder={t.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0FB653] outline-none text-gray-800 transition-colors text-base"
          />

          <button
            className="text-black/70 font-medium text-sm text-center py-2 rounded-xl transition-all hover:bg-gray-50 active:scale-95"
          >
            {t.forgotPassword}
          </button>

          <button
            onClick={() => setScreen("register")}
            className="text-black/70 font-medium text-sm text-center py-2 rounded-xl transition-all hover:bg-gray-50 active:scale-95"
          >
            {t.backToRegister}
          </button>

          <button
            onClick={handleAuth}
            disabled={!canSubmit}
            className="w-full py-3.5 rounded-2xl font-bold text-white text-lg shadow-lg transition-all hover:scale-105 hover:brightness-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ background: "#34E7AE", fontFamily: "'Montserrat', sans-serif" }}
          >
            {t.loginBtn}
          </button>
        </div>
      </div>
    );
  }

  return null;
}