
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si hay un usuario logueado y obtener su rol
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserRole(user.role);
      } catch (e) {
        console.error("Error parsing user from localStorage");
      }
    }
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Solicitar Soporte", path: "/solicitar-soporte" },
    { name: "Estado de Solicitud", path: "/estado-solicitud" },
    { name: "Contacto", path: "/contacto" },
  ];

  // Links adicionales para usuarios autenticados según su rol
  if (userRole === "admin") {
    navLinks.push({ name: "Documentación", path: "/documentation/diagram" });
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex justify-between items-center py-3">
        <Logo />
        
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-petroblue-600 ${
                isActive(link.path) 
                  ? "text-petroblue-600 border-b-2 border-petroblue-600" 
                  : "text-gray-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          {!userRole ? (
            <Link to="/login">
              <Button variant={location.pathname === "/login" ? "default" : "outline"} className="bg-petroblue-600 hover:bg-petroblue-700">
                Iniciar Sesión
              </Button>
            </Link>
          ) : (
            <Button 
              variant="outline" 
              className="border-petroblue-600 text-petroblue-600 hover:bg-petroblue-50"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
              Cerrar Sesión
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
