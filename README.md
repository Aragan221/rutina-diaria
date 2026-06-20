<div align="center">

# ◼️◼️◻️ STREAK

**No rompas la cadena.**

App web personal para construir disciplina y constancia. Un eslabón a la vez.

[![App en vivo](https://img.shields.io/badge/▶_Abrir_STREAK-000000?style=for-the-badge)](https://aragan221.github.io/rutina-diaria/)
[![Versión](https://img.shields.io/badge/versión-v1.6-111111?style=for-the-badge)](#-versiones)
[![Estado](https://img.shields.io/badge/estado-activo-e8a33d?style=for-the-badge)](#-estado-del-proyecto)

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222?style=flat-square&logo=github&logoColor=white)

</div>

---

## 📖 ¿Qué es?

**STREAK** es una app web minimalista para sostener una rutina diaria. Su filosofía es simple: cada día completado es un **eslabón** de una cadena que no se debe romper. La fuerza no está en un día perfecto, sino en **la constancia que no se interrumpe**.

Identidad visual **Mono Noir**: negro absoluto, blanco puro y un único acento ámbar (**Ember**) reservado para la racha viva.

La rutina se organiza en **tres momentos**:

| 🌞 Mañana | 🕛 Medio día | 🌙 Noche |
|:---:|:---:|:---:|
| Activación y enfoque | Avance ligero | Reflexión y cierre |

Cada día se guarda de forma **independiente**.

---

## 🎨 Identidad de marca

| Elemento | Definición |
|---|---|
| **Nombre** | STREAK — una palabra, global, brandeable |
| **Tagline** | No rompas la cadena |
| **Color base** | Noir `#000000` + Pure `#FFFFFF` |
| **Acento** | Ember `#E8A33D` (solo para la racha viva) |
| **Símbolo** | La cadena: eslabones que se llenan día a día |
| **Tono** | Directo, sin culpa, como un entrenador que confía en ti |

> 📄 La propuesta creativa completa está en `marca.html` (brand book navegable).

---

## ✨ Funciones principales

| | Función | | Función |
|:---:|---|:---:|---|
| 🔗 | **Cadena de eslabones** (últimos 14 días) | 🔔 | Sonidos suaves de interacción |
| 📅 | Navegación por días | 🔇 | Activar / desactivar sonidos |
| ✅ | Checklist de rutina diaria | 🌗 | Tema Noir (oscuro) / invertido (claro) |
| 📊 | Barra de progreso del día | 💾 | Guardado automático en el navegador |
| 🔥 | Racha como protagonista | 📤 | Exportar respaldo en JSON |
| ⏱️ | Cronómetro de enfoque | 📥 | Importar respaldo |
| 📝 | Notas por fecha | 🗓️ | Recordatorios al calendario (.ics) |
| 📲 | PWA instalable (offline + icono) | 📱 | Diseño responsive tipo app móvil |

---

## 🗂️ Estructura del proyecto

```
rutina-diaria/
├── index.html       → Estructura (HTML)
├── styles.css       → Identidad Mono Noir (CSS)
├── app.js           → Lógica de la app (JavaScript)
├── sw.js            → Service Worker (cache offline)
├── manifest.json    → Manifest PWA
├── icon-192.svg     → Icono (símbolo de cadena)
├── icon-512.svg     → Icono (símbolo de cadena)
├── marca.html       → Brand book / propuesta creativa
├── propuestas.html  → Las 5 propuestas iniciales de rebranding
├── finalistas.html  → Las 3 finalistas (STREAK, FORJA, NORTE)
└── README.md        → Este archivo
```

> HTML/CSS/JS puro: **sin frameworks, sin build, sin dependencias.** Funciona tal cual en GitHub Pages.

---

## 📲 Instalación en iPhone (PWA)

1. Abrir la app en **Safari** (no Chrome).
2. Tocar **Compartir** (cuadradito con flecha ↑).
3. **"Agregar a pantalla de inicio"**.
4. Listo: pantalla completa, icono propio y funciona **offline**.

> También en Android: Chrome → menú (⋮) → "Instalar aplicación".

---

## 🗓️ Recordatorios al calendario

1. Elegir la hora de la rutina de **mañana** y de **noche**.
2. Tocar **"Descargar recordatorios (.ics)"**.
3. Abrir el archivo → se importan 2 eventos recurrentes al Calendario.
4. El iPhone te notifica todos los días, aunque la app esté cerrada.

---

## 💾 Respaldo de información

Los datos se guardan en el navegador (`localStorage`). Puedes **exportar** un respaldo `.json` (días, tareas, notas, cronómetros, preferencias) e **importarlo** para recuperarlo en otro dispositivo.

> ⚠️ Usa siempre el mismo navegador y link, no borres los datos del sitio, y exporta un respaldo cada cierto tiempo.

---

## 🤖 Desarrollo asistido por IA

Tras una pausa, el proyecto se **retomó apoyándose en inteligencia artificial** para agilizar procesos. La IA se usó para:

- 🧹 Limpiar código duplicado.
- 🗂️ Separar la app por lenguajes (HTML / CSS / JS).
- 📲 Convertirla en PWA instalable + recordatorios al calendario.
- 🎨 Diseñar y ejecutar el **rebranding completo a STREAK** (propuestas, finalistas, brand book e implementación).
- ⚡ Acelerar el mantenimiento manteniendo la app funcional.

---

## 🛠️ Tecnologías usadas

`HTML` · `CSS` · `JavaScript` · `localStorage` · `Web Audio API` · `Service Worker` · `PWA` · `GitHub Pages` · `Desarrollo asistido por IA`

---

## 🚀 Versiones

| Versión | Nombre | Aporte principal |
|:---:|---|---|
| `v1.0` | Versión estable inicial | Navegación por días, checklist, progreso, racha, cronómetro y notas |
| `v1.1` | Versión con sonidos | Sonidos suaves al marcar tareas y navegar |
| `v1.2` | Versión con respaldo | Exportar e importar respaldo en JSON |
| `v1.3` | Modo oscuro premium | Tema claro/oscuro con tonos cálidos |
| `v1.4` | Refactor con IA | Separación en HTML/CSS/JS y limpieza de código duplicado |
| `v1.5` | PWA + Recordatorios | App instalable + recordatorios al calendario (.ics) |
| `v1.6` | **Rebranding a STREAK** | Nueva identidad Mono Noir, racha como protagonista, cadena de eslabones, acento Ember |

---

## 💡 Ideas futuras

- [ ] 📈 Estadísticas semanales
- [ ] 📆 Selector de fecha tipo calendario
- [ ] 🍅 Modo Pomodoro
- [ ] 💬 Frase motivacional diaria
- [ ] 😊 Estado de ánimo del día
- [ ] ✏️ Personalización de tareas
- [x] ~~📲 PWA instalable~~ *(v1.5)*
- [x] ~~🎨 Rebranding profesional~~ *(v1.6)*

---

## 📌 Estado del proyecto

🟢 **Proyecto activo y en mejora continua.**

La versión más reciente es **`v1.6` — STREAK**, publicada mediante GitHub Pages.

<div align="center">

---

**STREAK** · No rompas la cadena. 🔥

</div>
