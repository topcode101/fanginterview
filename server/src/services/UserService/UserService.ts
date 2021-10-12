
import BaseService from '../ServiceBase';
// import DynamicLoader from '../../utils/DynamicLoader';
import config from '../../config';
// const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library')


import UserRouter from './UserRouter';
/**
 *
 */
class UserService extends BaseService {
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
    super('User', APP);
    this.app = APP;
    this.dbName = config.appName;
    this.collectionName = 'users';
  }

  /**
   *
   */
  async initialization() {
    this.logger = console;
    this.dbService = this.app.getService('Database');

    const userRouter = new UserRouter(this.app);
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
  async find(username) {
    if (username === 'admin') {
      return {
        user: 'admin',
        pass: 'ottawa101#1',
        type: 'admin',
      };
    }
    return this.dbService.findOne(this.dbName, this.collectionName, {name: username});
  }

  async delete(username) {
    // check currentUserName
     this.dbService.delete(this.dbName, this.collectionName, {name: username});
  }

  /**
   *
   * @param {*} email
   */
   async findByEmail(email) {
    return this.dbService.findOne(this.dbName, this.collectionName, {email: email});
  }

  /**
   *
   * @param {*} password
   * @return {*}
   */
  encrypt(password) {
    return password;
    // return crypto.createHmac('sha1', config.jwtSecret)
    //   .update(password)
    //   .digest('base64');
  }

  /**
   *
   * @param {*} username
   * @param {*} password
   * @param {*} role
   * @param {Object} otherinfo
   */
  async register(username, password, role, source='NORMAL', otherinfo={}) {
    if (source === 'NORMAL') {
      if(!password) {
        throw new Error('password cannot be empty');
      }
    }

    if (!username) {
      throw new Error('user cannot be empty');
    }
    
    if (role === 'admin') {
      throw new Error('admin user registration is not allowed.');
    }
    const user = await this.find(username);
    if (user) {
      throw new Error('already registered.');
    } else {
      const encPass = this.encrypt(password);
      const UserModel = {
        ...otherinfo,
        name: username,
        pass: encPass,
        role: role || 'normal',
        source: source
      };
      await this.dbService.insert(this.dbName, this.collectionName, UserModel);
    }
  }

  /**
   *
   * @param {*} username
   * @param {*} password
   */
  async verifyUserPass(username, password) {
    const userModel = await this.find(username);
    if (!userModel) {
      throw new Error(`User "${username}" does not exist.`);
    } else if (userModel.source == 'GOOGLE') {
      throw new Error(`Please sign in from google.`);
    }else {
      // verifyUserPass password
      const encPass = this.encrypt(password);
      if (userModel.pass !== encPass) {
        throw new Error(`Password is wrong.`);
      }
      return userModel;
    }
  }

  /**
   *
   * @param {*} username
   * @param {*} password
   * @return {Object} { token }
   */
  async login(username, password, role='normal') {
    try {
      const userModel = await this.verifyUserPass(username, password);
      return new Promise((resolve, reject)=>{
        jwt.sign(
            {
              username: userModel.name,
              password: userModel.pass,
              role: userModel.role,
            },
            config.jwtSecret,
            {
              expiresIn: '7d',
              issuer: 'fanginterview',
              subject: `${userModel.name},${userModel.type}`,
            }, (err, token) => {
              if (err) reject(err);
              resolve(
                  {
                    token,
                  });
            });
      });
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }

  /**
   *
   * @param {*} token
   * @return {Object}f
   */
  verifyToken(token) {
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  }

  async _create_jwt_token(username, password, role, source): Promise<{token: String}>{
    return new Promise((resolve, reject)=>{
      jwt.sign(
        {
          username: username,
          password: password,
          role: role,
        },
        config.jwtSecret,
        {
          expiresIn: '7d',
          issuer: 'fanginterview',
          subject: `${username},${role},${source}`,
        }, (err, token) => {
          if (err) reject(err);
          resolve(
              {
                token,
              });
        });
    });
  }

  async loginGoogleAccount(googleIdToken): Promise<String> {    
    const client = new OAuth2Client(config.googleClientId)
    const ticket = await client.verifyIdToken({
        idToken: googleIdToken,
        audience: config.googleClientId
    });

    
    const { name, email, picture } = ticket.getPayload();    
    const user = await this.findByEmail(email);
    if (!user) {
      console.log('need to create the user')
      const username = email;
      const password = null;
      const role = 'normal';
      const source = 'GOOGLE';
      const otherinfo = {
        'email': email
      }
      await this.register(username, password, role, source, otherinfo);
      return 'Done. Created User.'
    }
    const jwt = await this._create_jwt_token(email, null, 'normal', 'GOOGLE');
    return jwt.token;
  }

}

export default UserService;
