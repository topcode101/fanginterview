const dbUsername = 'root';
const dbPassword = 'ottawa101#1';
export default {
  appName: 'fanginterview',
  // app
  servicesPath: __dirname + '/services',
  wwwRoot: __dirname + (process.env.NODE_ENV === 'production' ? '/../../client/dist': '/../../client/public'), //process.env.NODE_ENV === 'production' ? '/www' : __dirname + '/../../client/dist',
  httpServerPort: process.env.NODE_ENV === 'production' ? '10010' : '10010',
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

  cacheDocsDir: __dirname  + '/../../cache_docs',

  googleClientId: '166022609644-uu2o5cscof0vd9rbisdv34pc3or837c7.apps.googleusercontent.com'
};
