
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Clock, FileCheck, FileClock, FileWarning } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const EstadoSolicitud = () => {
  const [codigo, setCodigo] = useState("");
  const [searching, setSearching] = useState(false);
  const [solicitud, setSolicitud] = useState<null | {
    id: string;
    fecha: string;
    estado: "pendiente" | "en-proceso" | "finalizado" | "rechazado";
    nombre: string;
    departamento: string;
    problema: string;
    prioridad: string;
    tecnico?: string;
    comentarios?: string[];
  }>(null);

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <Clock className="h-5 w-5" />;
      case "en-proceso":
        return <FileClock className="h-5 w-5" />;
      case "finalizado":
        return <FileCheck className="h-5 w-5" />;
      case "rechazado":
        return <FileWarning className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "en-proceso":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "finalizado":
        return "bg-green-100 text-green-800 border-green-200";
      case "rechazado":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "";
    }
  };

  const getStatusText = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "Pendiente";
      case "en-proceso":
        return "En Proceso";
      case "finalizado":
        return "Finalizado";
      case "rechazado":
        return "Rechazado";
      default:
        return "";
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      setSearching(false);
      
      if (codigo === "123456") {
        setSolicitud({
          id: "123456",
          fecha: "2023-04-25 09:23",
          estado: "finalizado",
          nombre: "Juan Pérez",
          departamento: "Producción",
          problema: "La computadora no enciende y presenta un ruido extraño al presionar el botón de encendido.",
          prioridad: "alta",
          tecnico: "Carlos Ramírez",
          comentarios: [
            "Se revisó la fuente de poder y se encontró un problema con el cable de alimentación",
            "Se reemplazó la fuente de poder por una nueva",
            "Se verificó el funcionamiento correcto del equipo"
          ]
        });
      } else if (codigo === "654321") {
        setSolicitud({
          id: "654321",
          fecha: "2023-04-26 11:05",
          estado: "en-proceso",
          nombre: "María López",
          departamento: "Administrativo",
          problema: "No puedo acceder al sistema de gestión documental, aparece error de autenticación.",
          prioridad: "media",
          tecnico: "Ana Rodríguez"
        });
      } else if (codigo === "789012") {
        setSolicitud({
          id: "789012",
          fecha: "2023-04-26 14:30",
          estado: "pendiente",
          nombre: "Pedro Gómez",
          departamento: "Finanzas",
          problema: "La impresora no funciona correctamente, las impresiones salen con líneas horizontales.",
          prioridad: "baja"
        });
      } else {
        // No results found
        setSolicitud(null);
      }
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Estado de Solicitud
          </h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Consultar solicitud</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                  <Label htmlFor="codigo" className="sr-only">
                    Código de solicitud
                  </Label>
                  <Input
                    id="codigo"
                    placeholder="Ingrese el código de su solicitud"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-petroblue-600 hover:bg-petroblue-700"
                  disabled={searching}
                >
                  {searching ? "Buscando..." : "Consultar"}
                </Button>
              </form>
              
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-500">
                  Ejemplos de códigos para probar: 123456, 654321, 789012
                </p>
              </div>
            </CardContent>
          </Card>

          {solicitud ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Solicitud #{solicitud.id}</CardTitle>
                  <Badge className={getStatusColor(solicitud.estado)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(solicitud.estado)}
                      <span>{getStatusText(solicitud.estado)}</span>
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Solicitante</h4>
                    <p className="font-medium">{solicitud.nombre}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Departamento</h4>
                    <p className="font-medium">{solicitud.departamento}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Fecha de solicitud</h4>
                    <p className="font-medium">{solicitud.fecha}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Prioridad</h4>
                    <p className="capitalize font-medium">{solicitud.prioridad}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Descripción del problema</h4>
                  <p>{solicitud.problema}</p>
                </div>
                
                {solicitud.tecnico && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Técnico asignado</h4>
                      <p>{solicitud.tecnico}</p>
                    </div>
                  </>
                )}
                
                {solicitud.comentarios && solicitud.comentarios.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Registro de actividades</h4>
                      <ul className="space-y-2">
                        {solicitud.comentarios.map((comentario, index) => (
                          <li key={index} className="p-2 bg-gray-50 rounded-md">
                            {comentario}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ) : (
            codigo && !searching && (
              <div className="text-center py-10">
                <p className="text-gray-600">
                  No se encontraron resultados para el código {codigo}. Por favor, verifique el código e intente nuevamente.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EstadoSolicitud;
