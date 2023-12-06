import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Todo App'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
