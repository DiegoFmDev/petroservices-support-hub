
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Wrench, CheckCircle, Clock, Calendar, User, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TecnicoDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pendientes");
  
  // Mock data for support tickets
  const pendingTickets = [
    { 
      id: "ST-2023-001", 
      title: "Falla en computadora", 
      priority: "Alta", 
      department: "Contabilidad",
      reportedBy: "Carlos Mendez",
      date: "2023-11-10"
    },
    { 
      id: "ST-2023-002", 
      title: "Impresora no funciona", 
      priority: "Media", 
      department: "Recursos Humanos",
      reportedBy: "María González",
      date: "2023-11-09"
    },
    { 
      id: "ST-2023-003", 
      title: "Acceso al sistema SAP", 
      priority: "Baja", 
      department: "Finanzas",
      reportedBy: "Juan Pérez",
      date: "2023-11-08"
    }
  ];
  
  const inProgressTickets = [
    { 
      id: "ST-2023-004", 
      title: "Configuración de VPN", 
      priority: "Alta", 
      department: "Operaciones",
      reportedBy: "Luis Torres",
      startedDate: "2023-11-07"
    }
  ];
  
  const handleAcceptTicket = (ticketId: string) => {
    toast({
      title: "Ticket Aceptado",
      description: `Has aceptado el ticket ${ticketId}`,
    });
  };

  const handleCompleteTicket = (ticketId: string) => {
    toast({
      title: "Ticket Completado",
      description: `El ticket ${ticketId} ha sido marcado como resuelto y enviado para revisión`,
    });
  };
  
  const getPriorityColor = (priority: string) => {
    switch(priority.toLowerCase()) {
      case 'alta':
        return "bg-red-500 hover:bg-red-600";
      case 'media':
        return "bg-yellow-500 hover:bg-yellow-600";
      case 'baja':
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Panel de Técnico</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Pendientes</CardTitle>
              <Badge className="bg-amber-500">{pendingTickets.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTickets.length}</div>
              <p className="text-xs text-muted-foreground">Pendientes de asignación</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
              <Badge className="bg-blue-500">{inProgressTickets.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressTickets.length}</div>
              <p className="text-xs text-muted-foreground">Tickets siendo atendidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completados Hoy</CardTitle>
              <Badge className="bg-green-500">2</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Tickets resueltos hoy</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.5h</div>
              <p className="text-xs text-muted-foreground">Promedio de resolución</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pendientes">Tickets Pendientes</TabsTrigger>
            <TabsTrigger value="progreso">En Progreso</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pendientes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Tickets Pendientes de Asignación</CardTitle>
                <CardDescription>
                  Solicitudes que requieren ser atendidas. Puede aceptar un ticket para comenzar a trabajar en él.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingTickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-lg">{ticket.title}</h3>
                          <div className="flex space-x-4 text-sm text-gray-500 mt-1">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              {ticket.date}
                            </div>
                            <div className="flex items-center">
                              <User className="mr-1 h-4 w-4" />
                              {ticket.reportedBy}
                            </div>
                            <div className="flex items-center">
                              <FileText className="mr-1 h-4 w-4" />
                              {ticket.department}
                            </div>
                          </div>
                        </div>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">ID: {ticket.id}</span>
                        <Button
                          onClick={() => handleAcceptTicket(ticket.id)}
                          className="bg-petroblue-600 hover:bg-petroblue-700"
                        >
                          <Wrench className="mr-2 h-4 w-4" /> Aceptar Ticket
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="progreso" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Tickets En Progreso</CardTitle>
                <CardDescription>
                  Solicitudes en las que estás trabajando actualmente. Registra la solución cuando hayas terminado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inProgressTickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-lg">{ticket.title}</h3>
                          <div className="flex space-x-4 text-sm text-gray-500 mt-1">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              {ticket.startedDate}
                            </div>
                            <div className="flex items-center">
                              <User className="mr-1 h-4 w-4" />
                              {ticket.reportedBy}
                            </div>
                            <div className="flex items-center">
                              <FileText className="mr-1 h-4 w-4" />
                              {ticket.department}
                            </div>
                          </div>
                        </div>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">ID: {ticket.id}</span>
                        <Button
                          onClick={() => handleCompleteTicket(ticket.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" /> Marcar como Resuelto
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TecnicoDashboard;
