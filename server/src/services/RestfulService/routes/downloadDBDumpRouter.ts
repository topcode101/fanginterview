const fs = require('fs');
const path = require('path');
const createError = require('http-errors');
const express = require('express');
/**
 * ConfigPageRouter
 */
class DownloadRouter {
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
    this.router.get('/db_dump.gz', function(req, res, next) {
      // This is the root dir where the db dump file resides IN DOCKER
      const root = '/db_dump';
      const dumpFileName = 'db_dump.gz';
      if (!fs.existsSync(path.join(root, dumpFileName))) {
        next(createError(404));
      } else {
        const options = {
          root: root,
          headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
          },
        };

        res.sendFile(dumpFileName, options, function(err) {
          if (err) {
            next(new Error('Error occurred'));
          } else {
            console.log('Sent:', dumpFileName);
          }
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


export default DownloadRouter;
