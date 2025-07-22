"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Settings, LogOut, Plus, CheckCircle, AlertCircle, Heart, Upload, X } from "lucide-react"
import { validarEmail } from "@/utils/validaciones"
import { obtenerDoctorPorEspecialidad } from "@/utils/datos-iniciales"
import type { Usuario, Cita } from "@/app/page"

interface InterfazEstudianteProps {
  setVista: (vista: string) => void
  usuarioActual: Usuario | null
  setUsuarioActual: (usuario: Usuario) => void
  usuarios: Usuario[]
  setUsuarios: (usuarios: Usuario[]) => void
  citas: Cita[]
  setCitas: (citas: Cita[]) => void
}

export default function InterfazEstudiante({
  setVista,
  usuarioActual,
  setUsuarioActual,
  usuarios,
  setUsuarios,
  citas,
  setCitas,
}: InterfazEstudianteProps) {
  const [subVista, setSubVista] = useState<string>("dashboard")
  const [formCita, setFormCita] = useState({
    tipo: "",
    fecha: "",
    hora: "",
    observaciones: "",
  })
  const [formPerfil, setFormPerfil] = useState<Usuario | null>(usuarioActual)
  const [previewFoto, setPreviewFoto] = useState<string>("")

  const citasEstudiante = citas.filter((c) => c.estudianteCedula === usuarioActual?.cedula)

  const cerrarSesion = () => {
    setUsuarioActual(null as any)
    localStorage.removeItem("bienestar_sesion")
    setVista("bienvenida")
    alert("👋 Sesión cerrada exitosamente. ¡Hasta pronto!")
  }

  const manejarCambioFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("⚠️ La imagen debe ser menor a 2MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        alert("⚠️ Solo se permiten archivos de imagen")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        if (formPerfil) {
          setFormPerfil({ ...formPerfil, foto: base64 })
          setPreviewFoto(base64)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const eliminarFoto = () => {
    if (formPerfil) {
      setFormPerfil({ ...formPerfil, foto: "/placeholder.svg?height=100&width=100" })
      setPreviewFoto("")
    }
  }

  const solicitarCita = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formCita.tipo || !formCita.fecha || !formCita.hora) {
      alert("⚠️ Complete todos los campos obligatorios para solicitar la cita")
      return
    }

    const fechaCita = new Date(formCita.fecha)
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)

    if (fechaCita < hoy) {
      alert("⚠️ No puede solicitar citas para fechas pasadas")
      return
    }

    const nuevaCita: Cita = {
      id: Date.now().toString(),
      estudianteCedula: usuarioActual!.cedula,
      estudianteNombre: usuarioActual!.nombre,
      tipo: formCita.tipo as any,
      fecha: formCita.fecha,
      hora: formCita.hora,
      doctor: obtenerDoctorPorEspecialidad(formCita.tipo),
      estado: "pendiente",
      observaciones: formCita.observaciones,
    }

    const nuevasCitas = [...citas, nuevaCita]
    setCitas(nuevasCitas)
    localStorage.setItem("bienestar_citas", JSON.stringify(nuevasCitas))

    alert("✅ ¡Cita solicitada exitosamente!\nRecibirá confirmación pronto.")
    setFormCita({ tipo: "", fecha: "", hora: "", observaciones: "" })
  }

  const actualizarPerfil = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formPerfil) return

    if (!formPerfil.nombre.trim()) {
      alert("⚠️ El nombre no puede estar vacío")
      return
    }

    if (!validarEmail(formPerfil.email)) {
      alert("⚠️ Debe usar un correo de Gmail (@gmail.com)")
      return
    }

    const nuevosUsuarios = usuarios.map((u) => (u.cedula === formPerfil.cedula ? formPerfil : u))
    setUsuarios(nuevosUsuarios)
    localStorage.setItem("bienestar_usuarios", JSON.stringify(nuevosUsuarios))
    localStorage.setItem("bienestar_sesion", JSON.stringify(formPerfil))
    setUsuarioActual(formPerfil)

    alert("✅ Perfil actualizado exitosamente")
  }

  const obtenerTipoCitaTexto = (tipo: string) => {
    const tipos = {
      "medicina-general": "Medicina General",
      "examenes-sangre": "Exámenes de Sangre",
      psicologia: "Psicología",
    }
    return tipos[tipo as keyof typeof tipos] || tipo
  }

  const obtenerColorEstado = (estado: string) => {
    const colores = {
      pendiente: "bg-yellow-100 text-yellow-800",
      confirmada: "bg-blue-100 text-blue-800",
      cancelada: "bg-red-100 text-red-800",
      completada: "bg-green-100 text-green-800",
    }
    return colores[estado as keyof typeof colores] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b header-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3 animate-fade-in-left">
              <Heart className="h-8 w-8 text-blue-600 icon-hover-effect" />
              <div className="flex items-center gap-3">
                <img
                  src={usuarioActual?.foto || "/placeholder.svg?height=40&width=40&query=usuario perfil"}
                  alt="Foto de perfil"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 profile-photo-effect"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Panel de Estudiante</h1>
                  <p className="text-gray-600">Bienvenido, {usuarioActual?.nombre}</p>
                </div>
              </div>
            </div>
            <Button
              onClick={cerrarSesion}
              variant="outline"
              className="flex items-center gap-2 bg-transparent btn-hover-effect"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2 animate-fade-in-left">
            <Button
              variant={subVista === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start sidebar-item-effect"
              onClick={() => setSubVista("dashboard")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Panel Principal
            </Button>
            <Button
              variant={subVista === "solicitar" ? "default" : "ghost"}
              className="w-full justify-start sidebar-item-effect"
              onClick={() => setSubVista("solicitar")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Solicitar Cita
            </Button>
            <Button
              variant={subVista === "historial" ? "default" : "ghost"}
              className="w-full justify-start sidebar-item-effect"
              onClick={() => setSubVista("historial")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Historial de Citas
            </Button>
            <Button
              variant={subVista === "perfil" ? "default" : "ghost"}
              className="w-full justify-start sidebar-item-effect"
              onClick={() => {
                setSubVista("perfil")
                setFormPerfil(usuarioActual)
                setPreviewFoto("")
              }}
            >
              <Settings className="h-4 w-4 mr-2" />
              Mi Perfil
            </Button>
          </div>

          {/* Contenido Principal */}
          <div className="flex-1 animate-fade-in-right">
            {subVista === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="stat-card-effect">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Citas Pendientes</CardTitle>
                      <AlertCircle className="h-4 w-4 text-yellow-600 icon-hover-effect" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold stat-number">
                        {citasEstudiante.filter((c) => c.estado === "pendiente").length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="stat-card-effect">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Citas Confirmadas</CardTitle>
                      <CheckCircle className="h-4 w-4 text-blue-600 icon-hover-effect" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold stat-number">
                        {citasEstudiante.filter((c) => c.estado === "confirmada").length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="stat-card-effect">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total de Citas</CardTitle>
                      <Calendar className="h-4 w-4 text-green-600 icon-hover-effect" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold stat-number">{citasEstudiante.length}</div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="card-hover-effect">
                  <CardHeader>
                    <CardTitle>Próximas Citas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {citasEstudiante
                        .filter((c) => c.estado === "confirmada" || c.estado === "pendiente")
                        .slice(0, 3)
                        .map((cita) => (
                          <div
                            key={cita.id}
                            className="flex items-center justify-between p-4 border rounded-lg list-item-effect"
                          >
                            <div>
                              <h4 className="font-medium">{obtenerTipoCitaTexto(cita.tipo)}</h4>
                              <p className="text-sm text-gray-600">
                                {cita.fecha} - {cita.hora}
                              </p>
                              <p className="text-sm text-gray-600">Dr. {cita.doctor}</p>
                            </div>
                            <Badge className={`${obtenerColorEstado(cita.estado)} badge-hover-effect`}>
                              {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                            </Badge>
                          </div>
                        ))}
                      {citasEstudiante.filter((c) => c.estado === "confirmada" || c.estado === "pendiente").length ===
                        0 && <p className="text-gray-500 text-center py-4">No tienes citas próximas</p>}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {subVista === "solicitar" && (
              <Card className="card-hover-effect">
                <CardHeader>
                  <CardTitle>Solicitar Nueva Cita</CardTitle>
                  <CardDescription>Complete el formulario para solicitar una cita médica</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={solicitarCita} className="space-y-4">
                    <div className="form-group-effect">
                      <Label htmlFor="tipo">Tipo de Cita *</Label>
                      <Select
                        value={formCita.tipo}
                        onValueChange={(value) => setFormCita({ ...formCita, tipo: value })}
                      >
                        <SelectTrigger className="focus-ring">
                          <SelectValue placeholder="Seleccione el tipo de cita" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medicina-general" className="dropdown-item-effect">
                            🩺 Medicina General
                          </SelectItem>
                          <SelectItem value="examenes-sangre" className="dropdown-item-effect">
                            🧪 Exámenes de Sangre
                          </SelectItem>
                          <SelectItem value="psicologia" className="dropdown-item-effect">
                            🧠 Psicología
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group-effect">
                        <Label htmlFor="fecha">Fecha *</Label>
                        <Input
                          id="fecha"
                          type="date"
                          value={formCita.fecha}
                          onChange={(e) => setFormCita({ ...formCita, fecha: e.target.value })}
                          min={new Date().toISOString().split("T")[0]}
                          className="input-focus-effect focus-ring"
                        />
                      </div>
                      <div className="form-group-effect">
                        <Label htmlFor="hora">Hora *</Label>
                        <Select
                          value={formCita.hora}
                          onValueChange={(value) => setFormCita({ ...formCita, hora: value })}
                        >
                          <SelectTrigger className="focus-ring">
                            <SelectValue placeholder="Seleccione la hora" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="08:00" className="dropdown-item-effect">
                              08:00 AM
                            </SelectItem>
                            <SelectItem value="09:00" className="dropdown-item-effect">
                              09:00 AM
                            </SelectItem>
                            <SelectItem value="10:00" className="dropdown-item-effect">
                              10:00 AM
                            </SelectItem>
                            <SelectItem value="11:00" className="dropdown-item-effect">
                              11:00 AM
                            </SelectItem>
                            <SelectItem value="14:00" className="dropdown-item-effect">
                              02:00 PM
                            </SelectItem>
                            <SelectItem value="15:00" className="dropdown-item-effect">
                              03:00 PM
                            </SelectItem>
                            <SelectItem value="16:00" className="dropdown-item-effect">
                              04:00 PM
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="form-group-effect">
                      <Label htmlFor="observaciones">Observaciones</Label>
                      <Textarea
                        id="observaciones"
                        placeholder="Describa brevemente el motivo de la cita (opcional)"
                        value={formCita.observaciones}
                        onChange={(e) => setFormCita({ ...formCita, observaciones: e.target.value })}
                        className="input-focus-effect focus-ring"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 btn-hover-effect ripple-effect"
                    >
                      Solicitar Cita
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {subVista === "historial" && (
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Citas</CardTitle>
                  <CardDescription>Todas sus citas médicas registradas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {citasEstudiante.map((cita) => (
                      <div key={cita.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-lg">{obtenerTipoCitaTexto(cita.tipo)}</h4>
                            <p className="text-gray-600">Dr. {cita.doctor}</p>
                          </div>
                          <Badge className={obtenerColorEstado(cita.estado)}>
                            {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <strong>Fecha:</strong> {cita.fecha}
                          </div>
                          <div>
                            <strong>Hora:</strong> {cita.hora}
                          </div>
                        </div>
                        {cita.observaciones && (
                          <div className="mt-2">
                            <strong className="text-sm">Observaciones:</strong>
                            <p className="text-sm text-gray-600">{cita.observaciones}</p>
                          </div>
                        )}
                      </div>
                    ))}
                    {citasEstudiante.length === 0 && (
                      <p className="text-gray-500 text-center py-8">No tienes citas registradas</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {subVista === "perfil" && formPerfil && (
              <Card>
                <CardHeader>
                  <CardTitle>Mi Perfil</CardTitle>
                  <CardDescription>Actualice su información personal</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={actualizarPerfil} className="space-y-4">
                    {/* Foto de Perfil */}
                    <div className="text-center">
                      <Label className="text-lg font-semibold text-gray-700">Foto de Perfil</Label>
                      <div className="mt-2 flex flex-col items-center">
                        {previewFoto || formPerfil.foto ? (
                          <div className="relative">
                            <img
                              src={previewFoto || formPerfil.foto}
                              alt="Foto de perfil"
                              className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
                            />
                            <button
                              type="button"
                              onClick={eliminarFoto}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                            <Upload className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                        <Input type="file" accept="image/*" onChange={manejarCambioFoto} className="mt-2 max-w-xs" />
                        <p className="text-xs text-gray-500 mt-1">Máximo 2MB - JPG, PNG, GIF</p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cedula">Cédula</Label>
                      <Input id="cedula" type="text" value={formPerfil.cedula} disabled className="bg-gray-100" />
                    </div>

                    <div>
                      <Label htmlFor="nombre">Nombre Completo</Label>
                      <Input
                        id="nombre"
                        type="text"
                        value={formPerfil.nombre}
                        onChange={(e) => setFormPerfil({ ...formPerfil, nombre: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email (Gmail)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formPerfil.email}
                        onChange={(e) => setFormPerfil({ ...formPerfil, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        type="tel"
                        value={formPerfil.telefono || ""}
                        onChange={(e) => setFormPerfil({ ...formPerfil, telefono: e.target.value })}
                      />
                    </div>

                    {formPerfil.tipo === "estudiante" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="carrera">Carrera</Label>
                          <Input
                            id="carrera"
                            type="text"
                            value={formPerfil.carrera || ""}
                            onChange={(e) => setFormPerfil({ ...formPerfil, carrera: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="semestre">Semestre</Label>
                          <Input
                            id="semestre"
                            type="text"
                            value={formPerfil.semestre || ""}
                            onChange={(e) => setFormPerfil({ ...formPerfil, semestre: e.target.value })}
                          />
                        </div>
                      </div>
                    )}

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Actualizar Perfil
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
