
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contacto = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Mensaje enviado",
      description: "Su mensaje ha sido enviado exitosamente. Nos pondremos en contacto con usted pronto.",
    });
    
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Contacto
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Envíenos un mensaje</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo</Label>
                      <Input id="nombre" placeholder="Ingrese su nombre" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" type="email" placeholder="correo@ejemplo.com" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="asunto">Asunto</Label>
                      <Input id="asunto" placeholder="Asunto del mensaje" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mensaje">Mensaje</Label>
                      <Textarea 
                        id="mensaje" 
                        placeholder="Escriba su mensaje aquí" 
                        className="min-h-[150px]" 
                        required 
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-petroblue-600 hover:bg-petroblue-700">
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-petroblue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Correo Electrónico</h4>
                      <p className="text-gray-600">soporte@petroservices.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-petroblue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Teléfono</h4>
                      <p className="text-gray-600">+593 2 123 4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-petroblue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Dirección</h4>
                      <p className="text-gray-600">
                        Av. Principal 123<br />
                        Quito, Ecuador
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Horario de Atención</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Lunes - Viernes</span>
                      <span>8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sábado</span>
                      <span>9:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Domingo</span>
                      <span>Cerrado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contacto;
