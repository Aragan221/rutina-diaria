/*
  Rutina diaria tipo mini app - versión con sonidos

  Funciones:
  - Cada fecha guarda su propio registro.
  - Tareas, notas y cronómetro son independientes por día.
  - Racha calculada desde el día seleccionado hacia atrás.
  - Sonidos suaves generados por código, sin archivos mp3.
  - Botón para activar/desactivar sonidos.
  - Exportar e importar respaldo en JSON.
  - Guardado local con localStorage.
*/

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const notes = document.querySelectorAll('textarea');

const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const completeMessage = document.getElementById('completeMessage');
const streakNumber = document.getElementById('streakNumber');
const streakText = document.getElementById('streakText');

const timerDisplay = document.getElementById('timerDisplay');
const startTimer = document.getElementById('startTimer');
const pauseTimer = document.getElementById('pauseTimer');
const resetTimer = document.getElementById('resetTimer');

const savedStatus = document.getElementById('savedStatus');
const resetBtn = document.getElementById('resetBtn');
const nextDayBtn = document.getElementById('nextDayBtn');
const todayBtn = document.getElementById('todayBtn');
const dateCard = document.getElementById('dateCard');
const prevDayBtn = document.getElementById('prevDayBtn');
const nextDayArrowBtn = document.getElementById('nextDayArrowBtn');
const soundToggle = document.getElementById('soundToggle');
const themeToggle = document.getElementById('themeToggle');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');

const currentDateLabel = document.getElementById('currentDateLabel');
const dayStatus = document.getElementById('dayStatus');

const STORAGE_KEY = 'rutinaDiariaPremiumPorFechasV5';
const SOUND_KEY = 'rutinaDiariaSonidosActivosV1';
const THEME_KEY = 'rutinaDiariaTemaPremiumV1';

let selectedDate = getTodayString();
let timerInterval = null;
let timerSeconds = 0;
let noteSaveTimeout = null;
let audioContext = null;
let soundsEnabled = localStorage.getItem(SOUND_KEY) !== 'false';
let currentTheme = localStorage.getItem(THEME_KEY) || 'light';

/* ----- Utilidades de fecha ----- */

function getTodayString() {
  return formatDateKey(new Date());
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
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
  checkboxes.forEach((checkbox) => {
    dayData.tasks[checkbox.dataset.task] = checkbox.checked;
  });

  dayData.notes = {};
  notes.forEach((note) => {
    dayData.notes[note.id] = note.value;
  });

  dayData.timerSeconds = timerSeconds;
  dayData.completed = areAllTasksCompleted();
  dayData.updatedAt = new Date().toISOString();

  allData[selectedDate] = dayData;
  saveAllData(allData);
}

function loadSelectedDay() {
  stopTimer(false);

  const dayData = getDayData(selectedDate);

  checkboxes.forEach((checkbox) => {
    const taskId = checkbox.dataset.task;
    checkbox.checked = Boolean(dayData.tasks[taskId]);
    updateTaskVisual(checkbox);
  });

  notes.forEach((note) => {
    note.value = dayData.notes[note.id] || '';
  });

  timerSeconds = Number(dayData.timerSeconds) || 0;

  updateDateHeader();
  updateTimerDisplay();
  updateProgress(false, false);
  updateStreak();
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
    dayStatus.textContent = 'Mañana';
  } else {
    dayStatus.textContent = 'Día seleccionado';
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
  return [...checkboxes].every((checkbox) => checkbox.checked);
}

function updateProgress(shouldSave = true, allowSound = false) {
  const totalTasks = checkboxes.length;
  const completedTasks = [...checkboxes].filter((checkbox) => checkbox.checked).length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  const wasAlreadyComplete = completeMessage.classList.contains('show');

  progressFill.style.width = `${progress}%`;
  progressText.textContent = `${progress}%`;

  if (progress === 100) {
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
  streakText.textContent = streak === 1 ? 'día seguido' : 'días seguidos';
}

/* ----- Navegación entre días ----- */

function changeDate(days) {
  saveCurrentDay();
  selectedDate = addDays(selectedDate, days);
  loadSelectedDay();
  playButtonSound();
  showSavedStatus('Día cargado');
}

function goToNextDay() {
  saveCurrentDay();
  selectedDate = addDays(selectedDate, 1);
  getDayData(selectedDate);
  loadSelectedDay();
  playNextDaySound();
  showSavedStatus('Nuevo día cargado');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToToday() {
  saveCurrentDay();
  selectedDate = getTodayString();
  loadSelectedDay();
  playButtonSound();
  showSavedStatus('Hoy cargado');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetCurrentDay() {
  stopTimer(false);

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    updateTaskVisual(checkbox);
  });

  notes.forEach((note) => {
    note.value = '';
  });

  timerSeconds = 0;

  saveCurrentDay();
  updateTimerDisplay();
  updateProgress(false, false);
  updateStreak();

  playResetSound();
  showSavedStatus('Día reiniciado');
}

/* ----- Cronómetro ----- */

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(timerSeconds);
}

function runTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    timerSeconds++;
    updateTimerDisplay();
    saveCurrentDay();
  }, 1000);
}

function stopTimer(shouldSave = true) {
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
  showSavedStatus('Cronómetro reiniciado');
}

/* ----- Estado guardado y notas ----- */

function showSavedStatus(text = 'Guardado automáticamente') {
  savedStatus.textContent = text;
  savedStatus.classList.add('show');

  window.clearTimeout(showSavedStatus.timeout);

  showSavedStatus.timeout = window.setTimeout(() => {
    savedStatus.classList.remove('show');
  }, 1200);
}

function debounceSaveNotes() {
  window.clearTimeout(noteSaveTimeout);

  noteSaveTimeout = window.setTimeout(() => {
    saveCurrentDay();
    showSavedStatus();
  }, 350);
}

/* ----- Tema claro / oscuro ----- */

function applyTheme() {
  document.body.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    themeToggle.textContent = '☀️';
    themeToggle.title = 'Cambiar a modo claro';
    themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
  } else {
    themeToggle.textContent = '🌙';
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

/*
  Sonidos generados con Web Audio API.
  No se necesitan archivos .mp3.
  En iPhone solo suenan después de un toque del usuario, por eso están ligados a botones y checks.
*/

function updateSoundButton() {
  soundToggle.textContent = soundsEnabled ? '🔊' : '🔇';
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

function playTone(frequency = 520, duration = 0.08, type = 'sine', volume = 0.07, delay = 0) {
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
    app: 'Rutina Diaria - Enfoque y Disciplina',
    version: 1,
    exportedAt: new Date().toISOString(),
    selectedDate,
    soundsEnabled,
    data: allData
  };

  const json = JSON.stringify(backup, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const dateForName = getTodayString();
  const link = document.createElement('a');

  link.href = url;
  link.download = `respaldo-rutina-diaria-${dateForName}.json`;
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

      /*
        Formato nuevo:
        {
          app, version, exportedAt, selectedDate, soundsEnabled, data
        }

        También acepta un JSON antiguo que sea directamente el objeto de fechas.
      */
      if (parsed && parsed.data && typeof parsed.data === 'object') {
        importedData = parsed.data;
        importedSelectedDate = parsed.selectedDate || null;
        importedSoundsEnabled = parsed.soundsEnabled;
      } else if (parsed && typeof parsed === 'object') {
        importedData = parsed;
      }

      if (!importedData || Array.isArray(importedData)) {
        throw new Error('Formato inválido');
      }

      const shouldReplace = confirm(
        '¿Quieres importar este respaldo? Esto reemplazará los datos guardados actualmente en esta app.'
      );

      if (!shouldReplace) {
        showSavedStatus('Importación cancelada');
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert('No se pudo importar el respaldo. Revisa que sea un archivo JSON válido de esta app.');
      showSavedStatus('Error al importar');
    }
  };

  reader.readAsText(file);
}

/* ----- Eventos ----- */

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    updateTaskVisual(checkbox);

    if (checkbox.checked) {
      playCheckSound();
    } else {
      playUncheckSound();
    }

    updateProgress(true, true);
    showSavedStatus();
  });
});

notes.forEach((note) => {
  note.addEventListener('input', debounceSaveNotes);

  note.addEventListener('blur', () => {
    saveCurrentDay();
  });
});

startTimer.addEventListener('click', () => {
  playButtonSound();
  runTimer();
});

pauseTimer.addEventListener('click', () => {
  playButtonSound();
  stopTimer(true);
});

resetTimer.addEventListener('click', () => {
  playResetSound();
  clearTimer();
});

prevDayBtn.addEventListener('click', () => changeDate(-1));
nextDayArrowBtn.addEventListener('click', () => changeDate(1));

nextDayBtn.addEventListener('click', goToNextDay);
todayBtn.addEventListener('click', goToToday);
dateCard.addEventListener('click', goToToday);

resetBtn.addEventListener('click', resetCurrentDay);

themeToggle.addEventListener('click', toggleTheme);

soundToggle.addEventListener('click', () => {
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

window.addEventListener('beforeunload', () => {
  saveCurrentDay();
});

/* ----- Recordatorios al calendario (.ics) ----- */

const downloadReminder = document.getElementById('downloadReminder');
const reminderMorning = document.getElementById('reminderMorning');
const reminderNight = document.getElementById('reminderNight');

function generateICS(morningTime, nightTime) {
  const pad = (n) => String(n).padStart(2, '0');

  // Generar eventos recurrentes diarios
  const now = new Date();
  const dateStamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}T${pad(now.getHours())}${pad(now.getMinutes())}00`;

  // Fecha de inicio: hoy
  const startDate = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;

  const [mHour, mMin] = morningTime.split(':');
  const [nHour, nMin] = nightTime.split(':');

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Rutina Diaria//ES
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:rutina-manana-${Date.now()}@rutina-diaria
DTSTAMP:${dateStamp}
DTSTART:${startDate}T${pad(mHour)}${pad(mMin)}00
DTEND:${startDate}T${pad(mHour)}${pad(mMin)}00
RRULE:FREQ=DAILY
SUMMARY:Rutina de la manana
DESCRIPTION:Caminar, leer y pensar que haras hoy que si importa.
BEGIN:VALARM
TRIGGER:-PT0M
ACTION:DISPLAY
DESCRIPTION:Hora de tu rutina de la manana
END:VALARM
END:VEVENT
BEGIN:VEVENT
UID:rutina-noche-${Date.now()}@rutina-diaria
DTSTAMP:${dateStamp}
DTSTART:${startDate}T${pad(nHour)}${pad(nMin)}00
DTEND:${startDate}T${pad(nHour)}${pad(nMin)}00
RRULE:FREQ=DAILY
SUMMARY:Rutina de la noche
DESCRIPTION:Reflexionar, escribir pendientes y cerrar el dia.
BEGIN:VALARM
TRIGGER:-PT0M
ACTION:DISPLAY
DESCRIPTION:Hora de tu rutina de la noche
END:VALARM
END:VEVENT
END:VCALENDAR`;

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
  link.download = 'recordatorios-rutina-diaria.ics';
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
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // Service worker no soportado o error silencioso
    });
  });
}

/* ----- Inicio ----- */

applyTheme();
updateSoundButton();
loadSelectedDay();
