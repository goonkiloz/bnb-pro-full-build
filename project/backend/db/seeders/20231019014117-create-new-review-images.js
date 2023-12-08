'use strict';

const { ReviewImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const testImgs = [
  {
    reviewId: 1,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/2023-10-25T00%3A14%3A45.433Z-chancayReview.jpg'
  },
  {
    reviewId: 2,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/newYorkReview.jpg'
  },
  {
    reviewId: 3,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/portoAlgeraReview.jpg'
  },
  {
    reviewId: 4,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/chancayReview.jpg'
  },
  {
    reviewId: 5,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/pier39Review.jpg'
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
    await ReviewImage.bulkCreate(testImgs, { validate:true }, options)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ReviewImages', null, {})
  }
};
