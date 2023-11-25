const seedUser = require('./userData');
const seedGroup = require('./groupData');
const seedEvent = require('./eventData');
const seedGroupUser = require('./groupuserData');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUser();
  console.log('\n----- USERS SEEDED -----\n');

  await seedGroup();
  console.log('\n----- GROUPS SEEDED -----\n');

  await seedGroupUser();
  console.log('\n----- GROUP-USER SEEDED -----\n');

  await seedEvent();
  console.log('\n----- EVENTS SEEDED -----\n');

  process.exit(0);
};

seedAll();
