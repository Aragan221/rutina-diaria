/*
  STREAK v1.7 — App con navegacion por tabs

  Funciones:
  - Navegacion por 5 tabs: Cadena, Rutina, Notas, Stats, Config.
  - Cada fecha guarda su propio registro.
  - Tareas, notas y cronometro son independientes por dia.
  - Racha calculada desde el dia seleccionado hacia atras.
  - Sonidos suaves generados por codigo, sin archivos mp3.
  - Exportar e importar respaldo en JSON.
  - Guardado local con localStorage.
*/

/* ----- DOM: Tabs ----- */

const tabBar = document.getElementById('tabBar');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

/* ----- DOM: Tareas y notas ----- */

let checkboxes = [];
const notes = document.querySelectorAll('textarea');

/* ----- DOM: Progreso y racha ----- */

const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const completeMessage = document.getElementById('completeMessage');
const streakNumber = document.getElementById('streakNumber');
const streakText = document.getElementById('streakText');
const streakChain = document.getElementById('streakChain');

/* ----- DOM: Cronometro ----- */

const timerDisplay = document.getElementById('timerDisplay');
const startTimer = document.getElementById('startTimer');
const pauseTimer = document.getElementById('pauseTimer');
const resetTimer = document.getElementById('resetTimer');

/* ----- DOM: Estado y navegacion ----- */

const savedStatus = document.getElementById('savedStatus');
const resetBtn = document.getElementById('resetBtn');
const nextDayBtn = document.getElementById('nextDayBtn');
const todayBtn = document.getElementById('todayBtn');
const dateCard = document.getElementById('dateCard');
const prevDayBtn = document.getElementById('prevDayBtn');
const nextDayArrowBtn = document.getElementById('nextDayArrowBtn');
const soundToggle = document.getElementById('soundToggle');
const soundLabel = document.getElementById('soundLabel');
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');

const currentDateLabel = document.getElementById('currentDateLabel');
const dayStatus = document.getElementById('dayStatus');

/* ----- DOM: Stats ----- */

const statTimer = document.getElementById('statTimer');
const statProgress = document.getElementById('statProgress');
const statTasks = document.getElementById('statTasks');
const statStreak = document.getElementById('statStreak');

/* ----- Constantes ----- */

const STORAGE_KEY = 'rutinaDiariaPremiumPorFechasV5';
const SOUND_KEY = 'rutinaDiariaSonidosActivosV1';
const THEME_KEY = 'rutinaDiariaTemaPremiumV1';

/* ----- Estado ----- */

let selectedDate = getTodayString();
let timerInterval = null;
let timerSeconds = 0;
let noteSaveTimeout = null;
let audioContext = null;
let soundsEnabled = localStorage.getItem(SOUND_KEY) !== 'false';
let currentTheme = localStorage.getItem(THEME_KEY) || 'dark';

/* ============================================================
   Plan de rutina por fecha (semana 23-29 jun 2026)
   - Tareas de manana: diarias y CORE (mantienen la cadena).
   - Medio dia: caminata (mar/jue/sab), accion del dia, cero juegos.
   - Noche: InDriver + celular boca abajo (CORE).
   La cadena se mantiene si se cumplen las tareas CORE
   (manana + soltar el celular), aunque falle el resto.
============================================================ */

const WEEK_PLAN = {
  '2026-06-23': { accion: "Poner alarma 'CELULAR BOCA ABAJO' + planear la semana", caminata: false, noche: 'semana' },
  '2026-06-24': { accion: 'Enviar mensaje a Sury confirmando cita', caminata: true, noche: 'semana' },
  '2026-06-25': { accion: 'Llamar al taller: cotizar moto (aceite, luces, frenos) + escribir a un amigo', caminata: false, noche: 'semana' },
  '2026-06-26': { accion: 'FIRMAR CONTRATO del call center', prioridad: true, caminata: true, noche: 'semana' },
  '2026-06-27': { accion: 'Cita con Sury (o confirmar fecha alterna)', caminata: false, noche: 'viernes' },
  '2026-06-28': { accion: null, caminata: true, noche: 'finde', findePlan: 'Plan con la novia (salida)' },
  '2026-06-29': { accion: null, caminata: false, noche: 'finde', findePlan: 'Descanso real' }
};

function getDayPlan(dateKey) {
  // Base recurrente por dia de la semana (aplica TODOS los dias)
  const dow = parseDateKey(dateKey).getDay(); // 0=Dom, 1=Lun ... 6=Sab
  const base = {
    accion: 'Define tu accion mas importante de hoy',
    prioridad: false,
    caminata: (dow === 2 || dow === 4 || dow === 6), // martes, jueves, sabado
    noche: 'semana'
  };
  if (dow === 5) base.noche = 'viernes';           // viernes: pico y placa
  if (dow === 6) { base.noche = 'finde'; base.findePlan = 'Plan con la novia (salida)'; }
  if (dow === 0) { base.noche = 'finde'; base.findePlan = 'Descanso real'; }

  // Superponer el plan especifico de la semana 23-29 jun (acciones del dia)
  const override = WEEK_PLAN[dateKey];
  if (override) {
    return Object.assign({}, base, override);
  }
  return base;
}

function buildTaskHTML(t) {
  return '<label class="task">'
    + '<input type="checkbox" data-task="' + t.id + '"' + (t.core ? ' data-core="true"' : '') + '>'
    + '<span class="custom-checkbox"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg></span>'
    + '<span class="task-text">' + t.text + '</span>'
    + '</label>'
    + (t.sub ? '<p class="subtask">' + t.sub + '</p>' : '');
}

function titleHTML(name, time) {
  return '<div class="section-title"><h2>' + name + '</h2><span class="time">' + time + '</span></div>';
}

function listHTML(tasks) {
  return '<div class="task-list">' + tasks.map(buildTaskHTML).join('') + '</div>';
}

function renderTasks(dateKey) {
  const plan = getDayPlan(dateKey);

  const morning = [
    { id: 'm-alarm', text: 'Levantarme con la alarma (sin posponer)', core: true },
    { id: 'm-water', text: 'Vaso de agua al despertar', core: true },
    { id: 'm-breakfast', text: 'Desayunar algo (comer aunque sea poco)', core: true }
  ];

  const afternoon = [];
  if (plan.caminata) afternoon.push({ id: 'a-walk', text: 'Caminata 20 min' });
  if (plan.accion) afternoon.push({ id: 'a-action', text: (plan.prioridad ? 'PRIORIDAD: ' : '') + plan.accion });
  afternoon.push({ id: 'a-nogames', text: 'Cero videojuegos hasta completar la accion del dia' });

  const night = [];
  if (plan.noche === 'viernes') {
    night.push({ id: 'n-picoyplaca', text: 'Pico y placa (XTQ80G): NO InDriver hasta las 8pm' });
    night.push({ id: 'n-indriver', text: 'InDriver desde 8pm (meta $60k)', sub: 'Luces danadas: trabaja solo en zonas bien iluminadas' });
  } else if (plan.noche === 'finde') {
    night.push({ id: 'n-indriver', text: 'InDriver turno largo 6am-12pm (meta $90k)', sub: 'Prioriza luz natural (luces danadas)' });
    if (plan.findePlan) night.push({ id: 'n-finde', text: plan.findePlan });
  } else {
    night.push({ id: 'n-indriver', text: 'InDriver 8pm-12am (meta $60k)', sub: 'Luces danadas: zonas bien iluminadas' });
  }
  night.push({
    id: 'n-phone',
    text: plan.noche === 'finde' ? 'Celular boca abajo y dormir a tiempo' : 'Celular boca abajo (12:30am si trabaje / 10:30pm si no)',
    core: true
  });

  const nightTime = plan.noche === 'finde' ? '6am-12pm' : '8pm-12am';

  document.getElementById('stageMorning').innerHTML = titleHTML('Manana', 'antes 7am') + listHTML(morning);
  document.getElementById('stageAfternoon').innerHTML = titleHTML('Medio dia', '4pm-6pm') + listHTML(afternoon);
  document.getElementById('stageNight').innerHTML = titleHTML('Noche', nightTime) + listHTML(night);

  checkboxes = document.querySelectorAll('.task-list input[type="checkbox"]');
  checkboxes.forEach(function (cb) {
    cb.addEventListener('change', function () { handleTaskToggle(cb); });
  });
}

function handleTaskToggle(checkbox) {
  updateTaskVisual(checkbox);

  if (checkbox.checked) {
    playCheckSound();
    var box = checkbox.closest('.task').querySelector('.custom-checkbox');
    if (box) {
      box.classList.remove('pop');
      void box.offsetWidth;
      box.classList.add('pop');
    }
    if (navigator.vibrate) navigator.vibrate(8);
  } else {
    playUncheckSound();
  }

  updateProgress(true, true);
  showSavedStatus();
}

/* ----- Navegacion por tabs ----- */

function switchTab(tabId) {
  tabContents.forEach(function (content) {
    content.classList.remove('active');
  });

  tabButtons.forEach(function (btn) {
    btn.classList.remove('active');
  });

  const target = document.getElementById(tabId);
  if (target) {
    target.classList.add('active');
  }

  const activeBtn = document.querySelector('[data-tab="' + tabId + '"]');
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Actualizar stats cuando se entra al tab
  if (tabId === 'tabStats') {
    updateStats();
  }
}

tabButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const tabId = btn.getAttribute('data-tab');
    switchTab(tabId);
    playButtonSound();
  });
});

/* ----- Utilidades de fecha ----- */

function getTodayString() {
  return formatDateKey(new Date());
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return year + '-' + month + '-' + day;
}

function parseDateKey(dateKey) {
  const parts = dateKey.split('-').map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function addDays(dateKey, amount) {
  const date = parseDateKey(dateKey);
  date.setDate(date.getDate() + amount);
  return formatDateKey(date);
}

/* ----- Persistencia ----- */

function getAllData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (error) {
    return {};
  }
}

function saveAllData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getEmptyDayData() {
  return {
    tasks: {},
    notes: {},
    timerSeconds: 0,
    completed: false,
    updatedAt: new Date().toISOString()
  };
}

function getDayData(dateKey) {
  const allData = getAllData();

  if (!allData[dateKey]) {
    allData[dateKey] = getEmptyDayData();
    saveAllData(allData);
  }

  return allData[dateKey];
}

function saveCurrentDay() {
  const allData = getAllData();
  const dayData = allData[selectedDate] || getEmptyDayData();

  dayData.tasks = {};
  checkboxes.forEach(function (checkbox) {
    dayData.tasks[checkbox.dataset.task] = checkbox.checked;
  });

  dayData.notes = {};
  notes.forEach(function (note) {
    dayData.notes[note.id] = note.value;
  });

  dayData.timerSeconds = timerSeconds;
  dayData.completed = areCoreTasksCompleted();
  dayData.updatedAt = new Date().toISOString();

  allData[selectedDate] = dayData;
  saveAllData(allData);
}

function loadSelectedDay() {
  stopTimer(false);

  renderTasks(selectedDate);

  const dayData = getDayData(selectedDate);

  checkboxes.forEach(function (checkbox) {
    var taskId = checkbox.dataset.task;
    checkbox.checked = Boolean(dayData.tasks[taskId]);
    updateTaskVisual(checkbox);
  });

  notes.forEach(function (note) {
    note.value = dayData.notes[note.id] || '';
  });

  timerSeconds = Number(dayData.timerSeconds) || 0;

  updateDateHeader();
  updateTimerDisplay();
  updateProgress(false, false);
  updateStreak();
  updateStats();
}

/* ----- Cabecera de fecha ----- */

function updateDateHeader() {
  const today = getTodayString();
  const yesterday = addDays(today, -1);
  const tomorrow = addDays(today, 1);

  const selected = parseDateKey(selectedDate);

  const formatted = selected.toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  currentDateLabel.textContent = capitalizeFirstLetter(formatted);

  if (selectedDate === today) {
    dayStatus.textContent = 'Hoy';
  } else if (selectedDate === yesterday) {
    dayStatus.textContent = 'Ayer';
  } else if (selectedDate === tomorrow) {
    dayStatus.textContent = 'Manana';
  } else {
    dayStatus.textContent = 'Dia seleccionado';
  }
}

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/* ----- Tareas y progreso ----- */

function updateTaskVisual(checkbox) {
  const task = checkbox.closest('.task');

  if (checkbox.checked) {
    task.classList.add('completed');
  } else {
    task.classList.remove('completed');
  }
}

function areAllTasksCompleted() {
  return [...checkboxes].every(function (checkbox) { return checkbox.checked; });
}

// La cadena se mantiene si se cumplen las tareas CORE (manana + soltar el celular)
function areCoreTasksCompleted() {
  const core = [...checkboxes].filter(function (cb) { return cb.dataset.core === 'true'; });
  if (core.length === 0) return false;
  return core.every(function (cb) { return cb.checked; });
}

function updateProgress(shouldSave, allowSound) {
  if (shouldSave === undefined) shouldSave = true;
  if (allowSound === undefined) allowSound = false;

  const totalTasks = checkboxes.length;
  const completedTasks = [...checkboxes].filter(function (checkbox) { return checkbox.checked; }).length;
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const coreDone = areCoreTasksCompleted();
  const wasAlreadyComplete = completeMessage.classList.contains('show');

  progressFill.style.width = progress + '%';
  progressText.textContent = progress + '%';
  progressFill.classList.toggle('full', progress === 100);

  const justCompleted = coreDone && !wasAlreadyComplete;

  if (coreDone) {
    completeMessage.classList.add('show');

    if (allowSound && !wasAlreadyComplete) {
      playCompleteSound();
    }
  } else {
    completeMessage.classList.remove('show');
  }

  if (shouldSave) {
    saveCurrentDay();
  }

  updateStreak();
  updateStats();

  if (justCompleted) {
    pulseStreak();
    celebrateChain();
    if (navigator.vibrate) navigator.vibrate([10, 40, 20]);
  }
}

/* ----- Celebracion al completar el dia ----- */

function pulseStreak() {
  if (!streakNumber) return;
  streakNumber.classList.remove('pulse');
  void streakNumber.offsetWidth;
  streakNumber.classList.add('pulse');
}

function celebrateChain() {
  if (!streakChain) return;
  const links = streakChain.querySelectorAll('.link.on');
  links.forEach(function (link, idx) {
    setTimeout(function () {
      link.classList.remove('celebrate');
      void link.offsetWidth;
      link.classList.add('celebrate');
    }, idx * 55);
  });
}

function updateStreak() {
  const allData = getAllData();
  let streak = 0;
  let dateKey = selectedDate;

  while (true) {
    const dayData = allData[dateKey];

    if (dayData && dayData.completed === true) {
      streak++;
      dateKey = addDays(dateKey, -1);
    } else {
      break;
    }
  }

  streakNumber.textContent = streak;
  streakText.textContent = streak === 1 ? 'dia sin romper la cadena' : 'dias sin romper la cadena';

  renderChain();
}

/* ----- Cadena de eslabones (ultimos 14 dias) ----- */

function renderChain() {
  if (!streakChain) return;

  const allData = getAllData();
  const total = 14;
  const states = [];

  for (let i = total - 1; i >= 0; i--) {
    const dateKey = addDays(selectedDate, -i);
    states.push(Boolean(allData[dateKey] && allData[dateKey].completed === true));
  }

  let lastOn = -1;
  states.forEach(function (done, idx) { if (done) lastOn = idx; });

  streakChain.innerHTML = '';
  states.forEach(function (done, idx) {
    const link = document.createElement('div');
    link.className = 'link' + (done ? (idx === lastOn ? ' on live' : ' on') : '');
    streakChain.appendChild(link);
  });
}

/* ----- Stats ----- */

function updateStats() {
  if (!statTimer) return;

  const totalTasks = checkboxes.length;
  const completedTasks = [...checkboxes].filter(function (cb) { return cb.checked; }).length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  statTimer.textContent = formatTime(timerSeconds);
  statProgress.textContent = progress + '%';
  statTasks.textContent = completedTasks + ' / ' + totalTasks;

  // Calcular racha
  const allData = getAllData();
  let streak = 0;
  let dateKey = selectedDate;
  while (true) {
    const dayData = allData[dateKey];
    if (dayData && dayData.completed === true) {
      streak++;
      dateKey = addDays(dateKey, -1);
    } else {
      break;
    }
  }
  statStreak.textContent = streak;
}

/* ----- Navegacion entre dias ----- */

function changeDate(days) {
  saveCurrentDay();
  selectedDate = addDays(selectedDate, days);
  loadSelectedDay();
  playButtonSound();
  showSavedStatus('Dia cargado');
}

function goToNextDay() {
  saveCurrentDay();
  selectedDate = addDays(selectedDate, 1);
  getDayData(selectedDate);
  loadSelectedDay();
  playNextDaySound();
  showSavedStatus('Nuevo dia cargado');
}

function goToToday() {
  saveCurrentDay();
  selectedDate = getTodayString();
  loadSelectedDay();
  playButtonSound();
  showSavedStatus('Hoy cargado');
}

function resetCurrentDay() {
  stopTimer(false);

  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
    updateTaskVisual(checkbox);
  });

  notes.forEach(function (note) {
    note.value = '';
  });

  timerSeconds = 0;

  saveCurrentDay();
  updateTimerDisplay();
  updateProgress(false, false);
  updateStreak();
  updateStats();

  playResetSound();
  showSavedStatus('Dia reiniciado');
}

/* ----- Cronometro ----- */

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(timerSeconds);
}

function runTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(function () {
    timerSeconds++;
    updateTimerDisplay();
    saveCurrentDay();
  }, 1000);
}

function stopTimer(shouldSave) {
  if (shouldSave === undefined) shouldSave = true;

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  if (shouldSave) {
    saveCurrentDay();
  }
}

function clearTimer() {
  stopTimer(false);
  timerSeconds = 0;
  updateTimerDisplay();
  saveCurrentDay();
  showSavedStatus('Cronometro reiniciado');
}

/* ----- Estado guardado y notas ----- */

function showSavedStatus(text) {
  if (!text) text = 'Guardado automaticamente';

  savedStatus.textContent = text;
  savedStatus.classList.add('show');

  window.clearTimeout(showSavedStatus.timeout);

  showSavedStatus.timeout = window.setTimeout(function () {
    savedStatus.classList.remove('show');
  }, 1200);
}

function debounceSaveNotes() {
  window.clearTimeout(noteSaveTimeout);

  noteSaveTimeout = window.setTimeout(function () {
    saveCurrentDay();
    showSavedStatus();
  }, 350);
}

/* ----- Tema claro / oscuro ----- */

function applyTheme() {
  document.body.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    themeLabel.textContent = 'Oscuro';
    themeToggle.title = 'Cambiar a modo claro';
    themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
  } else {
    themeLabel.textContent = 'Claro';
    themeToggle.title = 'Cambiar a modo oscuro';
    themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, currentTheme);
  applyTheme();
  playButtonSound();

  if (currentTheme === 'dark') {
    showSavedStatus('Modo oscuro activado');
  } else {
    showSavedStatus('Modo claro activado');
  }
}

/* ----- Sonidos (Web Audio API) ----- */

function updateSoundButton() {
  soundLabel.textContent = soundsEnabled ? 'Activado' : 'Desactivado';
  soundToggle.title = soundsEnabled ? 'Sonidos activados' : 'Sonidos desactivados';
}

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  return audioContext;
}

function playTone(frequency, duration, type, volume, delay) {
  if (!frequency) frequency = 520;
  if (!duration) duration = 0.08;
  if (!type) type = 'sine';
  if (!volume) volume = 0.07;
  if (!delay) delay = 0;

  if (!soundsEnabled) return;

  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  const startTime = ctx.currentTime + delay;
  const endTime = startTime + duration;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, endTime);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(startTime);
  oscillator.stop(endTime);
}

function playCheckSound() {
  playTone(650, 0.055, 'sine', 0.055);
  playTone(920, 0.06, 'sine', 0.04, 0.055);
}

function playUncheckSound() {
  playTone(360, 0.06, 'sine', 0.045);
}

function playButtonSound() {
  playTone(470, 0.055, 'sine', 0.045);
}

function playResetSound() {
  playTone(290, 0.08, 'triangle', 0.045);
  playTone(220, 0.08, 'triangle', 0.035, 0.08);
}

function playNextDaySound() {
  playTone(420, 0.06, 'sine', 0.045);
  playTone(560, 0.07, 'sine', 0.045, 0.07);
}

function playCompleteSound() {
  playTone(520, 0.08, 'sine', 0.06);
  playTone(680, 0.09, 'sine', 0.06, 0.09);
  playTone(840, 0.12, 'sine', 0.06, 0.19);
}

/* ----- Respaldo (exportar / importar) ----- */

function exportBackup() {
  saveCurrentDay();

  const allData = getAllData();

  const backup = {
    app: 'STREAK - No rompas la cadena',
    version: 1,
    exportedAt: new Date().toISOString(),
    selectedDate: selectedDate,
    soundsEnabled: soundsEnabled,
    data: allData
  };

  const json = JSON.stringify(backup, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const dateForName = getTodayString();
  const link = document.createElement('a');

  link.href = url;
  link.download = 'respaldo-streak-' + dateForName + '.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);

  playButtonSound();
  showSavedStatus('Respaldo exportado');
}

function openImportPicker() {
  playButtonSound();
  importFile.value = '';
  importFile.click();
}

function importBackupFile(event) {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function () {
    try {
      const parsed = JSON.parse(reader.result);

      let importedData = null;
      let importedSelectedDate = null;
      let importedSoundsEnabled = null;

      if (parsed && parsed.data && typeof parsed.data === 'object') {
        importedData = parsed.data;
        importedSelectedDate = parsed.selectedDate || null;
        importedSoundsEnabled = parsed.soundsEnabled;
      } else if (parsed && typeof parsed === 'object') {
        importedData = parsed;
      }

      if (!importedData || Array.isArray(importedData)) {
        throw new Error('Formato invalido');
      }

      const shouldReplace = confirm(
        'Quieres importar este respaldo? Esto reemplazara los datos guardados actualmente en esta app.'
      );

      if (!shouldReplace) {
        showSavedStatus('Importacion cancelada');
        return;
      }

      saveAllData(importedData);

      if (typeof importedSoundsEnabled === 'boolean') {
        soundsEnabled = importedSoundsEnabled;
        localStorage.setItem(SOUND_KEY, soundsEnabled);
        updateSoundButton();
      }

      if (importedSelectedDate && importedData[importedSelectedDate]) {
        selectedDate = importedSelectedDate;
      } else if (importedData[getTodayString()]) {
        selectedDate = getTodayString();
      } else {
        const importedDates = Object.keys(importedData).sort();

        if (importedDates.length > 0) {
          selectedDate = importedDates[importedDates.length - 1];
        } else {
          selectedDate = getTodayString();
        }
      }

      loadSelectedDay();
      playCompleteSound();
      showSavedStatus('Respaldo importado');
    } catch (error) {
      alert('No se pudo importar el respaldo. Revisa que sea un archivo JSON valido de esta app.');
      showSavedStatus('Error al importar');
    }
  };

  reader.readAsText(file);
}

/* ----- Eventos ----- */

/* Stage buttons (Manana/Tarde/Noche) */
const stageBtns = document.querySelectorAll('.stage-btn');
const stagePanels = document.querySelectorAll('.stage-panel');

stageBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    stageBtns.forEach(function (b) { b.classList.remove('active'); });
    stagePanels.forEach(function (p) { p.classList.remove('active'); });
    btn.classList.add('active');
    const stage = btn.dataset.stage;
    if (stage === 'morning') document.getElementById('stageMorning').classList.add('active');
    else if (stage === 'afternoon') document.getElementById('stageAfternoon').classList.add('active');
    else if (stage === 'night') document.getElementById('stageNight').classList.add('active');
  });
});

/* Las tareas (checkboxes) se generan y enlazan en renderTasks() por fecha */

notes.forEach(function (note) {
  note.addEventListener('input', debounceSaveNotes);

  note.addEventListener('blur', function () {
    saveCurrentDay();
  });
});

startTimer.addEventListener('click', function () {
  playButtonSound();
  runTimer();
});

pauseTimer.addEventListener('click', function () {
  playButtonSound();
  stopTimer(true);
});

resetTimer.addEventListener('click', function () {
  playResetSound();
  clearTimer();
});

prevDayBtn.addEventListener('click', function () { changeDate(-1); });
nextDayArrowBtn.addEventListener('click', function () { changeDate(1); });

nextDayBtn.addEventListener('click', goToNextDay);
todayBtn.addEventListener('click', goToToday);
dateCard.addEventListener('click', goToToday);

resetBtn.addEventListener('click', resetCurrentDay);

themeToggle.addEventListener('click', toggleTheme);

soundToggle.addEventListener('click', function () {
  soundsEnabled = !soundsEnabled;
  localStorage.setItem(SOUND_KEY, soundsEnabled);
  updateSoundButton();

  if (soundsEnabled) {
    playCompleteSound();
    showSavedStatus('Sonidos activados');
  } else {
    showSavedStatus('Sonidos desactivados');
  }
});

exportBtn.addEventListener('click', exportBackup);
importBtn.addEventListener('click', openImportPicker);
importFile.addEventListener('change', importBackupFile);

window.addEventListener('beforeunload', function () {
  saveCurrentDay();
});

/* ----- Recordatorios al calendario (.ics) ----- */

const downloadReminder = document.getElementById('downloadReminder');
const reminderMorning = document.getElementById('reminderMorning');
const reminderNight = document.getElementById('reminderNight');

function generateICS(morningTime, nightTime) {
  const pad = function (n) { return String(n).padStart(2, '0'); };

  const now = new Date();
  const dateStamp = now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) + 'T' + pad(now.getHours()) + pad(now.getMinutes()) + '00';
  const startDate = now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate());

  const mHour = morningTime.split(':')[0];
  const mMin = morningTime.split(':')[1];
  const nHour = nightTime.split(':')[0];
  const nMin = nightTime.split(':')[1];

  var ics = 'BEGIN:VCALENDAR\n';
  ics += 'VERSION:2.0\n';
  ics += 'PRODID:-//STREAK//ES\n';
  ics += 'CALSCALE:GREGORIAN\n';
  ics += 'METHOD:PUBLISH\n';
  ics += 'BEGIN:VEVENT\n';
  ics += 'UID:rutina-manana-' + Date.now() + '@streak\n';
  ics += 'DTSTAMP:' + dateStamp + '\n';
  ics += 'DTSTART:' + startDate + 'T' + pad(mHour) + pad(mMin) + '00\n';
  ics += 'DTEND:' + startDate + 'T' + pad(mHour) + pad(mMin) + '00\n';
  ics += 'RRULE:FREQ=DAILY\n';
  ics += 'SUMMARY:Rutina de la manana\n';
  ics += 'DESCRIPTION:Caminar, leer y pensar que haras hoy que si importa.\n';
  ics += 'BEGIN:VALARM\n';
  ics += 'TRIGGER:-PT0M\n';
  ics += 'ACTION:DISPLAY\n';
  ics += 'DESCRIPTION:Hora de tu rutina de la manana\n';
  ics += 'END:VALARM\n';
  ics += 'END:VEVENT\n';
  ics += 'BEGIN:VEVENT\n';
  ics += 'UID:rutina-noche-' + Date.now() + '@streak\n';
  ics += 'DTSTAMP:' + dateStamp + '\n';
  ics += 'DTSTART:' + startDate + 'T' + pad(nHour) + pad(nMin) + '00\n';
  ics += 'DTEND:' + startDate + 'T' + pad(nHour) + pad(nMin) + '00\n';
  ics += 'RRULE:FREQ=DAILY\n';
  ics += 'SUMMARY:Rutina de la noche\n';
  ics += 'DESCRIPTION:Reflexionar, escribir pendientes y cerrar el dia.\n';
  ics += 'BEGIN:VALARM\n';
  ics += 'TRIGGER:-PT0M\n';
  ics += 'ACTION:DISPLAY\n';
  ics += 'DESCRIPTION:Hora de tu rutina de la noche\n';
  ics += 'END:VALARM\n';
  ics += 'END:VEVENT\n';
  ics += 'END:VCALENDAR';

  return ics;
}

function downloadReminderFile() {
  const morningTime = reminderMorning.value || '07:00';
  const nightTime = reminderNight.value || '21:00';

  const icsContent = generateICS(morningTime, nightTime);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'recordatorios-streak.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);

  playButtonSound();
  showSavedStatus('Recordatorios descargados');
}

downloadReminder.addEventListener('click', downloadReminderFile);

/* ----- Service Worker (PWA offline) ----- */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.js').catch(function () {
      // Service worker no soportado o error silencioso
    });
  });
}

/* ----- Inicio ----- */

applyTheme();
updateSoundButton();
loadSelectedDay();
