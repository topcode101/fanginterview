import BaseService from '../ServiceBase';
const mongo = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = mongo.MongoClient;
const crypto = require('crypto');
// import DynamicLoader from '../../utils/DynamicLoader';
import config from '../../config';
import Utils from '../../utils/Utils';
// import {timingSafeEqual} from 'crypto';    ???? todo::: maybe I deleted something...

/**
 * Database Service
 */
class DatabaseService extends BaseService {
  _dbMap: object
  app: any
  client: any
  /**
   *
   * @param {*} APP
   */
  constructor(APP) {
    super('Database', APP);
    this._dbMap = {};
    this.app = APP;
  }

  /**
   * init
   */
  async initialization() {
    // Connection URL
    const url = config.databaseUrl;
    let tryTimes = 10;
    let succeed = false;
    while (tryTimes > 0) {
      try {
        this.client = await MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
        succeed = true;
        break;
      } catch (err) {
        console.warn('Cannot connect:' + err);
        tryTimes--;
        await Utils.sleep(1500);
      }
    }
    if (!succeed) {
      console.error('!! Failed to connect:' + url);
    }
  }

  /**
   *
   * @param {string} dbName
   * @param {string} collectionName
   * @param {array} data - a list data we want to insert
   * @example
   *  data: [
   *    {
   *      key: {
   *        key1: value1,
   *        key2: value2
   *      },
   *      rawData: 'raw data1'
   *    },
   *    {
   *      key: {
   *        key3: value3,
   *        key4: value4
   *      },
   *      rawData: 'raw data2'
   *    }
   *  ]
   *
   * Data structure in db:
   * {
   *    key1: value1,
   *    key2: value2,
   *    rawData: 'raw data1',
   *    createTime: 1553568269579,
   *    updateTime: 1553568269579
   * },
   * {
   *    key3: value3,
   *    key4: value4,
   *    rawData: 'raw data2',
   *    createTime: 1553568269580,
   *    updateTime: 1553568269580
   * }
   * @return {Promise<numner>} return a promise resolved with the number of the inserted record(1 or 0)
   */
  //   async insert(dbName, collectionName, data) {
  //     if (!dbName || !collectionName || !data || data.length === 0) return 0;

  //     const db = this.getDB(dbName);

  //     const dataToInsert = [];
  //     const ids = [];
  //     for (const oneRecord of data) {
  //       const key = oneRecord.key || {};
  //       if (typeof key !== 'object') {
  //         throw Error('key must be an object.');
  //       }
  //       const rawData = oneRecord.rawData || '';
  //       const createTime = Date.now();
  //       const updateTime = Date.now();
  //       const _id = oneRecord.key._id || this.createMD5Hash(rawData);
  //       const found = await db.collection(collectionName).find({_id}).toArray();
  //       if (found.length === 0 && ids.indexOf(_id) === -1) {
  //         ids.push(_id);
  //         dataToInsert.push({_id, ...key, rawData, createTime, updateTime});
  //       } else {
  //         this.logger.warn(`record already exists. (key: ${JSON.stringify(key)})`);
  //       }
  //     }
  //     if (dataToInsert.length === 0) {
  //       return 0;
  //     }
  //     const result = await db.collection(collectionName).insertMany(dataToInsert);
  //     return result.insertedCount;
  //   }

  /**
   *
   * @param {string} dbName
   * @param {string} collectionName
   * @param {array} data - a list data we want to insert
   *
   */
  async insert(dbName, collectionName, data) {
    if (!dbName || !collectionName || !data ) return 0;

    const db = this.getDB(dbName);

    const createTime = Date.now();
    const updateTime = Date.now();
    let returnedResult = null;
    try {
      // insert
      const result = await db.collection(collectionName).insertOne({...data, createTime, updateTime});
      const {insertedCount, insertedId} = result;
      returnedResult = {insertedCount, insertedId};
    } catch (error) {
      console.log(error);
    }
    return returnedResult;
  }

  /**
   *
   * @param {string} dbName
   * @param {string} collectionName
   * @param {string} key - which record we want to update
   * @param {array} data - data we want to update
   *
   */
  async update(dbName, collectionName, key, data) {
    if (!dbName || !collectionName || !key || !data) return 0;

    const db = this.getDB(dbName);

    const updateTime = Date.now();
    let modifiedCount = 0;
    try {
      // update
      const result = await db.collection(collectionName).updateOne(key, {$set: {...data, updateTime}});
      modifiedCount = result.modifiedCount;
    } catch (error) {
      console.log(error);
    }
    return modifiedCount;
  }

    /**
   *
   * @param {string} dbName
   * @param {string} collectionName
   * @param {object} key - which record we want to find
   *
   */
  async findLatestOne(dbName, collectionName, key) {
    if (!dbName || !collectionName || !key) return 0;

    const db = this.getDB(dbName);
    let result = null;
    try {
      result = await db.collection(collectionName).findOne(key, {sort:{$natural:-1}});
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  /**
   *
   * @param {string} dbName
   * @param {string} collectionName
   * @param {object} key - which record we want to find
   *
   */
  async findOne(dbName, collectionName, key) {
    if (!dbName || !collectionName || !key) return 0;

    const db = this.getDB(dbName);
    let result = null;
    try {
      result = await db.collection(collectionName).findOne(key);
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  /**
   *
   * @param {string} dbName
   * @param {string} collectionName
   * @param {string} id - which record we want to find
   *
   */
  async findByID(dbName, collectionName, id) {
    if (!dbName || !collectionName || !id) return undefined;
    if (typeof id !== 'string') {
      throw new Error('id should be string');
    }

    const db = this.getDB(dbName);
    let result = null;
    try {
      result = await db.collection(collectionName).findOne(ObjectId(id));
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  /**
   * @param {string} dbName
   * @param {string} collectionName
   * @param {object} key - key to find the document we want to delete
   * @return {Promise<number>} return a promise resolved with the number of the deleted record(1 or 0)
   */
  async delete(dbName, collectionName, key) {
    if (!dbName || !collectionName || !key) return 0;

    const db = this.getDB(dbName);
    let deletedCount = 0;
    try {
      const result = await db.collection(collectionName).deleteOne(key);
      deletedCount = result.deletedCount;
    } catch (error) {
      console.log(error);
    }
    return deletedCount;
  }

  /**
   * @param {string} dbName
   * @param {string} collectionName
   * @param {object} [key] - key to find the documents
   * @param {number} [currentPage = 1] - current page
   * @param {number} [maxRecordsPerPage = config.MAX_RECORDS_PER_PAGE_DEFAULT] - max records per page
   * @return {Promise<object>} return a promise resolved with the found result
   */
  async find(dbName, collectionName, key = {}, currentPage = 1, maxRecordsPerPage = config.MAX_RECORDS_PER_PAGE_DEFAULT) {
    if (!dbName || !collectionName) return [];
    currentPage = Math.max(currentPage, 1);
    maxRecordsPerPage = Math.min(maxRecordsPerPage, config.MAX_RECORDS_PER_PAGE_MAX);
    let returnedResult = null;
    try {
      const db = this.getDB(dbName);
      const totalRecords = await db.collection(collectionName).countDocuments(key);
      const totalPages = Math.ceil(totalRecords / maxRecordsPerPage);
      currentPage = Math.min(currentPage, totalPages);
      returnedResult = {totalRecords, totalPages, currentPage};
      if (totalRecords === 0) {
        returnedResult.result = [];
      } else {
        const result = await db.collection(collectionName).find(key).skip((currentPage - 1) * maxRecordsPerPage).limit(maxRecordsPerPage).toArray();
        returnedResult.result = result;
      }
    } catch (error) {
      console.log(error);
    }
    return returnedResult;
  }

  /**
   * @param {string} dbName
   * @return {Db} Db instance
   */
  getDB(dbName) {
    if (!dbName) return null;
    if (!this._dbMap[dbName]) {
      this._dbMap[dbName] = this.client.db(dbName);
    }
    return this._dbMap[dbName];
  }

  /**
   * @return {Integer} the priority to init this service
   */
  getPriority() {
    return 0;
  }

  /**
   *
   * @param {*} id
   * @return {String} mongodb item id
   */
  getObjectId(id) {
    return new mongo.ObjectID(id);
  }

  /**
   * Create MD5 hash of the given string
   * @param {string} data
   * @return {string} md5 hash
   */
  createMD5Hash(data) {
    return crypto.createHash('md5').update(data).digest('hex');
  }
}

export default DatabaseService;
