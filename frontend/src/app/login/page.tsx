import LoginForm from "./LoginForm";

export const metadata = {
  title: "Iniciar sesión — Metanoia",
};

export default function LoginPage() {
  return (
    <div>
      <div className="auth-container">
        <div className="brand">
          <img src="/brand-banner.png" alt="Logo de Metanoia" className="brand-banner"/>
        </div>
        <LoginForm/>
      </div>
    </div>
  );
}