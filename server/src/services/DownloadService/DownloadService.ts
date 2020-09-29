
import BaseService from '../ServiceBase';
// import DynamicLoader from '../../utils/DynamicLoader';
import config from '../../config';
import DownloadRouter from './DownloadRouter';
const fs = require('fs');

/**
 *
 */
class DownloadService extends BaseService {
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
    super('Download', APP);
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

    const userRouter = new DownloadRouter(this.app);
    this.app.getService('rest').registerRouter(userRouter.getRouter());
  }


  /**
   * @return {Integer} the priority to init this service
   */
  getPriority() {
    return 10;
  }

  async prepareForFile(type, company, start_date, end_date) {
    const interviewService = this.app.getService('Interview');
    const interviewObject = await interviewService.findAll(type, company, start_date, end_date);
    let contentStr = '';
    interviewObject.result.forEach(item=>{
      contentStr += 
`
-----------------------
公司：${item.company}
原始帖子：${item.origHref}
发布时间：${item.publishDate}
${item.content}
`
    })
    const filename = `${company}_${type}_.txt`;
    return new Promise((res, rej)=>{
      fs.writeFile(config.cacheDocsDir + '/' + filename, contentStr, function(err) {
        if(err) {
            return rej(err);
        }
        res({
          href: `/download/${filename}`
        });
      });
    });
 
  }

}

export default DownloadService;
