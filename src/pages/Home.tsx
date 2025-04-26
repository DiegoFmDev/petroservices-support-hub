
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Wrench, FileSearch, BarChart4, Clock } from "lucide-react";

const features = [
  {
    title: "Registro de Solicitudes",
    description: "Soluciones personalizadas para cada tipo de problema técnico.",
    icon: <Wrench className="h-6 w-6 text-petroblue-600" />,
  },
  {
    title: "Seguimiento de Estados",
    description: "Visualiza en tiempo real el estado de tus solicitudes.",
    icon: <FileSearch className="h-6 w-6 text-petroblue-600" />,
  },
  {
    title: "Gestión Eficiente",
    description: "Administración rápida de casos por técnicos especializados.",
    icon: <Clock className="h-6 w-6 text-petroblue-600" />,
  },
  {
    title: "Estadísticas y Reportes",
    description: "Reportes detallados para mejorar procesos de soporte.",
    icon: <BarChart4 className="h-6 w-6 text-petroblue-600" />,
  },
];

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-petroblue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Sistema de Soporte Técnico
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-700">
            Soluciones rápidas y eficientes para mantener la operación de PETROSERVICES S.A.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/solicitar-soporte">
              <Button className="bg-petroblue-600 hover:bg-petroblue-700 px-6 py-6 text-lg">
                Solicitar Soporte
              </Button>
            </Link>
            <Link to="/estado-solicitud">
              <Button variant="outline" className="px-6 py-6 text-lg border-petroblue-600 text-petroblue-600 hover:bg-petroblue-50">
                Consultar Estado
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            Nuestros Servicios de Soporte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-gray-200">
                <CardHeader className="pb-2">
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6">
              Acerca de Nuestro Sistema
            </h2>
            <p className="text-gray-700 mb-8">
              El sistema de soporte técnico de PETROSERVICES S.A. está diseñado para brindar asistencia rápida y eficiente a todos los empleados de la empresa. Nuestro equipo de técnicos especializados está listo para resolver cualquier problema que pueda surgir en sus actividades diarias.
            </p>
            <p className="text-gray-700">
              Con un proceso simplificado de solicitud de soporte, seguimiento de casos y resolución de problemas, garantizamos que todas las incidencias sean atendidas con la mayor brevedad posible, minimizando el impacto en la operación de la empresa.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
