'use client';

import { AuthService } from '@/services/Auth';
import { Button, Input, Toast } from '@/shared-components/';
import { useFormik } from 'formik';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Form, Text } from 'react-aria-components';
import schema from './Validation/schema';

export default function Register() {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: schema,
    onSubmit: handleSubmit
  });

  async function handleSubmit() {
    const { email, username, password } = formik.values;
    try {
      const response = await AuthService.register({
        username,
        email,
        password
      });

      if (response.status === 400) {
        const errorMessage = await response.json();
        Toast.error(errorMessage?.message);
        return;
      }

      redirect('/');
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  return (
    <main className="flex items-center justify-center h-screen w-full">
      <Form
        action=""
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-8 w-1/2"
      >
        <Input
          label="Username"
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={
            formik.touched.username && formik.errors.username
              ? formik.errors.username
              : undefined
          }
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="example@example.com"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : undefined
          }
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="*******"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : undefined
          }
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="*******"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : undefined
          }
          required
        />
        <div>
          <Button type="submit">CREATE</Button>
          <Text elementType="p">
            Have an account? <Link href="/login">Login.</Link>
          </Text>
        </div>
      </Form>
    </main>
  );
}
