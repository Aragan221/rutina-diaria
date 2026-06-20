# 03 · Ejecución visual (videos de Kole Jain)

El "cómo se ve y se siente pro". Resume 5 videos: conceptos, errores de principiante, errores de "vibe code" y mentalidad de genio.

## A. Conceptos de UI/UX explicados

| Concepto | Aprendizaje |
|---|---|
| **Affordances & Signifiers** | El UI debe explicarse solo: estados (gris=inactivo, borde=seleccionado), hover, tooltips. Sin instrucciones. |
| **Jerarquía visual** | Guía la atención con tamaño, posición, color y contraste. Lo importante: arriba, grande, destacado. |
| **Grids, layout y spacing** | Las grids son guías, no reglas. Lo clave: **white space** y agrupar. Múltiplos de 4 u 8 px. |
| **Tipografía** | Una sans-serif basta. Títulos: `letter-spacing` -2%/-3%, `line-height` 110-120%. Máx 5-6 tamaños. |
| **Color** | Primario de marca + ramps. Colores semánticos. Nunca color de adorno. |
| **Dark mode** | Menos contraste en bordes; cards más claras que el fondo para dar profundidad. |
| **Sombras** | Suaves, baja opacidad, más blur. No deben ser lo primero que notas. |
| **Iconos y botones** | Iconos = tamaño del line-height. Botones: padding ≈ 2× altura. Ghost buttons sin fondo hasta hover. |
| **Feedback & estados** | default, hover, active, disabled, loading, error, focus. |
| **Micro-interacciones** | Animaciones sutiles en scroll, swipe, transiciones → percepción de calidad. |

## B. 7 errores que delatan a un principiante

1. **User flow pobre** → planea el flujo completo (search, skip, estados dinámicos).
2. **Abusar de efectos** → gradientes/sombras/glows excesivos. Menos es más.
3. **Mal espaciado** → usa sistema 4/8 px; deja respirar.
4. **Componentes inconsistentes** → mismo radius, mismos tamaños; crea componentes reutilizables.
5. **Iconos malos** → una sola librería (Phosphor/Feather/Lucide); no mezclar fill/stroke.
6. **Elementos redundantes** → quita flechas donde hay swipe, strokes de más.
7. **Sin feedback interactivo** → estados pressed/loading/disabled.
   - *Bonus*: charts mal hechos → prioriza claridad sobre decoración.

## C. 5 errores que gritan "vibe code" (hecho por IA sin criterio)

| Error | Solución |
|---|---|
| Emojis e iconos genéricos | Iconos profesionales, consistentes, minimalistas. |
| Colores brillantes mal combinados | Paleta coherente + ramps. No dejes que la IA elija color al azar. |
| Layouts repetitivos/sobrecargados | Simplifica: agrupa, usa popovers / menú de 3 puntos. |
| Falta jerarquía y micro-detalles | Agrega micro-charts útiles, mejora tamaños y espaciado. |
| Landing pages débiles | Mockups reales de la app, screenshots, trust signals. |

> **No dejes que la IA decida el diseño.** Es buena en lógica/features, falla en taste, consistencia y pulido. El criterio humano debe intervenir en color, layout y detalles.

## D. Pensar como genio (mentalidad)

- **Estrategia > ejecución bonita**: resuelve el problema real del usuario y del negocio.
- **Estudia referencias** (Mobbin: Apple, Notion, Linear, Arc). Copia inteligentemente.
- **Jerarquía de decisiones**: 1) problema → 2) flujo/arquitectura → 3) detalles visuales (los últimos).
- **Evita el "local maximum"**: mira soluciones de otras industrias/productos líderes.
- **Piensa en sistemas** (design systems, patrones reutilizables), no en pantallas aisladas.

| | Bueno | Genio |
|---|---|---|
| Prioridad | que se vea bonito | resolver el problema con elegancia |
| Inspiración | tendencias | patrones probados (Mobbin) |
| Decisiones | gusto personal | datos + psicología + convenciones |
| Detalles | agregar efectos | eliminar fricción, mejorar claridad |
| Escala | pantallas | sistemas y flujos completos |
