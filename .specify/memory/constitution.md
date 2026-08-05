<!--
Sync Impact Report
- Version change: [TEMPLATE] → 1.0.0 (initial ratification)
- Modified principles: n/a (first concrete version)
- Added sections: I. Simplicidad y Diversión Primero; II. Personalización Real y Mantenible;
  III. Calidad de Código y Pruebas; IV. Fidelidad al Diseño (Google Stitch);
  V. Accesibilidad para Niños; Restricciones Técnicas y de Despliegue; Flujo de Trabajo; Governance
- Removed sections: none
- Templates requiring updates:
  ✅ .specify/templates/plan-template.md (generic "Constitution Check" gate, no changes needed)
  ✅ .specify/templates/spec-template.md (no constitution-specific references found)
  ✅ .specify/templates/tasks-template.md (no constitution-specific references found)
  ✅ .devin/skills/speckit-constitution/SKILL.md (generic, no agent-specific renames needed)
- Follow-up TODOs: none
-->
# Memory Game (Juego de Memoria Personalizado) Constitution

## Core Principles

### I. Simplicidad y Diversión Primero
El juego DEBE ser fácil de entender y jugar para niños sin instrucciones previas: reglas
claras de memoria/parejas, feedback visual inmediato al acertar o fallar, y curva de
aprendizaje casi nula. Toda funcionalidad nueva DEBE justificar su valor divertido antes de
añadirse (YAGNI); si una característica añade complejidad sin mejorar la experiencia del
niño jugando, se descarta. Rendimiento y tiempos de carga DEBEN mantenerse bajos para no
frustrar a jugadores impacientes.
Rationale: el objetivo del proyecto es generar ilusión y conexión emocional con los
sobrinos, no demostrar complejidad técnica; un juego confuso o lento rompe ese objetivo.

### II. Personalización Real y Mantenible
El contenido de las cartas (nombres, fotos, temas, referencias familiares) DEBE estar
separado del código mediante datos configurables (JSON/assets), de forma que actualizar o
añadir parejas nuevas no requiera tocar la lógica del juego. Cada sobrino/a relevante DEBE
poder tener contenido identificable y significativo para él/ella. Los assets de imagen
DEBEN tener un formato y tamaño consistentes para no romper el layout.
Rationale: la personalización es el motivo de ser del proyecto; si es costosa de mantener,
dejará de actualizarse y perderá su propósito.

### III. Calidad de Código y Pruebas
La lógica central del juego (barajado, detección de parejas, control de turnos, condición
de victoria) DEBE tener pruebas automatizadas que verifiquen su comportamiento antes de
considerarse completa. El código DEBE mantenerse limpio y componentizado (React), evitando
duplicación entre la lógica del tablero y la presentación. No es obligatorio TDD estricto,
pero ninguna función de lógica de juego se da por terminada sin al menos un test que
cubra su caso principal y un caso límite (por ejemplo, número impar de cartas o pareja ya
resuelta).
Rationale: es un proyecto personal, pero mantener buenas prácticas evita regresiones al
iterar rápido y sirve como muestra real del oficio de programar.

### IV. Fidelidad al Diseño (Google Stitch)
Los diseños creados en Google Stitch son la referencia visual de partida y la implementación
DEBE respetar su identidad (paleta, tipografía, disposición del tablero y estética general).
Se permite adaptación pragmática cuando una restricción técnica o de usabilidad infantil lo
justifique, pero cualquier desviación notable respecto al diseño original DEBE ser una
decisión consciente y no un accidente de implementación.
Rationale: los diseños ya reflejan la ilusión que quieres transmitir a tus sobrinos; perder
esa identidad visual diluiría el carácter personal y cuidado del juego.

### V. Accesibilidad para Niños
La interfaz DEBE ser usable por niños sin ayuda: zonas de clic/tap grandes, contraste
suficiente, cartas de tamaño cómodo y ninguna dependencia de leer textos largos para poder
jugar. Las interacciones DEBEN ser tolerantes a errores (por ejemplo, un doble clic o un tap
impreciso no debe romper el estado del juego).
Rationale: si un niño no puede manejar el juego por sí solo, se frustra y se pierde la magia
que buscas provocar.

## Restricciones Técnicas y de Despliegue

- **Stack**: React para la interfaz; el juego se ejecuta en el navegador sin backend
  obligatorio salvo que una funcionalidad futura (ej. guardar puntuaciones) lo requiera
  explícitamente.
- **Despliegue**: el juego DEBE poder compartirse fácilmente (build estático desplegable,
  ej. Netlify/Vercel/GitHub Pages) para que los sobrinos puedan jugar sin instalación.

## Flujo de Trabajo

- Al implementar una funcionalidad, primero identificar si afecta a la lógica del juego
  (Principio III, requiere test) o solo a presentación/personalización (Principio II).
- Al añadir contenido personalizado nuevo, hacerlo a través de los archivos de datos, no
  hardcodeado en componentes.
- Antes de dar una función por terminada, verificar manualmente la experiencia como si
  fuera un niño jugando por primera vez (Principios I y V) y contrastarla con el diseño de
  Google Stitch (Principio IV).
- Al ser un proyecto de un solo desarrollador, no se exige revisión de pares, pero cada
  cambio relevante debe autoevaluarse contra los cinco principios anteriores.

## Governance

Esta constitution prevalece sobre cualquier otra práctica o preferencia ad hoc durante el
desarrollo del proyecto. Las enmiendas requieren: (1) documentar el cambio y su motivo en
esta misma sección mediante el Sync Impact Report, (2) actualizar la versión según
versionado semántico (MAJOR: eliminación o redefinición incompatible de un principio;
MINOR: nuevo principio o guía material añadida; PATCH: aclaraciones o correcciones
menores), y (3) revisar que los templates de `.specify/templates/` sigan siendo
consistentes. No se requiere aprobación externa al ser un proyecto personal, pero todo
cambio de principio debe quedar registrado con fecha.

**Version**: 1.0.0 | **Ratified**: 2026-07-24 | **Last Amended**: 2026-07-24
