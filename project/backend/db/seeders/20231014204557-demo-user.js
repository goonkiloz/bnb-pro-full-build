'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Robert',
        lastName: 'Peterson',
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Peter',
        lastName: 'Robertson',
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Lebron',
        lastName: 'James',
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Justin',
        lastName: 'Timberlake',
        email: 'user6@user.io',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Jenifer',
        lastName: 'Lawerence',
        email: 'user7@user.io',
        username: 'FakeUser7',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        firstName: 'Jenifer',
        lastName: 'Lopez',
        email: 'user8@user.io',
        username: 'FakeUser8',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        firstName: 'Anikin',
        lastName: 'Skywalker',
        email: 'user9@user.io',
        username: 'FakeUser9',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        firstName: 'Darth',
        lastName: 'Vader',
        email: 'user10@user.io',
        username: 'FakeUser10',
        hashedPassword: bcrypt.hashSync('password10')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['FakeUser1', 'FakeUser2', 'FakeUser3', 'FakeUser4', 'FakeUser5'] }
    }, {});
  }
};
