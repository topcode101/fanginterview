const express = require('express');
/**
 * ConfigPageRouter
 */
class ConfigPageRouter {
  app: object
  router: any
  /**
   *
   * @param {*} app
   */
  constructor(app) {
    this.app = app;
    this.router = express.Router();
    this.initialiazation();
  }

  /**
   * init
   */
  initialiazation() {
    /* GET build result listing. */
    this.router.get('/hello', (req, res, next)=>{
      res.send(JSON.stringify({
        hello: 'world',
      }));
    });
  }

  /**
   * @return {*} router
   */
  getRouter() {
    return this.router;
  }
}


export default ConfigPageRouter;
