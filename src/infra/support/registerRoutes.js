import bootModule from './bootModule';

/**
 * Function itegrate over object of routes and dispatch with an Router Express instance
 *
 * @param {router} Router Express instance
 * @param {routes} Array of routes to dispatch
 *
 * @return {BootModule} instance
 */
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

export default registerRoutes;
