
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";

const SystemClassDiagram = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Diagrama de Clases del Sistema</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Estructura del Sistema</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <div className="border border-gray-300 p-4 bg-white rounded-lg">
                <pre className="text-xs">
                  {`+-----------------------------------------------------------+
|                       Application (App)                      |
+-----------------------------------------------------------+
| Routes: Home, Login, SolicitarSoporte, EstadoSolicitud,   |
|         Contacto, EmpleadoDashboard, TecnicoDashboard,    |
|         AdminDashboard, NotFound                          |
+-----------------------------------------------------------+
                              |
              +---------------+---------------+
              |               |               |
+-------------v-----+ +-------v-------+ +-----v-----------+
|      Pages        | |  Components   | |  Shared UI      |
+-------------------+ +---------------+ +-----------------+
| - Home            | | - Layout      | | - Button        |
| - Login           | | - Navbar      | | - Card          |
| - SolicitarSoporte| | - Footer      | | - Input         |
| - EstadoSolicitud | | - Logo        | | - Select        |
| - Contacto        | |               | | - Alert         |
| - EmpleadoDashboard| |              | | - Badge         |
| - TecnicoDashboard| |               | | - Calendar      |
| - AdminDashboard  | |               | | - Avatar        |
| - NotFound        | |               | | - ...           |
+-------------------+ +---------------+ +-----------------+`}
                </pre>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Modelo de Datos (Conceptual)</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <div className="border border-gray-300 p-4 bg-white rounded-lg">
                <pre className="text-xs">
                  {`+-------------------+       +-------------------+
|      Usuario      |       |     Solicitud     |
+-------------------+       +-------------------+
| id: string        |<----->| id: string        |
| nombre: string    |       | descripcion: string|
| rol: string       |       | estado: string    |
| contraseña: string|       | prioridad: string |
| email: string     |       | fecha: Date       |
+-------------------+       | idUsuario: string |
         ^                  | idTecnico: string |
         |                  +-------------------+
         |                          |
+-------------------+               |
|       Rol         |               |
+-------------------+               v
| ADMIN             |       +-------------------+
| TECNICO           |       |    Comentario     |
| EMPLEADO          |       +-------------------+
+-------------------+       | id: string        |
                           | texto: string      |
                           | fecha: Date        |
                           | idUsuario: string  |
                           | idSolicitud: string|
                           +-------------------+`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Diagrama de Clases Detallado</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <div className="border border-gray-300 p-4 bg-white rounded-lg">
                <pre className="text-xs">
                  {`+----------------------+       +----------------------+       +----------------------+
|       Usuario        |       |      Solicitud      |       |      Comentario     |
+----------------------+       +----------------------+       +----------------------+
| -id: string          |       | -id: string          |       | -id: string          |
| -nombre: string      |       | -descripcion: string |       | -texto: string       |
| -apellido: string    |       | -departamento: string|       | -fecha: Date         |
| -email: string       |<----->| -estado: string      |<----->| -idUsuario: string   |
| -contraseña: string  |       | -prioridad: string   |       | -idSolicitud: string |
| -rol: string         |       | -fechaCreacion: Date |       +----------------------+
| -departamento: string|       | -fechaActualiz: Date |               ^
+----------------------+       | -idUsuario: string   |               |
| +login(): boolean    |       | -idTecnico: string   |               |
| +logout(): void      |       +----------------------+               |
| +resetPassword(): bool|       | +crear(): string     |               |
+----------------------+       | +actualizar(): bool  |               |
          ^                    | +cancelar(): bool    |               |
          |                    | +asignar(): bool     |               |
          |                    +----------------------+               |
          |                              ^                            |
+---------+----------+                   |                            |
|                    |                   |                            |
+------------+     +-+----------+     +--+----------+                 |
|   Admin    |     |  Tecnico   |     |  Empleado   |                 |
+------------+     +------------+     +------------+                 |
| -permisos  |     | -habilidades|     |            |                 |
+------------+     +------------+     +------------+                 |
| +gestionarUs|     | +resolverSol|     | +crearSolic |                 |
| +verReportes|     | +comentarSol|     | +verEstadoS |                 |
| +asignarTec |     | +actualEstado|    | +comentarSol|---------------->+
+------------+     +------------+     +------------+`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Diagrama de Arquitectura MVC</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <div className="border border-gray-300 p-4 bg-white rounded-lg">
                <pre className="text-xs">
                  {`+-------------------+       +-------------------+       +-------------------+
|      MODELO       |       |    CONTROLADOR    |       |       VISTA       |
+-------------------+       +-------------------+       +-------------------+
| UsuarioModel      |<----->| UsuarioController |<----->| Login             |
| SolicitudModel    |       | SolicitudController|      | AdminDashboard    |
| ComentarioModel   |       | ComentarioController|     | TecnicoDashboard  |
| DepartamentoModel |       | AuthController    |       | EmpleadoDashboard |
+-------------------+       +-------------------+       | SolicitarSoporte  |
         ^                          ^                   | EstadoSolicitud   |
         |                          |                   | Home              |
         v                          v                   | Contacto          |
+-------------------+       +-------------------+       | NotFound          |
|     DATABASE      |       |     SERVICIOS     |       +-------------------+
+-------------------+       +-------------------+               ^
| MySQL             |<----->| AuthService       |               |
| - usuarios        |       | SolicitudService  |               |
| - solicitudes     |       | NotificacionService|              |
| - comentarios     |       | ReporteService    |               |
| - departamentos   |       +-------------------+               |
+-------------------+                                           |
                                                                |
                    +-------------------+                       |
                    |    COMPONENTES    |                       |
                    +-------------------+                       |
                    | Layout            |                       |
                    | Navbar            |-----------------------+
                    | Footer            |
                    | Form Components   |
                    | UI Components     |
                    +-------------------+`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SystemClassDiagram;
