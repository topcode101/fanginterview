const express = require('express');

const ONEDAY = 3600 * 24;
/**
 * UserRouter
 */
class InterviewRouter {
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
    this.router.post('/interview', async (req, res, next)=>{
      try {
        const interviewService = this.app.getService('Interview');
        //verify user/pass

        const {website, user, pass, id, content} = req.body;
        interviewService.add(website, id, content);
        res.send(JSON.stringify({user}));
      } catch (err) {
        res.send(JSON.stringify({
          error: err.message,
        }));
      }
    });

    // if user exist
    this.router.get('/interview', async (req, res)=>{
      const { website, user, pass, id } = req.query;
      const userService = this.app.getService('Interview');
      const interviewObject = await userService.find(website, id);
      let ret : { found:boolean } = {
        found: false
      }
      if (interviewObject) {
        ret.found = true;
      }

      res.json(ret);
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


export default InterviewRouter;
