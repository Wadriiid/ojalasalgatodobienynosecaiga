// Utilidades para generar datos iniciales del sistema
import { format, addDays, subDays } from "date-fns"

// Configuración de usuarios de prueba
export const configuracionUsuarios = {
  estudiante: {
    cedula: "1313463208",
    nombre: "Juan Pérez Estudiante",
    email: "juan.estudiante@gmail.com",
    tipo: "estudiante",
    telefono: "3001234567",
    carrera: "Ingeniería de Sistemas",
    semestre: "8",
    password: "123456",
    foto: "/placeholder.svg?height=100&width=100",
  },
  funcionario: {
    cedula: "1234567890",
    nombre: "Dra. Nohe García",
    email: "nohegarcia@gmail.com",
    tipo: "funcionario",
    telefono: "3009876543",
    password: "123456",
    foto: "/placeholder.svg?height=100&width=100",
  },
}

// Configuración de doctores disponibles
export const doctoresDisponibles = {
  "medicina-general": "Dra. Nohe García",
  "examenes-sangre": "Dr. Carlos López",
  psicologia: "Dra. Ana Rodríguez",
}

// Generar usuarios de prueba
export const generarUsuariosPrueba = () => {
  return [
    {
      ...configuracionUsuarios.estudiante,
    },
    {
      ...configuracionUsuarios.funcionario,
    },
  ]
}

// Generar citas de prueba con fechas dinámicas
export const generarCitasPrueba = () => {
  const hoy = new Date()
  const mañana = addDays(hoy, 1)
  const enTresDias = addDays(hoy, 3)
  const ayer = subDays(hoy, 1)

  return [
    {
      id: "1",
      estudianteCedula: configuracionUsuarios.estudiante.cedula,
      estudianteNombre: configuracionUsuarios.estudiante.nombre,
      tipo: "medicina-general",
      fecha: format(enTresDias, "yyyy-MM-dd"),
      hora: "10:00",
      doctor: doctoresDisponibles["medicina-general"],
      estado: "confirmada",
      observaciones: "Control rutinario",
    },
    {
      id: "2",
      estudianteCedula: configuracionUsuarios.estudiante.cedula,
      estudianteNombre: configuracionUsuarios.estudiante.nombre,
      tipo: "psicologia",
      fecha: format(mañana, "yyyy-MM-dd"),
      hora: "14:00",
      doctor: doctoresDisponibles.psicologia,
      estado: "pendiente",
      observaciones: "Primera consulta",
    },
    {
      id: "3",
      estudianteCedula: configuracionUsuarios.estudiante.cedula,
      estudianteNombre: configuracionUsuarios.estudiante.nombre,
      tipo: "examenes-sangre",
      fecha: format(ayer, "yyyy-MM-dd"),
      hora: "08:00",
      doctor: doctoresDisponibles["examenes-sangre"],
      estado: "completada",
      observaciones: "Exámenes de rutina completados",
    },
  ]
}

// Obtener información de usuarios de prueba para mostrar en UI
export const obtenerInfoUsuariosPrueba = () => {
  return {
    estudiante: {
      email: configuracionUsuarios.estudiante.email,
      password: configuracionUsuarios.estudiante.password,
      nombre: configuracionUsuarios.estudiante.nombre,
    },
    funcionario: {
      email: configuracionUsuarios.funcionario.email,
      password: configuracionUsuarios.funcionario.password,
      nombre: configuracionUsuarios.funcionario.nombre,
    },
  }
}

// Función para actualizar configuración de usuarios (para futuras actualizaciones)
export const actualizarConfiguracionUsuario = (tipo, nuevosdatos) => {
  if (configuracionUsuarios[tipo]) {
    configuracionUsuarios[tipo] = {
      ...configuracionUsuarios[tipo],
      ...nuevosdatos,
    }
  }
}

// Función para agregar nuevos doctores
export const agregarDoctor = (especialidad, nombreDoctor) => {
  doctoresDisponibles[especialidad] = nombreDoctor
}

// Función para obtener doctor por especialidad
export const obtenerDoctorPorEspecialidad = (especialidad) => {
  return doctoresDisponibles[especialidad] || "Dr. No Asignado"
}

// Función para resetear datos a valores por defecto
export const resetearDatosIniciales = () => {
  localStorage.removeItem("bienestar_usuarios")
  localStorage.removeItem("bienestar_citas")
  localStorage.removeItem("bienestar_sesion")

  // Regenerar datos
  const nuevosUsuarios = generarUsuariosPrueba()
  const nuevasCitas = generarCitasPrueba()

  localStorage.setItem("bienestar_usuarios", JSON.stringify(nuevosUsuarios))
  localStorage.setItem("bienestar_citas", JSON.stringify(nuevasCitas))

  return { usuarios: nuevosUsuarios, citas: nuevasCitas }
}

// Función para verificar si existen datos iniciales
export const verificarDatosIniciales = () => {
  const usuarios = localStorage.getItem("bienestar_usuarios")
  const citas = localStorage.getItem("bienestar_citas")

  return {
    usuariosExisten: !!usuarios,
    citasExisten: !!citas,
    datosCompletos: !!usuarios && !!citas,
  }
}

// Función para migrar datos antiguos (si es necesario)
export const migrarDatosAntiguos = () => {
  const usuarios = localStorage.getItem("bienestar_usuarios")

  if (usuarios) {
    try {
      const usuariosParseados = JSON.parse(usuarios)
      let necesitaMigracion = false

      // Verificar si el funcionario tiene el email antiguo
      const funcionario = usuariosParseados.find((u) => u.tipo === "funcionario")
      if (funcionario && funcionario.email === "maria.funcionario@gmail.com") {
        funcionario.email = configuracionUsuarios.funcionario.email
        funcionario.nombre = configuracionUsuarios.funcionario.nombre
        necesitaMigracion = true
      }

      if (necesitaMigracion) {
        localStorage.setItem("bienestar_usuarios", JSON.stringify(usuariosParseados))
        console.log("✅ Datos migrados exitosamente")
        return true
      }
    } catch (error) {
      console.error("Error al migrar datos:", error)
    }
  }

  return false
}

// Función para obtener estadísticas del sistema
export const obtenerEstadisticasIniciales = () => {
  return {
    totalEstudiantes: 500,
    disponibilidad: "24/7",
    satisfaccion: "98%",
    citasCompletadas: 1250,
    doctoresDisponibles: Object.keys(doctoresDisponibles).length,
  }
}
