
import React from "react";
import Logo from "./Logo";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-gray-600 max-w-md">
              Sistema de soporte técnico para empleados de PETROSERVICES S.A. 
              Soluciones rápidas y eficientes para mantener su operación funcionando sin problemas.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-petroblue-900">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} className="text-petroblue-600" />
                <span>+593 2 123 4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} className="text-petroblue-600" />
                <span>soporte@petroservices.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin size={16} className="text-petroblue-600 mt-0.5" />
                <span>Av. Principal 123, Quito - Ecuador</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-petroblue-900">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-petroblue-600 transition-colors">Términos y Condiciones</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-petroblue-600 transition-colors">Política de Privacidad</a>
              </li>
              <li className="flex items-center gap-4 mt-4">
                <a href="#" className="text-petroblue-600 hover:text-petroblue-700">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-petroblue-600 hover:text-petroblue-700">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-petroblue-600 hover:text-petroblue-700">
                  <Linkedin size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PETROSERVICES S.A. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
