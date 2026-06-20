# 02 · Apple Human Interface Guidelines (HIG)

Fuente: [developer.apple.com/design/human-interface-guidelines](https://developer.apple.com/design/human-interface-guidelines).
La biblia para que una app se sienta **nativa y excelente** en iOS.

## Principios fundamentales

- **Clarity (claridad)**: texto legible, controles precisos, gráficos nítidos. Se entiende todo al instante.
- **Deference (deferencia)**: la interfaz no roba protagonismo al contenido. Minimiza el ruido visual.
- **Depth (profundidad)**: capas, sombras, transiciones y movimiento realista para transmitir jerarquía.
- **Consistency**: usa componentes estándar para que el usuario se sienta en casa.
- **Aesthetic Integrity**: el diseño coherente con el propósito de la app.

## Mejores prácticas iOS (las más aplicables)

- **Contenido primero**: limita los controles en pantalla. Acciones secundarias vía swipe / long press.
- **Diseño adaptable**: soporta Dark Mode, Dynamic Type, orientación y distintos tamaños de pantalla.
- **Ergonomía móvil**: acciones frecuentes en la **zona del pulgar** (parte inferior y central). Facilita el swipe para volver.
- **Aprovecha el dispositivo** (con permiso): ubicación, cámara, Face ID/Touch ID, etc., evitando pedir datos manualmente.
- **Sesiones rápidas**: diseña para multitasking y cambios rápidos entre apps.

## Por área

| Área | Mejor práctica |
|---|---|
| Layout y jerarquía | Agrupa con espacio negativo, color o separadores. Extiende contenido al borde. |
| Navegación | Patrones familiares: **Tab Bar abajo** en iPhone, Navigation Bar, Sidebars en iPad/Mac. |
| Componentes | Usa nativos (SwiftUI/UIKit): accesibles y consistentes por defecto. |
| Accesibilidad | VoiceOver, Dynamic Type, Reduce Motion, alto contraste. Clave para buena review. |
| Feedback | Respuesta inmediata: haptics, animaciones, estados de carga. |
| Gestos | Multi-Touch y gestos naturales. Evita gestos ocultos o poco intuitivos. |

## Consejos para devs

- **Mobile-first + platform-specific**: diseña primero iPhone, luego adapta.
- Usa **Apple Design Resources** (plantillas Figma/Sketch oficiales).
- Prueba en **dispositivos reales**, no solo simulador.
- **No copies Material Design** (estilo Android). Las apps que se sienten "iOS nativas" rankean mejor.
- Empieza por las secciones **Foundations → Designing for iOS → Patterns → Components**.

> ⚠️ Recordatorio técnico para web/PWA: respeta `env(safe-area-inset-top/bottom)` para no chocar con el notch ni el home indicator.
