/**
 *
 * Utils
 */

const nodemailer = require('nodemailer');

/**
 * Utils
 */
class Utils {
  public static officialEmail: string
  public static Colors: object

  /**
   * 
   * @param strs 
   */
  static printTable(strs) {
    const strList = strs.split('\n');
    strList && strList.forEach(str=>{
      console.log(str)
    });
  }

  /**
   *
   * @param {*} dict
   * @return {*} list
   */
  static toList(dict) {
    return Object.keys(dict).map(function(key) {
      return [key, dict[key]];
    });
  }

  /**
   * return lowerBound
   * @param {*} list
   * @param {*} val
   * @param {*} getValCb
   * @return {*} index
   */
  static lowerBound(list, val, getValCb) {
    let l = 0; let r = list.length - 1;
    let ret = r + 1;
    while (l <= r) {
      const m = Math.round(l + (r - l)/2);
      if (!getValCb) {
        getValCb = (val)=>val;
      }
      if (getValCb(list[m]) < val) {
        l = m + 1;
      } else {
        ret = m;
        r = m - 1;
      }
    }
    return ret;
  }

  /**
   *
   * @param {*} d
   * @return {string}
   */
  static secondsToHms(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
  }

  /**
   * This function generates random integer between two numbers low (inclusive) and high (exclusive) ([low, high))
   * @param {*} low
   * @param {*} high
   * @return {integer} the number between [low, high)
   */
  static randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  }

  /**
   * @param {Integer} ms ms
   * @return {*} a promise that will be resolved in @ms ms.
   */
  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * will try connect url (in options) multiple times by using different requests.
   * @param {*} options
   * @param {*} rList
   * @param {function} validationCb verify if the returned data is what we want.
   * @return {*} result.
   */
  static async requestMultipleTimes(options, rList, validationCb) {
    rList = rList || [];
    for (let i = 0; i < rList.length; i++) {
      try {
        const r = rList[i];
        const data = await r(options);
        if (validationCb) {
          if (validationCb(data)) {
            return data;
          } else {
            console.warn(`Validation failed..(proxy: ${rList[i]._proxy})`);
          }
        }
        return data;
      } catch (err) {
        console.warn(`Trying failed:(proxy: ${rList[i]._proxy}) ${err}`);
      }
    }
  }

  /**
   * Find the similarity of two string
   * @param {string} str1
   * @param {string} str2
   * @return {number} the similarity
   */
  static findSimilarity(str1, str2) {
    let maxSimilarity = 0;
    if (str1 && str2) {
      const len1 = str1.length;
      const len2 = str2.length;
      if (len1 === len2) {
        maxSimilarity = Utils.levenshtein(str1, str2);
      } else {
        const shorterStr = len1 > len2 ? str2 : str1;
        const longerStr = len1 > len2 ? str1 : str2;
        const shorterLen = shorterStr.length;
        const longerLen = longerStr.length;
        for (let i = 0; i + shorterLen <= longerLen; i++) {
          const similarity = Utils.levenshtein(longerStr.substring(i, i + shorterLen), shorterStr);
          maxSimilarity = similarity > maxSimilarity ? similarity : maxSimilarity;
        }
      }
    }
    return maxSimilarity;
  }

  /**
   * Find the similarity of two string, use Levenshtein Distance algorithm
   * @param {string} str1
   * @param {string} str2
   * @return {number} the similarity
   */
  static levenshtein(str1, str2) {
    if (str1 && str2) {
      str1 = str1.toLowerCase();
      str2 = str2.toLowerCase();
      const len1 = str1.length;
      const len2 = str2.length;

      const dif = [];
      for (let i = 0; i <= len1; i++) {
        dif[i] = [];
      }
      // 赋初值
      dif[0][0] = 0;
      for (let i = 1; i <= len1; i++) {
        dif[i][0] = i;
      }
      for (let i = 1; i <= len2; i++) {
        dif[0][i] = i;
      }

      let temp = 0;
      for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
          if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
            temp = 0;
          } else {
            temp = 1;
          }
          dif[i][j] = Math.min(dif[i - 1][j - 1] + temp, dif[i][j - 1] + 1, dif[i - 1][j] + 1);
        }
      }
      // 计算相似度
      return 1 - dif[len1][len2] / Math.max(len1, len2);
    }
    return 0;
  }

  /**
   *
   * @param {*} subject
   * @param {*} content
   * @param {*} fromName
   * @param {*} fromEmail
   * @param {*} toEmail
   * @return {*}
   */
  static sendEmail(subject, content, fromName, fromEmail, toEmail = Utils.officialEmail) {
    console.log(`sending email to ${toEmail}`);
    const transporter = nodemailer.createTransport({
      secure: true,
      host: 'smtp.sendgrid.net',
      auth: {
        user: 'apikey',
        pass: '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',
      },
      // service: 'gmail',
      // auth: {
      //     user: 'fanginterview@gmail.com',
      //     pass: 'fanginterview2020'
      // }
    });

    const mailOptions = {
      from: `${fromName} <${fromEmail}>`,
      to: toEmail,
      subject,
      html: content,
    };
    return new Promise((res, rej) => {
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          rej(error);
        } else {
          console.log('Email sent: ' + info.response);
          res(null);
        }
      });
    });
  }
}
Utils.officialEmail = 'fanginterview@gmail.com';
let colors: ColorEnum = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
};
interface ColorEnum {
  [key: string]: string
}

Utils.Colors = colors;
export default Utils;
