import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Todo App'
};

export default function LoginLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
