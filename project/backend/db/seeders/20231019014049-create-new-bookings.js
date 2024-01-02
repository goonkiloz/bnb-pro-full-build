'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// const { Booking } = require('../models')

// const testBookings = [
//   {
//     spotId: 1,
//     userId: 2,
//     startDate: '2023-12-12',
//     endDate: '2024-01-01'
//   },
//   {
//     spotId: 2,
//     userId: 3,
//     startDate: '2024-02-01',
//     endDate: '2024-03-01'
//   },
//   {
//     spotId: 3,
//     userId: 4,
//     startDate: '2024-04-01',
//     endDate: '2024-05-01'
//   },
//   {
//     spotId: 4,
//     userId: 5,
//     startDate: '2024-06-01',
//     endDate: '2024-07-01'
//   },
//   {
//     spotId: 5,
//     userId: 1,
//     startDate: '2024-08-01',
//     endDate: '2024-09-01'
//   }
// ]

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
  //  await Booking.bulkCreate(testBookings, { validate: true}, options)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // await queryInterface.bulkDelete('Bookings', null, {})
  }
};
