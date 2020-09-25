const dbUsername = 'root';
const dbPassword = 'ottawa101#1';
export default {
  appName: 'fanginterview',
  // app
  servicesPath: __dirname + '/services',
  wwwRoot: __dirname + '/../../client/dist', //process.env.NODE_ENV === 'production' ? '/www' : __dirname + '/../../client/dist',
  httpServerPort: process.env.NODE_ENV === 'production' ? '3000' : '10010',
  localReposDir: process.env.NODE_ENV === 'production' ? __dirname + '/../' : __dirname + '/../',
  GOOGLE_APPLICATION_CREDENTIALS: __dirname + '/services/TranslationService//myottawa101-c77579cf71fe.json',

  dbUsername,
  dbPassword,
  databaseUrl: process.env.NODE_ENV === 'production' ? `mongodb://${dbUsername}:${dbPassword}@mongo:27017` : `mongodb://${dbUsername}:${dbPassword}@localhost:20091`,
  mongoose_databaseUrl: process.env.NODE_ENV === 'production' ? `mongodb://root:${encodeURIComponent(dbPassword)}@mongo:27017` : `mongodb://${dbUsername}:${encodeURIComponent(dbPassword)}@localhost:20091`,

  jwtSecret: 'ABCDEFGHI',

  MAX_RECORDS_PER_PAGE_DEFAULT: 1000,
  MAX_RECORDS_PER_PAGE_MAX: 1000,

  // translation service
  disableTranslation: true,

  // blog service, [todo] maybe put blogs out of the src.., so other people can also edit the blogs as well.
  // or maybe multiple resources for blogs
  blogsDir: process.env.NODE_ENV === 'production' ? '/blogs' : __dirname + '/../blogs',

  houseImagesDir: process.env.NODE_ENV === 'production' ? '/myottawa101data/houseImages' : __dirname + '/../../myottawa101data/houseImages',

  resourcesDir: process.env.NODE_ENV === 'production' ? '/resources' : __dirname + '/../resources',
  // test Service
  liveTestsPath: __dirname + '/livetest',

  rssSources: {
    'google_ottawa_coronavirus': {
      url: 'https://news.google.com/rss/search?q=ottawa+real+estate+house+price+market&hl=en-CA&gl=CA&ceid=CA:en',
      parser: (json)=>{
        const {title, description, pubDate, link, source} = json;
        const item = {title, description, pubDate, link,
          source,
          logo: 'api/img/news_icon.png',
        };
        const sourceStr = item.source ? item.source.toLowerCase() : '';
        if (sourceStr.indexOf('cbc') !== -1) {
          item.logo = 'https://www.cbc.ca/a/favicon.ico';
        } else if (sourceStr.indexOf('ottawa') !== -1 && sourceStr.indexOf('magazine') !== -1) {
          item.logo = 'https://ottawamagazine.com/favicon.ico';
        } else if (sourceStr.indexOf('ottawa') !== -1 && sourceStr.indexOf('citizen') !== -1) {
          item.logo = 'https://secure.gravatar.com/blavatar/034e689d25278f80f8281f2c424607c3?s=32';
        } else if (sourceStr.indexOf('global') !== -1 && sourceStr.indexOf('news') !== -1) {
          item.logo = 'api/img/globalNewsFavicon.png';
        }


        return item;
      },
    },
    // https://www.cbc.ca/aggregate_api/v1/items?typeSet=cbc-ocelot&pageSize=4&page=1&lineupSlug=news-canada-ottawa&categorySlug=ottawa&source=Polopoly
    // 'cbc-rss-topstories': {
    //   url: 'https://www.cbc.ca/cmlink/rss-topstories',
    //   parser: (json)=>{
    //     const {title, description, pubDate, link} = json;
    //     return {title, description, pubDate, link,
    //       source: 'CBC',
    //       logo: 'https://www.cbc.ca/a/favicon.ico'};
    //   },
    // },
    // 'ottawamagazine': {
    //   url: 'https://ottawamagazine.com/feed/',
    //   parser: (json)=>{
    //     const {title, description, pubDate, link} = json;
    //     return {title, description, pubDate, link,
    //       'source': 'OttawaMagazine',
    //       'logo': 'https://ottawamagazine.com/favicon.ico'};
    //   },
    // },
    // 'ottawacitizen': {
    //   url: 'https://ottawacitizen.com/feed/',
    //   parser: (json)=>{
    //     const {title, 'content:encoded': description, pubDate, link} = json;
    //     return {title, description, pubDate, link,
    //       source: 'OttawaCitizen',
    //       logo: 'https://secure.gravatar.com/blavatar/034e689d25278f80f8281f2c424607c3?s=32'};
    //   },
    // },
  },
  otherNewsSources: {
    // 'cbc': {
    //   url: 'https://www.cbc.ca/cxense/v1/search?q=estate&sortOrder=relevance&section=news&page=1&fields=feed',
    //   parser: (json)=>{
    //     const {title, description, publishtime: pubDate, url: link} = json;
    //     return {title, description, pubDate, link,
    //       source: 'CBC',
    //       logo: 'https://www.cbc.ca/a/favicon.ico'};
    //   },
    // },
    // 'cbc2': {
    //   url: 'https://www.cbc.ca/cxense/v1/search?q=house&sortOrder=relevance&section=news&page=2&fields=feed',
    //   parser: (json)=>{
    //     const {title, description, publishtime: pubDate, url: link} = json;
    //     return {title, description, pubDate, link,
    //       source: 'CBC',
    //       logo: 'https://www.cbc.ca/a/favicon.ico'};
    //   },
    // },
    // 'cbc3': {
    //   url: 'https://www.cbc.ca/cxense/v1/search?q=mortgage&sortOrder=relevance&section=news&page=2&fields=feed',
    //   parser: (json)=>{
    //     const {title, description, publishtime: pubDate, url: link} = json;
    //     return {title, description, pubDate, link,
    //       source: 'CBC',
    //       logo: 'https://www.cbc.ca/a/favicon.ico'};
    //   },
    // },
  },
};
