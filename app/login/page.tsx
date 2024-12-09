'use client'
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setError("Veuillez vérifier que vous n'êtes pas un robot.");
      return;
    }

    setError("");
    alert(`Login réussi !\nEmail: ${email}\nPassword: ${password}`);
  };

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h1 className="pb-4 text-center">LOGIN</h1>
      <form onSubmit={handleSubmit} className="text-center">
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px", color: "black" }}
    
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px", color: "black" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <ReCAPTCHA sitekey={siteKey} onChange={onRecaptchaChange} />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: "10px 20px" }}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
