# Changelog — STREAK

Historial de versiones de la app. Cada entrada resume los cambios principales.

---

## v1.15 — Cache-busting y siempre actualizado
- **Cache-busting**: query strings `?v=1.15` en `styles.css` y `app.js` para forzar que el navegador siempre cargue la version mas reciente.
- Service Worker con `CACHE_NAME = 'streak-v1.15'` y limpieza automatica de caches anteriores.
- Elimina problemas de "veo la version vieja" al abrir la app.

## v1.14 — Service Worker network-first
- Estrategia **network-first** en el Service Worker: si hay internet, siempre sirve lo mas reciente.
- Cache solo como respaldo offline.
- `skipWaiting()` + `clients.claim()` para activacion inmediata.

## v1.13 — Rutina dinamica (semana real)
- Plan de rutina basado en la **semana real** (lun 22 – dom 28 jun 2026).
- Tareas CORE (manana + soltar celular) definen si la cadena se mantiene, no hace falta completar todo.
- Acciones del dia especificas por fecha (firmar contrato, cita con Sury, taller moto, etc.).
- Caminata solo martes/jueves/sabado.
- InDriver con horarios diferenciados: semana 8pm-12am, viernes desde 8pm (pico y placa), fines de semana turno largo 6am-12pm.
- Config especifica: luces danadas (zonas iluminadas), placa XTQ80G.

## v1.12 — Polish UI + micro-interacciones
- Feedback tactil: `navigator.vibrate()` al marcar tareas y completar el dia.
- Animacion `pop` en el checkbox custom al marcar.
- `pulseStreak()`: el numero de racha pulsa cuando se completa el dia.
- `celebrateChain()`: eslabones encendidos hacen animacion escalonada al completar.
- Jerarquia mejorada en Stats: icono hero grande + mini-grid.
- Sonido de celebracion (`playCompleteSound`) al cumplir tareas CORE.

## v1.11 — Rutina dinamica (base)
- Tareas por fecha (accion del dia, caminata mar/jue/sab, fines de semana).
- Cadena basada en tareas CORE (manana + soltar celular).
- Config InDriver con meta de ingresos y restriccion de luces.

## v1.10 — Polish UI
- Aprendizajes de diseno aplicados.
- Feedback tactil, jerarquia en Stats, micro-interacciones.

## v1.8 — Rutina por etapas
- Racha centrada como protagonista.
- Fecha visible solo en tab Rutina.
- Botones Manana/Tarde/Noche para separar etapas.
- Service Worker network-first (primera version).

## v1.7 — Tabs + SVG
- Navegacion por 5 tabs con barra inferior fija (tipo app nativa).
- Eliminacion de tarjetas flotantes.
- Iconos SVG de linea (sin emojis).
- Tab de estadisticas y configuracion separados.

## v1.6 — Rebranding a STREAK
- Nueva identidad **Mono Noir**: negro absoluto + blanco + acento Ember (#E8A33D).
- Racha como protagonista visual.
- Cadena de eslabones (ultimos 14 dias).
- Nombre definitivo: STREAK.

## v1.5 — PWA + Recordatorios
- App instalable (manifest + service worker).
- Recordatorios exportables al calendario (.ics).

## v1.4 — Refactor con IA
- Separacion en HTML/CSS/JS limpio.
- Eliminacion de codigo duplicado.

## v1.3 — Modo oscuro premium
- Tema claro/oscuro con tonos calidos.

## v1.2 — Version con respaldo
- Exportar/importar respaldo en JSON.

## v1.1 — Version con sonidos
- Sonidos suaves al marcar tareas y navegar (Web Audio API).

## v1.0 — Version estable inicial
- Navegacion por dias, checklist, progreso, racha, cronometro y notas.
- Todo en localStorage.
