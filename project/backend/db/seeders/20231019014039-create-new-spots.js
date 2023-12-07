'use strict';

const { Spot } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
const validSpots = [
  {
    ownerId: 1,
    address:'123 Disney Lane',
    city: 'San Francisco',
    state: 'California',
    country: 'United States of America',
    lat: 37.7645358,
    lng: -122.4730327,
    name: "App Academy",
    description: "Place where web developers are created",
    price: 123
  },
  {
    ownerId: 2,
    address:'123 Main St',
    city: 'New York',
    state: 'New York',
    country: 'United States',
    lat: 40.755205,
    lng: -73.982997,
    name: "NEW YORK",
    description: "Lots of pokestops!",
    price: 2000
  },
  {
    ownerId: 3,
    address:'456 Last Ave',
    city: 'Porto Alegre',
    state: 'Coastline',
    country: 'Brazil',
    lat: -30.031016,
    lng: -51.234585,
    name: "Porto Alegre",
    description: "Beautiful island, great for catching rare aquatic pokemon",
    price: 2500
  },
  {
    ownerId: 4,
    address:'789 Middle Cir',
    city: 'Chancay',
    state: 'Somewhere',
    country: 'Peru',
    lat: -11.562800,
    lng: -77.270000,
    name: "Chancay",
    description: "A small and historical city that delves deeper into the human culture",
    price: 3000
  },
  {
    ownerId: 5,
    address:'Pier 39',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    lat: 37.808600,
    lng: -122.409800,
    name: "Pier 39",
    description: "Best place to hunt for pokemon!",
    price: 5000
  }
]

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
    await Spot.bulkCreate(validSpots, { validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});

  }
};

