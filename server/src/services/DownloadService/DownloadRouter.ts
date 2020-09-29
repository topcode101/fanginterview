const express = require('express');
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

    // if user exist
    this.router.get('/downloadFile', async (req, res)=>{
      const { type, user, pass, company, start_date, end_date } = req.query;
      const downloadService = this.app.getService('Download');
      const ret = await downloadService.prepareForFile(type/* type */, company, start_date, end_date);
      res.json(ret);
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
