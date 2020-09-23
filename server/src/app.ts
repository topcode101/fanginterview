import DynamicLoader from './utils/DynamicLoader';
import config from './config';
import Utils from './utils/Utils';
/**
 * Main APP Class
 */
class APP {
  services: Object

  /**
   * constructor
  */
  constructor() {
    this.services = {};
    console.log(Utils.Colors['FgYellow'] + 'node version: ' + process.version + Utils.Colors['Reset']);
    // todo: should not load from here:
    process.env.GOOGLE_APPLICATION_CREDENTIALS = config.GOOGLE_APPLICATION_CREDENTIALS;
  }

  /**
  * register a service
  * @param {*} serviceName
  * @param {*} serviceInst
  */
  _registerService(serviceName, serviceInst) {
    this.services[serviceName] = serviceInst;
  }

  /**
   * aaa
   * @param {*} serviceName
   *
   * @return {*}
   */
  getService(serviceName) {
    return this.services[serviceName];
  }

  /**
   * Dynamiclly load all webEngines
   */
  _loadServices() {
    // const realtor = require('../webEngines/Realtorca');
    // console.log(realtor.default)
    // new realtor.default(APP);
    const allServices = DynamicLoader.loadModulesFromPath(config.servicesPath,
        (filename)=>{
          if (filename === 'ServiceBase.js') {
            return false;
          }
          if (filename.endsWith('Service.js')) {
            return true;
          }
          return false;
        });
    allServices.forEach((M)=>{
      const newServiceInst = new M(this);
      this._registerService(newServiceInst.getName(), newServiceInst);
    });
  }

  /**
   * start the app.
   * @param {object} options
   */
  async run(options) {
    console.log('==== loading Services ====');
    this._loadServices();

    const serviceList = [];
    for (const serviceName in this.services) {
      if (this.services.hasOwnProperty(serviceName)) {
        // todo:  each service may have dependencies on others. e.g. Database
        serviceList.push(this.services[serviceName]);
      }
    }
    serviceList.sort((a, b)=>{
      const aPriority = a.getPriority? a.getPriority() : 5;
      const bPriority = b.getPriority? b.getPriority() : 5;
      return aPriority - bPriority;
    });

    console.log('==== initializing Services ====');
    for (let i = 0; i < serviceList.length; i++) {
      if (serviceList[i].initialization) {
        console.log(` ... init Service '${serviceList[i].getName()}'`);
        await serviceList[i].initialization();
      }
    }

    if (options.livetest) {
      await this.getService('Test').startLiveTests(options.grepCase);
      // process.exit(0);
    } else {
      Utils.printTable(this.getService('rest').getAllRoutes());
      this.getService('rest').start();
      //this.getService('Scheduler').start();
    }
  }
}

interface MyObjLayout {
    livetest: Boolean;
    grepCase?: string
}
const options: MyObjLayout = {
    livetest: false
};

if (process.argv && process.argv.length > 2) {
  if (process.argv[2] === 'livetest') {
    options.livetest = true;
    options.grepCase = process.argv[3];
  }
}

const app = new APP();
app.run(options);
