"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  FileText,
  Settings,
  LogOut,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Heart,
  Upload,
  X,
} from "lucide-react"
import { validarEmail } from "@/utils/validaciones"
import type { Usuario, Cita } from "@/app/page"
import {
  formatearFecha,
  formatearHora,
  formatearFechaHora,
  obtenerEstadoFecha,
  tiempoHastaCita,
  ordenarCitasPorFecha,
} from "@/utils/fechas"

interface InterfazFuncionarioProps {
  setVista: (vista: string) => void
  usuarioActual: Usuario | null
  setUsuarioActual: (usuario: Usuario) => void
  usuarios: Usuario[]
  setUsuarios: (usuarios: Usuario[]) => void
  citas: Cita[]
  setCitas: (citas: Cita[]) => void
}

export default function InterfazFuncionario({
  setVista,
  usuarioActual,
  setUsuarioActual,
  usuarios,
  setUsuarios,
  citas,
  setCitas,
}: InterfazFuncionarioProps) {
  const [subVista, setSubVista] = useState<string>("dashboard")
  const [formPerfil, setFormPerfil] = useState<Usuario | null>(usuarioActual)
  const [previewFoto, setPreviewFoto] = useState<string>("")

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

  const cambiarEstadoCita = (citaId: string, nuevoEstado: Cita["estado"]) => {
    const nuevasCitas = citas.map((cita) => (cita.id === citaId ? { ...cita, estado: nuevoEstado } : cita))
    setCitas(nuevasCitas)
    localStorage.setItem("bienestar_citas", JSON.stringify(nuevasCitas))

    const mensajes = {
      confirmada: "✅ Cita confirmada exitosamente",
      cancelada: "❌ Cita cancelada",
      completada: "✅ Cita marcada como completada",
    }
    alert(mensajes[nuevoEstado] || `Cita ${nuevoEstado} exitosamente`)
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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-blue-600" />
              <div className="flex items-center gap-3">
                <img
                  src={usuarioActual?.foto || "/placeholder.svg?height=40&width=40&query=usuario perfil"}
                  alt="Foto de perfil"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Panel de Funcionario</h1>
                  <p className="text-gray-600">Bienvenido, {usuarioActual?.nombre}</p>
                </div>
              </div>
            </div>
            <Button onClick={cerrarSesion} variant="outline" className="flex items-center gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            <Button
              variant={subVista === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSubVista("dashboard")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Panel Principal
            </Button>
            <Button
              variant={subVista === "gestionar" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSubVista("gestionar")}
            >
              <Edit className="h-4 w-4 mr-2" />
              Gestionar Citas
            </Button>
            <Button
              variant={subVista === "historial" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSubVista("historial")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Historial de Citas
            </Button>
            <Button
              variant={subVista === "perfil" ? "default" : "ghost"}
              className="w-full justify-start"
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
          <div className="flex-1">
            {subVista === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{citas.filter((c) => c.estado === "pendiente").length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{citas.filter((c) => c.estado === "confirmada").length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Canceladas</CardTitle>
                      <XCircle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{citas.filter((c) => c.estado === "cancelada").length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total</CardTitle>
                      <Calendar className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{citas.length}</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Citas Recientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {ordenarCitasPorFecha(citas)
                        .slice(0, 5)
                        .map((cita) => (
                          <div key={cita.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{cita.estudianteNombre}</h4>
                              <p className="text-sm text-gray-600">{obtenerTipoCitaTexto(cita.tipo)}</p>
                              <p className="text-sm text-gray-600">{formatearFechaHora(cita.fecha, cita.hora)}</p>
                              <p className="text-sm text-blue-600 font-medium">
                                {tiempoHastaCita(cita.fecha, cita.hora)}
                              </p>
                            </div>
                            <Badge className={obtenerColorEstado(cita.estado)}>
                              {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {subVista === "gestionar" && (
              <Card>
                <CardHeader>
                  <CardTitle>Gestionar Citas</CardTitle>
                  <CardDescription>Confirme, cancele o aplace las citas médicas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ordenarCitasPorFecha(citas).map((cita) => (
                      <div key={cita.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-medium text-lg">{cita.estudianteNombre}</h4>
                            <p className="text-gray-600">{obtenerTipoCitaTexto(cita.tipo)}</p>
                            <p className="text-sm text-gray-600">{formatearFechaHora(cita.fecha, cita.hora)}</p>
                            <p className="text-sm text-blue-600 font-medium">{obtenerEstadoFecha(cita.fecha)}</p>
                            <p className="text-sm text-gray-600">Dr. {cita.doctor}</p>
                          </div>
                          <Badge className={obtenerColorEstado(cita.estado)}>
                            {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                          </Badge>
                        </div>

                        {cita.observaciones && (
                          <div className="mb-4">
                            <strong className="text-sm">Observaciones:</strong>
                            <p className="text-sm text-gray-600">{cita.observaciones}</p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          {cita.estado === "pendiente" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => cambiarEstadoCita(cita.id, "confirmada")}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Confirmar
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => cambiarEstadoCita(cita.id, "cancelada")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Cancelar
                              </Button>
                            </>
                          )}
                          {cita.estado === "confirmada" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => cambiarEstadoCita(cita.id, "completada")}
                                className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                              >
                                Marcar Completada
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => cambiarEstadoCita(cita.id, "cancelada")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Cancelar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    {citas.length === 0 && <p className="text-gray-500 text-center py-8">No hay citas registradas</p>}
                  </div>
                </CardContent>
              </Card>
            )}

            {subVista === "historial" && (
              <Card>
                <CardHeader>
                  <CardTitle>Historial Completo de Citas</CardTitle>
                  <CardDescription>Todas las citas médicas del sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ordenarCitasPorFecha(citas).map((cita) => (
                      <div key={cita.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-lg">{cita.estudianteNombre}</h4>
                            <p className="text-gray-600">{obtenerTipoCitaTexto(cita.tipo)}</p>
                            <p className="text-sm text-gray-600">Dr. {cita.doctor}</p>
                          </div>
                          <Badge className={obtenerColorEstado(cita.estado)}>
                            {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <strong>Fecha:</strong> {formatearFecha(cita.fecha)}
                          </div>
                          <div>
                            <strong>Hora:</strong> {formatearHora(cita.hora)}
                          </div>
                        </div>
                        <div className="text-sm text-blue-600 font-medium mt-1">{obtenerEstadoFecha(cita.fecha)}</div>
                        {cita.observaciones && (
                          <div className="mt-2">
                            <strong className="text-sm">Observaciones:</strong>
                            <p className="text-sm text-gray-600">{cita.observaciones}</p>
                          </div>
                        )}
                      </div>
                    ))}
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
