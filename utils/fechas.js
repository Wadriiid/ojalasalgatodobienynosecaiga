// Utilidades para manejo de fechas con date-fns
import {
  format,
  parseISO,
  isAfter,
  isBefore,
  isToday,
  isTomorrow,
  isThisWeek,
  addDays,
  startOfDay,
  differenceInDays,
  isWeekend,
  addWeeks,
  isValid,
} from "date-fns"
import { es } from "date-fns/locale"

// Configuración de locale en español
const localeConfig = { locale: es }

// Formatear fecha para mostrar al usuario
export const formatearFecha = (fecha) => {
  if (!fecha) return ""

  try {
    const fechaObj = typeof fecha === "string" ? parseISO(fecha) : fecha
    if (!isValid(fechaObj)) return "Fecha inválida"

    return format(fechaObj, "dd/MM/yyyy", localeConfig)
  } catch (error) {
    return "Fecha inválida"
  }
}

// Formatear fecha con día de la semana
export const formatearFechaCompleta = (fecha) => {
  if (!fecha) return ""

  try {
    const fechaObj = typeof fecha === "string" ? parseISO(fecha) : fecha
    if (!isValid(fechaObj)) return "Fecha inválida"

    return format(fechaObj, "EEEE, dd 'de' MMMM 'de' yyyy", localeConfig)
  } catch (error) {
    return "Fecha inválida"
  }
}

// Formatear hora
export const formatearHora = (hora) => {
  if (!hora) return ""

  try {
    // Si viene en formato HH:mm, parsearlo
    const [horas, minutos] = hora.split(":")
    const fecha = new Date()
    fecha.setHours(Number.parseInt(horas), Number.parseInt(minutos), 0, 0)

    return format(fecha, "h:mm a", localeConfig)
  } catch (error) {
    return hora // Devolver la hora original si hay error
  }
}

// Formatear fecha y hora juntas
export const formatearFechaHora = (fecha, hora) => {
  const fechaFormateada = formatearFecha(fecha)
  const horaFormateada = formatearHora(hora)

  return `${fechaFormateada} a las ${horaFormateada}`
}

// Validar que la fecha no sea pasada
export const esFechaFutura = (fecha) => {
  if (!fecha) return false

  try {
    const fechaObj = typeof fecha === "string" ? parseISO(fecha) : fecha
    const hoy = startOfDay(new Date())
    const fechaCita = startOfDay(fechaObj)

    return isAfter(fechaCita, hoy) || isToday(fechaCita)
  } catch (error) {
    return false
  }
}

// Obtener el estado relativo de la fecha (hoy, mañana, esta semana, etc.)
export const obtenerEstadoFecha = (fecha) => {
  if (!fecha) return ""

  try {
    const fechaObj = typeof fecha === "string" ? parseISO(fecha) : fecha

    if (isToday(fechaObj)) {
      return "Hoy"
    } else if (isTomorrow(fechaObj)) {
      return "Mañana"
    } else if (isThisWeek(fechaObj)) {
      return "Esta semana"
    } else {
      const dias = differenceInDays(fechaObj, new Date())
      if (dias > 0 && dias <= 7) {
        return `En ${dias} día${dias > 1 ? "s" : ""}`
      } else if (dias < 0) {
        return `Hace ${Math.abs(dias)} día${Math.abs(dias) > 1 ? "s" : ""}`
      }
      return formatearFecha(fecha)
    }
  } catch (error) {
    return formatearFecha(fecha)
  }
}

// Obtener fechas disponibles para citas (excluyendo fines de semana)
export const obtenerFechasDisponibles = (diasAdelante = 30) => {
  const fechas = []
  let fechaActual = addDays(new Date(), 1) // Empezar desde mañana

  while (fechas.length < diasAdelante) {
    if (!isWeekend(fechaActual)) {
      fechas.push({
        valor: format(fechaActual, "yyyy-MM-dd"),
        texto: formatearFechaCompleta(fechaActual),
        esHoy: isToday(fechaActual),
        esMañana: isTomorrow(fechaActual),
      })
    }
    fechaActual = addDays(fechaActual, 1)
  }

  return fechas
}

// Validar formato de fecha
export const validarFormatoFecha = (fechaString) => {
  if (!fechaString) return false

  try {
    const fecha = parseISO(fechaString)
    return isValid(fecha)
  } catch (error) {
    return false
  }
}

// Obtener horarios disponibles
export const obtenerHorariosDisponibles = () => {
  return [
    { valor: "08:00", texto: "8:00 AM" },
    { valor: "08:30", texto: "8:30 AM" },
    { valor: "09:00", texto: "9:00 AM" },
    { valor: "09:30", texto: "9:30 AM" },
    { valor: "10:00", texto: "10:00 AM" },
    { valor: "10:30", texto: "10:30 AM" },
    { valor: "11:00", texto: "11:00 AM" },
    { valor: "11:30", texto: "11:30 AM" },
    { valor: "14:00", texto: "2:00 PM" },
    { valor: "14:30", texto: "2:30 PM" },
    { valor: "15:00", texto: "3:00 PM" },
    { valor: "15:30", texto: "3:30 PM" },
    { valor: "16:00", texto: "4:00 PM" },
    { valor: "16:30", texto: "4:30 PM" },
  ]
}

// Calcular tiempo restante hasta una cita
export const tiempoHastaCita = (fecha, hora) => {
  if (!fecha || !hora) return ""

  try {
    const [horas, minutos] = hora.split(":")
    const fechaCita = parseISO(fecha)
    fechaCita.setHours(Number.parseInt(horas), Number.parseInt(minutos), 0, 0)

    const ahora = new Date()
    const diferencia = differenceInDays(fechaCita, ahora)

    if (diferencia === 0) {
      return "Hoy"
    } else if (diferencia === 1) {
      return "Mañana"
    } else if (diferencia > 1) {
      return `En ${diferencia} días`
    } else {
      return "Pasada"
    }
  } catch (error) {
    return ""
  }
}

// Ordenar citas por fecha y hora
export const ordenarCitasPorFecha = (citas) => {
  return [...citas].sort((a, b) => {
    try {
      const fechaA = parseISO(a.fecha)
      const fechaB = parseISO(b.fecha)

      // Primero ordenar por fecha
      if (fechaA.getTime() !== fechaB.getTime()) {
        return fechaA.getTime() - fechaB.getTime()
      }

      // Si las fechas son iguales, ordenar por hora
      const [horasA, minutosA] = a.hora.split(":").map(Number)
      const [horasB, minutosB] = b.hora.split(":").map(Number)

      const tiempoA = horasA * 60 + minutosA
      const tiempoB = horasB * 60 + minutosB

      return tiempoA - tiempoB
    } catch (error) {
      return 0
    }
  })
}

// Filtrar citas por período
export const filtrarCitasPorPeriodo = (citas, periodo = "todas") => {
  const ahora = new Date()

  return citas.filter((cita) => {
    try {
      const fechaCita = parseISO(cita.fecha)

      switch (periodo) {
        case "hoy":
          return isToday(fechaCita)
        case "semana":
          return isThisWeek(fechaCita)
        case "futuras":
          return isAfter(fechaCita, ahora) || isToday(fechaCita)
        case "pasadas":
          return isBefore(fechaCita, startOfDay(ahora))
        default:
          return true
      }
    } catch (error) {
      return true
    }
  })
}

// Generar fecha mínima para input date (mañana)
export const fechaMinimaInput = () => {
  return format(addDays(new Date(), 1), "yyyy-MM-dd")
}

// Generar fecha máxima para input date (3 meses adelante)
export const fechaMaximaInput = () => {
  return format(addWeeks(new Date(), 12), "yyyy-MM-dd")
}
