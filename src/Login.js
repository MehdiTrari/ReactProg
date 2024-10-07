// Login.js
import React, { useState } from 'react';
import logo from './logo.svg';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  // eslint-disable-next-line
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: 'Adresse email invalide' }));
    } else {
      setErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail();

    if (!formData.email || !formData.password) {
      setErrors((prev) => ({
        ...prev,
        password: formData.password ? '' : 'Le mot de passe est requis.',
        email: formData.email ? '' : 'L’email est requis.',
      }));
      return;
    }

    if (Object.keys(errors).length === 0 && formData.password) {
      alert('Connexion réussie');
      setIsSubmitted(true);
    } else {
      alert('Une erreur est survenue');
      setIsSubmitted(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={validateEmail}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
          
          <button type="submit">Se connecter</button>
        </form>
      </header>
    </div>
  );
};

export default Login;
