import { useState, useEffect } from "react";

type Screen = "loading" | "home" | "register" | "login" | "feed";
type Lang = "ru" | "en";

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

  // FEED
  if (screen === "feed") {
    return (
      <div style={BG_STYLE} className="flex flex-col items-center justify-center">
        <LangButtons />
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl flex flex-col items-center gap-4 max-w-sm w-full mx-4">
          <h1 className="text-4xl font-black" style={{ color: "#0FB653", fontFamily: "'Montserrat', sans-serif" }}>
            kisLanka
          </h1>
          <p className="text-xl font-semibold text-gray-800">{t.feedWelcome}</p>
          <span className="text-4xl">🐱</span>
          <p className="text-gray-400 text-sm">{t.feedTitle}</p>
        </div>
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
