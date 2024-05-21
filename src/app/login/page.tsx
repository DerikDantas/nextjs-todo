'use client';

import { useAuthContext } from '@/hooks/use-auth-context';
import { AuthService } from '@/services/Auth';
import { Button, Input, Toast } from '@/shared-components/';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Text } from 'react-aria-components';
import validationSchema from './validation-schema';

export default function Login() {
  const router = useRouter();

  const { setUser } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit
  });

  async function onSubmit() {
    const { email, password } = formik.values;

    await AuthService.login({ email, password })
      .then(async (response) => {
        if (response.status === 400) {
          const errorMessage = await response.json();
          Toast.error(errorMessage?.message);
          return;
        }

        if (response.status === 200) {
          const userResponse = await response.json();

          setUser(userResponse?.user);
          localStorage.setItem('user', userResponse?.user);
          router.replace('/dashboard');
        }
      })
      .catch((error) => console.log('Error: ' + error));
  }

  return (
    <main className="flex items-center justify-center h-screen w-full">
      <Form
        action=""
        onSubmit={formik.handleSubmit}
        className="flex items-center justify-center h-screen w-full"
      >
        <div className="text-left flex gap-6 flex-col">
          <Text elementType="h1">Login</Text>

          <Input
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="example@example.com"
            required
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : undefined
            }
          />
          <Input
            type="password"
            placeholder="*********"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            label="Password"
            required
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : undefined
            }
          />

          <div className="mt-2 w-full">
            <Button type="submit">ENTRAR</Button>
            <Text elementType="span">
              Don&apos;t have an account?{' '}
              <Link href="/register">Register.</Link>
            </Text>
          </div>
        </div>
      </Form>
    </main>
  );
}
