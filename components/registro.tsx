"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Upload, X } from "lucide-react"
import { validarCamposRegistro } from "@/utils/validaciones"
import type { Usuario } from "@/app/page"

interface RegistroProps {
  setVista: (vista: string) => void
  usuarios: Usuario[]
  setUsuarios: (usuarios: Usuario[]) => void
}

export default function Registro({ setVista, usuarios, setUsuarios }: RegistroProps) {
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
    foto: "",
  })

  const [previewFoto, setPreviewFoto] = useState<string>("")

  const manejarCambioFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar tamaño (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("⚠️ La imagen debe ser menor a 2MB")
        return
      }

      // Validar tipo
      if (!file.type.startsWith("image/")) {
        alert("⚠️ Solo se permiten archivos de imagen")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        setFormRegistro({ ...formRegistro, foto: base64 })
        setPreviewFoto(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const eliminarFoto = () => {
    setFormRegistro({ ...formRegistro, foto: "" })
    setPreviewFoto("")
  }

  const manejarRegistro = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validarCamposRegistro(formRegistro, usuarios)) return

    const nuevoUsuario: Usuario = {
      cedula: formRegistro.cedula,
      nombre: formRegistro.nombre,
      email: formRegistro.email,
      tipo: formRegistro.tipo as "estudiante" | "funcionario",
      telefono: formRegistro.telefono,
      carrera: formRegistro.carrera,
      semestre: formRegistro.semestre,
      password: formRegistro.password,
      foto: formRegistro.foto || "/placeholder.svg?height=100&width=100",
    }

    const nuevosUsuarios = [...usuarios, nuevoUsuario]
    setUsuarios(nuevosUsuarios)
    localStorage.setItem("bienestar_usuarios", JSON.stringify(nuevosUsuarios))

    alert("✅ ¡Usuario registrado exitosamente!\nYa puede iniciar sesión con sus credenciales.")
    setVista("login")
    setFormRegistro({
      cedula: "",
      nombre: "",
      email: "",
      password: "",
      confirmPassword: "",
      tipo: "",
      telefono: "",
      carrera: "",
      semestre: "",
      foto: "",
    })
    setPreviewFoto("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-10 w-10 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-800">Registro de Usuario</CardTitle>
          <CardDescription>Complete el formulario para crear su cuenta en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={manejarRegistro} className="space-y-4">
            {/* Foto de Perfil */}
            <div className="text-center">
              <Label className="text-lg font-semibold text-gray-700">Foto de Perfil</Label>
              <div className="mt-2 flex flex-col items-center">
                {previewFoto ? (
                  <div className="relative">
                    <img
                      src={previewFoto || "/placeholder.svg"}
                      alt="Preview"
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

            {/* Tipo de Usuario - Destacado */}
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <Label htmlFor="tipo" className="text-lg font-semibold text-blue-800">
                Tipo de Usuario *
              </Label>
              <Select
                value={formRegistro.tipo}
                onValueChange={(value) => setFormRegistro({ ...formRegistro, tipo: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Seleccione su tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="estudiante">👨‍🎓 Estudiante</SelectItem>
                  <SelectItem value="funcionario">👨‍⚕️ Funcionario de Salud</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cedula">Cédula *</Label>
                <Input
                  id="cedula"
                  type="text"
                  placeholder="1234567890 (10 dígitos)"
                  value={formRegistro.cedula}
                  onChange={(e) => setFormRegistro({ ...formRegistro, cedula: e.target.value })}
                  maxLength={10}
                />
              </div>
              <div>
                <Label htmlFor="nombre">Nombre Completo *</Label>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Ingrese su nombre completo"
                  value={formRegistro.nombre}
                  onChange={(e) => setFormRegistro({ ...formRegistro, nombre: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Correo Electrónico (Gmail) *</Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@gmail.com"
                value={formRegistro.email}
                onChange={(e) => setFormRegistro({ ...formRegistro, email: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                type="tel"
                placeholder="3001234567"
                value={formRegistro.telefono}
                onChange={(e) => setFormRegistro({ ...formRegistro, telefono: e.target.value })}
              />
            </div>

            {formRegistro.tipo === "estudiante" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-green-50 p-4 rounded-lg">
                <div>
                  <Label htmlFor="carrera">Carrera</Label>
                  <Input
                    id="carrera"
                    type="text"
                    placeholder="Ej: Ingeniería de Sistemas"
                    value={formRegistro.carrera}
                    onChange={(e) => setFormRegistro({ ...formRegistro, carrera: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="semestre">Semestre</Label>
                  <Input
                    id="semestre"
                    type="text"
                    placeholder="Ej: 8"
                    value={formRegistro.semestre}
                    onChange={(e) => setFormRegistro({ ...formRegistro, semestre: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Contraseña *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formRegistro.password}
                  onChange={(e) => setFormRegistro({ ...formRegistro, password: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repita la contraseña"
                  value={formRegistro.confirmPassword}
                  onChange={(e) => setFormRegistro({ ...formRegistro, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Registrarse
            </Button>
          </form>
          <div className="mt-6 text-center space-y-2">
            <Button variant="link" onClick={() => setVista("login")} className="text-blue-600">
              ¿Ya tienes cuenta? Inicia sesión aquí
            </Button>
            <br />
            <Button variant="link" onClick={() => setVista("bienvenida")} className="text-gray-600">
              ← Volver al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
