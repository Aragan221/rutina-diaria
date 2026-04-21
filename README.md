# Rutina Diaria - Enfoque y Disciplina

Mini app web personal para gestionar rutina diaria, hábitos, notas, cronómetro, sonidos, progreso y respaldo de información.

## App publicada

Puedes abrir la app aquí:

https://aragan221.github.io/rutina-diaria/

## Descripción

**Rutina Diaria - Enfoque y Disciplina** es una mini app web creada para organizar el día de forma visual, sencilla y minimalista.

La app permite llevar seguimiento de tareas diarias, escribir reflexiones personales, medir tiempo de enfoque con cronómetro y conservar una racha de días completados.

El diseño está inspirado en una interfaz limpia tipo app móvil, con colores suaves, tarjetas redondeadas, animaciones ligeras y una experiencia pensada para usarse desde celular.

## Objetivo del proyecto

El objetivo principal de esta app es ayudar a mantener una rutina diaria simple, enfocada y sostenible.

La idea no es llenar el día de tareas, sino crear una estructura básica para avanzar con disciplina en tres momentos:

- Mañana.
- Medio día.
- Noche.

Cada día queda guardado de forma independiente, permitiendo revisar días anteriores y observar el progreso personal.

## Funciones principales

- Navegación por días.
- Checklist de rutina diaria.
- Barra de progreso del día.
- Racha de días completados.
- Cronómetro de enfoque.
- Bloc de notas por fecha.
- Guardado automático en el navegador.
- Sonidos suaves de interacción.
- Botón para activar o desactivar sonidos.
- Exportar respaldo en archivo JSON.
- Importar respaldo para recuperar información.
- Diseño responsive tipo app móvil.
- Interfaz minimalista con estilo cálido y moderno.

## Rutina incluida

### Mañana

- Caminar o moverse durante 10–15 minutos.
- Leer *Atomic Habits* durante 15 minutos.
- Pensar: ¿Qué haré hoy que sí importa?

### Medio día

- Hacer una tarea ligera de negocio:
  - Idea de anuncio.
  - Mejorar mensaje.
  - Analizar competencia.

### Noche

- Reflexión: ¿Qué hice bien hoy?
- Reflexión: ¿Qué puedo mejorar?
- Orden mental: escribir pendientes.

## Respaldo de información

La app permite exportar un respaldo en formato `.json`.

Este respaldo puede incluir:

- Días registrados.
- Tareas completadas.
- Notas escritas.
- Cronómetros.
- Preferencias de sonido.
- Progreso guardado.

También permite importar ese archivo para recuperar la información en caso de cambiar de navegador, dispositivo o borrar los datos locales.

## Importante sobre el guardado

Los datos se guardan en el navegador mediante `localStorage`.

Esto significa que la información queda almacenada en el dispositivo y navegador donde se usa la app.

Para conservar los datos correctamente, se recomienda:

- Usar siempre el mismo navegador.
- Usar el mismo link de GitHub Pages.
- No borrar los datos del navegador.
- Exportar respaldos periódicamente en formato JSON.

Si se cambia de celular, navegador o se borran los datos del sitio, se debe usar la función de importar respaldo.

## Tecnologías usadas

- HTML
- CSS
- JavaScript
- localStorage
- Web Audio API
- GitHub Pages

## Versiones

### v1.0 - Versión estable inicial

Primera versión estable de la app.

Incluye:

- Navegación por días.
- Checklist diario.
- Barra de progreso.
- Racha.
- Cronómetro.
- Bloc de notas.
- Guardado local en el navegador.

### v1.1 - Versión con sonidos

Segunda versión de la app.

Incluye:

- Sonidos suaves al marcar tareas.
- Sonido al completar el día.
- Sonidos para cronómetro y navegación.
- Botón para activar o desactivar sonidos.
- Mantiene navegación por días, racha, cronómetro y bloc de notas.

### v1.2 - Versión con respaldo

Tercera versión de la app.

Incluye:

- Exportar respaldo en archivo JSON.
- Importar respaldo desde archivo JSON.
- Recuperación de días, notas, tareas, cronómetros y preferencias.
- Sonidos suaves integrados.
- Botón para activar o desactivar sonidos.
- Navegación por fechas.
- Racha de días completados.
- Bloc de notas por día.

## Cómo actualizar la app

Para actualizar la app publicada en GitHub Pages:

1. Entrar al repositorio.
2. Abrir el archivo `index.html`.
3. Editar el archivo con el ícono del lápiz.
4. Reemplazar el código por la nueva versión.
5. Hacer commit en la rama `main`.
6. Esperar unos minutos mientras GitHub Pages actualiza la página.

## Recomendación para commits

Usar mensajes claros para identificar los cambios.

Ejemplos:

```text
v1.1 - agregar sonidos a la app
v1.2 - agregar exportar e importar respaldo
actualizar README del proyecto
corregir racha de días
mejorar diseño móvil
```

## Ideas futuras

Posibles mejoras para próximas versiones:

- Modo oscuro.
- Estadísticas semanales.
- Selector de fecha tipo calendario.
- Modo Pomodoro.
- Frase motivacional diaria.
- Estado de ánimo del día.
- Historial visual de días completados.
- Personalización de tareas.
- Icono personalizado para pantalla de inicio.
- Conversión a PWA.

## Estado del proyecto

Proyecto activo y en mejora continua.

Actualmente la app cuenta con una versión funcional publicada mediante GitHub Pages.

## Nota personal

Este proyecto nació como una herramienta personal para construir disciplina, enfoque y constancia diaria.

También funciona como primer acercamiento práctico a la creación de una app web usando HTML, CSS, JavaScript, GitHub y GitHub Pages.
