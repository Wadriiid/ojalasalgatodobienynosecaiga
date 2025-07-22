"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"
import { validarCamposLogin } from "@/utils/validaciones"
import { obtenerInfoUsuariosPrueba } from "@/utils/datos-iniciales"
import type { Usuario } from "@/app/page"

interface LoginProps {
  setVista: (vista: string) => void
  setUsuarioActual: (usuario: Usuario) => void
  usuarios: Usuario[]
}

export default function Login({ setVista, setUsuarioActual, usuarios }: LoginProps) {
  const [formLogin, setFormLogin] = useState({ email: "", password: "" })
  const infoUsuarios = obtenerInfoUsuariosPrueba()

  const manejarLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validarCamposLogin(formLogin)) return

    const usuario = usuarios.find((u) => u.email === formLogin.email)
    if (!usuario) {
      alert("❌ Usuario no encontrado. Verifique su correo electrónico.")
      return
    }

    if (usuario.password !== formLogin.password) {
      alert("❌ Contraseña incorrecta. Intente nuevamente.")
      return
    }

    setUsuarioActual(usuario)
    localStorage.setItem("bienestar_sesion", JSON.stringify(usuario))
    setVista(usuario.tipo)

    // Alerta de inicio de sesión exitoso
    alert(`✅ ¡Bienvenido ${usuario.nombre}!\nHa iniciado sesión exitosamente.`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-scale-in card-hover-effect">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-10 w-10 text-blue-600 animate-pulse-slow" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-800">Iniciar Sesión</CardTitle>
          <CardDescription>Ingrese sus credenciales para acceder al sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={manejarLogin} className="space-y-4">
            <div className="form-group-effect">
              <Label htmlFor="email">Correo Electrónico (Gmail)</Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@gmail.com"
                value={formLogin.email}
                onChange={(e) => setFormLogin({ ...formLogin, email: e.target.value })}
                className="mt-1 input-focus-effect focus-ring"
              />
            </div>
            <div className="form-group-effect">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingrese su contraseña"
                value={formLogin.password}
                onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
                className="mt-1 input-focus-effect focus-ring"
              />
            </div>

            <div className="bg-blue-50 p-3 rounded-lg text-sm animate-fade-in-up">
              <p className="font-medium text-blue-800 mb-1">Usuarios de Prueba:</p>
              <p className="text-blue-700">📚 Estudiante: {infoUsuarios.estudiante.email}</p>
              <p className="text-blue-700">👨‍⚕️ Funcionario: {infoUsuarios.funcionario.email}</p>
              <p className="text-blue-700">🔑 Contraseña: {infoUsuarios.estudiante.password}</p>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 btn-hover-effect ripple-effect">
              Iniciar Sesión
            </Button>
          </form>
          <div className="mt-6 text-center space-y-2">
            <Button variant="link" onClick={() => setVista("registro")} className="text-blue-600 link-hover-effect">
              ¿No tienes cuenta? Regístrate aquí
            </Button>
            <br />
            <Button variant="link" onClick={() => setVista("bienvenida")} className="text-gray-600 link-hover-effect">
              ← Volver al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
