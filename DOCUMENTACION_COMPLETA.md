# 📚 Documentación Completa - Sistema de Bienestar Universitario

## 📋 Índice
1. [Descripción General](#descripción-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Estructura de Archivos](#estructura-de-archivos)
4. [Componentes Principales](#componentes-principales)
5. [Tipos de Datos](#tipos-de-datos)
6. [Funciones Utilitarias](#funciones-utilitarias)
7. [Estilos y Animaciones](#estilos-y-animaciones)
8. [Flujo de Datos](#flujo-de-datos)
9. [Validaciones](#validaciones)
10. [Almacenamiento Local](#almacenamiento-local)
11. [Guía de Instalación](#guía-de-instalación)
12. [Guía de Uso](#guía-de-uso)
13. [Mantenimiento](#mantenimiento)

---

## 🎯 Descripción General

El **Sistema de Bienestar Universitario** es una aplicación web desarrollada con **React 18** y **Next.js 14** que permite a estudiantes universitarios gestionar citas médicas y a funcionarios de salud administrar el sistema.

### Características Principales:
- **Gestión de Citas**: Solicitar, confirmar, cancelar citas médicas
- **Perfiles de Usuario**: Con fotos de perfil y datos personales
- **Autenticación**: Sistema de login/registro con validaciones
- **Interfaz Dual**: Paneles separados para estudiantes y funcionarios
- **Persistencia**: Datos guardados en localStorage
- **Responsive**: Adaptable a móviles y tablets
- **Animaciones**: Interfaz moderna con efectos suaves

---

## 🏗️ Arquitectura del Sistema

### Patrón de Diseño:
- **Arquitectura de Componentes**: React funcional con hooks
- **Estado Global**: Manejado en el componente principal
- **Props Drilling**: Datos pasados entre componentes
- **Separación de Responsabilidades**: Componentes, utilidades y estilos separados

### Tecnologías Utilizadas:
\`\`\`json
{
  "Frontend": "React 18 + Next.js 14",
  "Lenguaje": "TypeScript",
  "Estilos": "Tailwind CSS + CSS personalizado",
  "Componentes UI": "shadcn/ui",
  "Iconos": "Lucide React",
  "Fechas": "date-fns v3.0.0",
  "Almacenamiento": "localStorage + Base64"
}
\`\`\`

---

## 📁 Estructura de Archivos

\`\`\`
bienestar-universitario/
├── app/
│   ├── page.tsx                    # Componente principal y routing
│   ├── layout.tsx                  # Layout base de Next.js
│   └── globals.css                 # Estilos globales y animaciones
├── components/
│   ├── ui/                         # Componentes shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── bienvenida.tsx              # Página de bienvenida
│   ├── login.tsx                   # Formulario de login
│   ├── registro.tsx                # Formulario de registro
│   ├── interfaz-estudiante.tsx     # Panel del estudiante
│   └── interfaz-funcionario.tsx    # Panel del funcionario
├── utils/
│   ├── fechas.js                   # Utilidades para fechas
│   └── validaciones.js             # Funciones de validación
├── package.json                    # Dependencias
├── README.md                       # Documentación básica
└── DOCUMENTACION_COMPLETA.md       # Esta documentación
\`\`\`

---

## 🧩 Componentes Principales

### 1. **app/page.tsx** - Componente Principal
\`\`\`typescript
// Funciones principales:
- Manejo del estado global de la aplicación
- Routing entre diferentes vistas
- Inicialización de datos de prueba
- Persistencia en localStorage
- Control de sesiones de usuario
\`\`\`

**Estados Principales:**
- `vista`: Controla qué componente mostrar
- `usuarioActual`: Usuario logueado actualmente
- `usuarios`: Array de todos los usuarios registrados
- `citas`: Array de todas las citas médicas

**Funciones Clave:**
- `useEffect`: Inicializa datos y verifica sesiones
- Renderizado condicional según la vista actual

### 2. **components/bienvenida.tsx** - Página de Inicio
\`\`\`typescript
// Características:
- Página de landing con información del sistema
- Botones para login y registro
- Estadísticas del sistema
- Información de usuarios de prueba
- Animaciones de entrada
\`\`\`

**Elementos Visuales:**
- Header con logo y título
- Hero section con call-to-action
- Grid de características (3 cards)
- Sección de estadísticas
- Footer con información de prueba

### 3. **components/login.tsx** - Formulario de Login
\`\`\`typescript
// Funcionalidades:
- Validación de credenciales
- Verificación de email Gmail
- Manejo de errores con alertas
- Redirección según tipo de usuario
- Información de usuarios de prueba
\`\`\`

**Validaciones:**
- Email no vacío y formato Gmail
- Contraseña no vacía
- Usuario existente en el sistema
- Contraseña correcta

### 4. **components/registro.tsx** - Formulario de Registro
\`\`\`typescript
// Características:
- Formulario completo de registro
- Subida de foto de perfil
- Validaciones en tiempo real
- Campos específicos por tipo de usuario
- Preview de imagen antes de guardar
\`\`\`

**Campos del Formulario:**
- Datos básicos: cédula, nombre, email, contraseña
- Foto de perfil (opcional)
- Tipo de usuario (estudiante/funcionario)
- Datos específicos de estudiante: carrera, semestre
- Teléfono (opcional)

### 5. **components/interfaz-estudiante.tsx** - Panel del Estudiante
\`\`\`typescript
// Secciones:
- Dashboard con estadísticas personales
- Solicitar nueva cita médica
- Historial de citas
- Gestión de perfil personal
\`\`\`

**Funcionalidades:**
- Ver citas pendientes, confirmadas y completadas
- Solicitar citas con validación de fechas
- Actualizar información personal
- Cambiar foto de perfil
- Cerrar sesión

### 6. **components/interfaz-funcionario.tsx** - Panel del Funcionario
\`\`\`typescript
// Secciones:
- Dashboard con estadísticas generales
- Gestionar citas de todos los estudiantes
- Historial completo del sistema
- Gestión de perfil personal
\`\`\`

**Funcionalidades:**
- Ver todas las citas del sistema
- Confirmar, cancelar o completar citas
- Estadísticas globales
- Gestión de perfil propio

---

## 📊 Tipos de Datos

### Usuario (Usuario Interface)
\`\`\`typescript
interface Usuario {
  cedula: string              // Cédula de 10 dígitos
  nombre: string              // Nombre completo
  email: string               // Email Gmail obligatorio
  tipo: "estudiante" | "funcionario"  // Tipo de usuario
  telefono?: string           // Teléfono opcional
  carrera?: string            // Solo para estudiantes
  semestre?: string           // Solo para estudiantes
  password: string            // Contraseña
  foto?: string               // Base64 de la imagen
}
\`\`\`

### Cita (Cita Interface)
\`\`\`typescript
interface Cita {
  id: string                  // ID único generado
  estudianteCedula: string    // Cédula del estudiante
  estudianteNombre: string    // Nombre del estudiante
  tipo: "medicina-general" | "examenes-sangre" | "psicologia"
  fecha: string               // Formato YYYY-MM-DD
  hora: string                // Formato HH:MM
  doctor: string              // Nombre del doctor asignado
  estado: "pendiente" | "confirmada" | "cancelada" | "completada"
  observaciones?: string      // Observaciones opcionales
}
\`\`\`

---

## 🛠️ Funciones Utilitarias

### utils/fechas.js - Manejo de Fechas
\`\`\`javascript
// Funciones principales:

formatearFecha(fecha)           // "15/01/2024"
formatearFechaCompleta(fecha)   // "Lunes, 15 de enero de 2024"
formatearHora(hora)             // "2:30 PM"
formatearFechaHora(fecha, hora) // "15/01/2024 a las 2:30 PM"

// Validaciones:
esFechaFutura(fecha)           // true/false
validarFormatoFecha(fecha)     // true/false
validarHorarioCita(hora)       // true/false

// Utilidades:
obtenerEstadoFecha(fecha)      // "Hoy", "Mañana", "En 3 días"
tiempoHastaCita(fecha, hora)   // "En 2 días"
ordenarCitasPorFecha(citas)    // Array ordenado
obtenerHorariosDisponibles()   // Array de horarios
\`\`\`

**Configuración de date-fns:**
- Localización en español (es)
- Formatos personalizados
- Validaciones de fechas futuras
- Exclusión de fines de semana

### utils/validaciones.js - Validaciones
\`\`\`javascript
// Validaciones básicas:
validarCedula(cedula)          // 10 dígitos numéricos
validarEmail(email)            // Formato Gmail
validarTelefono(telefono)      // 10 dígitos (opcional)

// Validaciones de formularios:
validarCamposLogin(form)       // Login completo
validarCamposRegistro(form, usuarios)  // Registro completo
validarCamposCita(form)        // Cita médica

// Validaciones de archivos:
validarTamañoImagen(file)      // Máximo 2MB
validarTipoImagen(file)        // Solo imágenes
\`\`\`

---

## 🎨 Estilos y Animaciones

### Variables CSS Principales:
\`\`\`css
:root {
  --primary-blue: #2563eb;
  --primary-blue-dark: #1d4ed8;
  --secondary-green: #059669;
  --danger-red: #dc2626;
  --success-green: #16a34a;
}
\`\`\`

### Animaciones Implementadas:
\`\`\`css
/* Animaciones de entrada */
.animate-fade-in-up          // Aparece desde abajo
.animate-pulse-slow          // Pulso suave continuo

/* Efectos hover */
.btn-hover-effect           // Elevación en botones
.card-hover-effect          // Elevación en cards
.icon-hover-effect          // Escala en iconos
.sidebar-item-effect        // Deslizamiento en sidebar
.profile-photo-effect       // Escala en fotos
.stat-card-effect          // Efectos en estadísticas
.link-hover-effect         // Línea animada en links
.list-item-effect          // Deslizamiento en listas

/* Efectos focus */
.input-focus-effect         // Escala en inputs
.focus-ring                 // Anillo de enfoque
\`\`\`

### Responsive Design:
- **Mobile First**: Diseño adaptable
- **Breakpoints**: 768px para tablet/desktop
- **Animaciones reducidas**: En móviles para mejor rendimiento
- **Sidebar colapsable**: En pantallas pequeñas

---

## 🔄 Flujo de Datos

### 1. Inicialización de la Aplicación:
\`\`\`
1. app/page.tsx se monta
2. useEffect verifica localStorage
3. Carga usuarios y citas guardados
4. Si no existen, usa datos de prueba
5. Verifica sesión activa
6. Renderiza vista correspondiente
\`\`\`

### 2. Proceso de Login:
\`\`\`
1. Usuario ingresa credenciales
2. validarCamposLogin() verifica formato
3. Busca usuario en array de usuarios
4. Verifica contraseña
5. Guarda sesión en localStorage
6. Actualiza usuarioActual
7. Cambia vista según tipo de usuario
\`\`\`

### 3. Proceso de Registro:
\`\`\`
1. Usuario completa formulario
2. validarCamposRegistro() verifica datos
3. Procesa foto de perfil (si existe)
4. Crea nuevo objeto Usuario
5. Agrega a array de usuarios
6. Guarda en localStorage
7. Redirige a login
\`\`\`

### 4. Gestión de Citas:
\`\`\`
1. Estudiante solicita cita
2. validarCamposCita() verifica datos
3. Genera ID único y asigna doctor
4. Crea objeto Cita con estado "pendiente"
5. Agrega a array de citas
6. Guarda en localStorage
7. Funcionario puede cambiar estado
\`\`\`

---

## ✅ Validaciones

### Validaciones de Entrada:
1. **Cédula**: Exactamente 10 dígitos numéricos
2. **Email**: Formato válido y dominio @gmail.com
3. **Contraseña**: Mínimo 6 caracteres
4. **Fecha**: Formato válido y fecha futura
5. **Hora**: Dentro de horarios laborales
6. **Imagen**: Máximo 2MB, tipos permitidos

### Validaciones de Negocio:
1. **Usuario único**: No duplicar cédula o email
2. **Sesión válida**: Usuario existe y está logueado
3. **Permisos**: Estudiantes solo ven sus citas
4. **Estados de cita**: Transiciones válidas
5. **Fechas**: No permitir citas en fechas pasadas

### Manejo de Errores:
- **Alertas nativas**: Para feedback inmediato
- **Validación en tiempo real**: En formularios
- **Mensajes descriptivos**: Explicando el error
- **Prevención**: Validaciones antes de envío

---

## 💾 Almacenamiento Local

### Estructura en localStorage:
\`\`\`javascript
// Usuarios registrados
localStorage.setItem('bienestar_usuarios', JSON.stringify(usuarios))

// Citas médicas
localStorage.setItem('bienestar_citas', JSON.stringify(citas))

// Sesión activa
localStorage.setItem('bienestar_sesion', JSON.stringify(usuario))
\`\`\`

### Gestión de Fotos:
- **Formato**: Base64 string
- **Almacenamiento**: Dentro del objeto Usuario
- **Validación**: Tamaño y tipo antes de convertir
- **Fallback**: Placeholder si no hay foto

### Persistencia de Datos:
- **Automática**: Cada cambio se guarda inmediatamente
- **Sincronización**: Entre pestañas del navegador
- **Recuperación**: Al recargar la página
- **Limpieza**: Al cerrar sesión

---

## 🚀 Guía de Instalación

### Prerrequisitos:
\`\`\`bash
Node.js 18+
npm o yarn
Git (opcional)
\`\`\`

### Instalación Paso a Paso:
\`\`\`bash
# 1. Crear directorio del proyecto
mkdir bienestar-universitario
cd bienestar-universitario

# 2. Inicializar proyecto Next.js
npx create-next-app@latest . --typescript --tailwind --eslint --app

# 3. Instalar dependencias adicionales
npm install lucide-react date-fns@^3.0.0

# 4. Instalar shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button card input label select textarea badge

# 5. Copiar archivos del proyecto
# (Copiar todos los archivos .tsx, .js, .css según la estructura)

# 6. Ejecutar en desarrollo
npm run dev
\`\`\`

### Configuración de shadcn/ui:
\`\`\`bash
# Componentes necesarios:
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add textarea
npx shadcn@latest add badge
\`\`\`

---

## 📖 Guía de Uso

### Para Estudiantes:

#### 1. Registro:
\`\`\`
1. Ir a página de bienvenida
2. Clic en "Registrarse"
3. Completar formulario:
   - Seleccionar "Estudiante"
   - Ingresar cédula (10 dígitos)
   - Nombre completo
   - Email Gmail
   - Contraseña (mín. 6 caracteres)
   - Carrera y semestre
   - Foto de perfil (opcional)
4. Clic en "Registrarse"
\`\`\`

#### 2. Iniciar Sesión:
\`\`\`
1. Usar credenciales creadas o de prueba:
   - Email: juan.estudiante@gmail.com
   - Contraseña: 123456
2. Clic en "Iniciar Sesión"
\`\`\`

#### 3. Solicitar Cita:
\`\`\`
1. En el panel, ir a "Solicitar Cita"
2. Seleccionar tipo de cita:
   - Medicina General
   - Exámenes de Sangre
   - Psicología
3. Elegir fecha (solo días laborales futuros)
4. Seleccionar hora disponible
5. Agregar observaciones (opcional)
6. Clic en "Solicitar Cita"
\`\`\`

#### 4. Ver Historial:
\`\`\`
1. Ir a "Historial de Citas"
2. Ver todas las citas con estados:
   - Pendiente (amarillo)
   - Confirmada (azul)
   - Cancelada (rojo)
   - Completada (verde)
\`\`\`

### Para Funcionarios:

#### 1. Iniciar Sesión:
\`\`\`
Email: maria.funcionario@gmail.com
Contraseña: 123456
\`\`\`

#### 2. Gestionar Citas:
\`\`\`
1. Ver dashboard con estadísticas
2. Ir a "Gestionar Citas"
3. Para cada cita pendiente:
   - Confirmar: Clic en "Confirmar"
   - Cancelar: Clic en "Cancelar"
4. Para citas confirmadas:
   - Marcar completada
   - Cancelar si es necesario
\`\`\`

#### 3. Ver Historial Completo:
\`\`\`
1. Ir a "Historial de Citas"
2. Ver todas las citas del sistema
3. Filtrar por estado o fecha
\`\`\`

---

## 🔧 Mantenimiento

### Estructura de Código:
- **Modular**: Cada componente en su archivo
- **Tipado**: TypeScript para mayor seguridad
- **Comentado**: Código documentado
- **Consistente**: Patrones uniformes

### Agregar Nuevas Funcionalidades:

#### 1. Nuevo Tipo de Cita:
\`\`\`typescript
// En tipos de datos, agregar a:
tipo: "medicina-general" | "examenes-sangre" | "psicologia" | "nuevo-tipo"

// En doctores, agregar:
const doctores = {
  "nuevo-tipo": "Dr. Nuevo Doctor"
}

// En componentes, agregar opción en Select
\`\`\`

#### 2. Nuevo Campo de Usuario:
\`\`\`typescript
// En interface Usuario:
interface Usuario {
  // ... campos existentes
  nuevoCampo?: string
}

// En formularios, agregar input correspondiente
\`\`\`

#### 3. Nueva Validación:
\`\`\`javascript
// En utils/validaciones.js:
export const nuevaValidacion = (valor) => {
  // Lógica de validación
  return true/false
}
\`\`\`

### Optimizaciones Posibles:
1. **Base de datos real**: Reemplazar localStorage
2. **Autenticación JWT**: Sistema más seguro
3. **API REST**: Backend separado
4. **PWA**: App instalable
5. **Notificaciones**: Push notifications
6. **Tests**: Pruebas unitarias e integración

### Debugging:
\`\`\`javascript
// Verificar datos en localStorage:
console.log(JSON.parse(localStorage.getItem('bienestar_usuarios')))
console.log(JSON.parse(localStorage.getItem('bienestar_citas')))
console.log(JSON.parse(localStorage.getItem('bienestar_sesion')))

// Limpiar datos:
localStorage.clear()
\`\`\`

### Performance:
- **Lazy loading**: Para componentes grandes
- **Memoización**: React.memo para componentes
- **Optimización de imágenes**: Compresión automática
- **Bundle splitting**: Separar código por rutas

---

## 📝 Notas Adicionales

### Limitaciones Actuales:
1. **Almacenamiento**: Solo localStorage (no persistente entre dispositivos)
2. **Seguridad**: Contraseñas en texto plano
3. **Escalabilidad**: No optimizado para muchos usuarios
4. **Offline**: No funciona sin internet
5. **Backup**: No hay respaldo automático

### Mejoras Futuras:
1. **Backend**: API con base de datos
2. **Autenticación**: JWT + refresh tokens
3. **Notificaciones**: Email y push
4. **Reportes**: Exportación PDF/Excel
5. **Chat**: Comunicación en tiempo real
6. **Calendario**: Vista de calendario
7. **Recordatorios**: Notificaciones automáticas

### Consideraciones de Seguridad:
- **Validación**: Siempre validar en frontend y backend
- **Sanitización**: Limpiar inputs del usuario
- **HTTPS**: Usar conexiones seguras en producción
- **Tokens**: Implementar expiración de sesiones
- **Permisos**: Verificar autorización en cada acción

---

## 🎯 Conclusión

Este sistema proporciona una base sólida para la gestión de citas médicas universitarias. El código está bien estructurado, documentado y es fácil de mantener y extender.

**Puntos Fuertes:**
- ✅ Interfaz moderna y responsive
- ✅ Código modular y mantenible
- ✅ Validaciones robustas
- ✅ Experiencia de usuario fluida
- ✅ Documentación completa

**Próximos Pasos Recomendados:**
1. Implementar backend con base de datos
2. Agregar sistema de notificaciones
3. Crear tests automatizados
4. Optimizar para producción
5. Agregar más tipos de citas médicas

---

*Documentación creada para el Sistema de Bienestar Universitario v2.0*
*Última actualización: Enero 2024*
