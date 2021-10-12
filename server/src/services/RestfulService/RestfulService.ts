import BaseService from '../ServiceBase';
const http = require('http');
const ExpressServer = require('./ExpressServer');
import config from '../../config';
import ApolloGQLServer from './ApolloServer';

/**
 * WWW Service
 */
class RestfulService extends BaseService {
  httpServer: any
  app: object
  expressServer: any
  expressApp: any
  /**
   *
   * @param {*} APP
   */
  constructor(APP) {
    super('rest', APP);
    this.app = APP;
  }

  /**
   * @return {Integer} service property
   */
  getPriority() {
    // need to be uploaded first because the log need this.
    return 2;
  }
  /**
   * init
   */
  async initialization() {
    this.expressServer = new ExpressServer(this.app);
    await this.expressServer.initialization();
    this.expressApp = this.expressServer.getExpressAppInst();
    this.expressApp.set('port', config.httpServerPort);
    this.httpServer = http.createServer(this.expressApp);

    // article on setup apollo: https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express
    const apollo = new ApolloGQLServer(this.app, this.expressApp, this.httpServer);
    await apollo.initialization()
  }

  /**
   *
   * @param {*} router
   * @return {*}
   */
  registerRouter(router) {
    return this.expressServer.registerRouter(router);
  }

  /**
   * @return {*}
   */
  getAllRoutes() {
    return this.expressServer.getAllRoutes();
  }

  /**
   * start WWWService server
   */
  start() {
    this.expressServer.preStartServer();
    this.httpServer.listen(config.httpServerPort);
    console.warn(`Http Server is listing on port ${config.httpServerPort} ...`);
  }
}

export default RestfulService;
