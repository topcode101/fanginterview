const createError = require('http-errors');
import express, {Request, Response} from 'express';
//const express = require('express');
import config from '../../config';
import DynamicLoader from '../../utils/DynamicLoader';
import fs from 'fs';
const cookies = require('cookie-parser');

// const downloadDBDumpRouter = require('./routes/downloadDBDumpRouter');
// const HelloWorldRouter = require('./routes/HelloWorldRouter');
// const HouseDataRouter = require('./routes/HouseDataRouter');
// const NewsDataRouter = require('./routes/NewsDataRouter');
// const SchoolDataRouter = require('./routes/SchoolDataRouter');
const path = require('path');

/**
 * ExpressServer
 */
class ExpressServer {
  app: object
  expressApp: any
  //expressApp: Express.Application  //todo: shoud it be like express ? 

  /**
   *
   * @param {*} app
   */
  constructor(app) {
    this.app = app;
  }

  /**
   * Dynamiclly load all routers
   */
  _loadRouters() {
    const allRouters = DynamicLoader.loadModulesFromPath(__dirname + '/routes',
        (filename)=>{
          if (filename.endsWith('Router.js')) {
            return true;
          }
          return false;
        });
    allRouters.forEach((M)=>{
      const newRouter = new M(this.app);
      this.expressApp.use('/api', newRouter.getRouter());
    });
  }

  /**
   * init config
   */
  async initialization() {
    this.expressApp = express();
    this.expressApp.use(function (req, res, next) {
      console.log('ACCESS', req.url, req.body) // populated!
      next()
    })

    function auth(req, res, next) {
      console.log('auth: ' + req.url)
      // var objUser = ba(req)
      // if (objUser === undefined || objUser.name !== "john" || objUser.pass !== "1234") {
      //     res.set("WWW-Authenticate", "Basic realm=Authorization Required")
      //     res.status(401).end()
      // } else { next() }
      next()
    }
    
    this.expressApp.use("/advanced", auth, express.static(config.wwwRoot + '/advanced'))
    this.expressApp.use("/all-articles", auth, express.static(config.wwwRoot + '/all-articles'))
    this.expressApp.use("/articles", auth, express.static(config.wwwRoot + '/articles'))

    this.expressApp.use(express.static(config.wwwRoot))

    // console.log(`    ... use ${config.wwwRoot} as static root`);
    // this.expressApp.use(express.static(config.wwwRoot));

    if (!fs.existsSync(config.cacheDocsDir)) {
      fs.mkdirSync(config.cacheDocsDir, {recursive: true});
    }
    console.log(`    ... use ${config.cacheDocsDir} as static download root`);
    this.expressApp.use('/download/', express.static(config.cacheDocsDir));

    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({extended: false}));
    this.expressApp.use(cookies());

    this._loadRouters();
  }

  /**
      * Converts Express 4 app routes to an array representation suitable for easy parsing.
      * @arg {Array} stack An Express 4 application middleware list.
      * @return {Array} An array representation of the routes in the form [ [ 'GET', '/path' ], ... ].
      */
  getRoutes(stack) {
    const routes = (stack || [])
    // We are interested only in endpoints and router middleware.
        .filter((it) => it.route || it.name === 'router')
    // The magic recursive conversion.
        .reduce((result, it) => {
          if (! it.route) {
            // We are handling a router middleware.
            const stack = it.handle.stack;
            const routes = this.getRoutes(stack);

            return result.concat(routes);
          }

          // We are handling an endpoint.
          const methods = it.route.methods;
          const path = it.route.path;

          const routes = Object
              .keys(methods)
              .map((m) => [m.toUpperCase(), path]);

          return result.concat(routes);
        }, [])
    // We sort the data structure by route path.
        .sort((prev, next) => {
          const [prevMethod, prevPath] = prev;
          const [nextMethod, nextPath] = next;
          if (prevPath < nextPath) {
            return -1;
          }

          if (prevPath > nextPath) {
            return 1;
          }

          return 0;
        });

    return routes;
  }
  /**
  * Converts Express 4 app routes to a string representation suitable for console output.
  * @arg {Object} app An Express 4 application
  * @return {string} A string representation of the routes.
  */
  getAllRoutes() {
    const entryPoint = this.expressApp._router && this.expressApp._router.stack;
    const routes = this.getRoutes(entryPoint);

    const info = routes
        .reduce((result, it) => {
          const [method, path] = it;

          return result + `${method.padEnd(6)} ${path}\n`;
        }, '');

    return info;
  }
  /**
   * @return {*} expressApp
   */
  getExpressAppInst() {
    return this.expressApp;
  }

  /**
   *
   * @param {*} router
   */
  registerRouter(router) {
    this.expressApp.use('/api', router);
  }

  /**
   * we register these routers at the end because the order to register router matters..
   * these routers are for static website resources.
   */
  preStartServer() {
    this.expressApp.get('/*', function(req, res) {
      if (req.url.substring(req.url.length-4) === '.js/') {
        //todo : this is a bug a to me..
        // not sure why it ends up this case.
        res.sendFile(path.join(config.wwwRoot, req.url.substring(0, req.url.length - 1)));
      } else {
        res.sendFile(path.join(config.wwwRoot, 'index.html'));
      }

    });
    // app.use('/admin', [ensureAuthenticated, express.static(path.join(__dirname, 'admin'))]);


    // catch 404 and forward to error handler
    this.expressApp.use(function(req, res, next) {
      console.log('catch 404:', req.url);
      next(createError(404));
    });


    this.expressApp.use(function(err, req: Request, res: Response, next) {
      console.log('error handler');
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.send(err.message);
    });
  }
}


module.exports = ExpressServer;
