# Instrucciones del Proyecto: Juegos Escolares (ARA BOT de Mate)

## 📌 Reglas de Flujo de Trabajo y Automatización

1. **Auto-Push a GitHub al Finalizar y Verificar Tareas:**
   - Cada vez que se termine una tarea, implementación, refactor o fix y esté probado y verificado, se debe ejecutar inmediatamente:
     ```bash
     git add .
     git commit -m "feat/fix/docs: <descripción del cambio>"
     git push origin main
     ```
2. **Estándares de Calidad UX/UI:**
   - Interfaz interactiva, Single-Screen Zero-Scroll View (`h-[100dvh] overflow-hidden`).
   - 100% Offline mediante Web Audio API nativo y Service Worker.
   - Pedagogía adaptada a primaria (CPA Singapur, SEP México y Modelo VAK).
