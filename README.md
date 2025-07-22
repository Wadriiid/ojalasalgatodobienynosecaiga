# Sistema de Bienestar Universitario v2.0

## 📋 Descripción
Sistema integral de gestión de citas médicas para estudiantes universitarios, desarrollado con React y Next.js. Permite a estudiantes solicitar citas médicas y a funcionarios gestionar el sistema de salud universitario. **Nueva versión con fotos de perfil y arquitectura modular.**

## 🚀 Características Principales

### 👨‍🎓 Para Estudiantes:
- Solicitar citas médicas (Medicina General, Exámenes de Sangre, Psicología)
- Ver historial completo de citas
- Gestionar perfil personal **con foto de perfil**
- Dashboard con estadísticas personales
- **Miniaturas de foto en la navegación**

### 👨‍⚕️ Para Funcionarios:
- Gestionar todas las citas del sistema
- Confirmar, cancelar o completar citas
- Ver estadísticas generales
- Historial completo del sistema
- **Perfil con foto personalizada**

### 🆕 Nuevas Características v2.0:
- **📸 Fotos de Perfil**: Subida y gestión de imágenes de perfil
- **🖼️ Miniaturas**: Fotos aparecen en la navegación y headers
- **📁 Arquitectura Modular**: Código separado en componentes individuales
- **🔧 Validaciones Centralizadas**: Archivo dedicado para validaciones
- **🎨 CSS Global**: Estilos organizados y personalizables

## 🔧 Tecnologías Utilizadas
- **Frontend**: React 18, Next.js 14, TypeScript
- **Estilos**: Tailwind CSS, shadcn/ui, CSS personalizado
- **Iconos**: Lucide React
- **Fechas**: date-fns v3.0.0 con localización en español
- **Almacenamiento**: LocalStorage + Base64 para imágenes
- **Validaciones**: JavaScript centralizado con alertas del navegador

### 📅 **Gestión de Fechas con date-fns**
- **Formateo inteligente**: Fechas en español con formatos amigables
- **Validaciones robustas**: Fechas futuras, horarios laborales
- **Estados relativos**: "Hoy", "Mañana", "Esta semana"
- **Ordenamiento**: Citas ordenadas cronológicamente
- **Horarios disponibles**: Sistema de horarios predefinidos
- **Localización**: Interfaz completamente en español

### 🕐 **Características de Fechas:**
- **Formatos múltiples**: dd/MM/yyyy, fechas completas, horas AM/PM
- **Validación inteligente**: No permite fechas pasadas ni fines de semana
- **Tiempo relativo**: Muestra "En X días" o "Hace X días"
- **Horarios laborales**: 8:00 AM - 12:00 PM y 2:00 PM - 5:00 PM
- **Ordenamiento automático**: Citas siempre ordenadas por fecha y hora

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Visual Studio Code (recomendado)

### Dependencias Principales
\`\`\`bash
npm install date-fns@^3.0.0
\`\`\`

### Pasos de Instalación

1. **Crear el proyecto**
\`\`\`bash
mkdir bienestar-universitario
cd bienestar-universitario
\`\`\`

2. **Copiar archivos del proyecto**
   - `app/page.tsx` - Componente principal y routing
   - `components/bienvenida.tsx` - Página de bienvenida
   - `components/login.tsx` - Formulario de inicio de sesión
   - `components/registro.tsx` - Formulario de registro con foto
   - `components/interfaz-estudiante.tsx` - Panel del estudiante
   - `components/interfaz-funcionario.tsx` - Panel del funcionario
   - `utils/validaciones.js` - Funciones de validación
   - `app/globals.css` - Estilos globales
   - `package.json` - Dependencias

3. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

4. **Ejecutar en modo desarrollo**
\`\`\`bash
npm run dev
\`\`\`

5. **Abrir en el navegador**
\`\`\`
http://localhost:3000
\`\`\`

## 👥 Usuarios de Prueba

### Estudiante
- **Email**: `juan.estudiante@gmail.com`
- **Contraseña**: `123456`
- **Cédula**: `1313463208`
- **Foto**: Incluida por defecto

### Funcionario
- **Email**: `maria.funcionario@gmail.com`
- **Contraseña**: `123456`
- **Cédula**: `1234567890`
- **Foto**: Incluida por defecto

## 📸 Gestión de Fotos de Perfil

### Características:
- **Formatos soportados**: JPG, PNG, GIF
- **Tamaño máximo**: 2MB por imagen
- **Almacenamiento**: Base64 en localStorage
- **Preview**: Vista previa antes de guardar
- **Validaciones**: Tamaño y tipo de archivo
- **Miniaturas**: Aparecen en headers y navegación

### Uso:
1. Ir a "Mi Perfil"
2. Hacer clic en el área de foto
3. Seleccionar imagen desde el dispositivo
4. Vista previa automática
5. Guardar cambios

## 🔐 Validaciones Implementadas

### Registro
- ✅ Cédula de 10 dígitos obligatoria
- ✅ Email Gmail (@gmail.com) obligatorio
- ✅ Contraseña mínimo 6 caracteres
- ✅ Confirmación de contraseña
- ✅ Selección de tipo de usuario obligatoria
- ✅ Validación de campos vacíos con alertas nativas
- ✅ **Validación de imágenes (tamaño y tipo)**

### Inicio de Sesión
- ✅ Email Gmail obligatorio
- ✅ Contraseña obligatoria
- ✅ Verificación de usuario existente
- ✅ Validación de credenciales
- ✅ Alerta de inicio de sesión exitoso

## 📁 Estructura del Proyecto Modular

\`\`\`
bienestar-universitario/
├── app/
│   ├── page.tsx              # Componente principal y routing
│   ├── layout.tsx            # Layout base de Next.js
│   └── globals.css           # Estilos globales personalizados
├── components/
│   ├── ui/                   # Componentes de shadcn/ui
│   ├── bienvenida.tsx        # Página de bienvenida
│   ├── login.tsx             # Formulario de login
│   ├── registro.tsx          # Formulario de registro con foto
│   ├── interfaz-estudiante.tsx   # Panel del estudiante
│   └── interfaz-funcionario.tsx  # Panel del funcionario
├── utils/
│   └── validaciones.js       # Funciones de validación centralizadas
├── package.json              # Dependencias del proyecto
└── README.md                 # Documentación completa
\`\`\`

## 🚀 Ejecución desde Visual Studio Code

### Método Recomendado:

1. **Abrir el proyecto**
   - Abrir Visual Studio Code
   - File → Open Folder → Seleccionar carpeta del proyecto

2. **Terminal integrada**
   - `Ctrl + \`` (backtick) para abrir terminal
   - Ejecutar: `npm run dev`

3. **Extensiones recomendadas**
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - TypeScript Importer
   - Auto Rename Tag

## 🔄 Flujo de Trabajo

### Para Estudiantes:
1. Registro con email Gmail y foto de perfil
2. Inicio de sesión
3. **Ver foto en miniatura en el header**
4. Solicitar cita médica
5. Ver estado de citas
6. Actualizar perfil y foto

### Para Funcionarios:
1. Inicio de sesión con credenciales
2. **Foto de perfil visible en navegación**
3. Ver dashboard con estadísticas
4. Gestionar citas pendientes
5. Confirmar o cancelar citas
6. Actualizar perfil personal

## 🎨 Personalización de Estilos

### Variables CSS Disponibles:
\`\`\`css
:root {
  --primary-blue: #2563eb;
  --secondary-green: #059669;
  --accent-purple: #7c3aed;
  --warning-yellow: #d97706;
  --danger-red: #dc2626;
  --success-green: #16a34a;
}
\`\`\`

### Clases Personalizadas:
- `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-danger`
- `.estado-pendiente`, `.estado-confirmada`, `.estado-cancelada`, `.estado-completada`
- `.profile-photo`, `.profile-photo-large`
- `.card`, `.sidebar`, `.header`

## 🛡️ Seguridad y Privacidad

- **Validación de entrada**: Todos los formularios validados
- **Sanitización de imágenes**: Validación de tipo y tamaño
- **Almacenamiento local**: Datos encriptados en localStorage
- **Sesiones seguras**: Manejo apropiado de autenticación
- **Validación de tipos**: TypeScript para mayor seguridad

## 📱 Responsive Design

- **Mobile First**: Diseño adaptable a móviles
- **Breakpoints**: Optimizado para tablet y desktop
- **Imágenes responsivas**: Fotos de perfil adaptables
- **Navegación móvil**: Sidebar colapsable en móviles

## 🔧 Desarrollo y Mantenimiento

### Scripts Disponibles:
- `npm run dev` - Desarrollo local
- `npm run build` - Construcción para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Verificación de código

### Estructura de Validaciones:
- **validaciones.js**: Funciones centralizadas
- **Reutilizables**: Importables en cualquier componente
- **Consistentes**: Mensajes de error uniformes
- **Extensibles**: Fácil agregar nuevas validaciones

## 📞 Soporte y Contribución

Para soporte técnico, mejoras o reportar bugs:
1. Revisar la documentación
2. Verificar la consola del navegador
3. Comprobar la estructura de archivos
4. Contactar al equipo de desarrollo

## 🎯 Próximas Características

- [ ] Base de datos real (Supabase/Firebase)
- [ ] Notificaciones push
- [ ] Exportación de reportes PDF
- [ ] Chat en tiempo real
- [ ] App móvil nativa
- [ ] Integración con calendario
- [ ] Sistema de recordatorios

### Archivos de Utilidades
- **`utils/fechas.js`**: Funciones para manejo de fechas con date-fns
- **`utils/validaciones.js`**: Validaciones actualizadas con date-fns
- **Localización**: Configurado para español (es)

## 📅 **Funciones de Fecha Disponibles:**

### Formateo
- `formatearFecha(fecha)` - dd/MM/yyyy
- `formatearFechaCompleta(fecha)` - Lunes, 15 de enero de 2024
- `formatearHora(hora)` - 2:30 PM
- `formatearFechaHora(fecha, hora)` - 15/01/2024 a las 2:30 PM

### Validación
- `esFechaFutura(fecha)` - Valida fechas futuras
- `validarFormatoFecha(fecha)` - Valida formato ISO
- `validarHorarioCita(hora)` - Valida horarios laborales

### Utilidades
- `obtenerEstadoFecha(fecha)` - "Hoy", "Mañana", "En 3 días"
- `tiempoHastaCita(fecha, hora)` - Tiempo restante
- `ordenarCitasPorFecha(citas)` - Ordenamiento cronológico
- `obtenerHorariosDisponibles()` - Lista de horarios

---

**Sistema de Bienestar Universitario v2.0** 🎓💙📸
*Desarrollado con ❤️ para el bienestar estudiantil*
