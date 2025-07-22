"use client"

import { useState, useEffect } from "react"
import Bienvenida from "@/components/bienvenida"
import Login from "@/components/login"
import Registro from "@/components/registro"
import InterfazEstudiante from "@/components/interfaz-estudiante"
import InterfazFuncionario from "@/components/interfaz-funcionario"
import {
  generarUsuariosPrueba,
  generarCitasPrueba,
  verificarDatosIniciales,
  migrarDatosAntiguos,
} from "@/utils/datos-iniciales"

// Tipos de datos
export interface Usuario {
  cedula: string
  nombre: string
  email: string
  tipo: "estudiante" | "funcionario"
  telefono?: string
  carrera?: string
  semestre?: string
  password: string
  foto?: string // Base64 de la imagen
}

export interface Cita {
  id: string
  estudianteCedula: string
  estudianteNombre: string
  tipo: "medicina-general" | "examenes-sangre" | "psicologia"
  fecha: string
  hora: string
  doctor: string
  estado: "pendiente" | "confirmada" | "cancelada" | "completada"
  observaciones?: string
}

export default function BienestarUniversitario() {
  const [vista, setVista] = useState<"bienvenida" | "login" | "registro" | "estudiante" | "funcionario">("bienvenida")
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null)
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [citas, setCitas] = useState<Cita[]>([])
  const [subVista, setSubVista] = useState<string>("dashboard")

  // Estados para formularios
  const [formLogin, setFormLogin] = useState({ email: "", password: "" })
  const [formRegistro, setFormRegistro] = useState({
    cedula: "",
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    tipo: "",
    telefono: "",
    carrera: "",
    semestre: "",
  })
  const [formCita, setFormCita] = useState({
    tipo: "",
    fecha: "",
    hora: "",
    observaciones: "",
  })
  const [formPerfil, setFormPerfil] = useState<Usuario | null>(null)

  // Inicializar datos
  useEffect(() => {
    const inicializarDatos = () => {
      // Verificar si existen datos
      const { datosCompletos } = verificarDatosIniciales()

      // Intentar migrar datos antiguos si existen
      const migracionRealizada = migrarDatosAntiguos()

      let usuariosIniciales = []
      let citasIniciales = []

      if (datosCompletos && !migracionRealizada) {
        // Cargar datos existentes
        const usuariosGuardados = localStorage.getItem("bienestar_usuarios")
        const citasGuardadas = localStorage.getItem("bienestar_citas")

        if (usuariosGuardados) {
          usuariosIniciales = JSON.parse(usuariosGuardados)
        }

        if (citasGuardadas) {
          citasIniciales = JSON.parse(citasGuardadas)
        }
      } else {
        // Generar datos de prueba dinámicamente
        usuariosIniciales = generarUsuariosPrueba()
        citasIniciales = generarCitasPrueba()

        // Guardar en localStorage
        localStorage.setItem("bienestar_usuarios", JSON.stringify(usuariosIniciales))
        localStorage.setItem("bienestar_citas", JSON.stringify(citasIniciales))

        console.log("✅ Datos iniciales generados dinámicamente")
      }

      // Establecer estados
      setUsuarios(usuariosIniciales)
      setCitas(citasIniciales)

      // Verificar sesión activa
      const sesionActiva = localStorage.getItem("bienestar_sesion")
      if (sesionActiva) {
        try {
          const usuario = JSON.parse(sesionActiva)
          // Verificar que el usuario aún existe en la lista actual
          const usuarioExiste = usuariosIniciales.find((u) => u.cedula === usuario.cedula)
          if (usuarioExiste) {
            setUsuarioActual(usuarioExiste)
            setVista(usuarioExiste.tipo)
          } else {
            // Limpiar sesión si el usuario ya no existe
            localStorage.removeItem("bienestar_sesion")
          }
        } catch (error) {
          console.error("Error al cargar sesión:", error)
          localStorage.removeItem("bienestar_sesion")
        }
      }
    }

    inicializarDatos()
  }, [])

  const props = {
    vista,
    setVista,
    usuarioActual,
    setUsuarioActual,
    usuarios,
    setUsuarios,
    citas,
    setCitas,
  }

  // Renderizado condicional de componentes
  switch (vista) {
    case "bienvenida":
      return <Bienvenida {...props} />
    case "login":
      return <Login {...props} />
    case "registro":
      return <Registro {...props} />
    case "estudiante":
      return <InterfazEstudiante {...props} />
    case "funcionario":
      return <InterfazFuncionario {...props} />
    default:
      return <Bienvenida {...props} />
  }
}
