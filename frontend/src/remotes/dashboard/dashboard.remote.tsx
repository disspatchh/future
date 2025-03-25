import React, { Suspense } from 'react';

const DashboardLazy = React.lazy(() => import('remoteDashboard/App'));
export const Dashboard = () => (
  <Suspense fallback={<div>идёт загрузка...</div>}>
    <DashboardLazy />
  </Suspense>
);
