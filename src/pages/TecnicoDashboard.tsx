
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, FileCheck, FileClock, FileWarning, Tool } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Logo from "@/components/Logo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

const TecnicoDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // State for dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isResolveDialogOpen, setIsResolveDialogOpen] = useState(false);
  
  // Mock data for available requests
  const [solicitudesDisponibles, setSolicitudesDisponibles] = useState([
    {
      id: "SOL-2023-004",
      fecha: "2023-04-26 08:30",
      empleado: "Roberto Jiménez",
      departamento: "Ventas",
      problema: "No puedo acceder a mi correo electrónico corporativo",
      prioridad: "alta",
      ubicacion: "Edificio Principal, Piso 3, Oficina 305",
      telefono: "Ext. 2305"
    },
    {
      id: "SOL-2023-005",
      fecha: "2023-04-26 09:15",
      empleado: "Laura Sánchez",
      departamento: "Finanzas",
      problema: "Excel se cierra inesperadamente al abrir archivos grandes",
      prioridad: "media",
      ubicacion: "Edificio Principal, Piso 2, Oficina 210",
      telefono: "Ext. 1210"
    },
    {
      id: "SOL-2023-006",
      fecha: "2023-04-26 11:45",
      empleado: "Miguel Torres",
      departamento: "Operaciones",
      problema: "La impresora del departamento no imprime en color",
      prioridad: "baja",
      ubicacion: "Edificio Secundario, Piso 1, Área común",
      telefono: "Ext. 3105"
    }
  ]);
  
  // Mock data for accepted requests
  const [solicitudesAsignadas, setSolicitudesAsignadas] = useState([
    {
      id: "SOL-2023-002",
      fecha: "2023-04-22 14:30",
      empleado: "María López",
      departamento: "Administrativo",
      problema: "No puedo acceder al sistema de inventario",
      prioridad: "media",
      ubicacion: "Edificio Principal, Piso 1, Oficina 110",
      telefono: "Ext. 1110",
      estado: "en-proceso"
    }
  ]);

  useEffect(() => {
    // Check if user is logged in and has correct role
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === "tecnico") {
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

  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case "alta":
        return "text-red-600";
      case "media":
        return "text-yellow-600";
      case "baja":
        return "text-green-600";
      default:
        return "";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleViewDetails = (solicitud: any) => {
    setSelectedRequest(solicitud);
    setIsDialogOpen(true);
  };

  const handleAcceptRequest = () => {
    if (!selectedRequest) return;
    
    // Update the lists
    setSolicitudesDisponibles(solicitudesDisponibles.filter(s => s.id !== selectedRequest.id));
    
    const newAssignedRequest = {
      ...selectedRequest,
      estado: "en-proceso"
    };
    
    setSolicitudesAsignadas([...solicitudesAsignadas, newAssignedRequest]);
    
    // Close dialog and show toast
    setIsDialogOpen(false);
    setSelectedRequest(null);
    
    toast({
      title: "Solicitud aceptada",
      description: `La solicitud ${newAssignedRequest.id} ha sido asignada a usted.`
    });
  };

  const handleResolveRequest = (solicitud: any) => {
    setSelectedRequest(solicitud);
    setIsResolveDialogOpen(true);
  };

  const handleSubmitResolution = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update assigned requests list
    const updatedAssignedRequests = solicitudesAsignadas.filter(s => s.id !== selectedRequest.id);
    setSolicitudesAsignadas(updatedAssignedRequests);
    
    // Close dialog and show toast
    setIsResolveDialogOpen(false);
    setSelectedRequest(null);
    
    toast({
      title: "Solución enviada",
      description: "La solución ha sido enviada al administrador para su revisión.",
    });
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
              <p className="font-medium">Técnico</p>
              <p className="text-sm text-gray-600">{user.name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>Cerrar sesión</Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Panel de Técnico</h1>
          
          <Tabs defaultValue="disponibles">
            <TabsList className="mb-8">
              <TabsTrigger value="disponibles">Solicitudes Disponibles</TabsTrigger>
              <TabsTrigger value="asignadas">Mis Solicitudes Asignadas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="disponibles">
              <div className="grid gap-4">
                {solicitudesDisponibles.length > 0 ? (
                  solicitudesDisponibles.map((solicitud) => (
                    <Card key={solicitud.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-2 md:mb-0">
                            <h3 className="font-semibold">{solicitud.id}</h3>
                            <p className="text-sm text-gray-500">{solicitud.fecha}</p>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            Prioridad: <span className={getPriorityColor(solicitud.prioridad)}>{solicitud.prioridad}</span>
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Empleado</h4>
                            <p>{solicitud.empleado} - {solicitud.departamento}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Problema</h4>
                            <p>{solicitud.problema}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button onClick={() => handleViewDetails(solicitud)}>
                            Ver Detalles
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-gray-500">No hay solicitudes disponibles en este momento.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="asignadas">
              <div className="grid gap-4">
                {solicitudesAsignadas.length > 0 ? (
                  solicitudesAsignadas.map((solicitud) => (
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
                            <h4 className="text-sm font-medium text-gray-500">Empleado</h4>
                            <p>{solicitud.empleado} - {solicitud.departamento}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Problema</h4>
                            <p>{solicitud.problema}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Ubicación</h4>
                            <p>{solicitud.ubicacion}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button 
                            className="bg-petroblue-600 hover:bg-petroblue-700"
                            onClick={() => handleResolveRequest(solicitud)}
                          >
                            Registrar Solución
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-gray-500">No tiene solicitudes asignadas actualmente.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalles de Solicitud</DialogTitle>
            <DialogDescription>
              Información completa de la solicitud #{selectedRequest?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{selectedRequest.fecha}</span>
                <Badge variant="outline" className="capitalize">
                  Prioridad: <span className={getPriorityColor(selectedRequest.prioridad)}>{selectedRequest.prioridad}</span>
                </Badge>
              </div>
              
              <div className="space-y-4 py-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Empleado</h4>
                  <p className="font-medium">{selectedRequest.empleado}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Departamento</h4>
                  <p>{selectedRequest.departamento}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Problema</h4>
                  <p>{selectedRequest.problema}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Ubicación</h4>
                  <p>{selectedRequest.ubicacion}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Teléfono de contacto</h4>
                  <p>{selectedRequest.telefono}</p>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cerrar
                </Button>
                <Button 
                  className="bg-petroblue-600 hover:bg-petroblue-700"
                  onClick={handleAcceptRequest}
                >
                  Aceptar Solicitud
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Resolve Dialog */}
      <Dialog open={isResolveDialogOpen} onOpenChange={setIsResolveDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Registrar Solución</DialogTitle>
            <DialogDescription>
              Complete la información sobre la solución aplicada
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <form onSubmit={handleSubmitResolution} className="space-y-4">
              <div>
                <h3 className="font-medium">{selectedRequest.id}: {selectedRequest.problema}</h3>
                <p className="text-sm text-gray-500">Empleado: {selectedRequest.empleado}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="solucion">Descripción de la solución</Label>
                <Textarea
                  id="solucion"
                  placeholder="Describa detalladamente la solución aplicada"
                  className="min-h-[120px]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>¿Se utilizaron materiales?</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="materiales" />
                  <label htmlFor="materiales" className="text-sm font-medium">
                    Sí, se utilizaron materiales
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="materiales-detalle">Detalle de materiales (opcional)</Label>
                <Textarea
                  id="materiales-detalle"
                  placeholder="Liste los materiales utilizados"
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tiempo">Tiempo de resolución</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tiempo aproximado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="menos-30">Menos de 30 minutos</SelectItem>
                    <SelectItem value="30-60">Entre 30 minutos y 1 hora</SelectItem>
                    <SelectItem value="1-2">Entre 1 y 2 horas</SelectItem>
                    <SelectItem value="mas-2">Más de 2 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsResolveDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-petroblue-600 hover:bg-petroblue-700">
                  Enviar Solución
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TecnicoDashboard;
