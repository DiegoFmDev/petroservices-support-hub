
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-9xl font-bold text-petroblue-600">404</h1>
        <h2 className="text-3xl font-semibold mt-6 mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          La página que está buscando no existe o ha sido movida a otra ubicación.
        </p>
        <Link to="/">
          <Button className="bg-petroblue-600 hover:bg-petroblue-700">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
