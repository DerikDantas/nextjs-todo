'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { loginRoute } from '../../services/Auth';
import { ToastError } from '../components/ToastError';

export default function Login() {
  const router = useRouter();

  const { setUser } = useAuthContext();

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const validateForm = () => {
    const { email, password } = values;
    if (!email || !password) {
      ToastError('E-mail e senha são obrigatórios.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, password } = values;

      try {
        const response = await fetch(loginRoute, {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });

        if (response.status === 400) {
          const errorMessage = await response.json();
          ToastError(errorMessage?.message);
          return;
        }

        if (response.status === 200) {
          const userResponse = await response.json();

          setUser(userResponse?.user);
          localStorage.setItem('user', userResponse?.user);
          router.replace('/dashboard');
        }
      } catch (error) {
        console.log('Error: ' + error);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
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

        <button type="submit">ENTRAR</button>
      </form>
    </div>
  );
}
