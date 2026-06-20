# 04 · Refactoring UI + apps de referencia

Fuentes: libro **Refactoring UI** (Adam Wathan & Steve Schoger) + referencias premium de Mobbin (Streaks, Things 3, Oura).

## Refactoring UI — lo esencial

### Jerarquía lo es todo
- La jerarquía clara es lo que más hace que una interfaz se sienta profesional.
- Guíala con **tamaño, peso, color, posición y contraste**.
- **Tip de oro**: diseña primero en **escala de grises**. Si funciona sin color, la jerarquía es sólida.
- Evita diseños planos donde todo parece igual de importante.

### Espaciado y layout (lo más valioso)
- **Empieza con demasiado white space**, luego reduce. La mayoría de diseños amateurs están apretados.
- Sistema de espaciado consistente: base **4 u 8 px** y múltiplos (4, 8, 16, 24, 32, 48, 64).
  - Espacios pequeños: diferencias de 2-4 px importan mucho (botones, iconos).
  - Espacios grandes: las diferencias se notan menos.
- **No llenes toda la pantalla.** Deja respirar el contenido.
- Las grids son útiles pero sobrevaloradas → prioriza **espaciado intencional**.
- Evita espaciado ambiguo: menos espacio dentro de un grupo, más entre grupos.
- Define **tamaños absolutos** en tu sistema (el relative sizing no escala bien).

### Otros
- Limita tus elecciones (colores, tipografías, tamaños).
- Consistencia > perfección.
- Trabaja en ciclos cortos: diseña lo básico, luego refina.

## Apps de referencia (estudiar en Mobbin)

### Streaks (habit tracker)
- Una sola pantalla principal, hábitos grandes y claros.
- Mucho white space, feedback visual fuerte (color para completados).
- El hábito actual destaca por tamaño y color.
- **Lección**: menos elementos = más impacto. Ideal para apps de hábitos.

### Things 3 (task manager)
- Limpio, elegante, calmado. Tipografía excelente, espaciado generoso.
- Jerarquía sutil: títulos grandes, subtítulos pequeños, listas con espaciado perfecto.
- Color muy controlado (negro/gris + acentos). Checkmarks grandes, estados claros.
- **Lección**: espaciado + tipografía hacen "premium" sin necesidad de muchos gráficos.

### Oura (salud/sueño)
- Diseño zen, mucho espacio negativo, visuales calmados.
- Dashboards con jerarquía: métricas principales grandes, luego detalles.
- Tarjetas, gráficos minimalistas, onboarding claro.
- **Lección**: para salud/bienestar prioriza **claridad y calma** (white space + jerarquía que no abruma).

## Sistema a definir para cualquier proyecto
1. **Spacing scale**: 4 / 8 / 16 / 24 / 32 / 48 / 64 px.
2. **Type scale**: 3-5 tamaños.
3. **Paleta limitada**: primario + neutros + ramps.

## Recursos
- Iconos: [Lucide](https://lucide.dev), [SF Symbols](https://developer.apple.com/sf-symbols/), [Phosphor](https://phosphoricons.com).
- Inspiración: [Mobbin](https://mobbin.com), [Dribbble](https://dribbble.com), [Godly](https://godly.website).
- Color: [Coolors](https://coolors.co), [Realtime Colors](https://realtimecolors.com).
- Tipografía moderna: Inter, Geist, Manrope.
- Easing: [easings.net](https://easings.net).
