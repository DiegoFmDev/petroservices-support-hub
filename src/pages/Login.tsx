
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Logo from "@/components/Logo";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setLoading(false);
      
      // Mock login logic
      if (username === "admin" && password === "admin") {
        localStorage.setItem("user", JSON.stringify({ role: "admin", name: "Administrador" }));
        navigate("/admin/dashboard");
      } else if (username === "tecnico" && password === "tecnico") {
        localStorage.setItem("user", JSON.stringify({ role: "tecnico", name: "Técnico" }));
        navigate("/tecnico/dashboard");
      } else if (username === "empleado" && password === "empleado") {
        localStorage.setItem("user", JSON.stringify({ role: "empleado", name: "Empleado" }));
        navigate("/empleado/dashboard");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingrese sus credenciales para acceder al sistema de soporte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input 
                  id="username"
                  placeholder="Nombre de usuario" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="Contraseña" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <Button 
                type="submit" 
                className="w-full bg-petroblue-600 hover:bg-petroblue-700" 
                disabled={loading}
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4">
          <p className="text-sm text-gray-500">
            Si olvidó su contraseña, contacte al administrador del sistema
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
