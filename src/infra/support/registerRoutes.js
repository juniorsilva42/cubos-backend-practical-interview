import bootModule from './bootModule';

export const registerRoutes = ({ router, routes }) => {
  if (routes) {
    const routerInstance = router;
    
    routes.map((route) => {
      const { path, module } = route;

      if (routerInstance) {
        routerInstance.use(`/${path}`, bootModule(module).router);
      }
    });
  }
};