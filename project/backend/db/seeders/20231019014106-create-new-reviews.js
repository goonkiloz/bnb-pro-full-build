'use strict';

const { Review } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const testReviews = [
  {
    userId: 8,
    spotId: 1,
    review: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.”',
    stars: 5
  },
  {
    userId: 2,
    spotId: 1,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 4
  },
  {
    userId: 6,
    spotId: 1,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 4
  },
  {
    userId: 4,
    spotId: 1,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 2
  },
  {
    userId: 9,
    spotId: 1,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 2
  },
  {
    userId: 1,
    spotId: 2,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 5
  },
  {
    userId: 10,
    spotId: 2,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 4
  },
  {
    userId: 7,
    spotId: 2,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 5
  },
  {
    userId: 2,
    spotId: 4,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 2
  },
  {
    userId: 5,
    spotId: 4,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 3
  },
  {
    userId: 6,
    spotId: 4,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 4
  },
  {
    userId: 8,
    spotId: 5,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 4
  },
  {
    userId: 3,
    spotId: 6,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 1
  },
  {
    userId: 10,
    spotId: 6,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 5
  },
  {
    userId: 5,
    spotId: 6,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 3
  },
  {
    userId: 1,
    spotId: 6,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 3
  },
  {
    userId: 2,
    spotId: 8,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 4
  },
  {
    userId: 3,
    spotId: 8,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 1
  },
  {
    userId: 4,
    spotId: 8,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 4
  },
  {
    userId: 5,
    spotId: 8,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 1
  },
  {
    userId: 1,
    spotId: 8,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 1
  },
  {
    userId: 2,
    spotId: 9,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 2
  },
  {
    userId: 3,
    spotId: 9,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 4
  },
  {
    userId: 10,
    spotId: 9,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 2
  },
  {
    userId: 3,
    spotId: 10,
    review: 'Do Not Recommend, someone kicked my dog.',
    stars: 1
  },
  {
    userId: 8,
    spotId: 10,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Est lorem ipsum dolor sit. Etiam erat velit scelerisque in dictum non.',
    stars: 3
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
