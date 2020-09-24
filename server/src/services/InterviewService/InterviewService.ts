
import BaseService from '../ServiceBase';
// import DynamicLoader from '../../utils/DynamicLoader';
import config from '../../config';
// const crypto = require('crypto');
const jwt = require('jsonwebtoken');

import InterviewRouter from './InterviewRouter';

enum WebSiteType {
  YiMuSenFenDi = '1mu3fendi'
}

/**
 *
 */
class InterviewService extends BaseService {
  app: any
  dbName: string
  collectionName: string
  logger: any
  dbService: any
  /**
   *
   * @param {*} APP
   */
  constructor(APP) {
    super('Interview', APP);
    this.app = APP;
    this.dbName = config.appName;
    this.collectionName = 'interview';
  }

  /**
   *
   */
  async initialization() {
    this.logger = console;
    this.dbService = this.app.getService('Database');

    const userRouter = new InterviewRouter(this.app);
    this.app.getService('rest').registerRouter(userRouter.getRouter());
  }


  /**
   * @return {Integer} the priority to init this service
   */
  getPriority() {
    return 10;
  }

  /**
   *
   * @param {*} username
   */
  async find(website, id) {
    return this.dbService.findOne(this.dbName, this.collectionName, {website, id});
  }


  /**
   *
   * @param {*} username
   * @param {*} password
   * @param {*} type
   * @param {Object} otherinfo
   */
  async add(website: WebSiteType, id: string, content: string, type, company, publishDate, origHref) {
    const interviewObject = await this.find(website, id);
    if (interviewObject) {
      throw new Error(`already added: website '${website}', id '${id}'`);
    } else {
      await this.dbService.insert(this.dbName, this.collectionName, {
        website, id, type, company, publishDate, content, origHref
      });
    }
  }

}

export default InterviewService;
