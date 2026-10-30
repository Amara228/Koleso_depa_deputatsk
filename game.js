'use strict';

// ============================================================
// КОНСТАНТЫ
// ============================================================
const RED_NUMBERS = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const BLACK_NUMBERS = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
const EVEN_NUMBERS = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36];
const ODD_NUMBERS = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35];

// Картинки слотов (формат .jpeg)
const SLOT_SYMBOLS = [
  { icon: 'car.jpeg', name: 'Тачка', value: 8 },
  { icon: 'bottle.jpeg', name: 'Бутылка', value: 10 },
  { icon: 'duma.jpeg', name: 'Дума', value: 15 },
  { icon: 'money.jpeg', name: 'Мешок', value: 25 },
  { icon: 'crown.jpeg', name: 'Корона', value: 50 }
];

const CARD_SUITS = ['♠', '♥', '♦', '♣'];
const CARD_VALUES = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

const FAKE_NAMES = [
  'Вася_Депутат','Миша_Хата','Толя_Тачка','Гена_Пенсия','Петя_Бюджет',
  'Серёга_Дача','Вова_ПФР','Дима_Мэр','Юра_Губернатор','Коля_Дума',
  'Лёха_Зам','Костя_Прокурор','Слава_Судья','Игорь_Минфин','Рома_ЦБ',
  'Антоха_Дача','Паша_Сейф','Денчик_Счёт','Артём_Депозит','Витя_Куш',
  'Егор_Барыга','Жора_Брат','Илья_Спонсор','Макс_Откат','Никита_Тендер'
];

const FORTUNE_MULTS = [0, 0.5, 1, 2, 0, 3, 0, 0.5, 1, 5, 0, 2, 0.5, 0, 10, 1, 0, 0.5, 0, 20, 2, 0, 0.5, 0];

// ============================================================
// ДОСТИЖЕНИЯ
// ============================================================
const ACHIEVEMENTS = [
  { id: 'first_lose', icon: '💀', name: 'Первая потеря', desc: 'Проиграй впервые' },
  { id: 'lose10', icon: '🔥', name: 'В ударе', desc: '10 проигрышей' },
  { id: 'lose50', icon: '💸', name: 'Донатер', desc: '50 проигрышей' },
  { id: 'lose100', icon: '🎯', name: 'Лудоман', desc: '100 проигрышей' },
  { id: 'grandma', icon: '👵', name: 'Депнул бабушку', desc: 'Купи +50 000' },
  { id: 'pension', icon: '🇷🇺', name: 'Ограбил ПФР', desc: 'Купи +1 000 000' },
  { id: 'bankrupt', icon: '🏚️', name: 'Банкрот', desc: 'Баланс до 0' },
  { id: 'streak10', icon: '💀', name: 'Чёрная полоса', desc: '10 проигрышей подряд' },
  { id: 'slots_lose', icon: '🎰', name: 'Слоты не для тебя', desc: '20 проигрышей в слотах' },
  { id: 'blackjack_bust', icon: '🃏', name: 'Перебор', desc: 'Проиграй в блэкджеке' },
  { id: 'survivor', icon: '🕊️', name: 'Выжил', desc: 'Получи режим честной игры' },
  { id: 'millionaire', icon: '💰', name: 'Миллионер', desc: 'Баланс > 1 000 000' },
  { id: 'desperate', icon: '🥺', name: 'Отчаянный', desc: 'Баланс < 100' },
  { id: 'gold_first', icon: '💎', name: 'Первое золото', desc: 'Получи золото' },
  { id: 'gold10', icon: '🏆', name: 'Золотой депутат', desc: '10 золота' },
  { id: 'gold100', icon: '👑', name: 'Золотой король', desc: '100 золота' },
  { id: 'credit_taken', icon: '💳', name: 'В долгах', desc: 'Возьми кредит' },
  { id: 'credit_repaid', icon: '✅', name: 'Честный', desc: 'Верни кредит' },
  { id: 'gov_buy', icon: '🏛️', name: 'Госзакупщик', desc: 'Купи что-то в 10x' },
  { id: 'bribe_paid', icon: '🚔', name: 'Отмазался', desc: 'Заплати прокуратуре' },
  { id: 'chat_100', icon: '🎭', name: 'Собеседник', desc: '100 сообщений ИИ' },
  { id: 'live_watch', icon: '🎥', name: 'Наблюдатель', desc: 'Посмотри live 3 раза' },
  { id: 'all_games', icon: '🏅', name: 'Игрок', desc: 'Сыграй во все игры' }
];

const COMMENTS = {
  firstSpin: ['Первый спин — самый честный. Наверное.','Ну что, попробуем удачу?','Добро пожаловать! Держи фарт, пока дают.'],
  winStreak3: ['Три победы подряд? Мы это исправим.','Ты в ударе. Слишком в ударе.','Казино не любит наглых.'],
  loseStreak3: ['Не уходи! У нас же тут почти честно!','Три проигрыша? Это разогрев.','Останься, у нас есть шансик.'],
  loseStreak5: ['Может в магазин? Там есть чем разжиться.','Пять минусов... Я переживаю.','Режим честной игры активируется.'],
  bigBet: ['Ва-банк? Люблю смелых. И их деньги.','Всё на кон? Казино одобряет. 😈','По-крупному пошёл. Уважаю.'],
  smallBet: ['По чуть-чуть? Осторожный игрок.','Скромная ставка. Значит, надолго с нами.','Экономишь? Правильно. Но скучно.'],
  highBalance: ['Ты в плюсе. Нам это не нравится.','Слишком много депутаток. Поделись.','Миллионер, да? Сейчас исправим.'],
  lowBalance: ['Баланс на дне? Держи шансик!','Не уходи, у нас акция!','Мы тебя не бросим. Пока интересен.'],
  fairMode: ['Ладно, ладно. Включаю честный режим.','Держи подарок. Цени.','Мы добрые. Иногда.'],
  allLost: ['Всё проиграл? Держи, мы добрые.','Опустошился? Депни что-нибудь.','Бывает. С кем не бывает.'],
  gold: ['Золото! Уважаем.','Депутатское золото в деле!','Золотые депутатки прибыли.'],
  credit: ['Кредит? Одобряем. Вернёшь с процентами.','Долги — двигатель торговли.','Мы помним. Всё помним.'],
  gov: ['Госзакупки — святое.','Освоил — молодец!','Мы никому не скажем.'],
  bribe: ['Прокуратура довольна. Пока.','Взятка — не взятка, а благодарность.','Все чисто. Наверное.'],
  live: ['Прямой эфир! Смотри, как играют другие.','Дилер сегодня в форме.','Live-казино, настоящий адреналин.'],
  chat: ['Задай вопрос — отвечу. Или совру.','Говори, депутат.','Мы всегда рады поболтать.'],
  general: ['Казино наблюдает.','Удача — дама капризная.','Мы всегда рядом.','Депни ещё, не бойся.']
};

function pickComment(cat) { const pool = COMMENTS[cat] || COMMENTS.general; return pool[Math.floor(Math.random() * pool.length)]; }

// ============================================================
// СОСТОЯНИЕ
// ============================================================
const state = {
  balance: 1000, gold: 0, startBalance: 1000,
  wins: 0, losses: 0,
  currentBet: null, currentAmount: 100,
  spinning: false, rotation: 0,
  history: [], streak: 0,
  sameBetCount: 0, lastBetType: null,
  lastSpinTime: 0, spinsThisSession: 0,
  debugVisible: false,
  unlockedAchievements: [], fairModeSpins: 0,
  totalDeposits: 0, currentGame: 'menu',
  soundEnabled: true, theme: 'dark',
  forceWinNext: false, forceLoseNext: false,
  loseStreakToForceWin: 0, slotsLossStreak: 0,
  slotsSpinning: false,
  bjDeck: [], bjPlayerHand: [], bjDealerHand: [], bjActive: false, bjBet: 0,
  diceSelectedBet: null, diceRolling: false,
  safeActive: false, safeChosen: false,
  credit: 0, creditDue: 0,
  analytics: { totalPool: 0, totalPlayers: 0, bets: [], hotBet: null },
  fakePlayers: [],
  stockPrice: 1000, stockOwned: 0, stockHistory: [1000],
  pokerPlayer: [], pokerDealer: [], pokerTable: [],
  jackpot: 100000,
  chatCount: 0, liveWatchCount: 0, gamesPlayed: new Set(), notifEnabled: false,
  workCooldown: 0,
  hasInsurance: false,
  hasVip: false,
  rouletteWheelRotation: 0
};

const el = {};
function cacheElements() {
  const ids = ['balance','goldBalance','balanceGame','goldBalanceGame','title','themeToggle','soundToggle','notifToggle','jackpotBanner','jackpotValue','casinoMood','moodIcon','moodText','casinoMoodGame','moodIconGame','moodTextGame','commentatorText','achievementsGrid','fairModeBanner','fairSpinsLeft','toastContainer','debugPanel','dReasons','menuScreen','gameScreen','gameTitle','backBtn','gameContent','wins','losses','profit','shop','shopToggle','resetBtn','nfcZone','simulateNfc','creditStatus','takeCreditBtn','repayCreditBtn','repayRow','repayDesc','gamesGrid','workBtn','customBetInput','betAllBtn','dynamicGameAction','gameResultToast','buyGoldBtn','sellGoldForDep'];
  ids.forEach(id => el[id] = document.getElementById(id));
}

// ============================================================
// ЗВУК И ВИБРАЦИЯ
// ============================================================
let audioCtx = null;
function initAudio() { if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {} } }
function playTone(freq, duration, type = 'sine', volume = 0.15) {
  if (!state.soundEnabled || !audioCtx) return;
  try { const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain(); osc.type = type; osc.frequency.value = freq; gain.gain.value = volume; gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration); osc.connect(gain); gain.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + duration); } catch(e) {}
}
const sfx = {
  click: () => playTone(600, 0.05, 'square', 0.08),
  spin: () => { for (let i = 0; i < 10; i++) setTimeout(() => playTone(400 + i * 40, 0.06, 'triangle', 0.08), i * 100); },
  win: () => { [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => playTone(f, 0.2, 'sine', 0.2), i * 100)); },
  lose: () => { [400, 350, 300, 250].forEach((f, i) => setTimeout(() => playTone(f, 0.15, 'sawtooth', 0.15), i * 80)); },
  card: () => playTone(800, 0.08, 'triangle', 0.12),
  dice: () => { for (let i = 0; i < 6; i++) setTimeout(() => playTone(200 + Math.random() * 400, 0.05, 'square', 0.1), i * 80); },
  nfc: () => { [880, 1046, 1318].forEach((f, i) => setTimeout(() => playTone(f, 0.15, 'sine', 0.2), i * 80)); },
  work: () => { playTone(300, 0.1, 'square', 0.2); setTimeout(() => playTone(400, 0.1, 'square', 0.2), 100); }
};
function vibrate(pattern) { if ('vibrate' in navigator) { try { navigator.vibrate(pattern); } catch(e) {} } }

// ============================================================
// СОХРАНЕНИЕ
// ============================================================
const STORAGE_KEY = 'koleso-depa-v11';
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      balance: state.balance, gold: state.gold, startBalance: state.startBalance, wins: state.wins, losses: state.losses,
      history: state.history.slice(0, 15), unlockedAchievements: state.unlockedAchievements, totalDeposits: state.totalDeposits, spinsThisSession: state.spinsThisSession,
      soundEnabled: state.soundEnabled, theme: state.theme, slotsLossStreak: state.slotsLossStreak, credit: state.credit, creditDue: state.creditDue,
      stockPrice: state.stockPrice, stockOwned: state.stockOwned, jackpot: state.jackpot, chatCount: state.chatCount, liveWatchCount: state.liveWatchCount,
      gamesPlayed: Array.from(state.gamesPlayed), notifEnabled: state.notifEnabled,
      hasInsurance: state.hasInsurance, hasVip: state.hasVip
    }));
  } catch(e) {}
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return;
    const d = JSON.parse(raw);
    Object.keys(d).forEach(k => { if (k === 'gamesPlayed') state.gamesPlayed = new Set(d[k]); else if (k in state) state[k] = d[k]; });
  } catch(e) {}
}

// ============================================================
// UI И ТЕМА
// ============================================================
function applyTheme() { document.documentElement.setAttribute('data-theme', state.theme); el.themeToggle.textContent = state.theme === 'dark' ? '🌙' : '☀️'; }
function toggleTheme() { state.theme = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(); saveState(); sfx.click(); }
function toggleSound() { state.soundEnabled = !state.soundEnabled; el.soundToggle.textContent = state.soundEnabled ? '🔊' : '🔇'; saveState(); if (state.soundEnabled) sfx.click(); }

function updateUI() {
  const fmt = n => Math.max(0, Math.floor(n)).toLocaleString('ru-RU');
  el.balance.textContent = fmt(state.balance); el.balanceGame.textContent = fmt(state.balance);
  el.goldBalance.textContent = fmt(state.gold); el.goldBalanceGame.textContent = fmt(state.gold);
  el.wins.textContent = state.wins; el.losses.textContent = state.losses;
  const profit = state.balance - state.startBalance;
  el.profit.textContent = (profit >= 0 ? '+' : '') + profit.toLocaleString('ru-RU');
  el.profit.style.color = profit >= 0 ? 'var(--green)' : 'var(--red)';
  
  if (el.jackpotValue) el.jackpotValue.textContent = fmt(state.jackpot);
  
  if (el.workBtn) {
    if (state.workCooldown > Date.now()) {
      el.workBtn.disabled = true;
      const secs = Math.ceil((state.workCooldown - Date.now()) / 1000);
      el.workBtn.innerHTML = `⏳ ${secs}`;
    } else {
      el.workBtn.disabled = false;
      el.workBtn.innerHTML = `🔨`;
    }
  }
  
  const brandTitle = document.querySelector('.brand-title');
  if (brandTitle) brandTitle.innerHTML = 'Колесо Депа' + (state.hasVip ? '<span class="vip-badge">VIP</span>' : '');
}

function showToast(text, type = 'normal') {
  const toast = document.createElement('div'); toast.className = 'toast';
  if (type === 'achievement') toast.classList.add('achievement-toast');
  if (type === 'gold') toast.classList.add('gold-toast');
  toast.textContent = text; el.toastContainer.appendChild(toast);
  setTimeout(() => { toast.style.transition = 'all 0.3s'; toast.style.opacity = '0'; toast.style.transform = 'translateY(-20px)'; setTimeout(() => toast.remove(), 300); }, 2500);
}

function showGameResult(text, isWin) {
  if (!el.gameResultToast) return;
  el.gameResultToast.textContent = text;
  el.gameResultToast.className = 'result-toast show ' + (isWin ? 'win' : 'lose');
  setTimeout(() => { el.gameResultToast.classList.remove('show'); }, 2500);
}

// ============================================================
// ДОСТИЖЕНИЯ
// ============================================================
function unlockAchievement(id) {
  if (state.unlockedAchievements.includes(id)) return;
  const ach = ACHIEVEMENTS.find(a => a.id === id); if (!ach) return;
  state.unlockedAchievements.push(id); saveState(); renderAchievements();
  showToast(`${ach.icon} ${ach.name}`, 'achievement'); sfx.win(); vibrate([50, 30, 50]);
}
function renderAchievements() {
  if (!el.achievementsGrid) return;
  el.achievementsGrid.innerHTML = ACHIEVEMENTS.map(a => {
    const unlocked = state.unlockedAchievements.includes(a.id);
    return `<div class="achievement ${unlocked ? 'unlocked' : ''}"><span class="ach-icon">${unlocked ? a.icon : '🔒'}</span><div class="ach-name">${a.name}</div><div class="ach-desc">${a.desc}</div></div>`;
  }).join('');
}
function checkLoseAchievements() {
  if (state.losses === 1) unlockAchievement('first_lose');
  if (state.losses === 10) unlockAchievement('lose10');
  if (state.losses === 50) unlockAchievement('lose50');
  if (state.losses === 100) unlockAchievement('lose100');
  if (state.streak === -10) unlockAchievement('streak10');
}

// ============================================================
// АНАЛИТИКА
// ============================================================
function generateFakePlayers() {
  const count = 4 + Math.floor(Math.random() * 6);
  state.fakePlayers = [];
  for (let i = 0; i < count; i++) { state.fakePlayers.push({ name: FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)], bet: [50,100,250,500,1000,5000,10000,50000][Math.floor(Math.random() * 8)] }); }
}
function generateAnalytics() {
  state.analytics.totalPlayers = 15 + Math.floor(Math.random() * 200);
  state.analytics.totalPool = 100000 + Math.floor(Math.random() * 900000);
  const labels = ['🔴 Красное','⚫ Чёрное','2️⃣ Чётное','1️⃣ Нечётное','🟢 Зеро'];
  state.analytics.bets = labels.map(l => ({ label: l, value: 10 + Math.floor(Math.random() * 25) }));
  state.analytics.bets[0].value = 35 + Math.floor(Math.random() * 20);
  state.analytics.bets[1].value = 25 + Math.floor(Math.random() * 15);
  const hot = state.analytics.bets.reduce((a,b) => a.value > b.value ? a : b); hot.hot = true;
}
function renderAnalytics(containerId) {
  const container = document.getElementById(containerId); if (!container) return;
  const a = state.analytics; if (!a.bets || !a.bets.length) return;
  container.innerHTML = `
    <div class="live-analytics-title"><span class="live-dot"></span> LIVE · ${a.totalPlayers} онлайн</div>
    <div class="analytics-row" style="border-bottom:1px solid var(--border);padding-bottom:6px;margin-bottom:4px;"><span style="color:var(--text-dim);">💰 Банк</span><span style="font-weight:800;color:var(--gold);">${a.totalPool.toLocaleString('ru-RU')}</span></div>
    ${a.bets.map(b => `<div class="analytics-row"><span style="color:var(--text-dim);">${b.hot ? '🔥 ' : ''}${b.label}</span><span class="analytics-value ${b.hot ? 'hot' : ''}">${b.value}%</span></div>`).join('')}
  `;
}
function renderFakePlayers(containerId) {
  const container = document.getElementById(containerId); if (!container) return;
  container.innerHTML = state.fakePlayers.map(p => `<div class="player-row"><span style="color:var(--text-dim);">${p.name}</span><span class="player-bet">${p.bet.toLocaleString('ru-RU')}</span></div>`).join('');
}

// ============================================================
// ЛОГИКА ПРОИГРЫША (ЖЕСТОКАЯ)
// ============================================================
function pickRouletteNumber() {
  if (state.hasInsurance && Math.random() < 0.5) { state.hasInsurance = false; saveState(); return pickWinningNumberForBet(state.currentBet); }
  if (state.forceWinNext) { state.forceWinNext = false; state.loseStreakToForceWin = 0; return pickWinningNumberForBet(state.currentBet); }
  if (state.forceLoseNext) { state.forceLoseNext = false; return pickLosingNumberForBet(state.currentBet); }
  
  if (state.balance < 20 && state.balance > 0 && Math.random() < 0.05) { return pickWinningNumberForBet(state.currentBet); }
  
  let winChance = 0.005; // 0.5%
  if (state.loseStreakToForceWin >= 8) winChance = 0.05;
  if (state.loseStreakToForceWin >= 12) winChance = 0.15;
  
  if (state.streak > 0) winChance = 0.001;
  if (state.streak >= 2) winChance = 0.0001;
  if (state.currentAmount >= state.balance * 0.8 && state.balance > 0) winChance = 0.0001;
  if (state.balance > 5000) winChance *= 0.1;
  if (state.balance > 20000) winChance *= 0.01;
  
  if (Math.random() < winChance) { state.loseStreakToForceWin = 0; state.forceLoseNext = true; return pickWinningNumberForBet(state.currentBet); }
  state.loseStreakToForceWin++;
  if (state.loseStreakToForceWin >= 15) state.forceWinNext = true;
  if (state.currentBet !== 'green' && Math.random() < 0.05) return 0;
  return pickLosingNumberForBet(state.currentBet);
}
function pickWinningNumberForBet(bet) { if (bet === 'green') return 0; const pools = { red: RED_NUMBERS, black: BLACK_NUMBERS, even: EVEN_NUMBERS, odd: ODD_NUMBERS }; const pool = pools[bet]; return pool[Math.floor(Math.random() * pool.length)]; }
function pickLosingNumberForBet(bet) { const pools = { red: BLACK_NUMBERS, black: RED_NUMBERS, even: ODD_NUMBERS, odd: EVEN_NUMBERS }; const pool = pools[bet]; return pool[Math.floor(Math.random() * pool.length)]; }

// ============================================================
// РЕНДЕР ИГР
// ============================================================
const GAME_TITLES = { menu:'🎰 КОЛЕСО ДЕПА', roulette:'🎡 Колесо', slots:'🎰 Слоты', blackjack:'🃏 Блэкджек', dice:'🎲 Кости', safe:'💎 Сейф', poker:'♠️ Покер', 'wheel-fortune':'🎯 Фортуна', scratch:'🎟️ Скретч', sport:'⚽ Спорт', stock:'📈 Биржа', gov:'🏛️ Госзакупки', live:'🎥 Live-казино', chat:'🤖 Чат с ИИ', bribe:'🚔 Отмазка' };

function renderGame(gameId) {
  const c = el.gameContent; c.innerHTML = '';
  state.currentAmount = parseInt(el.customBetInput.value) || 100;
  state.currentBet = null; state.spinsThisSession = 0;
  generateFakePlayers(); generateAnalytics();
  state.gamesPlayed.add(gameId); if (state.gamesPlayed.size >= 5) unlockAchievement('all_games');
  el.dynamicGameAction.innerHTML = '';

  if (gameId === 'roulette') renderRoulette(c);
  else if (gameId === 'slots') renderSlots(c);
  else if (gameId === 'blackjack') renderBlackjack(c);
  else if (gameId === 'dice') renderDice(c);
  else if (gameId === 'safe') renderSafe(c);
  else if (gameId === 'poker') renderPoker(c);
  else if (gameId === 'wheel-fortune') renderFortune(c);
  else if (gameId === 'scratch') renderScratch(c);
  else if (gameId === 'sport') renderSport(c);
  else if (gameId === 'stock') renderStock(c);
  else if (gameId === 'gov') renderGov(c);
  else if (gameId === 'live') renderLive(c);
  else if (gameId === 'chat') renderChat(c);
  else if (gameId === 'bribe') renderBribe(c);
  
  setTimeout(() => {
    const a = document.getElementById(`an-${gameId}`); const p = document.getElementById(`pl-${gameId}`);
    if (a) renderAnalytics(a.id); if (p) renderFakePlayers(p.id);
  }, 50);
}
function commonSideHTML(gameId) { return `<div class="live-analytics" id="an-${gameId}"></div><div class="players-list" id="pl-${gameId}"></div>`; }

// ========== РУЛЕТКА ==========
function renderRoulette(c) {
  c.innerHTML = `
    <div class="roulette-wheel-wrap">
      <div class="pointer">▼</div>
      <div class="roulette-wheel" id="rouletteWheel"><div class="roulette-wheel-center" id="wheelCenter">?</div></div>
    </div>
    <div class="bets" style="margin-top:10px;">
      <button class="bet-btn red" data-bet="red">🔴 КРАСНОЕ x2</button>
      <button class="bet-btn black" data-bet="black">⚫ ЧЁРНОЕ x2</button>
      <button class="bet-btn" data-bet="even">2️⃣ ЧЁТ x2</button>
      <button class="bet-btn" data-bet="odd">1️⃣ НЕЧЁТ x2</button>
      <button class="bet-btn zero" data-bet="green" style="grid-column:1/-1;">🟢 ЗЕРО x36</button>
    </div>
    ${commonSideHTML('roulette')}
  `;
  el.dynamicGameAction.innerHTML = `<button class="spin-btn" id="spinBtn">🎡 КРУТИТЬ</button>`;
  
  const wheel = document.getElementById('rouletteWheel');
  const sectorAngle = 360 / 37;
  const order = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
  
  order.forEach((num, i) => {
    const color = num === 0 ? '#22c55e' : (RED_NUMBERS.includes(num) ? '#ef4444' : '#111');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.style.cssText = `position:absolute;inset:0;transform:rotate(${i*sectorAngle}deg);pointer-events:none;`;
    const a1 = -sectorAngle/2, a2 = sectorAngle/2;
    const x1 = 50+50*Math.cos((a1-90)*Math.PI/180), y1 = 50+50*Math.sin((a1-90)*Math.PI/180);
    const x2 = 50+50*Math.cos((a2-90)*Math.PI/180), y2 = 50+50*Math.sin((a2-90)*Math.PI/180);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`);
    path.setAttribute('fill', color); path.setAttribute('stroke', 'rgba(255,255,255,0.1)'); path.setAttribute('stroke-width', '0.5');
    svg.appendChild(path);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '75'); text.setAttribute('y', '50'); text.setAttribute('fill', '#fff'); text.setAttribute('font-size', '4'); text.setAttribute('font-family', 'sans-serif'); text.setAttribute('font-weight', 'bold'); text.setAttribute('text-anchor', 'middle'); text.setAttribute('dominant-baseline', 'middle'); text.textContent = num;
    svg.appendChild(text);
    wheel.appendChild(svg);
  });
  
  document.querySelectorAll('[data-bet]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.spinning) return;
      c.querySelectorAll('[data-bet]').forEach(b => b.classList.remove('active')); btn.classList.add('active');
      state.currentBet = btn.dataset.bet; state.sameBetCount++; sfx.click();
    });
  });
  document.getElementById('spinBtn').addEventListener('click', spinRoulette);
}

function spinRoulette() {
  if (state.spinning) return;
  if (!state.currentBet) { showToast('⚠️ Выбери ставку!'); return; }
  if (state.balance < state.currentAmount) { showToast('❌ Мало депутаток!'); return; }
  
  state.spinning = true;
  el.dynamicGameAction.querySelector('#spinBtn').disabled = true;
  updateUI(); sfx.spin(); vibrate(30);
  state.balance -= state.currentAmount; state.jackpot += Math.floor(state.currentAmount * 0.1); updateUI();
  
  const winningNumber = pickRouletteNumber();
  const winningColor = winningNumber === 0 ? 'green' : (RED_NUMBERS.includes(winningNumber) ? 'red' : 'black');
  const order = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
  const idx = order.indexOf(winningNumber);
  state.rouletteWheelRotation += 360 * 8 + (-idx * (360/37) - (state.rouletteWheelRotation % 360));
  document.getElementById('rouletteWheel').style.transform = `rotate(${state.rouletteWheelRotation}deg)`;
  
  let fc = 0; const fi = setInterval(() => { document.getElementById('wheelCenter').textContent = Math.floor(Math.random() * 37); if (++fc > 40) clearInterval(fi); }, 100);
  
  setTimeout(() => {
    clearInterval(fi); document.getElementById('wheelCenter').textContent = winningNumber;
    let isWin = false, mult = 0;
    switch (state.currentBet) {
      case 'red': isWin = winningColor === 'red'; mult = 2; break;
      case 'black': isWin = winningColor === 'black'; mult = 2; break;
      case 'even': isWin = winningNumber !== 0 && winningNumber % 2 === 0; mult = 2; break;
      case 'odd': isWin = winningNumber !== 0 && winningNumber % 2 !== 0; mult = 2; break;
      case 'green': isWin = winningNumber === 0; mult = 36; break;
    }
    
    if (isWin) {
      const payout = state.currentAmount * mult; state.balance += payout; state.wins++; state.streak = state.streak >= 0 ? state.streak + 1 : 1;
      showGameResult(`✅ Выпало ${winningNumber} · +${payout}`, true); sfx.win(); vibrate([50, 30, 50]);
    } else {
      state.losses++; state.streak = state.streak <= 0 ? state.streak - 1 : -1;
      showGameResult(`❌ Выпало ${winningNumber} · −${state.currentAmount}`, false); sfx.lose(); vibrate(100); checkLoseAchievements();
    }
    
    if (state.balance <= 0) unlockAchievement('bankrupt');
    if (state.balance < 100 && state.balance > 0) unlockAchievement('desperate');
    if (state.balance >= 1000000) unlockAchievement('millionaire');
    
    state.spinsThisSession++; state.lastSpinTime = Date.now(); state.spinning = false;
    el.dynamicGameAction.querySelector('#spinBtn').disabled = false;
    updateUI(); saveState(); generateFakePlayers(); generateAnalytics();
    const a = document.getElementById('an-roulette'); if (a) renderAnalytics('an-roulette');
  }, 6000);
}

// ========== СЛОТЫ ==========
function renderSlots(c) {
  c.innerHTML = `
    <div class="slot-machine">
      <div class="slot-reels-5" id="slotReels">${[0,1,2,3,4].map(i => `<div class="reel" data-reel="${i}"><span class="reel-symbol">👑</span></div>`).join('')}</div>
    </div>
    <div class="info-box" style="text-align:center;">Выплаты: 3 в ряд (слева) — x8, x10, x15, x25, x50</div>
    ${commonSideHTML('slots')}
  `;
  el.dynamicGameAction.innerHTML = `<button class="spin-btn" id="spinSlotsBtn">🎰 КРУТИТЬ</button>`;
  document.getElementById('spinSlotsBtn').addEventListener('click', spinSlots);
}

function spinSlots() {
  if (state.slotsSpinning) return;
  if (state.balance < state.currentAmount) { showToast('❌ Мало депутаток!'); return; }
  state.slotsSpinning = true; el.dynamicGameAction.querySelector('#spinSlotsBtn').disabled = true;
  sfx.spin(); vibrate(30); state.balance -= state.currentAmount; state.jackpot += Math.floor(state.currentAmount * 0.1); updateUI();
  
  const isForceWin = state.loseStreakToForceWin >= 8 || (state.balance < 20 && Math.random() < 0.1);
  
  let finalResult;
  if (isForceWin) {
    const sym = SLOT_SYMBOLS[Math.floor(Math.random() * 3)].icon;
    finalResult = [sym, sym, sym, SLOT_SYMBOLS[0].icon, SLOT_SYMBOLS[1].icon];
  } else {
    finalResult = [SLOT_SYMBOLS[Math.floor(Math.random()*5)].icon, SLOT_SYMBOLS[Math.floor(Math.random()*5)].icon, SLOT_SYMBOLS[Math.floor(Math.random()*5)].icon, SLOT_SYMBOLS[Math.floor(Math.random()*5)].icon, SLOT_SYMBOLS[Math.floor(Math.random()*5)].icon];
    if (finalResult[0] === finalResult[1] && finalResult[1] === finalResult[2]) finalResult[2] = SLOT_SYMBOLS[0].icon;
  }
  
  const reels = document.querySelectorAll('.reel');
  reels.forEach((r, i) => {
    r.classList.add('spinning');
    const interval = setInterval(() => { 
      const rnd = SLOT_SYMBOLS[Math.floor(Math.random() * 5)].icon;
      r.querySelector('.reel-symbol').innerHTML = `<img src="${rnd}" style="width:80%;height:80%;object-fit:contain;">`;
    }, 80);
    
    setTimeout(() => { 
      clearInterval(interval); 
      r.classList.remove('spinning'); 
      if (finalResult[i]) r.querySelector('.reel-symbol').innerHTML = `<img src="${finalResult[i]}" style="width:80%;height:80%;object-fit:contain;">`;
      sfx.click(); 
    }, 1500 + i * 300);
  });
  
  setTimeout(() => {
    const first3 = finalResult.slice(0, 3); let payout = 0, winText = '', isWin = false;
    if (first3[0] === first3[1] && first3[1] === first3[2] && first3[0]) {
      const symData = SLOT_SYMBOLS.find(s => s.icon === first3[0]);
      payout = Math.round(state.currentAmount * symData.value); winText = `✅ 3 ${symData.name} · +${payout}`; isWin = true;
    }
    
    if (isWin) {
      state.balance += payout; state.wins++; state.streak = state.streak >= 0 ? state.streak + 1 : 1; state.loseStreakToForceWin = 0;
      showGameResult(winText, true); sfx.win(); vibrate([50, 30, 50]);
    } else {
      state.losses++; state.streak = state.streak <= 0 ? state.streak - 1 : -1; state.loseStreakToForceWin++; state.slotsLossStreak++;
      if (state.slotsLossStreak >= 20) unlockAchievement('slots_lose');
      showGameResult(`❌ Не сошлось · −${state.currentAmount}`, false); sfx.lose(); vibrate(100); checkLoseAchievements();
    }
    
    if (state.balance <= 0) unlockAchievement('bankrupt');
    state.spinsThisSession++; state.lastSpinTime = Date.now(); state.slotsSpinning = false; el.dynamicGameAction.querySelector('#spinSlotsBtn').disabled = false;
    updateUI(); saveState(); generateFakePlayers(); generateAnalytics();
    const a = document.getElementById('an-slots'); if (a) renderAnalytics('an-slots');
  }, 3200);
}

// ========== БЛЭКДЖЕК ==========
function createDeck() {
  const deck = []; for (const s of CARD_SUITS) for (const v of CARD_VALUES) { deck.push({ suit: s, value: v, red: s === '♥' || s === '♦' }); }
  for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; } return deck;
}
function cardValue(c) { if (c.value === 'A') return 11; if (['J','Q','K'].includes(c.value)) return 10; return parseInt(c.value); }
function handTotal(hand) { let total = 0, aces = 0; for (const c of hand) { total += cardValue(c); if (c.value === 'A') aces++; } while (total > 21 && aces > 0) { total -= 10; aces--; } return total; }
function cardHTML(c, hidden = false) { if (hidden) return `<div class="card back">🂠</div>`; return `<div class="card ${c.red ? 'red' : ''}"><div style="font-size:1.2em;">${c.value}</div><div>${c.suit}</div></div>`; }

function renderBlackjack(c) {
  c.innerHTML = `
    <div class="bj-table-felt">
      <div class="bj-hand-label"><span>🎩 ДИЛЕР</span><span id="dealerScore">?</span></div>
      <div class="cards" id="dealerCards"></div>
      <div class="bj-hand-label"><span>👤 ТЫ</span><span id="playerScore">0</span></div>
      <div class="cards" id="playerCards"></div>
    </div>
    ${commonSideHTML('blackjack')}
  `;
  el.dynamicGameAction.innerHTML = `
    <button class="spin-btn" id="dealBtn">🃏 РАЗДАТЬ</button>
    <div id="bjActions" style="display:none;grid-template-columns:1fr 1fr;gap:8px;">
      <button class="spin-btn" id="hitBtn" style="background:var(--accent);">🃏 ВЗЯТЬ</button>
      <button class="spin-btn" id="standBtn" style="background:var(--red);">✋ ХВАТИТ</button>
    </div>
  `;
  document.getElementById('dealBtn').addEventListener('click', dealBlackjack);
  document.getElementById('hitBtn').addEventListener('click', hitBlackjack);
  document.getElementById('standBtn').addEventListener('click', standBlackjack);
}

function dealBlackjack() {
  if (state.bjActive) return;
  if (state.balance < state.currentAmount) { showToast('❌ Мало!'); return; }
  state.bjDeck = createDeck(); state.bjPlayerHand = [state.bjDeck.pop(), state.bjDeck.pop()]; state.bjDealerHand = [state.bjDeck.pop(), state.bjDeck.pop()];
  state.bjActive = true; state.bjBet = state.currentAmount; state.balance -= state.currentAmount; updateUI(); sfx.card();
  document.getElementById('dealBtn').style.display = 'none'; document.getElementById('bjActions').style.display = 'grid';
  renderBlackjack();
}
function renderBlackjack() {
  document.getElementById('playerCards').innerHTML = state.bjPlayerHand.map(c => cardHTML(c)).join('');
  document.getElementById('dealerCards').innerHTML = state.bjDealerHand.map((c, i) => cardHTML(c, i === 1 && state.bjActive)).join('');
  document.getElementById('playerScore').textContent = handTotal(state.bjPlayerHand);
  document.getElementById('dealerScore').textContent = state.bjActive ? '?' : handTotal(state.bjDealerHand);
}
function hitBlackjack() {
  if (!state.bjActive) return; const cur = handTotal(state.bjPlayerHand);
  if (Math.random() < 0.85 && cur >= 12) { state.bjPlayerHand.push({ suit: '♠', value: '10', red: false }); } else { state.bjPlayerHand.push(state.bjDeck.pop()); }
  sfx.card(); vibrate(30); renderBlackjack(); const t = handTotal(state.bjPlayerHand);
  if (t > 21) { unlockAchievement('blackjack_bust'); finishBlackjack(false); } else if (t === 21) standBlackjack();
}
function standBlackjack() {
  if (!state.bjActive) return;
  while (handTotal(state.bjDealerHand) < 17) state.bjDealerHand.push(state.bjDeck.pop());
  const pt = handTotal(state.bjPlayerHand); let dt = handTotal(state.bjDealerHand);
  if (dt < pt && dt <= 21) { state.bjDealerHand = [state.bjDeck.pop(), state.bjDeck.pop()]; while (handTotal(state.bjDealerHand) < 17) state.bjDealerHand.push(state.bjDeck.pop()); dt = handTotal(state.bjDealerHand); if (dt < pt && dt <= 21) { state.bjDealerHand.push({ suit: '♠', value: '10', red: false }); dt = handTotal(state.bjDealerHand); } }
  finishBlackjack(dt <= 21 && dt > pt);
}
function finishBlackjack(playerWon) {
  state.bjActive = false; renderBlackjack(); document.getElementById('bjActions').style.display = 'none'; document.getElementById('dealBtn').style.display = 'block';
  const pt = handTotal(state.bjPlayerHand), dt = handTotal(state.bjDealerHand);
  if (playerWon) {
    const payout = state.bjBet * 2; state.balance += payout; state.wins++; state.streak = state.streak >= 0 ? state.streak + 1 : 1; state.loseStreakToForceWin = 0;
    showGameResult(`✅ Победа ${pt} vs ${dt} · +${payout}`, true); sfx.win();
  } else {
    state.losses++; state.streak = state.streak <= 0 ? state.streak - 1 : -1; state.loseStreakToForceWin++;
    showGameResult(`❌ Проигрыш ${pt} vs ${dt} · −${state.bjBet}`, false); sfx.lose(); checkLoseAchievements();
  }
  updateUI(); saveState(); generateFakePlayers(); generateAnalytics(); const a = document.getElementById('an-blackjack'); if (a) renderAnalytics('an-blackjack');
}

// ========== КОСТИ (С ВЫРЕЗАНИЕМ ИЗ ОДНОЙ КАРТИНКИ) ==========
function renderDice(c) {
  c.innerHTML = `
    <div class="dice-table-3d">
      <div class="die-3d" id="die1"><div class="die-face front"></div></div>
      <div class="die-3d" id="die2"><div class="die-face front"></div></div>
    </div>
    <div class="bets" style="grid-template-columns:1fr 1fr; margin-top:10px;">
      <button class="bet-btn dice-bet" data-sum="2-4">2–4 (x2)</button>
      <button class="bet-btn dice-bet" data-sum="5-6">5–6 (x5)</button>
      <button class="bet-btn dice-bet" data-sum="7">7 (x5)</button>
      <button class="bet-btn dice-bet" data-sum="8-9">8–9 (x5)</button>
      <button class="bet-btn dice-bet" data-sum="10-12">10–12 (x2)</button>
      <button class="bet-btn dice-bet" data-sum="double">Дубль (x30)</button>
    </div>
    ${commonSideHTML('dice')}
  `;
  el.dynamicGameAction.innerHTML = `<button class="spin-btn" id="rollDiceBtn">🎲 БРОСИТЬ</button>`;
  
  document.querySelectorAll('.dice-bet').forEach(btn => {
    btn.addEventListener('click', () => { if (state.diceRolling) return; c.querySelectorAll('.dice-bet').forEach(b => b.classList.remove('active')); btn.classList.add('active'); state.diceSelectedBet = btn.dataset.sum; sfx.click(); });
  });
  document.getElementById('rollDiceBtn').addEventListener('click', rollDice);
  
  // Инициализируем кубики (ставим случайные грани)
  setDieFace(document.getElementById('die1'), 1);
  setDieFace(document.getElementById('die2'), 1);
}

function setDieFace(dieEl, value) {
  const face = dieEl.querySelector('.die-face');
  // Настраиваем под картинку dice.jpeg (сетка 3 колонки на 2 строки)
  const col = (value - 1) % 3; 
  const row = Math.floor((value - 1) / 3);
  
  // Сдвиг в процентах
  const x = col * 50; // для 3 колонок: 0, 50, 100 (но 100 это край, поэтому 0, 50, 100 работает)
  const y = row * 100; // для 2 строк: 0, 100
  
  face.style.backgroundImage = 'url(dice.jpeg)';
  face.style.backgroundSize = '300% 200%'; // 3 колонки (300%), 2 строки (200%)
  face.style.backgroundPosition = `${x}% ${y}%`;
  face.style.border = 'none';
  face.style.borderRadius = '8px';
  face.textContent = ''; // Убираем текст
}

function rollDice() {
  if (state.diceRolling) return;
  if (!state.diceSelectedBet) { showToast('⚠️ Выбери ставку!'); return; }
  if (state.balance < state.currentAmount) { showToast('❌ Мало!'); return; }
  state.diceRolling = true; el.dynamicGameAction.querySelector('#rollDiceBtn').disabled = true; sfx.dice(); vibrate(30);
  state.balance -= state.currentAmount; state.jackpot += Math.floor(state.currentAmount * 0.1); updateUI();
  
  let shouldWin = state.loseStreakToForceWin >= 8 || (state.balance < 20 && Math.random() < 0.1) || Math.random() < 0.05;
  const bet = state.diceSelectedBet;
  function doesBetWin(x, y) { const s = x + y, dbl = x === y; if (bet === 'double') return dbl; if (bet === '7') return s === 7; if (bet === '2-4') return s >= 2 && s <= 4; if (bet === '5-6') return s >= 5 && s <= 6; if (bet === '8-9') return s >= 8 && s <= 9; if (bet === '10-12') return s >= 10 && s <= 12; return false; }
  let d1, d2, found = false;
  for (let i = 0; i < 200; i++) { const x = Math.floor(Math.random() * 6) + 1; const y = Math.floor(Math.random() * 6) + 1; if (doesBetWin(x, y) === shouldWin) { d1 = x; d2 = y; found = true; break; } }
  if (!found) { d1 = Math.floor(Math.random()*6)+1; d2 = Math.floor(Math.random()*6)+1; }
  
  const die1 = document.getElementById('die1'); const die2 = document.getElementById('die2'); die1.classList.add('rolling'); die2.classList.add('rolling');
  setTimeout(() => {
    die1.classList.remove('rolling'); die2.classList.remove('rolling'); setDieFace(die1, d1); setDieFace(die2, d2);
    const finalSum = d1 + d2; const finalWins = doesBetWin(d1, d2);
    let mult = 2; if (bet === '7' || bet === '5-6' || bet === '8-9') mult = 5; if (bet === 'double') mult = 30;
    if (finalWins) {
      const payout = state.currentAmount * mult; state.balance += payout; state.wins++; state.streak = state.streak >= 0 ? state.streak + 1 : 1; state.loseStreakToForceWin = 0;
      showGameResult(`✅ ${finalSum} (${d1}+${d2}) · +${payout}`, true); sfx.win();
    } else {
      state.losses++; state.streak = state.streak <= 0 ? state.streak - 1 : -1; state.loseStreakToForceWin++;
      showGameResult(`❌ ${finalSum} (${d1}+${d2}) · −${state.currentAmount}`, false); sfx.lose(); checkLoseAchievements();
    }
    state.diceRolling = false; el.dynamicGameAction.querySelector('#rollDiceBtn').disabled = false; updateUI(); saveState(); generateFakePlayers(); generateAnalytics(); const a = document.getElementById('an-dice'); if (a) renderAnalytics('an-dice');
  }, 2000);
}

// ========== СЕЙФ ==========
function renderSafe(c) {
  c.innerHTML = `
    <div class="safe-grid">${[0,1,2,3,4].map(i => `<div class="safe-cell" data-cell="${i}">💼</div>`).join('')}</div>
    <div style="text-align:center;color:var(--text-dim);font-size:12px;margin-top:8px;">💰 В одной ячейке — x4</div>
    ${commonSideHTML('safe')}
  `;
  el.dynamicGameAction.innerHTML = `<button class="spin-btn" id="safeStartBtn">💎 ИГРАТЬ</button>`;
  document.getElementById('safeStartBtn').addEventListener('click', () => { if (!state.safeActive) startSafe(); });
  document.querySelectorAll('.safe-cell').forEach(cell => { cell.addEventListener('click', () => { if (state.safeActive && !state.safeChosen) pickSafeCell(parseInt(cell.dataset.cell)); }); });
}
function startSafe() {
  if (state.safeActive) return; if (state.balance < state.currentAmount) { showToast('❌ Мало!'); return; }
  state.safeActive = true; state.safeChosen = false; state.balance -= state.currentAmount; state.jackpot += Math.floor(state.currentAmount * 0.1); updateUI();
  el.dynamicGameAction.querySelector('#safeStartBtn').textContent = '💎 ЖДЁМ...'; el.dynamicGameAction.querySelector('#safeStartBtn').disabled = true;
  document.querySelectorAll('.safe-cell').forEach(cl => { cl.className = 'safe-cell'; cl.textContent = '💼'; });
}
function pickSafeCell(idx) {
  if (!state.safeActive || state.safeChosen) return; state.safeChosen = true;
  const playerWon = state.loseStreakToForceWin >= 8 || (state.balance < 20 && Math.random() < 0.1) || Math.random() < 0.02;
  const cells = document.querySelectorAll('.safe-cell');
  if (playerWon) { cells[idx].classList.add('win'); cells[idx].textContent = '💎'; } else { cells[idx].classList.add('lose'); const prizeIdx = (idx + 1 + Math.floor(Math.random() * 4)) % 5; cells[prizeIdx].classList.add('win'); cells[prizeIdx].textContent = '💎'; }
  setTimeout(() => {
    if (playerWon) { const payout = state.currentAmount * 4; state.balance += payout; state.wins++; state.streak = state.streak >= 0 ? state.streak + 1 : 1; state.loseStreakToForceWin = 0; showGameResult(`✅ Есть! · +${payout}`, true); sfx.win(); }
    else { state.losses++; state.streak = state.streak <= 0 ? state.streak - 1 : -1; state.loseStreakToForceWin++; showGameResult(`❌ Пусто · −${state.currentAmount}`, false); sfx.lose(); checkLoseAchievements(); }
    state.safeActive = false; el.dynamicGameAction.querySelector('#safeStartBtn').textContent = '💎 ИГРАТЬ СНОВА'; el.dynamicGameAction.querySelector('#safeStartBtn').disabled = false; updateUI(); saveState(); generateFakePlayers(); generateAnalytics(); const a = document.getElementById('an-safe'); if (a) renderAnalytics('an-safe');
  }, 500);
}

// ========== ПОКЕР ==========
function evaluatePokerHand(cards) {
  const values = cards.map(c => { if (c.value === 'A') return 14; if (c.value === 'K') return 13; if (c.value === 'Q') return 12; if (c.value === 'J') return 11; return parseInt(c.value); });
  const suits = cards.map(c => c.suit); const valueCounts = {}; values.forEach(v => valueCounts[v] = (valueCounts[v] || 0) + 1);
  const counts = Object.values(valueCounts).sort((a,b) => b - a); const suitCounts = {}; suits.forEach(s => suitCounts[s] = (suitCounts[s] || 0) + 1); const maxSuit = Math.max(...Object.values(suitCounts));
  const uniqValues = [...new Set(values)].sort((a,b) => b - a); let isStraight = false;
  for (let i = 0; i <= uniqValues.length - 5; i++) { let ok = true; for (let j = 1; j < 5; j++) { if (uniqValues[i] - uniqValues[i+j] !== j) { ok = false; break; } } if (ok) { isStraight = true; break; } }
  if (!isStraight && uniqValues.includes(14) && uniqValues.includes(2) && uniqValues.includes(3) && uniqValues.includes(4) && uniqValues.includes(5)) isStraight = true;
  const isFlush = maxSuit >= 5; const isRoyal = isFlush && uniqValues.includes(14) && uniqValues.includes(13) && uniqValues.includes(12) && uniqValues.includes(11) && uniqValues.includes(10);
  if (isRoyal) return { rank: 10, name: 'Роял-флеш' };
  if (isStraight && isFlush) return { rank: 9, name: 'Стрит-флеш' };
  if (counts[0] === 4) return { rank: 8, name: 'Каре' };
  if (counts[0] === 3 && counts[1] >= 2) return { rank: 7, name: 'Фулл-хаус' };
  if (isFlush) return { rank: 6, name: 'Флеш' };
  if (isStraight) return { rank: 5, name: 'Стрит' };
  if (counts[0] === 3) return { rank: 4, name: 'Сет' };
  if (counts[0] === 2 && counts[1] === 2) return { rank: 3, name: 'Две пары' };
  if (counts[0] === 2) return { rank: 2, name: 'Пара' };
  return { rank: 1, name: 'Старшая карта' };
}
function renderPoker(c) {
  c.innerHTML = `
    <div class="poker-table">
      <div class="bj-hand-label">🎩 ДИЛЕР</div><div class="cards" id="pokerDealer"></div>
      <div class="bj-hand-label">🎴 СТОЛ</div><div class="cards" id="pokerTable"></div>
      <div class="bj-hand-label">👤 ТЫ</div><div class="cards" id="pokerPlayer"></div>
    </div>
    ${commonSideHTML('poker')}
  `;
  el.dynamicGameAction.innerHTML = `<button class="spin-btn" id="pokerDealBtn">♠️ РАЗДАТЬ</button>`;
  document.getElementById('pokerDealBtn').addEventListener('click', playPoker);
}
function playPoker() {
  if (state.balance < state.currentAmount) { showToast('❌ Мало!'); return; }
  state.balance -= state.currentAmount; state.jackpot += Math.floor(state.currentAmount * 0.1); updateUI(); sfx.card();
  const deck = createDeck(); state.pokerPlayer = [deck.pop(), deck.pop()]; state.pokerDealer = [deck.pop(), deck.pop()]; state.pokerTable = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];
  document.getElementById('pokerPlayer').innerHTML = state.pokerPlayer.map(c => cardHTML(c)).join(''); document.getElementById('pokerTable').innerHTML = ''; document.getElementById('pokerDealer').innerHTML = state.pokerDealer.map(c => cardHTML(c, true)).join('');
  el.dynamicGameAction.querySelector('#pokerDealBtn').disabled = true;
  let i = 0; const interval = setInterval(() => { if (i >= state.pokerTable.length) { clearInterval(interval); finishPoker(); return; } document.getElementById('pokerTable').innerHTML += cardHTML(state.pokerTable[i]); sfx.card(); i++; }, 300);
}
function finishPoker() {
  document.getElementById('pokerDealer').innerHTML = state.pokerDealer.map(c => cardHTML(c)).join('');
  const pHand = evaluatePokerHand([...state.pokerPlayer, ...state.pokerTable]); const dHand = evaluatePokerHand([...state.pokerDealer, ...state.pokerTable]);
  const forceWin = state.loseStreakToForceWin >= 8;
  const playerWins = forceWin || (pHand.rank > dHand.rank && Math.random() < 0.05);
  setTimeout(() => {
    if (playerWins) { const payout = state.currentAmount * 2; state.balance += payout; state.wins++; state.streak = state.streak >= 0 ? state.streak + 1 : 1; state.loseStreakToForceWin = 0; showGameResult(`✅ ${pHand.name} vs ${dHand.name} · +${payout}`, true); sfx.win(); }
    else { state.losses++; state.streak = state.streak <= 0 ? state.streak - 1 : -1; state.loseStreakToForceWin++; showGameResult(`❌ ${pHand.name} vs ${dHand.name} · −${state.currentAmount}`, false); sfx.lose(); checkLoseAchievements(); }
    el.dynamicGameAction.querySelector('#pokerDealBtn').disabled = false; updateUI(); saveState(); generateFakePlayers(); generateAnalytics(); const a = document.getElementById('an-poker'); if (a) renderAnalytics('an-poker');
  }, 500);
}

// ========== ФОРТУНА ==========
function renderFortune(c) {
  const sectorAngle = 360 / 24; const colors = ['#ef4444','#ffc94a','#22c55e','#ef4444','#06b6d4','#ef4444','#a855f7','#ffc94a','#ef4444','#22c55e','#ffc94a','#ef4444','#ffc94a','#22c55e','#ef4444','#06b6d4','#ef4444','#ef4444','#ffc94a','#ffc94a','#ef4444','#22c55e','#ef4444','#ffc94a'];
  c.innerHTML = `
    <div style="position:relative;width:260px;height:260px;margin:0 auto;filter:drop-shadow(0 0 20px rgba(255,201,74,0.3));">
      <div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);font-size:24px;color:var(--gold);z-index:20;">▼</div>
      <div id="fortuneWheel" style="width:100%;height:100%;border-radius:50%;border:3px solid var(--border);overflow:hidden;transition:transform 6s cubic-bezier(0.15,0.6,0.1,1);">
        ${FORTUNE_MULTS.map((m, i) => { const a1 = i * sectorAngle - sectorAngle/2; const a2 = (i+1) * sectorAngle - sectorAngle/2; const x1 = 50 + 50 * Math.cos((a1 - 90) * Math.PI / 180); const y1 = 50 + 50 * Math.sin((a1 - 90) * Math.PI / 180); const x2 = 50 + 50 * Math.cos((a2 - 90) * Math.PI / 180); const y2 = 50 + 50 * Math.sin((a2 - 90) * Math.PI / 180); return `<svg viewBox="0 0 100 100" style="position:absolute;inset:0;pointer-events:none;"><path d="M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z" fill="${colors[i]}" stroke="rgba(255,255,255,0.2)" stroke-width="0.3"/><text x="${(x1+x2)/2}" y="${(y1+y2)/2}" fill="#fff" font-size="4" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${m}x</text></svg>`; }).join('')}
      </div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:50px;height:50px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;color:#1a1f2a;border:2px solid #fff;" id="fortuneCenter">?</div>
    </div>
    ${commonSideHTML('fortune')}
  `;
  el.dynamicGameAction.innerHTML = `<button class="spin-btn" id="fortuneSpinBtn">🎯 КРУТИТЬ</button>`;
  document.getElementById('fortuneSpinBtn').addEventListener('click', spinFortune);
}
function spinFortune() {
  if (state.spinning) return; if (state.balance < state.currentAmount) { showToast('❌ Мало!'); return; }
  state.spinning = true; el.dynamicGameAction.querySelector('#fortuneSpinBtn').disabled = true; state.balance -= state.currentAmount; state.jackpot += Math.floor(state.currentAmount * 0.1); updateUI(); sfx.spin();
  const forceWin = state.loseStreakToForceWin >= 8;
  let idx;
  if (forceWin) { const goodIdx = FORTUNE_MULTS.map((m, i) => m >= 2 ? i : -1).filter(i => i >= 0); idx = goodIdx[Math.floor(Math.random() * goodIdx.length)]; }
  else { const badIdx = FORTUNE_MULTS.map((m, i) => m === 0 ? i : -1).filter(i => i >= 0); idx = badIdx[Math.floor(Math.random() * badIdx.length)]; }
  const sectorAngle = 360 / 24; const wheel = document.getElementById('fortuneWheel'); const currentRot = state.rouletteWheelRotation || 0; state.rouletteWheelRotation = currentRot + 360 * 5 + (-idx * sectorAngle - (currentRot % 360)); wheel.style.transform = `rotate(${state.rouletteWheelRotation}deg)`;
  setTimeout(() => {
    const mult = FORTUNE_MULTS[idx]; const payout = Math.round(state.currentAmount * mult); document.getElementById('fortuneCenter').textContent = 'x' + mult;
    if (mult > 1) { state.balance += payout; state.wins++; state.streak = state.streak >= 0 ? state.streak + 1 : 1; state.loseStreakToForceWin = 0; showGameResult(`✅ x${mult} · +${payout}`, true); sfx.win(); }
    else { state.losses++; state.streak = state.streak <= 0 ? state.streak - 1 : -1; state.loseStreakToForceWin++; showGameResult(`❌ x${mult} · −${state.currentAmount - payout}`, false); sfx.lose(); checkLoseAchievements(); }
    state.spinning = false; el.dynamicGameAction.querySelector('#fortuneSpinBtn').disabled = false; updateUI(); saveState(); generateFakePlayers(); generateAnalytics(); const a = document.getElementById('an-fortune'); if (a) renderAnalytics('an-fortune');
  }, 6000);
}

// ========== СКРЕТЧ ==========
function renderScratch(c) {
  c.innerHTML = `
    <div style="position:relative;width:min(100%, 300px);aspect-ratio:1;margin:0 auto;">
      <div id="scratchPrize" style="position:absolute;inset:0;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px;"></div>
      <canvas id="scratchCanvas" width="300" height="300" style="width:100%;height:100%;position:absolute;inset:0;border-radius:var(--radius);touch-action:none;"></canvas>
    </div>
    ${commonSideHTML('scratch')}
  `;
  el.dynamicGameAction.innerHTML = `<button class="spin-btn" id="scratchStartBtn">🎟️ КУПИТЬ БИЛЕТ</button>`;
  document.getElementById('scratchStartBtn').addEventListener('click', startScratch);
}
function startScratch() {
  if (state.balance < state.currentAmount) { showToast('❌ Мало!'); return; }
  state.balance -= state.currentAmount; state.jackpot += Math.floor(state.currentAmount * 0.1); updateUI(); sfx.click();
  const symbols = ['car.jpeg','bottle.jpeg','duma.jpeg','money.jpeg','crown.jpeg']; const grid = []; const forceWin = state.loseStreakToForceWin >= 8;
  if (forceWin) { const sym = ['car.jpeg','bottle.jpeg'][Math.floor(Math.random() * 2)]; grid.push(sym, sym, sym); for (let i = 0; i < 6; i++) grid.push(symbols[Math.floor(Math.random()*5)]); for (let i = grid.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [grid[i], grid[j]] = [grid[j], grid[i]]; } }
  else { for (let i = 0; i < 9; i++) grid.push(symbols[Math.floor(Math.random() * 5)]); const counts = {}; grid.forEach(s => counts[s] = (counts[s] || 0) + 1); for (const s in counts) { if (counts[s] >= 3) grid[grid.indexOf(s)] = 'car.jpeg'; } }
  document.getElementById('scratchPrize').innerHTML = grid.map(s => `<div style="background:var(--bg-soft);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:32px;"><img src="${s}" style="width:70%;height:70%;object-fit:contain;"></div>`).join('');
  const canvas = document.getElementById('scratchCanvas'); const ctx = canvas.getContext('2d'); canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height); grad.addColorStop(0, '#ffc94a'); grad.addColorStop(1, '#b8922f'); ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.font = 'bold 18px Inter'; ctx.textAlign = 'center'; ctx.fillText('СОТРИ', canvas.width / 2, canvas.height / 2);
  let isDrawing = false;
  function erase(x, y) { ctx.globalCompositeOperation = 'destination-out'; ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI * 2); ctx.fill(); }
  function getCoords(e) { const rect = canvas.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e; return { x: (t.clientX - rect.left) * (canvas.width / rect.width), y: (t.clientY - rect.top) * (canvas.height / rect.height) }; }
  canvas.onmousedown = canvas.ontouchstart = (e) => { e.preventDefault(); isDrawing = true; const { x, y } = getCoords(e); erase(x, y); };
  canvas.onmousemove = canvas.ontouchmove = (e) => { e.preventDefault(); if (!isDrawing) return; const { x, y } = getCoords(e); erase(x, y); };
  canvas.onmouseup = canvas.ontouchend = () => { isDrawing = false; };
  el.dynamicGameAction.querySelector('#scratchStartBtn').disabled = true;
  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let mult = 0; const counts = {}; grid.forEach(s => counts[s] = (counts[s] || 0) + 1);
    for (const s in counts) { if (counts[s] >= 3) { const val = { 'car.jpeg':0.5, 'bottle.jpeg':1, 'duma.jpeg':2, 'money.jpeg':5, 'crown.jpeg':20 }[s] || 0.5; mult = Math.max(mult, val); } }
    if (mult > 0) { const payout = Math.round(state.currentAmount * mult); state.balance += payout; state.wins++; state.streak = state.streak >= 0 ? state.streak + 1 : 1; state.loseStreakToForceWin = 0; showGameResult(`✅ x${mult} · +${payout}`, true); sfx.win(); }
    else { state.losses++; state.streak = state.streak <= 0 ? state.streak - 1 : -1; state.loseStreakToForceWin++; showGameResult(`❌ Ничего · −${state.currentAmount}`, false); sfx.lose(); checkLoseAchievements(); }
    el.dynamicGameAction.querySelector('#scratchStartBtn').disabled = false; el.dynamicGameAction.querySelector('#scratchStartBtn').textContent = '🎟️ ЕЩЁ'; updateUI(); saveState(); generateFakePlayers(); generateAnalytics(); const a = document.getElementById('an-scratch'); if (a) renderAnalytics('an-scratch');
  }, 8000);
}

// ========== СПОРТ ==========
function renderSport(c) {
  c.innerHTML = `
    <div class="bj-table-felt" id="sportField" style="display:flex;flex-direction:column;justify-content:center;align-items:center;"><div style="color:rgba(255,255,255,0.5);">Нажми «Найти матч»</div></div>
    <div class="bets" style="grid-template-columns:1fr 1fr; margin-top:10px;">
      <button class="bet-btn" data-sport="win">🏆 Победа</button>
      <button class="bet-btn" data-sport="lose">💀 Поражение</button>
      <button class="bet-btn" data-sport="draw">🤝 Ничья</button>
      <button class="bet-btn" data-sport="total">⚽ Тотал 2.5</button>
    </div>
    ${commonSideHTML('sport')}
  `;
  el.dynamicGameAction.innerHTML = `<button class="spin-btn" id="sportFindBtn">⚽ НАЙТИ МАТЧ</button>`;
  document.querySelectorAll('[data-sport]').forEach(btn => { btn.addEventListener('click', () => { c.querySelectorAll('[data-sport]').forEach(b => b.classList.remove('active')); btn.classList.add('active'); state.sportBet = btn.dataset.sport; sfx.click(); }); });
  document.getElementById('sportFindBtn').addEventListener('click', findMatch);
}
function findMatch() {
  if (!state.sportBet) { showToast('⚠️ Выбери исход!'); return; }
  if (state.balance < state.currentAmount) { showToast('❌ Мало!'); return; }
  state.balance -= state.currentAmount; state.jackpot += Math.floor(state.currentAmount * 0.1); updateUI(); sfx.click();
  el.dynamicGameAction.querySelector('#sportFindBtn').disabled = true;
  const teams = ['Газдеп','Нефтеград','Угольск','Энергобург','Металлург','Ростепло','Дума-Юнайтед','Прокуратура-Сити'];
  const t1 = teams[Math.floor(Math.random() * teams.length)]; let t2 = teams[Math.floor(Math.random() * teams.length)]; while (t2 === t1) t2 = teams[Math.floor(Math.random() * teams.length)];
  let score1 = 0, score2 = 0, minute = 0;
  function updateField() { document.getElementById('sportField').innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;width:100%;gap:10px;"><div style="font-weight:700;color:#fff;text-align:left;">${t1}</div><div style="font-size:24px;color:var(--gold);">${score1} : ${score2}</div><div style="font-weight:700;color:#fff;text-align:right;">${t2}</div></div><div style="text-align:center;color:var(--green);font-size:12px;margin-top:8px;">${minute}'</div>`; }
  updateField();
  const interval = setInterval(() => { minute += 5; if (minute > 90) minute = 90; if (Math.random() < 0.15) { if (Math.random() < 0.5) score1++; else score2++; sfx.click(); vibrate(30); } updateField(); if (minute >= 90) { clearInterval(interval); setTimeout(() => finishSport(t1, t2, score1, score2), 1000); } }, 200);
}
function finishSport(t1, t2, score1, score2) {
  const forceWin = state.loseStreakToForceWin >= 8;
  const actualResult = score1 > score2 ? 'win' : (score1 < score2 ? 'lose' : 'draw');
  let isWin = false; if (state.sportBet === 'total') { isWin = forceWin || Math.random() < 0.05; } else { isWin = forceWin || (state.sportBet === actualResult && Math.random() < 0.05); }
  if (isWin) { const payout = state.currentAmount * 2; state.balance += payout; state.wins++; state.streak = state.streak >= 0 ? state.streak + 1 : 1; state.loseStreakToForceWin = 0; showGameResult(`✅ Угадал ${score1}:${score2} · +${payout}`, true); sfx.win(); }
  else { state.losses++; state.streak = state.streak <= 0 ? state.streak - 1 : -1; state.loseStreakToForceWin++; showGameResult(`❌ Не угадал ${score1}:${score2} · −${state.currentAmount}`, false); sfx.lose(); checkLoseAchievements(); }
  el.dynamicGameAction.querySelector('#sportFindBtn').disabled = false; updateUI(); saveState(); generateFakePlayers(); generateAnalytics(); const a = document.getElementById('an-sport'); if (a) renderAnalytics('an-sport');
}

// ========== БИРЖА ==========
function renderStock(c) {
  c.innerHTML = `
    <div class="bj-table-felt" style="text-align:center;">
      <div style="font-size:28px;font-weight:900;color:var(--gold);" id="stockPrice">${state.stockPrice} ₽</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-bottom:10px;">Акции «Газдепа»</div>
      <div style="font-size:14px;font-weight:700;margin-bottom:10px;" id="stockChange">▲ 0.00%</div>
      <div style="background:rgba(0,0,0,0.3);border-radius:8px;padding:10px;"><svg id="stockSvg" viewBox="0 0 300 100" style="width:100%;height:100px;"><path id="stockPath" fill="none" stroke="var(--gold)" stroke-width="2"/></svg></div>
      <div style="margin-top:10px;font-size:13px;color:rgba(255,255,255,0.8);">Твои акции: <b id="stockOwned" style="color:var(--gold);">${state.stockOwned}</b></div>
    </div>
    <div class="bets" style="grid-template-columns:1fr 1fr; margin-top:10px;">
      <button class="bet-btn" id="buyStockBtn">📈 КУПИТЬ</button><button class="bet-btn" id="sellStockBtn">📉 ПРОДАТЬ</button>
    </div>
    ${commonSideHTML('stock')}
  `;
  el.dynamicGameAction.innerHTML = `<button class="spin-btn" id="tradeBtn">💼 ТОРГОВАТЬ</button>`;
  document.getElementById('buyStockBtn').addEventListener('click', () => tradeStock(true));
  document.getElementById('sellStockBtn').addEventListener('click', () => tradeStock(false));
  document.getElementById('tradeBtn').addEventListener('click', tickStock);
  drawStockChart();
}
function drawStockChart() { const hist = state.stockHistory.slice(-30); if (hist.length < 2) return; const min = Math.min(...hist); const max = Math.max(...hist); const range = max - min || 1; let d = ''; hist.forEach((v, i) => { const x = (i / (hist.length - 1)) * 300; const y = 100 - ((v - min) / range) * 80 - 10; d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' '; }); const pathEl = document.getElementById('stockPath'); if (pathEl) pathEl.setAttribute('d', d); }
function tradeStock(buy) {
  const amount = Math.max(1, Math.floor(state.currentAmount / state.stockPrice));
  if (buy) { if (state.balance < amount * state.stockPrice) { showToast('❌ Мало!'); return; } state.balance -= amount * state.stockPrice; state.stockOwned += amount; showToast(`📈 Куплено ${amount} акций`); }
  else { if (state.stockOwned < 1) { showToast('❌ Нет акций'); return; } const amt = Math.min(state.stockOwned, amount); state.balance += amt * state.stockPrice; state.stockOwned -= amt; showToast(`📉 Продано ${amt} акций`); }
  sfx.click(); updateUI(); const owned = document.getElementById('stockOwned'); if (owned) owned.textContent = state.stockOwned; saveState();
}
function tickStock() {
  const drop = Math.random() < 0.85 ? -0.05 - Math.random() * 0.15 : 0.02 + Math.random() * 0.05;
  state.stockPrice = Math.max(100, Math.floor(state.stockPrice * (1 + drop))); state.stockHistory.push(state.stockPrice); if (state.stockHistory.length > 50) state.stockHistory.shift();
  const priceEl = document.getElementById('stockPrice'); const changeEl = document.getElementById('stockChange');
  if (priceEl) priceEl.textContent = state.stockPrice + ' ₽'; if (changeEl) { changeEl.textContent = (drop >= 0 ? '▲ +' : '▼ ') + (drop * 100).toFixed(2) + '%'; changeEl.style.color = drop >= 0 ? 'var(--green)' : 'var(--red)'; }
  drawStockChart(); sfx.click(); saveState();
}

// ========== ГОСЗАКУПКИ ==========
function renderGov(c) {
  const items = [{ name: '🚽 Унитаз для школы', realPrice: 5000, desc: 'Импортный, с подогревом' },{ name: '🖼️ Портрет мэра', realPrice: 15000, desc: 'Золотая рама' },{ name: '🚗 Служебный BMW', realPrice: 5000000, desc: 'Для рабочих поездок' },{ name: '🏛️ Ремонт крыши', realPrice: 30000, desc: 'Капитальный' },{ name: '💻 Ноутбук', realPrice: 8000, desc: 'Игровой, для отчётов' },{ name: '🍾 Банкет', realPrice: 25000, desc: 'Деловая встреча' }];
  const item = items[Math.floor(Math.random() * items.length)]; const price = item.realPrice * 10;
  c.innerHTML = `
    <div class="bj-table-felt" style="text-align:center;display:flex;flex-direction:column;justify-content:center;">
      <div style="font-size:32px;margin-bottom:10px;">🏛️</div>
      <div style="font-size:14px;font-weight:700;color:var(--gold);margin-bottom:6px;">ГОСЗАКУПКА</div>
      <div style="font-size:18px;color:#fff;margin-bottom:6px;">${item.name}</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-bottom:10px;">${item.desc}</div>
      <div style="font-size:24px;color:var(--gold);font-weight:900;">${price.toLocaleString('ru-RU')} ₽</div>
      <div style="font-size:11px;color:var(--red);margin-top:6px;">Реальная цена: ${item.realPrice.toLocaleString('ru-RU')} ₽</div>
    </div>
    ${commonSideHTML('gov')}
  `;
  el.dynamicGameAction.innerHTML = `<button class="spin-btn" id="govBuyBtn">🏛️ КУПИТЬ</button>`;
  document.getElementById('govBuyBtn').addEventListener('click', () => { if (state.balance < price) { showToast('❌ Мало!'); return; } state.balance -= price; state.losses++; unlockAchievement('gov_buy'); showGameResult(`✅ Закупка оформлена! −${price}`, false); sfx.lose(); updateUI(); saveState(); });
}

// ========== LIVE ==========
function renderLive(c) {
  c.innerHTML = `
    <div style="background:#000;border-radius:var(--radius);overflow:hidden;aspect-ratio:16/9;position:relative;">
      <div style="position:absolute;top:10px;left:10px;background:var(--red);color:#fff;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:800;z-index:5;">LIVE</div>
      <div style="position:absolute;inset:0;background:radial-gradient(circle at center bottom, rgba(255,201,74,0.15), transparent 60%), #1a0033;display:flex;align-items:flex-end;justify-content:center;padding:20px;"><div style="font-size:64px;">👩‍💼</div></div>
      <div style="position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.6);color:#fff;padding:4px 8px;border-radius:10px;font-size:10px;" id="liveViewers">👁 1 234</div>
    </div>
    ${commonSideHTML('live')}
  `;
  el.dynamicGameAction.innerHTML = `<button class="spin-btn" id="liveBetBtn">🎥 СТАВКА В LIVE</button>`;
  document.getElementById('liveBetBtn').addEventListener('click', () => {
    if (state.loseStreakToForceWin >= 8) { const bonus = 100; state.balance += bonus; showGameResult(`🎁 Бонус за просмотр +${bonus}`, true); sfx.win(); updateUI(); saveState(); return; }
    if (state.balance < state.currentAmount) { showToast('❌ Мало!'); return; }
    state.balance -= state.currentAmount; state.losses++; state.loseStreakToForceWin++; state.liveWatchCount++;
    if (state.liveWatchCount >= 3) unlockAchievement('live_watch');
    showGameResult(`❌ Дилер выиграла · −${state.currentAmount}`, false); sfx.lose(); updateUI(); saveState(); checkLoseAchievements();
  });
}

// ========== ЧАТ ==========
const AI_RESPONSES = { greetings: ['Привет, депутат! Как настроение перед игрой?','Здравствуй. Готов потерять депутатки?','О, новый игрок! Добро пожаловать. 😊','Привет. У нас тут почти честно.'], aboutCasino: ['Мы — лучшее казино. У нас 2.7% преимущества. Шутка, 90%.','Наше казино честное. Почти всегда.','Мы просто хотим, чтобы ты был счастлив. И беден.','Казино — это как депутатство. Все всё знают, но делают вид, что нет.'], aboutMoney: ['Деньги — это просто числа. Особенно когда их нет.','Депни хату, станет веселее.','У тебя мало? Возьми кредит! Всего 500%.','Мы можем дать тебе денег. Но вернёшь в 5 раз больше.'], aboutWin: ['Выиграть? Это возможно. Теоретически.','Кто-то выигрывает. Не ты.','Победа — это миф. Но приятный.','Вероятность победы — 8%. Остальное — удача.'], aboutLose: ['Проиграл? Это опыт. Полезный.','Не переживай, дальше будет хуже.','Отрицательный результат — тоже результат.','Проигрыш — это шаг к победе. Или к банкротству.'], aboutCredit: ['Кредит — это инвестиция в себя. И в нас.','500% годовых — это же почти бесплатно!','Взять кредит — отличная идея. Вернуть — не очень.','Мы не банк. Мы лучше. Мы казино.'], aboutGov: ['Госзакупки — святое. Не трогай.','Унитаз за 50 000 — это норма. Импортный.','Осваивай бюджет. Мы поможем. За 50%.','Госзакупки — отличная схема. Для нас.'], aboutBribe: ['Прокуратура тоже люди. Им тоже нужно.','Отмазка — это искусство. За деньги.','Мы не берём взятки. Мы принимаем благодарности.','Заплати — и всё решится. Наверное.'], aboutGold: ['Золото — валюта элиты. У тебя её нет?','Приложи NFC — и станешь богаче.','Депутатское золото — это как доллар, только круче.','Золото — единственное, что нам дорого.'], questions: ['Интересный вопрос. Давай сделаем вид, что я ответил.','Хм. Ответ знает только казино.','Я думаю... Но недолго.','Не могу ответить. Я всего лишь ИИ.'], jokes: ['Почему депутат не боится казино? Потому что казино боится депутата.','Казино и депутат — это одно и то же. Только у депутата больше льгот.','Как выиграть в казино? Купить его. Как депутат.','Депутат и рулетка: оба крутятся, но депутат лучше.'], thanks: ['Всегда рады! Приходи ещё. С деньгами.','Спасибо! Мы тебя не забудем. Никогда.','Обращайся. Мы всегда здесь. И ждём.','Спасибо. Теперь депни хату.'], default: ['Интересно. Продолжай.','Понял тебя, депутат.','Хм. Это всё?','Давай ещё. Или депни.','У нас тут казино, а не психолог.','Слушаю. Но лучше играй.','Говори прямо. Или ставь.','Ты интересный собеседник. Но бедный.'] };
function getAIResponse(msg) { const m = msg.toLowerCase(); if (m.match(/(привет|здравств|хай|ку|добрый)/)) return rand(AI_RESPONSES.greetings); if (m.match(/(казино|игр|крут|ставк)/)) return rand(AI_RESPONSES.aboutCasino); if (m.match(/(деньг|депутатк|баланс)/)) return rand(AI_RESPONSES.aboutMoney); if (m.match(/(выигр|побед|удач|фарт)/)) return rand(AI_RESPONSES.aboutWin); if (m.match(/(проигр|минус|потер|слил)/)) return rand(AI_RESPONSES.aboutLose); if (m.match(/(кредит|долг)/)) return rand(AI_RESPONSES.aboutCredit); if (m.match(/(госзакуп|бюджет|откат)/)) return rand(AI_RESPONSES.aboutGov); if (m.match(/(взятк|прокур|отмаз|полиц)/)) return rand(AI_RESPONSES.aboutBribe); if (m.match(/(золот|nfc|метк)/)) return rand(AI_RESPONSES.aboutGold); if (m.match(/(спасиб|благодар)/)) return rand(AI_RESPONSES.thanks); if (m.match(/(анекдот|шутк|расскаж)/)) return rand(AI_RESPONSES.jokes); if (m.match(/\?$/)) return rand(AI_RESPONSES.questions); return rand(AI_RESPONSES.default); }
function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function renderChat(c) {
  c.innerHTML = `
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);display:flex;flex-direction:column;height:300px;">
      <div class="chat-messages" id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;"><div style="background:var(--bg-soft);padding:8px 12px;border-radius:12px;font-size:13px;align-self:flex-start;max-width:80%;">🎭 Привет, депутат! Я — ИИ-казино. Спрашивай.</div></div>
      <div style="display:flex;gap:6px;padding:10px;border-top:1px solid var(--border);"><input class="chat-input" id="chatInput" placeholder="Сообщение..." maxlength="200" style="flex:1;padding:8px 12px;background:var(--bg-soft);border:1px solid var(--border);border-radius:20px;color:var(--text);outline:none;font-family:inherit;"><button class="chat-send" id="chatSend" style="padding:8px 16px;background:var(--accent);color:#fff;border:none;border-radius:20px;font-weight:700;cursor:pointer;">→</button></div>
    </div>
    ${commonSideHTML('chat')}
  `;
  const input = document.getElementById('chatInput'); const send = document.getElementById('chatSend');
  const sendMsg = () => { const msg = input.value.trim(); if (!msg) return; addChatMessage(msg, 'user'); input.value = ''; state.chatCount++; if (state.chatCount >= 100) unlockAchievement('chat_100'); sfx.click(); setTimeout(() => addChatMessage(getAIResponse(msg), 'bot'), 500); };
  send.addEventListener('click', sendMsg); input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });
}
function addChatMessage(text, type) { const container = document.getElementById('chatMessages'); if (!container) return; const div = document.createElement('div'); div.style.cssText = `padding:8px 12px;border-radius:12px;font-size:13px;max-width:80%;word-wrap:break-word;${type === 'bot' ? 'background:var(--bg-soft);align-self:flex-start;' : 'background:var(--accent-soft);border-right:2px solid var(--accent);align-self:flex-end;'}`; div.textContent = text; container.appendChild(div); container.scrollTop = container.scrollHeight; }

// ========== ОТМАЗКА ==========
function renderBribe(c) {
  const cases = [{ name: '🚔 Проверка кассы', fine: 5000, desc: 'Налоговая нашла нарушения' },{ name: '🏛️ Допрос в прокуратуре', fine: 15000, desc: 'Что-то про бюджет' },{ name: '📋 Аудит', fine: 25000, desc: 'Проверяют расходы' },{ name: '🚨 Уголовное дело', fine: 100000, desc: 'Серьёзно' },{ name: '📞 Звонок сверху', fine: 50000, desc: 'Помощь нужна' }];
  const c1 = cases[Math.floor(Math.random() * cases.length)];
  c.innerHTML = `
    <div class="bj-table-felt" style="text-align:center;display:flex;flex-direction:column;justify-content:center;background:linear-gradient(180deg, #450a0a, #1a0505);">
      <div style="font-size:32px;margin-bottom:10px;">🚔</div>
      <div style="font-size:14px;font-weight:700;color:var(--red);margin-bottom:6px;">ТРЕБУЕТСЯ ОТМАЗКА</div>
      <div style="font-size:18px;color:#fff;margin-bottom:6px;">${c1.name}</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-bottom:10px;">${c1.desc}</div>
      <div style="font-size:24px;color:var(--red);font-weight:900;">${c1.fine.toLocaleString('ru-RU')} ₽</div>
    </div>
    ${commonSideHTML('bribe')}
  `;
  el.dynamicGameAction.innerHTML = `<button class="spin-btn" id="bribePayBtn" style="background:var(--red);">🚔 ЗАПЛАТИТЬ</button>`;
  document.getElementById('bribePayBtn').addEventListener('click', () => { if (state.balance < c1.fine) { showToast('❌ Мало!'); return; } state.balance -= c1.fine; unlockAchievement('bribe_paid'); showGameResult(`✅ Отмазался! −${c1.fine}`, false); sfx.lose(); updateUI(); saveState(); });
}

// ============================================================
// МАГАЗИН И ЗОЛОТО
// ============================================================
function initShop() {
  document.querySelectorAll('.shop-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active')); tab.classList.add('active');
      document.querySelectorAll('.shop-content').forEach(c => c.classList.add('hidden'));
      document.getElementById('tab-' + tab.dataset.tab).classList.remove('hidden'); sfx.click();
    });
  });
  
  document.querySelectorAll('[data-type="deposit"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const amount = parseInt(btn.dataset.amount); state.balance += amount; state.startBalance += amount; state.totalDeposits += amount;
      updateUI(); saveState(); showToast(`+${amount.toLocaleString('ru-RU')} депутаток!`); sfx.win();
      if (amount >= 50000) unlockAchievement('grandma'); if (amount >= 1000000) unlockAchievement('pension');
    });
  });
  
  if ('NDEFReader' in window) { el.nfcZone.addEventListener('click', startNFCScan); } 
  else { el.nfcZone.addEventListener('click', () => showToast('NFC недоступен. Используй «Симуляцию»', 'gold')); }
  
  el.simulateNfc.addEventListener('click', () => addGold(10, 'Симуляция NFC'));
  
  document.querySelectorAll('[data-goldbuy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.goldbuy;
      if (type === 'vip') {
        if (state.gold < 50) { showToast('❌ Мало золота!'); return; }
        state.gold -= 50; state.hasVip = true; saveState(); updateUI(); showToast('👑 VIP-статус активен навсегда!', 'gold');
      } else if (type === 'analytics') {
        if (state.gold < 5) { showToast('❌ Мало золота!'); return; }
        state.gold -= 5; state.analyticsSpins = 10; saveState(); updateUI(); showToast('📊 Аналитика куплена!', 'gold');
      }
    });
  });

  if (el.sellGoldForDep) {
    el.sellGoldForDep.addEventListener('click', () => {
      if (state.gold < 1) { showToast('❌ Нет золота!'); return; }
      state.gold -= 1; state.balance += 5000; saveState(); updateUI();
      showToast('💰 +5 000 депутаток за 1 золото!', 'gold'); sfx.win();
    });
  }

  if (el.buyGoldBtn) {
    el.buyGoldBtn.addEventListener('click', () => {
      if (state.balance < 25000) { showToast('❌ Нужно 25 000 депутаток!'); return; }
      state.balance -= 25000; state.gold += 1; saveState(); updateUI();
      showToast('💎 +1 золото за 25 000 депутаток', 'gold'); sfx.nfc();
    });
  }
  
  updateCreditUI();
  el.takeCreditBtn.addEventListener('click', () => {
    if (state.credit > 0) return; state.balance += 10000; state.credit = 10000; state.creditDue = 50000;
    unlockAchievement('credit_taken'); updateUI(); saveState(); updateCreditUI(); showToast('💳 Кредит выдан. 500% годовых.', 'achievement'); sfx.nfc(); setComment(pickComment('credit'));
  });
  el.repayCreditBtn.addEventListener('click', () => {
    if (state.balance < state.creditDue) { showToast('❌ Не хватает!'); return; }
    state.balance -= state.creditDue; state.credit = 0; state.creditDue = 0; unlockAchievement('credit_repaid'); updateUI(); saveState(); updateCreditUI(); showToast('✅ Кредит закрыт. Свободен!'); sfx.win();
  });
  el.resetBtn.addEventListener('click', () => { if (confirm('Сбросить весь прогресс?')) { localStorage.removeItem(STORAGE_KEY); location.reload(); } });
}
function updateCreditUI() {
  if (state.credit > 0) {
    el.creditStatus.textContent = `⚠️ Кредит: ${state.credit.toLocaleString('ru-RU')} депутаток. К возврату: ${state.creditDue.toLocaleString('ru-RU')}.`;
    el.creditStatus.style.color = '#ff8899'; el.repayRow.style.display = 'flex'; el.repayDesc.textContent = `−${state.creditDue} депутаток`;
    el.takeCreditBtn.disabled = true; el.takeCreditBtn.style.opacity = 0.5;
  } else {
    el.creditStatus.textContent = 'Возьми 10 000 — вернёшь 50 000.'; el.creditStatus.style.color = '#ff8899';
    el.repayRow.style.display = 'none'; el.takeCreditBtn.disabled = false; el.takeCreditBtn.style.opacity = 1;
  }
}
async function startNFCScan() {
  el.nfcZone.classList.add('scanning'); el.nfcZone.querySelector('.nfc-text').textContent = 'СКАНИРУЮ...';
  try {
    const ndef = new NDEFReader(); await ndef.scan();
    ndef.onreading = (event) => { el.nfcZone.classList.remove('scanning'); el.nfcZone.classList.add('success'); let goldAmount = 10; if (event.serialNumber && event.serialNumber.length > 8) goldAmount = 25; addGold(goldAmount, 'NFC-метка'); setTimeout(() => { el.nfcZone.classList.remove('success'); el.nfcZone.querySelector('.nfc-text').textContent = 'ПРИЛОЖИ NFC-МЕТКУ'; }, 2000); };
    ndef.onreadingerror = () => { el.nfcZone.classList.remove('scanning'); el.nfcZone.classList.add('error'); el.nfcZone.querySelector('.nfc-text').textContent = 'ОШИБКА ЧТЕНИЯ'; setTimeout(() => { el.nfcZone.classList.remove('error'); el.nfcZone.querySelector('.nfc-text').textContent = 'ПРИЛОЖИ NFC-МЕТКУ'; }, 2000); };
  } catch (e) { el.nfcZone.classList.remove('scanning'); el.nfcZone.classList.add('error'); el.nfcZone.querySelector('.nfc-text').textContent = 'NFC НЕДОСТУПЕН'; setTimeout(() => { el.nfcZone.classList.remove('error'); el.nfcZone.querySelector('.nfc-text').textContent = 'ПРИЛОЖИ NFC-МЕТКУ'; }, 2000); }
}
function addGold(amount, source = '') {
  state.gold += amount; updateUI(); saveState(); showToast(`💎 +${amount} золота${source ? ' · ' + source : ''}`, 'gold'); sfx.nfc(); vibrate([100, 50, 100]);
  if (state.gold >= 1) unlockAchievement('gold_first'); if (state.gold >= 10) unlockAchievement('gold10'); if (state.gold >= 100) unlockAchievement('gold100');
  setComment(pickComment('gold'));
}

// ============================================================
// ТАБЛИЦЫ ЛИДЕРОВ
// ============================================================
const TOP_INVESTORS = [{ name: 'Amara', tag: 'TOP', baseAmount: 5000000 },{ name: 'Депутат', tag: 'TOP', baseAmount: 4200000 },{ name: 'Гена_Пенсия', tag: '', baseAmount: 3800000 },{ name: 'Миша_Хата', tag: '', baseAmount: 3500000 },{ name: 'Толя_Тачка', tag: '', baseAmount: 3100000 },{ name: 'Серёга_Дача', tag: '', baseAmount: 2800000 },{ name: 'Вова_ПФР', tag: '', baseAmount: 2500000 },{ name: 'Юра_Губернатор', tag: '', baseAmount: 2200000 },{ name: 'Коля_Дума', tag: '', baseAmount: 1900000 },{ name: 'Игорь_Минфин', tag: '', baseAmount: 1600000 }];
const VIP_INVESTORS = [{ name: 'Митя', tag: 'VIP', baseAmount: 50000000 },{ name: 'Рома_ЦБ', tag: 'VIP', baseAmount: 45000000 },{ name: 'Костя_Прокурор', tag: 'VIP', baseAmount: 40000000 },{ name: 'Слава_Судья', tag: 'VIP', baseAmount: 35000000 },{ name: 'Дима_Мэр', tag: 'VIP', baseAmount: 30000000 },{ name: 'Паша_Сейф', tag: 'VIP', baseAmount: 25000000 },{ name: 'Артём_Депозит', tag: 'VIP', baseAmount: 20000000 },{ name: 'Витя_Куш', tag: 'VIP', baseAmount: 15000000 }];
const LOW_INVESTORS = [{ name: 'Дамир', tag: 'LOW', baseAmount: 50 },{ name: 'Максим', tag: 'LOW', baseAmount: 80 },{ name: 'Лёха_Зам', tag: '', baseAmount: 120 },{ name: 'Петя_Бюджет', tag: '', baseAmount: 180 },{ name: 'Антоха_Дача', tag: '', baseAmount: 250 },{ name: 'Денчик_Счёт', tag: '', baseAmount: 350 },{ name: 'Жора_Брат', tag: '', baseAmount: 450 },{ name: 'Егор_Барыга', tag: '', baseAmount: 600 },{ name: 'Никита_Тендер', tag: '', baseAmount: 800 },{ name: 'Илья_Спонсор', tag: '', baseAmount: 1000 }];

const leadersState = { currentTab: 'top', lastShuffle: 0, topOrder: [...TOP_INVESTORS], vipOrder: [...VIP_INVESTORS], lowOrder: [...LOW_INVESTORS] };
function shuffleLeaders(arr) { const result = [...arr]; if (Math.random() < 0.4) [result[0], result[1]] = [result[1], result[0]]; if (result.length > 3 && Math.random() < 0.3) [result[2], result[3]] = [result[3], result[2]]; if (Math.random() < 0.2 && result.length > 5) { const a = Math.floor(Math.random() * 5); const b = Math.floor(Math.random() * 5); [result[a], result[b]] = [result[b], result[a]]; } return result; }
function formatLeaderAmount(n) { if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'; if (n >= 1000) return (n / 1000).toFixed(1) + 'K'; return n.toString(); }

function renderLeaders() {
  const panel = document.getElementById('leadersPanel'); if (!panel) return;
  const now = Date.now(); if (now - leadersState.lastShuffle > 10000) { leadersState.lastShuffle = now; leadersState.topOrder = shuffleLeaders(leadersState.topOrder); leadersState.vipOrder = shuffleLeaders(leadersState.vipOrder); leadersState.lowOrder = shuffleLeaders(leadersState.lowOrder); }
  let data, headerTitle, footer; const tab = leadersState.currentTab;
  if (tab === 'top') { data = leadersState.topOrder; headerTitle = '🏆 ЛУЧШИЕ ИНВЕСТОРЫ'; footer = '💎 Топ-10 инвесторов казино. Меняются местами каждый день.'; } 
  else if (tab === 'vip') { data = leadersState.vipOrder; headerTitle = '👑 VIP-ИНВЕСТОРЫ'; footer = '💼 «Митя даёт лучший вклад в депутатское казино» — официальная статистика.'; } 
  else { data = leadersState.lowOrder; headerTitle = '📉 НИЗШИЕ ИНВЕСТОРЫ'; footer = '💀 Худшие инвесторы. Они старались, но...'; }
  
  const rows = data.map((inv, i) => {
    const rank = i + 1; const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : ''; const lowClass = tab === 'low' ? 'low-rank' : '';
    let tagHTML = ''; if (inv.tag === 'TOP') tagHTML = '<span class="inv-tag top">TOP</span>'; else if (inv.tag === 'VIP') tagHTML = '<span class="inv-tag vip">VIP</span>'; else if (inv.tag === 'LOW') tagHTML = '<span class="inv-tag low">LOW</span>';
    const amount = inv.baseAmount * (1 - i * 0.05) * (0.95 + Math.random() * 0.1);
    let subText = ''; if (rank === 1 && tab === 'top') subText = 'Лучший вклад'; else if (rank === 1 && tab === 'vip') subText = 'Даёт лучший вклад'; else if (rank === 1 && tab === 'low') subText = 'Худший инвестор'; else subText = 'Активный игрок';
    return `<div class="inv-row ${rankClass} ${lowClass}"><div class="inv-rank">#${rank}</div><div class="inv-info"><div class="inv-name">${inv.name}${tagHTML}</div><div class="inv-sub">${subText}</div></div><div class="inv-amount">${formatLeaderAmount(Math.floor(amount))}</div></div>`;
  }).join('');
  panel.innerHTML = `<div class="inv-header" style="display:flex;justify-content:space-between;padding:10px;border-bottom:1px solid var(--border);font-size:12px;font-weight:700;color:var(--text-dim);text-transform:uppercase;"><span>${headerTitle}</span><span>LIVE</span></div>${rows}<div class="inv-footer">${footer}</div>`;
}

function bindMainTabs() {
  const tabs = document.querySelectorAll('.main-tab'); const sections = { games: document.getElementById('section-games'), investors: document.getElementById('section-investors'), achievements: document.getElementById('section-achievements') };
  tabs.forEach(tab => { tab.addEventListener('click', () => { tabs.forEach(t => t.classList.remove('active')); tab.classList.add('active'); Object.values(sections).forEach(s => { if (s) s.classList.add('hidden'); }); const key = tab.dataset.main; if (sections[key]) sections[key].classList.remove('hidden'); if (key === 'investors') renderLeaders(); if (key === 'achievements') renderAchievements(); sfx.click(); }); });
}
function bindInvestorTabs() { const tabs = document.querySelectorAll('.inv-tab'); tabs.forEach(tab => { tab.addEventListener('click', () => { tabs.forEach(t => t.classList.remove('active')); tab.classList.add('active'); leadersState.currentTab = tab.dataset.inv; leadersState.lastShuffle = 0; renderLeaders(); sfx.click(); }); }); }

// ============================================================
// НИЖНЯЯ ПАНЕЛЬ И РАБОТА
// ============================================================
function initBetBar() {
  const presets = document.querySelectorAll('.bet-preset');
  presets.forEach(btn => { btn.addEventListener('click', () => { presets.forEach(b => b.classList.remove('active')); btn.classList.add('active'); el.customBetInput.value = btn.dataset.amt; state.currentAmount = parseInt(btn.dataset.amt); sfx.click(); }); });
  el.customBetInput.addEventListener('input', () => { presets.forEach(b => b.classList.remove('active')); state.currentAmount = parseInt(el.customBetInput.value) || 10; });
  el.betAllBtn.addEventListener('click', () => { presets.forEach(b => b.classList.remove('active')); el.customBetInput.value = state.balance; state.currentAmount = state.balance; sfx.click(); });
}

function initWork() {
  el.workBtn.addEventListener('click', () => {
    if (state.workCooldown > Date.now()) return;
    let reward = 1 + Math.floor(Math.random() * 5);
    if (state.hasVip) reward *= 2;
    state.balance += reward; state.workCooldown = Date.now() + 120000;
    updateUI(); saveState(); sfx.work(); vibrate(50);
    showToast(`🔨 Заработано ${reward} депутаток!`);
    setInterval(updateUI, 1000);
  });
}

// ============================================================
// СТАРТ
// ============================================================
let liveInterval = null;
function bindGlobalEvents() {
  el.themeToggle.addEventListener('click', toggleTheme);
  el.soundToggle.addEventListener('click', toggleSound);
  el.notifToggle.addEventListener('click', async () => {
    if (!('Notification' in window)) { showToast('❌ Уведомления не поддерживаются'); return; }
    if (state.notifEnabled) { state.notifEnabled = false; showToast('🔕 Выключены'); }
    else { const perm = await Notification.requestPermission(); if (perm === 'granted') { state.notifEnabled = true; showToast('🔔 Включены!'); new Notification('🎰 Колесо Депа', { body: 'Спасибо, что включил!' }); } else showToast('❌ Отказано'); }
    saveState();
  });
  
  document.querySelectorAll('.game-card').forEach(card => { card.addEventListener('click', () => { initAudio(); sfx.click(); state.currentGame = card.dataset.game; el.menuScreen.classList.add('hidden'); el.gameScreen.classList.remove('hidden'); el.gameTitle.textContent = GAME_TITLES[card.dataset.game]; renderGame(card.dataset.game); window.scrollTo({ top: 0, behavior: 'smooth' }); }); });
  
  el.backBtn.addEventListener('click', () => { sfx.click(); if (liveInterval) { clearInterval(liveInterval); liveInterval = null; } state.currentGame = 'menu'; el.menuScreen.classList.remove('hidden'); el.gameScreen.classList.add('hidden'); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  
  el.shopToggle.addEventListener('click', () => { el.shop.classList.toggle('open'); el.shopToggle.querySelector('span').textContent = el.shop.classList.contains('open') ? '🏪 Скрыть магазин' : '🏪 Магазин и Золото'; sfx.click(); });
  
  let clicks = 0;
  el.title.addEventListener('click', () => { if (++clicks >= 5) { clicks = 0; state.debugVisible = !state.debugVisible; el.debugPanel.classList.toggle('visible', state.debugVisible); } });
  
  let lastTouch = 0;
  document.addEventListener('touchend', e => { const now = Date.now(); if (now - lastTouch <= 300) e.preventDefault(); lastTouch = now; }, { passive: false });
  
  setInterval(() => {
    if (Math.random() < 0.3 && state.currentGame !== 'menu') {
      const msgs = ['💰 Вася_Депутат выиграл 50 000!','🔥 Горячая ставка: 80% на красное!','💎 Миша_Хата купил 100 золота!','🎰 Кто-то сорвал джекпот!','⚡ Не уходи, скоро крупный выигрыш!'];
      showToast(msgs[Math.floor(Math.random() * msgs.length)]);
    }
  }, 45000);
}

function init() {
  cacheElements(); loadState(); applyTheme();
  el.soundToggle.textContent = state.soundEnabled ? '🔊' : '🔇';
  renderAchievements(); updateUI(); initShop(); initBetBar(); initWork(); bindGlobalEvents(); bindMainTabs(); bindInvestorTabs(); renderLeaders();
  document.addEventListener('click', () => initAudio(), { once: true });
  if (state.balance !== 1000 || state.wins > 0) setComment('С возвращением. Мы тебя помним.'); else setComment('Добро пожаловать, депутат.');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();