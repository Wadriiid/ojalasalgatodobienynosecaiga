"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Calendar, FileText, Shield, Users, Clock } from "lucide-react"
import { obtenerInfoUsuariosPrueba, obtenerEstadisticasIniciales } from "@/utils/datos-iniciales"

interface BienvenidaProps {
  setVista: (vista: string) => void
}

export default function Bienvenida({ setVista }: BienvenidaProps) {
  const infoUsuarios = obtenerInfoUsuariosPrueba()
  const estadisticas = obtenerEstadisticasIniciales()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b header-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center animate-fade-in-up">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Heart className="h-12 w-12 text-blue-600 animate-pulse-slow" />
              <h1 className="text-4xl font-bold text-gray-900">Sistema de Bienestar Universitario</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plataforma integral para la gestión de servicios médicos y bienestar estudiantil
            </p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tu Salud y Bienestar son Nuestra Prioridad</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Accede fácilmente a servicios médicos, programa citas y mantén un seguimiento completo de tu historial de
              salud universitario.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setVista("login")}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 btn-hover-effect ripple-effect"
              >
                Iniciar Sesión
              </Button>
              <Button
                onClick={() => setVista("registro")}
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 btn-hover-effect ripple-effect"
              >
                Registrarse
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-6 card-hover-effect animate-fade-in-left">
              <CardHeader>
                <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4 icon-hover-effect" />
                <CardTitle className="text-xl">Gestión de Citas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Programa citas médicas de manera rápida y sencilla. Medicina general, psicología y exámenes de
                  laboratorio.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 card-hover-effect animate-fade-in-up">
              <CardHeader>
                <FileText className="h-12 w-12 text-green-600 mx-auto mb-4 icon-hover-effect" />
                <CardTitle className="text-xl">Historial Médico</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Mantén un registro completo de todas tus consultas médicas y seguimiento de tratamientos.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 card-hover-effect animate-fade-in-right">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4 icon-hover-effect" />
                <CardTitle className="text-xl">Seguridad y Privacidad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tus datos médicos están protegidos con los más altos estándares de seguridad y confidencialidad.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="bg-blue-600 rounded-2xl p-8 text-white animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="stat-card-effect p-4 rounded-lg">
                <Users className="h-8 w-8 mx-auto mb-2 animate-bounce-slow" />
                <div className="text-3xl font-bold stat-number">{estadisticas.totalEstudiantes}+</div>
                <div className="text-blue-100">Estudiantes Atendidos</div>
              </div>
              <div className="stat-card-effect p-4 rounded-lg">
                <Clock className="h-8 w-8 mx-auto mb-2 animate-bounce-slow" />
                <div className="text-3xl font-bold stat-number">{estadisticas.disponibilidad}</div>
                <div className="text-blue-100">Disponibilidad Online</div>
              </div>
              <div className="stat-card-effect p-4 rounded-lg">
                <Heart className="h-8 w-8 mx-auto mb-2 animate-bounce-slow" />
                <div className="text-3xl font-bold stat-number">{estadisticas.satisfaccion}</div>
                <div className="text-blue-100">Satisfacción Estudiantil</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 footer-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            © 2024 Sistema de Bienestar Universitario. Desarrollado para el bienestar estudiantil.
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-400">
              <strong>Usuarios de Prueba:</strong>
              <br />
              <span className="link-hover-effect">Estudiante: {infoUsuarios.estudiante.email}</span> |{" "}
              <span className="link-hover-effect">Funcionario: {infoUsuarios.funcionario.email}</span>
              <br />
              Contraseña: {infoUsuarios.estudiante.password}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
