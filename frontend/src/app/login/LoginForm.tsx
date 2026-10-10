"use client";

import { useState } from "react";
import { Auth } from "../utils/api_utils";
import { useRouter } from "next/navigation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const isEmailValid = EMAIL_REGEX.test(email);
  const isPasswordValid = password.length > 0;
  const isFormValid = isEmailValid && isPasswordValid;

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setErrorMessage("");
    setIsSubmitting(true);
    
    try {
      const data = await Auth.login(email, password);
      const role = data.user?.role;
      
      console.log("Login exitoso. Rol del usuario:", role);

      switch (role) {
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        case "CLIENT":
          //router.push("/client/dashboard");
          break;
        case "TRAINER":
          //router.push("/trainer/dashboard");
          break;
      }
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
      setErrorMessage("Correo o contraseña incorrectos");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <h1 className="form-title">Iniciar sesión</h1>
      {errorMessage && <p className="error-text">{errorMessage}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label className="field-label" htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            className="text-field-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
          />
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="password">Contraseña</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="text-field-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        <button type="submit" className="button-primary" disabled={!isFormValid || isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </>
  );
}