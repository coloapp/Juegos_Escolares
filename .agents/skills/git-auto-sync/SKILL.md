---
name: git-auto-sync
description: >-
  Automatiza la sincronización, commit y push a GitHub una vez que cualquier tarea o cambio
  ha sido completado, probado y verificado satisfactoriamente.
---

# Git Auto Sync & GitHub Push Skill

Este skill define el protocolo obligatorio para sincronizar automáticamente el código verificado con el repositorio remoto de GitHub.

## 📋 Protocolo de Ejecución

Cada vez que una tarea esté completada, verificada y probada sin errores:

1. **Inspección de Estado:**
   - Ejecutar `git status` para revisar archivos modificados, creados o eliminados.
2. **Preparación (Staging):**
   - Ejecutar `git add .` para incluir todos los cambios pertinentes.
3. **Commit Semántico (Conventional Commits):**
   - Crear un mensaje de commit descriptivo en español o inglés siguiendo la convención:
     - `feat:` Nuevas funcionalidades o juegos
     - `fix:` Corrección de errores
     - `docs:` Cambios o adiciones a la documentación
     - `style:` Mejoras de diseño, CSS o UI
     - `refactor:` Optimización de código sin alterar comportamiento
   - Ejemplo: `git commit -m "feat(pwa): Lanzamiento completo de ARA BOT de Mate con Cohete y Laboratorio Dinosaurio"`
4. **Push al Repositorio Remoto:**
   - Ejecutar `git push origin HEAD` o `git push origin main`.
5. **Confirmación al Usuario:**
   - Reportar el hash del commit y el enlace al repositorio o rama actualizada.
