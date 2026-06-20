# ⭐ Checklist maestra de UI/UX

Repasa esto **antes de dar por terminada** cualquier pantalla o feature. Combina Leyes de UX + Apple HIG + Kole Jain + Refactoring UI.

## 1. Estrategia (pensar como pro, antes de pixeles)
- [ ] ¿Qué intenta lograr el usuario en esta pantalla? ¿Qué fricción puedo eliminar?
- [ ] ¿Resuelve un problema real, no solo "se ve bonito"?
- [ ] Orden de decisiones: **problema → flujo → arquitectura → detalles visuales** (los visuales son lo último).
- [ ] ¿Busqué un patrón ya probado (Mobbin / apps top) en vez de inventar?

## 2. Jerarquía visual
- [ ] ¿Funciona en **escala de grises**? (si la jerarquía aguanta sin color, es sólida).
- [ ] Lo más importante destaca por **tamaño, peso, posición y contraste**.
- [ ] No hay "todo al mismo nivel" / diseño plano.
- [ ] El dato/CTA clave se ve sin esfuerzo.

## 3. Espaciado (lo que más eleva el nivel)
- [ ] Sistema de espaciado consistente: múltiplos de **4 u 8 px** (4, 8, 16, 24, 32, 48, 64).
- [ ] **Empieza con MUCHO espacio en blanco**, luego reduce. El error #1 amateur es apretar.
- [ ] Espaciado no ambiguo: menos espacio dentro de un grupo, más entre grupos (Proximidad).
- [ ] El contenido respira; no se llena toda la pantalla.

## 4. Tipografía
- [ ] Una sola familia sans-serif suele bastar.
- [ ] Máximo **5-6 tamaños** de fuente (type scale definido).
- [ ] En títulos: `letter-spacing` ligeramente negativo (-1% a -3%) y `line-height` 110-120%.
- [ ] Texto legible, soporta tamaños dinámicos.

## 5. Color
- [ ] Paleta **limitada**: un color primario + neutros + ramps (claros/oscuros).
- [ ] Colores semánticos: verde=éxito, rojo=error, etc. Nunca color solo de adorno.
- [ ] Acento usado con bisturí (resaltar lo importante, no todo).

## 6. Iconos y botones
- [ ] Iconos de **una sola librería** consistente (Lucide / SF Symbols / Phosphor). Nunca mezclar fill y stroke.
- [ ] **Sin emojis** en UI seria → iconos SVG de línea.
- [ ] Iconos del tamaño del `line-height` del texto que acompañan.
- [ ] Botones grandes (Fitts), acciones frecuentes al alcance del pulgar (barra inferior en móvil).

## 7. Estados y feedback
- [ ] Cada elemento interactivo tiene: default, hover, **active/pressed**, disabled, loading, error, focus.
- [ ] Feedback inmediato (cambio de color, háptico, animación).
- [ ] Respuesta del sistema < 400 ms se siente fluida (Doherty). Optimiza/lazy/caché.

## 8. Micro-interacciones y profundidad
- [ ] Transiciones sutiles (no exageradas). Curvas de easing suaves.
- [ ] Sombras suaves: baja opacidad + más blur. Que no sean lo primero que se note.
- [ ] **Menos efectos = más pro.** Gradientes sutiles (mismo color) o ninguno.

## 9. Dark mode
- [ ] Bordes con menos contraste.
- [ ] Cards con fondo un poco más claro que el fondo (para dar profundidad).
- [ ] Saturación/brillo ajustados (los colores vibrantes cansan en oscuro).

## 10. Móvil / iOS (HIG)
- [ ] Respeta **safe areas** (notch arriba, home indicator abajo) → `env(safe-area-inset-*)`.
- [ ] Tab bar abajo, navegación familiar.
- [ ] Probado en dispositivo real, no solo simulador.
- [ ] Soporta Dark Mode y Dynamic Type.

## 11. Carga cognitiva (no abrumar)
- [ ] ~5-7 elementos/opciones por pantalla (Miller). Usa chunking.
- [ ] Lo importante al inicio y al final de listas (posición serial).
- [ ] Progreso visible en tareas (Zeigarnik): barras, checklists, "en progreso".
- [ ] Cuida especialmente el **onboarding** y el momento de **completar** (Peak-End).

## 12. Anti "vibe code" (que no parezca hecho por IA sin criterio)
- [ ] Nada de emojis genéricos ni colores saturados al azar.
- [ ] Sin KPIs/tarjetas repetidas o layouts sobrecargados.
- [ ] Componentes consistentes (mismo radius, mismos tamaños).
- [ ] Eliminar elementos redundantes (flechas donde hay swipe, strokes de más).
