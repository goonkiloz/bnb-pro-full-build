'use strict';

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const testImgs = [
  {
    spotId: 1,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/disney.jpg',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/newYork.jpg',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/portoAlgera.jpg',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Chancay.jpg',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Pier39.jpg',
    preview: true
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await SpotImage.bulkCreate(testImgs, { valiate: true}, options)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', null, {})
  }
};
