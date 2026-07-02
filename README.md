<div align="center">

# Rutina Diaria

**Tracker personal de rutina + ingresos InDriver.**

App web para organizar el dia completo: manana, trabajo, turno InDriver, cierre y metricas.

[![App en vivo](https://img.shields.io/badge/▶_Abrir_App-000000?style=for-the-badge)](https://aragan221.github.io/rutina-diaria/)
[![Version](https://img.shields.io/badge/versión-v2.0-111111?style=for-the-badge)](#-versiones)
[![Estado](https://img.shields.io/badge/estado-activo-e8a33d?style=for-the-badge)](#-estado-del-proyecto)

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222?style=flat-square&logo=github&logoColor=white)

</div>

---

## Que es?

Un **tracker diario todo-en-uno** para mantener disciplina, registrar ingresos de InDriver y medir metricas de salud/productividad. Todo en una sola pagina, sin frameworks, funciona offline como PWA.

Identidad visual **Mono Noir**: negro absoluto, blanco puro y acento ambar **Ember** (`#E8A33D`).

---

## Navegacion por tabs

| Tab | Contenido |
|:---:|---|
| **Manana** | Rutina matutina paginada (despertar, agua, luz solar, desayuno, post-it) |
| **Trabajo** | 7 bloques de trabajo con breaks cronometrados |
| **InDriver** | Modulo completo: turno, carreras, propinas, gastos, meta, voz |
| **Cierre** | Rutina nocturna: numeros, magnesio, TCC, celular lejos, dormir |
| **Metricas** | Peso, neto, agua, caminata, dormir, rating, export .md |

---

## Modulo InDriver

El corazon de la app para el turno nocturno:

- **Iniciar/Terminar turno** con cronometro en vivo
- **Entrada grande** de monto (en miles / formato k)
- **Propina** y **gastos rapidos** (gasolina, app, comida)
- **Reconocimiento de voz** (Speech API, es-CO): di "ocho" y pone 8
- **Listado** de registros con boton borrar
- **Resumen en vivo**: bruto, gastos, neto
- **Barra de meta** con alertas al 80% y 100% (vibra + flash)
- **Meta ajustable** desde el tab Metricas

---

## Metricas diarias

| Metrica | Tipo |
|---|---|
| Peso (kg) | Manual, con tendencia vs ayer |
| Neto InDriver | Auto (calculado de los registros) |
| Agua | Overlay con conteo de vasos (meta 2L) |
| Caminata almuerzo | Si / No |
| Dormir antes 1am | Si / No |
| Checklist pre-turno | 0-5 |
| Rating del dia | Emoji (4 niveles) |

---

## Funciones clave

| Funcion | Detalle |
|---|---|
| Fecha logica | El dia cambia a las 4am (no a medianoche) |
| Auto-archivo | Al cambiar de dia, guarda el anterior (hasta 60 dias) |
| Swipe-to-check | Deslizar item a la derecha tambien lo marca |
| Timers con anillo | SVG animado + sonido al terminar |
| Post-it editable | Persiste entre dias, toca para editar |
| Celebracion | Confetti + flash dorado al completar un tab |
| Export .md | Historial completo en Markdown (metricas + checks + InDriver) |
| Reset seguro | Modal con frase "ESTOY SEGURO" para evitar accidentes |
| Toast | Notificaciones efimeras para feedback |

---

## Estructura del proyecto

```
rutina-diaria/
├── index.html                       -> App completa (HTML + CSS + JS)
├── tracker-indriver-entry-grande.html -> Archivo fuente del rediseno v2
├── sw.js                            -> Service Worker (network-first)
├── manifest.json                    -> Manifest PWA
├── icon-192.svg                     -> Icono PWA
├── icon-512.svg                     -> Icono PWA
├── app.js                           -> (legacy v1.15, ya no se usa)
├── styles.css                       -> (legacy v1.15, ya no se usa)
├── marca.html                       -> Brand book original
├── propuestas.html                  -> Propuestas de rebranding
├── finalistas.html                  -> Finalistas (STREAK, FORJA, NORTE)
├── CHANGELOG.md                     -> Historial detallado de versiones
├── aprendizajes/                    -> Documentos de aprendizaje UI/UX
└── README.md                        -> Este archivo
```

> **Sin frameworks, sin build, sin dependencias.** Un solo archivo HTML funciona en GitHub Pages.

---

## Instalacion en iPhone (PWA)

1. Abrir en **Safari** → Compartir → "Agregar a pantalla de inicio"
2. Funciona a pantalla completa, offline, con icono propio

> Android: Chrome → menu → "Instalar aplicacion"

---

## Tecnologias

`HTML` · `CSS` · `JavaScript` · `localStorage` · `Web Audio API` · `Speech Recognition API` · `Service Worker` · `PWA` · `GitHub Pages`

---

## Versiones

| Version | Cambio principal |
|:---:|---|
| `v2.0` | **Rediseno total**: tracker rutina + InDriver + metricas + voz |
| `v2.0.1` | Fix scroll InDriver, listado de registros, voz solo numeros en k |
| `v1.15` | Cache-busting |
| `v1.14` | Service Worker network-first |
| `v1.13` | Rutina dinamica (semana real) |
| `v1.12` | Celebraciones + vibration |
| `v1.11` | Rutina dinamica base |
| `v1.10` | Polish UI |
| `v1.8` | Rutina por etapas |
| `v1.7` | Tabs + SVG |
| `v1.6` | Rebranding a STREAK |
| `v1.0–1.5` | Base: checklist, sonidos, respaldo, tema, PWA |

> Detalle completo en [CHANGELOG.md](CHANGELOG.md)

---

## Estado del proyecto

Proyecto activo. Version actual: **v2.0.1** (2 julio 2026).

<div align="center">

---

**Rutina Diaria** — Un dia a la vez.

</div>
