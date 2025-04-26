
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, FileCheck, FileClock, FileWarning, CheckCircle2, XCircle, User, BarChart3, Activity } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Logo from "@/components/Logo";
import { Separator } from "@/components/ui/separator";

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // State for dialogs
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isEditingUser, setIsEditingUser] = useState(false);
  
  // Mock data for pending solutions
  const [pendientesRevision, setPendientesRevision] = useState([
    {
      id: "SOL-2023-001",
      fecha: "2023-04-20",
      empleado: "Juan Pérez",
      departamento: "Producción",
      problema: "La computadora no enciende",
      tecnico: "Carlos Ramírez",
      fechaSolucion: "2023-04-21",
      solucion: "Se reemplazó la fuente de poder por una nueva.",
      materiales: "Fuente de poder ATX 650W",
      tiempoResolucion: "Entre 30 minutos y 1 hora",
    },
    {
      id: "SOL-2023-007",
      fecha: "2023-04-25",
      empleado: "Diana Mendoza",
      departamento: "Administrativo",
      problema: "No puedo imprimir documentos desde mi computadora",
      tecnico: "Ana Rodríguez",
      fechaSolucion: "2023-04-26",
      solucion: "Se reinstalaron los drivers de la impresora y se verificó la conexión de red.",
      materiales: "",
      tiempoResolucion: "Menos de 30 minutos",
    }
  ]);
  
  // Mock data for resolved cases
  const [casosResueltos, setCasosResueltos] = useState([
    {
      id: "SOL-2023-008",
      fecha: "2023-04-18",
      empleado: "Luis Morales",
      departamento: "Finanzas",
      problema: "Excel se cierra inesperadamente",
      tecnico: "Carlos Ramírez",
      fechaSolucion: "2023-04-19",
      solucion: "Se reparó la instalación de Office y se actualizó a la última versión.",
      estado: "aprobado"
    },
    {
      id: "SOL-2023-009",
      fecha: "2023-04-15",
      empleado: "Carmen Suárez",
      departamento: "Recursos Humanos",
      problema: "No puede acceder al sistema de nómina",
      tecnico: "Ana Rodríguez",
      fechaSolucion: "2023-04-16",
      solucion: "Se restableció la contraseña y se verificaron los permisos de acceso.",
      estado: "aprobado"
    },
    {
      id: "SOL-2023-010",
      fecha: "2023-04-22",
      empleado: "Jorge Vásquez",
      departamento: "Operaciones",
      problema: "El monitor muestra líneas horizontales",
      tecnico: "Carlos Ramírez",
      fechaSolucion: "2023-04-23",
      solucion: "Se reemplazó el cable HDMI defectuoso.",
      estado: "rechazado",
      observacion: "No se verificó si el problema persistía con otro monitor. Por favor, completar el diagnóstico."
    }
  ]);
  
  // Mock data for users
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Carlos Ramírez",
      usuario: "cramirez",
      correo: "cramirez@petroservices.com",
      rol: "tecnico",
      estado: "activo"
    },
    {
      id: 2,
      nombre: "Ana Rodríguez",
      usuario: "arodriguez",
      correo: "arodriguez@petroservices.com",
      rol: "tecnico",
      estado: "activo"
    },
    {
      id: 3,
      nombre: "Juan Pérez",
      usuario: "jperez",
      correo: "jperez@petroservices.com",
      rol: "empleado",
      estado: "activo"
    },
    {
      id: 4,
      nombre: "María López",
      usuario: "mlopez",
      correo: "mlopez@petroservices.com",
      rol: "empleado",
      estado: "activo"
    },
    {
      id: 5,
      nombre: "Roberto Martínez",
      usuario: "rmartinez",
      correo: "rmartinez@petroservices.com",
      rol: "empleado",
      estado: "inactivo"
    }
  ]);

  useEffect(() => {
    // Check if user is logged in and has correct role
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === "admin") {
        setUser(parsedUser);
      }
    }
    setLoading(false);
  }, []);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "aprobado":
        return "bg-green-100 text-green-800 border-green-200";
      case "rechazado":
        return "bg-red-100 text-red-800 border-red-200";
      case "activo":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactivo":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "";
    }
  };

  const getRolColor = (rol: string) => {
    switch (rol) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "tecnico":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "empleado":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleReviewSolution = (solucion: any) => {
    setSelectedSolution(solucion);
    setIsReviewDialogOpen(true);
  };

  const handleApproveSolution = () => {
    if (!selectedSolution) return;
    
    // Update pending solutions list
    setPendientesRevision(pendientesRevision.filter(s => s.id !== selectedSolution.id));
    
    // Add to resolved cases with approved status
    const approvedSolution = {
      ...selectedSolution,
      estado: "aprobado"
    };
    
    setCasosResueltos([approvedSolution, ...casosResueltos]);
    
    // Close dialog and show toast
    setIsReviewDialogOpen(false);
    setSelectedSolution(null);
    
    toast({
      title: "Solución aprobada",
      description: `La solución para la solicitud ${approvedSolution.id} ha sido aprobada.`,
    });
  };

  const handleRejectSolution = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const observacionInput = form.elements.namedItem("observacion") as HTMLTextAreaElement;
    const observacion = observacionInput.value;
    
    if (!selectedSolution) return;
    
    // Update pending solutions list
    setPendientesRevision(pendientesRevision.filter(s => s.id !== selectedSolution.id));
    
    // Add to resolved cases with rejected status
    const rejectedSolution = {
      ...selectedSolution,
      estado: "rechazado",
      observacion: observacion
    };
    
    setCasosResueltos([rejectedSolution, ...casosResueltos]);
    
    // Close dialog and show toast
    setIsReviewDialogOpen(false);
    setSelectedSolution(null);
    
    toast({
      title: "Solución rechazada",
      description: `La solución para la solicitud ${rejectedSolution.id} ha sido rechazada.`,
    });
  };

  const handleCreateUser = () => {
    setEditingUser({
      id: Date.now(),
      nombre: "",
      usuario: "",
      correo: "",
      rol: "",
      estado: "activo"
    });
    setIsEditingUser(true);
    setIsUserDialogOpen(true);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setIsEditingUser(true);
    setIsUserDialogOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const nombre = (form.elements.namedItem("nombre") as HTMLInputElement).value;
    const usuario = (form.elements.namedItem("usuario") as HTMLInputElement).value;
    const correo = (form.elements.namedItem("correo") as HTMLInputElement).value;
    const rol = (form.elements.namedItem("rol") as HTMLSelectElement).value;
    const estado = (form.elements.namedItem("estado") as HTMLSelectElement).value;
    
    const updatedUser = {
      ...editingUser,
      nombre,
      usuario,
      correo,
      rol,
      estado
    };
    
    // If creating a new user
    if (!usuarios.find(u => u.id === updatedUser.id)) {
      setUsuarios([...usuarios, updatedUser]);
      toast({
        title: "Usuario creado",
        description: `El usuario ${nombre} ha sido creado exitosamente.`,
      });
    } else {
      // If updating an existing user
      setUsuarios(usuarios.map(u => u.id === updatedUser.id ? updatedUser : u));
      toast({
        title: "Usuario actualizado",
        description: `El usuario ${nombre} ha sido actualizado exitosamente.`,
      });
    }
    
    // Close dialog and reset state
    setIsUserDialogOpen(false);
    setEditingUser(null);
    setIsEditingUser(false);
  };

  const handleDeleteUser = (userId: number) => {
    setUsuarios(usuarios.filter(u => u.id !== userId));
    
    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado exitosamente.",
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
              <p className="font-medium">Administrador</p>
              <p className="text-sm text-gray-600">{user.name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>Cerrar sesión</Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Panel de Administrador</h1>
          
          {/* Dashboard Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Solicitudes Nuevas</p>
                    <p className="text-3xl font-bold">3</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Casos Resueltos</p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <FileCheck className="h-5 w-5 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Usuarios Activos</p>
                    <p className="text-3xl font-bold">{usuarios.filter(u => u.estado === 'activo').length}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-purple-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Técnicos</p>
                    <p className="text-3xl font-bold">{usuarios.filter(u => u.rol === 'tecnico').length}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-orange-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="pendientes">
            <TabsList className="mb-8">
              <TabsTrigger value="pendientes">Pendientes de Revisión</TabsTrigger>
              <TabsTrigger value="resueltos">Casos Resueltos</TabsTrigger>
              <TabsTrigger value="usuarios">Gestión de Usuarios</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pendientes">
              <div className="grid gap-4">
                {pendientesRevision.length > 0 ? (
                  pendientesRevision.map((solucion) => (
                    <Card key={solucion.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-2 md:mb-0">
                            <h3 className="font-semibold">{solucion.id}</h3>
                            <p className="text-sm text-gray-500">Resuelto: {solucion.fechaSolucion}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Empleado</h4>
                              <p>{solucion.empleado} - {solucion.departamento}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Técnico</h4>
                              <p>{solucion.tecnico}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Problema</h4>
                            <p>{solucion.problema}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Solución aplicada</h4>
                            <p>{solucion.solucion}</p>
                          </div>
                          
                          {solucion.materiales && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Materiales utilizados</h4>
                              <p>{solucion.materiales}</p>
                            </div>
                          )}
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Tiempo de resolución</h4>
                            <p>{solucion.tiempoResolucion}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            className="border-red-500 text-red-500 hover:bg-red-50"
                            onClick={() => handleReviewSolution(solucion)}
                          >
                            <XCircle className="h-4 w-4 mr-1" /> Rechazar
                          </Button>
                          <Button 
                            className="bg-petroblue-600 hover:bg-petroblue-700"
                            onClick={handleApproveSolution}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" /> Aprobar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-gray-500">No hay soluciones pendientes de revisión.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="resueltos">
              <div className="grid gap-4">
                {casosResueltos.length > 0 ? (
                  casosResueltos.map((caso) => (
                    <Card key={caso.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-2 md:mb-0">
                            <h3 className="font-semibold">{caso.id}</h3>
                            <p className="text-sm text-gray-500">Resuelto: {caso.fechaSolucion}</p>
                          </div>
                          <Badge className={getEstadoColor(caso.estado)}>
                            {caso.estado === "aprobado" ? "Aprobado" : "Rechazado"}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Empleado</h4>
                              <p>{caso.empleado} - {caso.departamento}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Técnico</h4>
                              <p>{caso.tecnico}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Problema</h4>
                            <p>{caso.problema}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Solución</h4>
                            <p>{caso.solucion}</p>
                          </div>
                          
                          {caso.observacion && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-md">
                              <h4 className="text-sm font-medium text-red-800">Observación</h4>
                              <p className="text-red-700">{caso.observacion}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-gray-500">No hay casos resueltos registrados.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="usuarios">
              <div className="flex justify-end mb-4">
                <Button 
                  className="bg-petroblue-600 hover:bg-petroblue-700"
                  onClick={handleCreateUser}
                >
                  Crear Usuario
                </Button>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Lista de Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Nombre</th>
                          <th className="text-left py-3 px-4">Usuario</th>
                          <th className="text-left py-3 px-4">Correo</th>
                          <th className="text-left py-3 px-4">Rol</th>
                          <th className="text-left py-3 px-4">Estado</th>
                          <th className="text-right py-3 px-4">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuarios.map((usuario) => (
                          <tr key={usuario.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{usuario.nombre}</td>
                            <td className="py-3 px-4">{usuario.usuario}</td>
                            <td className="py-3 px-4">{usuario.correo}</td>
                            <td className="py-3 px-4">
                              <Badge className={getRolColor(usuario.rol)}>
                                {usuario.rol === "admin" ? "Administrador" : 
                                 usuario.rol === "tecnico" ? "Técnico" : "Empleado"}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={getEstadoColor(usuario.estado)}>
                                {usuario.estado === "activo" ? "Activo" : "Inactivo"}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditUser(usuario)}
                                >
                                  Editar
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                  onClick={() => handleDeleteUser(usuario.id)}
                                >
                                  Eliminar
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Review Solution Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Revisar Solución</DialogTitle>
            <DialogDescription>
              Revise y apruebe o rechace la solución propuesta
            </DialogDescription>
          </DialogHeader>
          
          {selectedSolution && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Solicitud</h4>
                <p className="font-medium">{selectedSolution.id}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Problema</h4>
                <p>{selectedSolution.problema}</p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Técnico</h4>
                <p>{selectedSolution.tecnico}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Solución propuesta</h4>
                <p>{selectedSolution.solucion}</p>
              </div>
              
              {selectedSolution.materiales && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Materiales utilizados</h4>
                  <p>{selectedSolution.materiales}</p>
                </div>
              )}
              
              <form onSubmit={handleRejectSolution} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="observacion">Observaciones (en caso de rechazo)</Label>
                  <Textarea 
                    id="observacion" 
                    name="observacion" 
                    placeholder="Indique las razones del rechazo y las mejoras necesarias"
                  />
                </div>
                
                <DialogFooter>
                  <div className="flex justify-between w-full">
                    <Button 
                      type="submit" 
                      variant="outline" 
                      className="border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Rechazar
                    </Button>
                    <Button 
                      type="button"
                      onClick={handleApproveSolution}
                      className="bg-petroblue-600 hover:bg-petroblue-700"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Aprobar
                    </Button>
                  </div>
                </DialogFooter>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* User Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditingUser ? (editingUser?.id ? "Editar Usuario" : "Crear Usuario") : "Detalles del Usuario"}</DialogTitle>
          </DialogHeader>
          
          {editingUser && (
            <form onSubmit={handleSaveUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre completo</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  defaultValue={editingUser.nombre}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="usuario">Nombre de usuario</Label>
                <Input
                  id="usuario"
                  name="usuario"
                  defaultValue={editingUser.usuario}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="correo">Correo electrónico</Label>
                <Input
                  id="correo"
                  name="correo"
                  type="email"
                  defaultValue={editingUser.correo}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rol">Rol</Label>
                <Select name="rol" defaultValue={editingUser.rol} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="tecnico">Técnico</SelectItem>
                    <SelectItem value="empleado">Empleado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select name="estado" defaultValue={editingUser.estado} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsUserDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-petroblue-600 hover:bg-petroblue-700">
                  {editingUser.id ? "Guardar Cambios" : "Crear Usuario"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
