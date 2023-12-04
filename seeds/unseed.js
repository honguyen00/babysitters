const seedUser = require('./userData');
const seedGroup = require('./groupData');
const seedEvent = require('./eventData');
const seedGroupUser = require('./groupuserData');

const sequelize = require('../config/connection');

const unseedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  process.exit(0);
};

unseedAll();