import HeaderDashboard from '@/ui/header/HeaderDashboard';
import { HeadingDashboard } from '@/ui/heading/HeadingDashboard';
import { Fragment } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <HeaderDashboard />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </div>
    </Fragment>
  );
}
