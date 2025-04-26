
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle } from "lucide-react";

const SolicitarSoporte = () => {
  const { toast } = useToast();
  const [nombre, setNombre] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [problema, setProblema] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      toast({
        title: "Solicitud enviada",
        description: "Su solicitud de soporte ha sido registrada exitosamente.",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setNombre("");
        setDepartamento("");
        setProblema("");
        setPrioridad("");
        setSuccess(false);
      }, 3000);
    }, 1500);
  };

  const departamentos = [
    "Administrativo",
    "Finanzas",
    "Operaciones",
    "Recursos Humanos",
    "Exploración",
    "Producción",
    "Logística",
    "Ventas",
    "TI",
    "Seguridad",
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Solicitar Soporte Técnico</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Formulario de solicitud</CardTitle>
              <CardDescription>
                Complete la información para registrar su solicitud de soporte técnico
              </CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="text-center py-10">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">¡Solicitud Registrada!</h3>
                  <p className="text-gray-600">
                    Su solicitud ha sido enviada correctamente. Un técnico la revisará en breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre completo</Label>
                    <Input
                      id="nombre"
                      placeholder="Ingrese su nombre completo"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="departamento">Departamento</Label>
                    <Select 
                      value={departamento} 
                      onValueChange={setDepartamento}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione su departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {departamentos.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="problema">Descripción del problema</Label>
                    <Textarea
                      id="problema"
                      placeholder="Describa detalladamente el problema que está experimentando"
                      value={problema}
                      onChange={(e) => setProblema(e.target.value)}
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="prioridad">Prioridad</Label>
                    <Select 
                      value={prioridad} 
                      onValueChange={setPrioridad}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el nivel de prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baja">Baja</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-petroblue-600 hover:bg-petroblue-700" 
                    disabled={loading}
                  >
                    {loading ? "Enviando solicitud..." : "Enviar Solicitud"}
                  </Button>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <p className="text-sm text-gray-500">
                Su solicitud será asignada a un técnico según disponibilidad y prioridad.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SolicitarSoporte;
