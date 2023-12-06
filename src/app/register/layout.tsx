import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register | Todo App'
};

export default function RegisterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
