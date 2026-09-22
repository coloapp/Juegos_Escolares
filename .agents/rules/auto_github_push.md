---
description: Regla de sincronización automática con GitHub tras completar y verificar tareas.
trigger: always_on
---

# Regla: Auto-Push a GitHub al Finalizar y Probar Tareas

## Instrucción Fundamental
Siempre que finalices cualquier tarea, implementación, arreglo de bugs o actualización de archivos y hayas verificado que el código funciona correctamente:

1. **Verificar que no haya errores pendientes.**
2. **Ejecutar automáticamente el flujo de Git:**
   ```bash
   git add .
   git commit -m "<tipo>(<alcance>): <descripción concisa del cambio>"
   git push origin <rama_actual>
   ```
3. **Informar al usuario del commit y estado del despliegue en GitHub.**
