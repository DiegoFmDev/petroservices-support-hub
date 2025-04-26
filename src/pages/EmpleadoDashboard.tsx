
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, FileCheck, FileClock, FileWarning, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Logo from "@/components/Logo";
import { Separator } from "@/components/ui/separator";

const EmpleadoDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Mock data for employee requests
  const [solicitudes, setSolicitudes] = useState([
    {
      id: "SOL-2023-001",
      fecha: "2023-04-20 10:15",
      estado: "finalizado",
      problema: "El monitor no enciende",
      prioridad: "alta",
      tecnico: "Carlos Ramírez",
      solucion: "Se reemplazó el cable de alimentación del monitor"
    },
    {
      id: "SOL-2023-002",
      fecha: "2023-04-22 14:30",
      estado: "en-proceso",
      problema: "No puedo acceder al sistema de inventario",
      prioridad: "media",
      tecnico: "Ana Rodríguez"
    },
    {
      id: "SOL-2023-003",
      fecha: "2023-04-25 09:45",
      estado: "pendiente",
      problema: "La impresora no funciona correctamente",
      prioridad: "baja"
    }
  ]);

  useEffect(() => {
    // Check if user is logged in and has correct role
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === "empleado") {
        setUser(parsedUser);
      }
    }
    setLoading(false);
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleNuevaSolicitud = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Solicitud creada",
      description: "Su solicitud de soporte ha sido creada exitosamente.",
    });
    
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          <Logo />
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">Empleado</p>
              <p className="text-sm text-gray-600">{user.name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>Cerrar sesión</Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Panel de Empleado</h1>
          
          <Tabs defaultValue="solicitudes">
            <TabsList className="mb-8">
              <TabsTrigger value="solicitudes">Mis Solicitudes</TabsTrigger>
              <TabsTrigger value="nueva">Nueva Solicitud</TabsTrigger>
            </TabsList>
            
            <TabsContent value="solicitudes">
              <div className="grid gap-4">
                {solicitudes.length > 0 ? (
                  solicitudes.map((solicitud) => (
                    <Card key={solicitud.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-2 md:mb-0">
                            <h3 className="font-semibold">{solicitud.id}</h3>
                            <p className="text-sm text-gray-500">{solicitud.fecha}</p>
                          </div>
                          <Badge className={getStatusColor(solicitud.estado)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(solicitud.estado)}
                              <span>{getStatusText(solicitud.estado)}</span>
                            </div>
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Problema</h4>
                            <p>{solicitud.problema}</p>
                          </div>
                          
                          <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Prioridad</h4>
                              <p className="capitalize">{solicitud.prioridad}</p>
                            </div>
                            
                            {solicitud.tecnico && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Técnico asignado</h4>
                                <p>{solicitud.tecnico}</p>
                              </div>
                            )}
                          </div>
                          
                          {solicitud.solucion && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Solución</h4>
                              <p>{solicitud.solucion}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-gray-500">No tiene solicitudes registradas.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="nueva">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" /> 
                    Nueva Solicitud de Soporte
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNuevaSolicitud} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="problema">Descripción del problema</Label>
                      <Textarea
                        id="problema"
                        placeholder="Describa detalladamente el problema que está experimentando"
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ubicacion">Ubicación</Label>
                        <Input
                          id="ubicacion"
                          placeholder="Edificio, piso, oficina, etc."
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono de contacto</Label>
                        <Input
                          id="telefono"
                          placeholder="Extensión o número celular"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="prioridad">Prioridad</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione el nivel de prioridad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baja">Baja</SelectItem>
                          <SelectItem value="media">Media</SelectItem>
                          <SelectItem value="alta">Alta</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">
                        Alta: Sistema caído o problema que impide trabajar.
                        Media: Funcionamiento limitado pero permite trabajar.
                        Baja: Inconveniente menor que no afecta el trabajo diario.
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-petroblue-600 hover:bg-petroblue-700"
                      >
                        Enviar Solicitud
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmpleadoDashboard;
