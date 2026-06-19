<div align="center">

# 🌅 Rutina Diaria — Enfoque y Disciplina

**Mini app web personal para construir disciplina, enfoque y constancia, un día a la vez.**

[![App en vivo](https://img.shields.io/badge/▶_Abrir_app-GitHub_Pages-c89f72?style=for-the-badge)](https://aragan221.github.io/rutina-diaria/)
[![Versión](https://img.shields.io/badge/versión-v1.5-a77a4d?style=for-the-badge)](#-versiones)
[![Estado](https://img.shields.io/badge/estado-activo-8fb996?style=for-the-badge)](#-estado-del-proyecto)

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222?style=flat-square&logo=github&logoColor=white)

</div>

---

## 📖 ¿Qué es?

**Rutina Diaria** es una mini app web minimalista pensada para organizar el día de forma visual y sencilla, con estilo de app móvil: colores suaves, tarjetas redondeadas, animaciones ligeras y sonidos sutiles.

La idea no es llenar el día de tareas, sino crear una estructura básica para avanzar con disciplina en **tres momentos clave**:

| 🌞 Mañana | 🕛 Medio día | 🌙 Noche |
|:---:|:---:|:---:|
| Activación y enfoque | Avance ligero | Reflexión y cierre |

Cada día se guarda de forma **independiente**, para revisar días anteriores y observar el progreso.

---

## ✨ Funciones principales

| | Función | | Función |
|:---:|---|:---:|---|
| 📅 | Navegación por días | 🔔 | Sonidos suaves de interacción |
| ✅ | Checklist de rutina diaria | 🔇 | Activar / desactivar sonidos |
| 📊 | Barra de progreso del día | 🌙 | Modo claro y modo oscuro premium |
| 🔥 | Racha de días completados | 💾 | Guardado automático en el navegador |
| ⏱️ | Cronómetro de enfoque | 📤 | Exportar respaldo en JSON |
| 📝 | Bloc de notas por fecha | 📥 | Importar respaldo |
| 📱 | Diseño responsive tipo app móvil | 🎨 | Interfaz cálida, moderna y elegante |
| 📲 | **PWA instalable** (offline + icono) | 🗓️ | **Recordatorios al calendario (.ics)** |

---

## 📋 Rutina incluida

<details>
<summary><b>🌞 Mañana</b> — 30 a 60 min</summary>

- Caminar o moverse durante 10–15 minutos.
- Leer *Atomic Habits* durante 15 minutos.
- Pensar: ¿Qué haré hoy que sí importa?

</details>

<details>
<summary><b>🕛 Medio día</b> — opcional</summary>

- Hacer una tarea ligera de negocio:
  - Idea de anuncio · Mejorar mensaje · Analizar competencia.

</details>

<details>
<summary><b>🌙 Noche</b> — 20 a 30 min</summary>

- Reflexión: ¿Qué hice bien hoy?
- Reflexión: ¿Qué puedo mejorar?
- Orden mental: escribir pendientes.

</details>

---

## 🗂️ Estructura del proyecto

A partir de la **v1.4**, el código está separado por lenguaje para facilitar el mantenimiento:

```
rutina-diaria/
├── index.html      → Estructura (HTML)
├── styles.css      → Estilos y temas (CSS)
├── app.js          → Lógica de la app (JavaScript)
├── sw.js           → Service Worker (cache offline)
├── manifest.json   → Manifest PWA (metadata, iconos)
├── icon-192.svg    → Icono 192x192
├── icon-512.svg    → Icono 512x512
└── README.md       → Este archivo
```

> Sigue siendo HTML/CSS/JS puro: **sin frameworks, sin build, sin dependencias.** Funciona tal cual en GitHub Pages.

---

## 📲 Instalación en iPhone (PWA)

La app se puede **instalar como aplicación** en la pantalla de inicio del iPhone:

1. Abrir la app en **Safari** (no Chrome).
2. Tocar el botón **Compartir** (cuadradito con flecha ↑).
3. Seleccionar **"Agregar a pantalla de inicio"**.
4. Listo: abre en pantalla completa, sin barra de Safari y funciona **offline**.

> También funciona en Android: Chrome → menú (⋮) → "Instalar aplicación".

---

## 🗓️ Recordatorios al calendario

La app incluye una sección para generar **recordatorios diarios** que se agregan al calendario del iPhone:

1. Elegir la hora de la **rutina de mañana** y la de **noche**.
2. Tocar **"Descargar recordatorios (.ics)"**.
3. Abrir el archivo descargado → se importan 2 eventos recurrentes al Calendario.
4. El iPhone te notifica todos los días a esas horas.

> Funciona **sin servidor** y con la app cerrada, porque usa el calendario nativo del teléfono.

---

## 💾 Respaldo de información

La app guarda los datos en el navegador mediante `localStorage`, así que la información vive en el dispositivo y navegador donde se usa.

Puedes **exportar** un respaldo `.json` que incluye:

- ✅ Días registrados y tareas completadas
- 📝 Notas escritas
- ⏱️ Cronómetros
- 🔔 Preferencia de sonido
- 🌙 Preferencia de tema

Y luego **importarlo** para recuperar todo al cambiar de dispositivo o navegador.

> ⚠️ **Recomendación:** usa siempre el mismo navegador y link, no borres los datos del sitio, y exporta un respaldo cada cierto tiempo.

---

## 🤖 Cómo se retomó el proyecto (uso de IA)

Tras una pausa, el proyecto se **retomó apoyándose en inteligencia artificial** con el objetivo de **agilizar procesos** y darle un uso real como herramienta de desarrollo.

La IA se empleó para:

- 🧹 **Limpiar código duplicado:** se detectaron y eliminaron copias muertas de funciones de respaldo que se habían colado por copy-paste.
- 🗂️ **Separar la app por lenguajes:** dividir el `index.html` monolítico en `index.html` + `styles.css` + `app.js`.
- 🔍 **Revisar y analizar el código** para mantenerlo ordenado y más fácil de escalar.
- ⚡ **Acelerar el mantenimiento** sin cambiar el comportamiento de la app.

Esto convierte al proyecto también en un ejercicio práctico de **desarrollo asistido por IA**.

---

## 🛠️ Tecnologías usadas

`HTML` · `CSS` · `JavaScript` · `localStorage` · `Web Audio API` · `Service Worker` · `PWA` · `GitHub Pages` · `Desarrollo asistido por IA`

---

## 🚀 Versiones

| Versión | Nombre | Aporte principal |
|:---:|---|---|
| `v1.0` | Versión estable inicial | Navegación por días, checklist, progreso, racha, cronómetro y notas |
| `v1.1` | Versión con sonidos | Sonidos suaves al marcar tareas, completar el día y navegar |
| `v1.2` | Versión con respaldo | Exportar e importar respaldo en JSON |
| `v1.3` | Modo oscuro premium | Tema claro/oscuro con tonos cálidos, café y dorado, guardado en el navegador |
| `v1.4` | Refactor con IA | Separación en HTML/CSS/JS, limpieza de código duplicado y mantenimiento asistido por IA |
| `v1.5` | **PWA + Recordatorios** | App instalable (offline, icono, pantalla completa) + recordatorios al calendario con .ics |

---

## 🔄 Cómo actualizar la app

Como la app ahora está separada en varios archivos:

1. Editar el archivo correspondiente:
   - `index.html` → estructura
   - `styles.css` → estilos
   - `app.js` → lógica
2. Hacer commit (idealmente vía Pull Request para revisar los cambios).
3. Mezclar a la rama `main`.
4. Esperar unos minutos a que GitHub Pages publique la actualización.

**Ejemplos de mensajes de commit:**

```text
v1.4 - separar app en HTML/CSS/JS y limpiar codigo duplicado
corregir racha de dias
mejorar diseño movil
actualizar README
```

---

## 💡 Ideas futuras

- [ ] 📈 Estadísticas semanales
- [ ] 📆 Selector de fecha tipo calendario
- [ ] 🍅 Modo Pomodoro
- [ ] 💬 Frase motivacional diaria
- [ ] 😊 Estado de ánimo del día
- [ ] 🗓️ Historial visual de días completados
- [ ] ✏️ Personalización de tareas
- [x] ~~📲 Conversión a PWA instalable con icono propio~~ *(v1.5)*

---

## 📌 Estado del proyecto

🟢 **Proyecto activo y en mejora continua.**

La versión más reciente es **`v1.5` — PWA + Recordatorios**, publicada mediante GitHub Pages.

---

## 🙋 Nota personal

Este proyecto nació como una herramienta personal para construir **disciplina, enfoque y constancia diaria**.

También es un primer acercamiento práctico a la creación de una app web con HTML, CSS, JavaScript, GitHub y GitHub Pages — y ahora, al **desarrollo asistido por inteligencia artificial**.

<div align="center">

---

*Diseñado para enfoque, disciplina y progreso diario.* ✨

</div>
