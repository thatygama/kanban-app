export default [
  {
    path: '/',
    component: 'pages/auth/login.vue',
  },
  {
    path: '/registrar',
    component: 'pages/auth/register.vue',
  },
  {
    path: '/tarefas',
    component: 'pages/tasks/index.vue',
    meta: { middleware: 'auth' }
  },
  {
    path: '/tarefas/tarefa/:id?',
    component: 'pages/tasks/task.vue',
    props: true,
    meta: { middleware: 'auth' }
  },
  {
    path: '*',
    component: 'pages/notFound.vue',
  },
];
