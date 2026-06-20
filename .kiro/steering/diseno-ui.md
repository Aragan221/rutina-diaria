---
inclusion: auto
---

# Reglas de diseño UI/UX (aplicar siempre en este repo)

Cuando cree o modifique cualquier interfaz en este proyecto, debo seguir estos principios.
Detalle completo en la carpeta `aprendizajes/` (ver `aprendizajes/checklist-maestra.md`).

## Innegociables
- **Jerarquía primero**: debe funcionar en escala de grises (tamaño, peso, posición, contraste).
- **Espaciado sistemático**: múltiplos de 4 u 8 px (4, 8, 16, 24, 32, 48, 64). Empezar con espacio generoso; dejar respirar.
- **Sin emojis en la UI**: usar iconos SVG de línea de una sola familia (Lucide / SF Symbols). Nunca mezclar fill y stroke.
- **Paleta limitada**: primario + neutros + un acento usado con bisturí. Colores semánticos (verde=éxito, rojo=error).
- **Tipografía**: una sans-serif; máx 5-6 tamaños; títulos con letter-spacing ligeramente negativo.
- **Estados completos** en todo elemento interactivo: default, pressed/active, disabled, loading, error, focus + feedback inmediato.
- **Móvil/iOS**: respetar `env(safe-area-inset-*)`; tab bar abajo; acciones frecuentes al alcance del pulgar (Fitts).
- **Menos es más**: sombras suaves, efectos sutiles, sin layouts sobrecargados ni elementos redundantes.

## Mentalidad
- Orden: **problema → flujo → arquitectura → detalles visuales**.
- Usar patrones conocidos (Jakob); no reinventar.
- Limitar opciones por pantalla (Hick, Miller 5-7).
- Mostrar progreso en tareas (Zeigarnik); cuidar onboarding y el momento de completar (Peak-End).
- Consistencia > perfección. Pensar en sistema, no en pantallas aisladas.

## Antes de dar por terminado
Repasar `aprendizajes/checklist-maestra.md`.
