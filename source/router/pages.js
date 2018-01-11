import Dashboard from '@/components/dashboard';

export default [
  {
    path: '/dashboard',
    name: 'main-dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  }
];
