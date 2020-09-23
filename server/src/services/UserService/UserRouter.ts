const express = require('express');

const ONEDAY = 3600 * 24;
/**
 * UserRouter
 */
class UserRouter {
  app: any
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
    this.router.post('/user/login', async (req, res, next)=>{
      try {
        const userService = this.app.getService('User');
        const {username, password} = req.body;
        const {token} = await userService.login(username, password);
        const {user, type} = await userService.find(username);
        res.cookie('access_token', token, {expire: ONEDAY * 7 + Date.now()});
        res.send(JSON.stringify({user, type}));
      } catch (err) {
        res.send(JSON.stringify({
          error: err.message,
        }));
      }
    });

    // register a new user
    this.router.post('/user/register', async (req, res)=>{
      const userService = this.app.getService('User');
      const {username, password, type} = req.body;
      try {
        await userService.register(username, password, type, req.body);
        res.json({succeeded: true});
      } catch (err) {
        res.json({error: err.message});
      }
    });

    // if user exist
    this.router.get('/user/:username', async (req, res)=>{
      const {username} = req.params;
      const userService = this.app.getService('User');
      const userModel = await userService.find(username);
      const publicInfo = {
      };
      Object.keys(userModel).forEach((k)=>{
        if (k.startsWith('public-')) {
          publicInfo[k] = userModel[k];
        }
      });
      res.json({existed: !!userModel,
        username,
        ...publicInfo,
      });
    });

    // this is only used for dev mode
    this.router.post('/user/decodeToken', async (req, res)=>{
      const userService = this.app.getService('User');
      const {token} = req.cookies;
      try {
        userService.verifyToken(token);
      } catch (err) {
        res.send({
          error: err.message,
        });
      }
    });

    // get myslef info
    this.router.get('/user', async (req, res)=>{
      const userService = this.app.getService('User');
      // read the token from header or url
      const token = req.headers['x-access-token'] || req.query.token;
      if (!token) {
        res.send({
          error: 'Need to sign in.',
        });
      }
      try {
        const decoded = userService.verifyToken(token);
        const subject = decoded.subject;
        const [name, type] = subject.split(',');
        void(type);
        const userModel = userService.find(name);
        delete userModel['pass']; // never send back password
        res.send(userModel);
      } catch (err) {
        res.send({
          error: err.message,
        });
      }
    });
  }

  /**
   * @return {*} router
   */
  getRouter() {
    return this.router;
  }
}


export default UserRouter;
