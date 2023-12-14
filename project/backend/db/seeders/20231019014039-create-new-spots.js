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
    address:'123 Disney Ln',
    city: 'Orlando',
    state: 'Flordia',
    country: 'United States',
    lat: 37.7645358,
    lng: -122.4730327,
    name: "Disney World",
    description: "Walt Disney World Resort is an entertainment and recreation center of nearly 40 square miles featuring four theme parks (Magic Kingdom, Epcot, Disney's Hollywood Studios and Disney's Animal Kingdom); two water adventure parks (Disney's Blizzard Beach and Disney's Typhoon Lagoon); dozens of resort hotels (24 owned and operated by Walt Disney World); 81 holes of golf on five courses; two full-service spas; Disney's ESPN Wide World of Sports complex; and Disney Springs, an entertainment-shopping-dining complex. ",
    price: 1000
  },
  {
    ownerId: 2,
    address:'123 Main St',
    city: 'New York',
    state: 'New York',
    country: 'United States',
    lat: 40.755205,
    lng: -73.982997,
    name: "Empire State Building",
    description: "With its soaring height and signature design, the Empire State Building defines the New York City skyline. The world’s most magnificent Art Deco skyscraper, it’s a living piece of New York history and an instantly recognizable symbol of city culture today.",
    price: 2000
  },
  {
    ownerId: 3,
    address:'456 Last Ave',
    city: 'Honolulu',
    state: 'Hawaii',
    country: 'United States',
    lat: -30.031016,
    lng: -51.234585,
    name: "Sheraton Waikiki",
    description: "Vivid by day, vibrant by night: Experience the new Sheraton Waikiki. Immerse yourself in the beauty of Oahu and our world-renowned Waikiki Beach resort at Sheraton Waikiki. Step into our exceptional oceanfront resort, which features newly renovated rooms and suites with spectacular ocean views. The Oahu resort is located on Waikiki Beach, just minutes from some of Honolulu's top attractions like Diamond Head Crater. Upscale shopping and family activities are located within walking distance. After a day exploring Hawaii, relax in our Waikiki resort’s award-winning outdoor pools, work out in our modern fitness center or dine on globally inspired cuisine at one of our hotel’s restaurants. If you're planning an event in Honolulu, Sheraton Waikiki offers one of Honolulu’s largest ballrooms, 16 meeting rooms, and dynamic indoor and outdoor event spaces. Let us welcome you to the island of Oahu at Sheraton Waikiki.",
    price: 2500
  },
  {
    ownerId: 4,
    address:'789 Middle Cir',
    city: 'Palm Springs',
    state: 'California',
    country: 'United States',
    lat: -11.562800,
    lng: -77.270000,
    name: "HardRock Cafe",
    description: "Palm Springs lies on the western edge of the Coachella Valley in central Riverside County approximately 107 miles east of Los Angeles. It is within the ecological area known as the Colorado Desert and is 487 feet above sea level. Rising behind the downtown is the impressive Mt. San Jacinto, elevation 10,831 feet.",
    price: 3080
  },
  {
    ownerId: 5,
    address:'39 Water Way',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    lat: 37.808600,
    lng: -122.409800,
    name: "Pier 39",
    description: "PIER 39 is a 45-acre waterfront complex that is a gathering place for millions of San Francisco locals and visitors. In addition to its 12 full-service restaurants, 90+ shops and popular attractions, PIER 39 is home to a five-acre waterfront park and a 300-berth marina. Best place to hunt for pokemon!",
    price: 7050
  },
  {
    ownerId: 6,
    address:'321 Mall ln',
    city: 'Bloomington',
    state: 'Minnesota',
    country: 'United States',
    lat: 37.808600,
    lng: -122.409800,
    name: "Mall of America",
    description: "Since opening its doors in 1992, Mall of America has revolutionized the shopping experience of tens of millions of visitors a year. A leader in retail, entertainment and attractions, Mall of America is one of the top tourist destinations in the country and is known around the world.",
    price: 1240
  },
  {
    ownerId: 7,
    address:'444 State Cir',
    city: 'Teec Nos Pos',
    state: 'Arizona',
    country: 'United States',
    lat: 37.808600,
    lng: -122.409800,
    name: "Four Corners",
    description: "The Four Corners Monument marks the quadripoint in the Southwestern United States where the states of Arizona, Colorado, New Mexico, and Utah meet. It is the only point in the United States shared by four states, leading to the area being named the Four Corners region.",
    price: 7309
  },
  {
    ownerId: 8,
    address:'785 Yellow Rd',
    city: 'Yellow Stone',
    state: 'Wyoming',
    country: 'United States',
    lat: 37.808600,
    lng: -122.409800,
    name: "Yellow Stone National Park",
    description: "Yellowstone National Park is a nearly 3,500-sq.-mile wilderness recreation area atop a volcanic hot spot. Mostly in Wyoming, the park spreads into parts of Montana and Idaho too. Yellowstone features dramatic canyons, alpine rivers, lush forests, hot springs and gushing geysers, including its most famous, Old Faithful",
    price: 4500
  },
  {
    ownerId: 9,
    address:'777 Arch Way',
    city: 'St. Louis',
    state: 'Illinois',
    country: 'United States',
    lat: 37.808600,
    lng: -122.409800,
    name: "The Arch",
    description: "The Gateway Arch is a 630-foot-tall monument in St. Louis, Missouri, United States. Clad in stainless steel and built in the form of a weighted catenary arch, it is the world's tallest arch and Missouri's tallest accessible building. Some sources consider it the tallest human-made monument in the Western Hemisphere.",
    price: 2079
  },
  {
    ownerId: 10,
    address:'1000 Canyon Rd',
    city: 'Canyon City',
    state: 'Arizonia',
    country: 'United States',
    lat: 37.808600,
    lng: -122.409800,
    name: "Grand Canyon",
    description: "The Grand Canyon in Arizona is a natural formation distinguished by layered bands of red rock, revealing millions of years of geological history in cross-section. Vast in scale, the canyon averages 10 miles across and a mile deep along its 277-mile length. Much of the area is a national park, with Colorado River white-water rapids and sweeping vistas.",
    price: 5150
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
