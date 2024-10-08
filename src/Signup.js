import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

  const validatePassword = () => {
    const { password, confirmPassword } = formData;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const newErrors = {};
    if (!passwordPattern.test(password)) {
      newErrors.password =
        'Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule et un chiffre.';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne sont pas identiques.';
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    if (Object.keys(errors).length === 0 && formData.password) {
      alert('Compte créé avec succès');
      navigate('/');
    } else {
      alert('Une erreur est survenue');
    }
  };

  useEffect(() => {
    if (errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (errors.password && passwordPattern.test(formData.password)) {
      setErrors((prev) => {
        const { password, ...rest } = prev;
        return rest;
      });
    }

    if (errors.confirmPassword && formData.password === formData.confirmPassword) {
      setErrors((prev) => {
        const { confirmPassword, ...rest } = prev;
        return rest;
      });
    }
  }, [formData.email, formData.password, formData.confirmPassword, errors]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Création de compte</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
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
            onBlur={validatePassword}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
          
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmation du mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={validatePassword}
            required
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}
          
          <button type="submit">Valider</button>
        </form>
      </header>
    </div>
  );
};

export default Signup;
