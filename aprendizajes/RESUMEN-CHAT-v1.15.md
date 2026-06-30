# Resumen compacto del chat — STREAK hasta v1.15

> Pegar esto al inicio de una nueva conversacion con Kiro para retomar contexto.

---

## Quien es el usuario

- **Juan Manuel** (GitHub: Aragan221)
- Vive en Colombia, trabaja InDriver de noche (moto, placa XTQ80G, luces danadas)
- Prefiere respuestas cortas y directas, en espanol
- Sube directo a main (sin PR ni pull)
- README se actualiza junto con los cambios (no en commits separados)
- No subir cada micro-cambio: acumular y subir resultados consolidados

---

## Que es STREAK

- App web PWA personal para construir disciplina diaria
- Filosofia: "No rompas la cadena" — cada dia completado es un eslabon
- **Identidad Mono Noir**: negro absoluto + blanco + acento Ember (#E8A33D)
- HTML/CSS/JS puro, sin frameworks, funciona en GitHub Pages
- Datos en localStorage, exportable/importable en JSON

---

## Estado actual: v1.15

### Arquitectura
- `index.html` — 5 tabs: Cadena, Rutina, Notas, Stats, Config
- `styles.css?v=1.15` — Identidad Mono Noir
- `app.js?v=1.15` — Toda la logica (1048 lineas)
- `sw.js` — Service Worker network-first con cache-busting
- `manifest.json` + iconos SVG

### Funcionalidad clave
- **Cadena de eslabones**: ultimos 14 dias, animacion de celebracion
- **Racha**: basada en tareas CORE (manana + soltar celular), no todas las tareas
- **Rutina dinamica**: tareas generadas por dia de la semana
  - Manana: alarma + agua + desayuno (CORE)
  - Medio dia: caminata (mar/jue/sab) + accion del dia + cero juegos
  - Noche: InDriver (semana 8-12, viernes desde 8pm por pico y placa, finde 6am-12pm) + celular boca abajo (CORE)
- **WEEK_PLAN**: acciones especificas de la semana 22-28 jun 2026
- **Cronometro de enfoque**
- **Notas por fecha** (4 campos)
- **Stats**: % completado, tareas, tiempo, racha
- **Config**: tema oscuro/claro, sonidos Web Audio API, respaldo JSON, recordatorios .ics
- **PWA**: instalable, offline, network-first

### Detalles tecnicos importantes
- `areCoreTasksCompleted()` define si la cadena se mantiene
- `getDayPlan(dateKey)` genera tareas segun dia de la semana + override de WEEK_PLAN
- Sonidos: Web Audio API (oscillator + gain), sin archivos mp3
- Feedback: vibration API, animacion pop, pulse en racha, celebracion escalonada
- Cache-busting: `?v=1.15` en HTML para CSS/JS + SW con `CACHE_NAME = 'streak-v1.15'`

---

## Aprendizajes de diseno (carpeta aprendizajes/)

Documentos detallados de UI/UX:
1. Leyes de UX
2. Apple HIG
3. Ejecucion visual (Kole Jain)
4. Refactoring UI
5. Figma
6. Checklist maestra (resumen ejecutable de todo)

**Reglas clave**: sin emojis en UI, iconos SVG de linea, jerarquia que funcione en escala de grises, espaciado en multiplos de 4/8px, paleta limitada, estados completos, mobile-first con safe areas.

---

## Historial de versiones (resumen)

| v | Cambio principal |
|---|---|
| 1.0-1.5 | Base funcional: checklist, sonidos, respaldo, tema, PWA |
| 1.6 | Rebranding a STREAK (Mono Noir) |
| 1.7 | Tabs + SVG icons |
| 1.8 | Etapas (Manana/Tarde/Noche) |
| 1.10 | Polish UI |
| 1.11 | Rutina dinamica + CORE tasks |
| 1.12 | Celebraciones + vibration |
| 1.13 | Semana real (WEEK_PLAN) |
| 1.14 | SW network-first |
| 1.15 | Cache-busting (?v=) |

---

## Proximos pasos posibles (no ejecutados)

- Hacer WEEK_PLAN configurable desde la app (no hardcoded)
- Historico de rachas (mejor racha, rachas pasadas)
- Notificaciones push reales (no solo .ics)
- Sync entre dispositivos (actualmente solo local)
- Mejorar accesibilidad (ARIA, focus management)
