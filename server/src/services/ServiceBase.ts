/**
 *
 */
class BaseService {
  serviceName: string
  /**
  *
  * @param {*} serviceName
  * @param {*} APP
  */
  constructor(serviceName, APP) {
    if (APP.constructor.name !== 'APP') {
      throw Error(`should passing APP object in Service ${serviceName}`);
    }
    this.serviceName = serviceName;
    console.log(` ...creating "${serviceName}" Service.`);
  }

  /**
   * @return {*}
   */
  getName() {
    return this.serviceName;
  }

  /**
   *
   */
  initialization() {
    throw Error(`need to implement initialization() in` +
      `Service ${this.serviceName}`);
  }
}
export default BaseService;
