'use strict';

const { Review } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const testReviews = [
  {
    userId: 1,
    spotId: 1,
    review: 'This was an awesome spot!',
    stars: 5
  },
  {
    userId: 2,
    spotId: 1,
    review: 'This was an alright spot.',
    stars: 4
  },
  {
    userId: 3,
    spotId: 1,
    review: 'This was pretty exspensive.',
    stars: 3
  },
  {
    userId: 4,
    spotId: 1,
    review: 'Crowded!',
    stars: 2
  },
  {
    userId: 5,
    spotId: 2,
    review: 'Do Not Recommend, someone kicked my dog.',
    stars: 1
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
    await Review.bulkCreate(testReviews, { validate: true}, options)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', null, {})

  }
};
