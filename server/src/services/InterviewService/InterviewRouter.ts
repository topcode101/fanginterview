const express = require('express');

function extractTypeCompany(content) {
  const firstLine = content.split('\n')[0];
  if (firstLine) {
    try {
      const words = firstLine.split(' ');
      
      let type = 'uncategorized';
      switch(words[1]) {
        case `码农类General`:
          type = 'SoftwareEng';
          break;
        case 'DataEng':
          type = 'DataEng';
          break;
        case '分析|数据科学类':
          type = 'DataEng';
          break;
        case 'MachineLearningEng':
          type = 'DataEng';
          break;
        default:
          // code block
      }

      //let type = words[1] === `码农类General` ? 'SoftwareEng' : words[1] === 'DataEng' ? 'DataEng': 'uncategorized';
      let company = words[3].split('@')[1];
      return {type, company};
    } catch( err) {
      return {};
    }

  }
  return {};
}

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
        //todo: verify user/pass

        const {website, user, pass, id, content, origHref, publishDate} = req.body;
        const {type, company} = extractTypeCompany(content);
        const pDate = new Date(publishDate);
        interviewService.add(website, id, content, type, company, pDate, origHref);
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
  }

  /**
   * @return {*} router
   */
  getRouter() {
    return this.router;
  }
}


export default InterviewRouter;
