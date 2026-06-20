<div align="center">

# STREAK

**No rompas la cadena.**

App web personal para construir disciplina y constancia. Un eslabon a la vez.

[![App en vivo](https://img.shields.io/badge/▶_Abrir_STREAK-000000?style=for-the-badge)](https://aragan221.github.io/rutina-diaria/)
[![Version](https://img.shields.io/badge/versión-v1.10-111111?style=for-the-badge)](#-versiones)
[![Estado](https://img.shields.io/badge/estado-activo-e8a33d?style=for-the-badge)](#-estado-del-proyecto)

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222?style=flat-square&logo=github&logoColor=white)

</div>

---

## Que es?

**STREAK** es una app web minimalista para sostener una rutina diaria. Su filosofia es simple: cada dia completado es un **eslabon** de una cadena que no se debe romper. La fuerza no esta en un dia perfecto, sino en **la constancia que no se interrumpe**.

Identidad visual **Mono Noir**: negro absoluto, blanco puro y un unico acento ambar (**Ember**) reservado para la racha viva.

---

## Navegacion por tabs (v1.7)

La app se organiza en **5 secciones** accesibles desde una barra inferior fija:

| Tab | Contenido |
|:---:|---|
| **Cadena** | Racha hero + eslabones (14 dias) + progreso del dia |
| **Rutina** | Tareas organizadas (manana / medio dia / noche) + cronometro |
| **Notas** | Bloc de notas del dia (4 campos) |
| **Stats** | Estadisticas: % completado, tiempo enfocado, tareas hechas, racha |
| **Config** | Tema, sonido, respaldo (exportar/importar), recordatorios, acciones del dia |

---

## Identidad de marca

| Elemento | Definicion |
|---|---|
| **Nombre** | STREAK |
| **Tagline** | No rompas la cadena |
| **Color base** | Noir `#000000` + Pure `#FFFFFF` |
| **Acento** | Ember `#E8A33D` (solo para la racha viva) |
| **Simbolo** | La cadena: eslabones que se llenan dia a dia |
| **Iconos** | SVG de linea (stroke), minimalistas, estilo SF Symbols |
| **Tono** | Directo, sin culpa, como un entrenador que confia en ti |

---

## Funciones principales

| Funcion | Detalle |
|---|---|
| Cadena de eslabones | Ultimos 14 dias visualizados |
| Navegacion por dias | Flechas + tap para volver a hoy |
| Checklist de rutina | Manana, medio dia, noche |
| Barra de progreso | Porcentaje del dia |
| Racha como protagonista | Numero grande + texto |
| Cronometro de enfoque | Inicio, pausa, reinicio |
| Notas por fecha | 4 campos independientes por dia |
| Estadisticas del dia | % completado, tiempo, tareas, racha |
| Tema Noir / claro | Toggle en configuracion |
| Sonidos Web Audio API | Toggle en configuracion |
| Exportar/importar respaldo | Archivo JSON completo |
| Recordatorios .ics | Eventos recurrentes al calendario |
| PWA instalable | Offline + icono en pantalla |
| Iconos SVG | Sin emojis, solo iconos de linea |
| Navegacion por tabs | Barra inferior fija tipo app nativa |

---

## Estructura del proyecto

```
rutina-diaria/
├── index.html       -> Estructura (HTML) con tabs
├── styles.css       -> Identidad Mono Noir + tabs (CSS)
├── app.js           -> Logica de la app + navegacion tabs (JS)
├── sw.js            -> Service Worker (cache offline)
├── manifest.json    -> Manifest PWA
├── icon-192.svg     -> Icono (simbolo de cadena)
├── icon-512.svg     -> Icono (simbolo de cadena)
├── marca.html       -> Brand book / propuesta creativa
├── propuestas.html  -> Las 5 propuestas iniciales de rebranding
├── finalistas.html  -> Las 3 finalistas (STREAK, FORJA, NORTE)
└── README.md        -> Este archivo
```

> HTML/CSS/JS puro: **sin frameworks, sin build, sin dependencias.** Funciona tal cual en GitHub Pages.

---

## Instalacion en iPhone (PWA)

1. Abrir la app en **Safari** (no Chrome).
2. Tocar **Compartir** (cuadradito con flecha).
3. **"Agregar a pantalla de inicio"**.
4. Listo: pantalla completa, icono propio y funciona **offline**.

> Tambien en Android: Chrome -> menu -> "Instalar aplicacion".

---

## Recordatorios al calendario

1. Ir al tab **Config**.
2. Elegir la hora de la rutina de **manana** y de **noche**.
3. Tocar **"Descargar recordatorios (.ics)"**.
4. Abrir el archivo -> se importan 2 eventos recurrentes al Calendario.

---

## Respaldo de informacion

Los datos se guardan en el navegador (`localStorage`). Puedes **exportar** un respaldo `.json` (dias, tareas, notas, cronometros, preferencias) e **importarlo** para recuperarlo en otro dispositivo.

> Usa siempre el mismo navegador y link, no borres los datos del sitio, y exporta un respaldo cada cierto tiempo.

---

## Tecnologias usadas

`HTML` - `CSS` - `JavaScript` - `localStorage` - `Web Audio API` - `Service Worker` - `PWA` - `GitHub Pages`

---

## Versiones

| Version | Nombre | Aporte principal |
|:---:|---|---|
| `v1.0` | Version estable inicial | Navegacion por dias, checklist, progreso, racha, cronometro y notas |
| `v1.1` | Version con sonidos | Sonidos suaves al marcar tareas y navegar |
| `v1.2` | Version con respaldo | Exportar e importar respaldo en JSON |
| `v1.3` | Modo oscuro premium | Tema claro/oscuro con tonos calidos |
| `v1.4` | Refactor con IA | Separacion en HTML/CSS/JS y limpieza de codigo duplicado |
| `v1.5` | PWA + Recordatorios | App instalable + recordatorios al calendario (.ics) |
| `v1.6` | Rebranding a STREAK | Nueva identidad Mono Noir, racha como protagonista, cadena de eslabones, acento Ember |
| `v1.7` | Tabs + SVG | Navegacion por tabs, sin tarjetas flotantes, iconos SVG de linea, estadisticas, configuracion separada |
| `v1.8` | **Rutina por etapas** | Racha centrada, fecha solo en Rutina, botones Manana/Tarde/Noche, cache network-first (siempre actualizado) |
| `v1.10` | **Polish UI** | Aprendizajes de diseño aplicados: feedback tactil, jerarquia en Stats, micro-interacciones, celebracion al completar |

---

## Estado del proyecto

Proyecto activo y en mejora continua.

La version mas reciente es **`v1.10`**, publicada mediante GitHub Pages.

<div align="center">

---

**STREAK** - No rompas la cadena.

</div>
