'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { registerRoute } from '../../services/Auth';
import { ToastError } from '../components/ToastError';

export default function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      ToastError('A senha e a senha de confirmação devem ser iguais.');
      return false;
    } else if (username.length < 3) {
      ToastError('O nome de usuário deve ter mais de 3 caracteres.');
      return false;
    } else if (password.length < 8) {
      ToastError('A senha deve ser igual ou superior a 8 caracteres.');
      return false;
    } else if (!email) {
      ToastError('O e-mail é obrigatório.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;

      try {
        const response = await fetch(registerRoute, {
          method: 'POST',
          body: JSON.stringify({ username, email, password })
        });

        if (response.status === 400) {
          const errorMessage = await response.json();
          ToastError(errorMessage?.message);
          return;
        }

        redirect('/');
      } catch (error) {
        console.log('Error: ' + error);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <main>
      <form action="" onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          placeholder="Usuario"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Senha"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Confirme a Senha"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Criar conta</button>
        <span>
          Ja tem uma conta? <Link href="/login">Acesse.</Link>
        </span>
      </form>
    </main>
  );
}
