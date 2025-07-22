// Validaciones para el sistema de bienestar universitario
import { esFechaFutura, validarFormatoFecha } from "./fechas.js"

// Validar cédula de 10 dígitos
export const validarCedula = (cedula) => {
  return /^\d{10}$/.test(cedula)
}

// Validar email Gmail
export const validarEmail = (email) => {
  return /^[^\s@]+@gmail\.com$/.test(email)
}

// Validar campos de login
export const validarCamposLogin = (formLogin) => {
  if (!formLogin.email.trim()) {
    alert("⚠️ Por favor ingrese su correo electrónico")
    return false
  }
  if (!formLogin.password.trim()) {
    alert("⚠️ Por favor ingrese su contraseña")
    return false
  }
  if (!validarEmail(formLogin.email)) {
    alert("⚠️ Debe usar un correo de Gmail (@gmail.com)")
    return false
  }
  return true
}

// Validar campos de registro
export const validarCamposRegistro = (formRegistro, usuarios) => {
  if (!formRegistro.cedula.trim()) {
    alert("⚠️ Por favor ingrese su cédula")
    return false
  }
  if (!formRegistro.nombre.trim()) {
    alert("⚠️ Por favor ingrese su nombre completo")
    return false
  }
  if (!formRegistro.email.trim()) {
    alert("⚠️ Por favor ingrese su correo electrónico")
    return false
  }
  if (!formRegistro.password.trim()) {
    alert("⚠️ Por favor ingrese una contraseña")
    return false
  }
  if (!formRegistro.confirmPassword.trim()) {
    alert("⚠️ Por favor confirme su contraseña")
    return false
  }
  if (!formRegistro.tipo.trim()) {
    alert("⚠️ Por favor seleccione si es estudiante o funcionario")
    return false
  }

  if (!validarCedula(formRegistro.cedula)) {
    alert("⚠️ La cédula debe tener exactamente 10 dígitos numéricos")
    return false
  }

  if (!validarEmail(formRegistro.email)) {
    alert("⚠️ Debe usar un correo de Gmail (@gmail.com)")
    return false
  }

  if (formRegistro.password !== formRegistro.confirmPassword) {
    alert("⚠️ Las contraseñas no coinciden")
    return false
  }

  if (formRegistro.password.length < 6) {
    alert("⚠️ La contraseña debe tener al menos 6 caracteres")
    return false
  }

  if (usuarios.find((u) => u.cedula === formRegistro.cedula)) {
    alert("⚠️ Ya existe un usuario registrado con esta cédula")
    return false
  }

  if (usuarios.find((u) => u.email === formRegistro.email)) {
    alert("⚠️ Ya existe un usuario registrado con este correo electrónico")
    return false
  }

  return true
}

// Validar campos de cita médica
export const validarCamposCita = (formCita) => {
  if (!formCita.tipo.trim()) {
    alert("⚠️ Por favor seleccione el tipo de cita")
    return false
  }

  if (!formCita.fecha.trim()) {
    alert("⚠️ Por favor seleccione una fecha")
    return false
  }

  if (!formCita.hora.trim()) {
    alert("⚠️ Por favor seleccione una hora")
    return false
  }

  if (!validarFormatoFecha(formCita.fecha)) {
    alert("⚠️ El formato de fecha no es válido")
    return false
  }

  if (!esFechaFutura(formCita.fecha)) {
    alert("⚠️ No puede solicitar citas para fechas pasadas")
    return false
  }

  return true
}

// Validar formato de teléfono (opcional)
export const validarTelefono = (telefono) => {
  if (!telefono) return true // Es opcional
  return /^\d{10}$/.test(telefono)
}

// Validar que la fecha no sea pasada (usando date-fns)
export const validarFechaCita = (fecha) => {
  return esFechaFutura(fecha)
}

// Validar tamaño de archivo de imagen
export const validarTamañoImagen = (file) => {
  const maxSize = 2 * 1024 * 1024 // 2MB
  return file.size <= maxSize
}

// Validar tipo de archivo de imagen
export const validarTipoImagen = (file) => {
  return file.type.startsWith("image/")
}

// Validar horario de cita (horarios laborales)
export const validarHorarioCita = (hora) => {
  if (!hora) return false

  try {
    const [horas, minutos] = hora.split(":").map(Number)
    const tiempoMinutos = horas * 60 + minutos

    // Horarios permitidos: 8:00 AM - 12:00 PM y 2:00 PM - 5:00 PM
    const inicioMañana = 8 * 60 // 8:00 AM
    const finMañana = 12 * 60 // 12:00 PM
    const inicioTarde = 14 * 60 // 2:00 PM
    const finTarde = 17 * 60 // 5:00 PM

    return (
      (tiempoMinutos >= inicioMañana && tiempoMinutos <= finMañana) ||
      (tiempoMinutos >= inicioTarde && tiempoMinutos <= finTarde)
    )
  } catch (error) {
    return false
  }
}
