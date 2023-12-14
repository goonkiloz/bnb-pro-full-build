'use strict';

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const testImgs = [
  {
    spotId: 1,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/previewDisney.jpg',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Disney1.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Disney2.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Disney3.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Disney4.jpg',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/previewEmpire.jpg',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Empire1.jpg',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Empire2.jpg',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Empire3.jpg',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Empire4.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/previewSheraton.jpg',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Sheraton1.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Sheraton2.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Sheraton3.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Sheraton4.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/previewPalmSprings.jpg',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/palmSprings1.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/palmSprings2.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/palmSprings3.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/palmSprings4.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/previewPier39.jpg',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Pier391.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Pier392.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Pier393.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Pier394.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/previewMallofAmerica.jpg',
    preview: true
  },
  {
    spotId: 6,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/MoA1.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/MoA2.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/MoA3.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/MoA4.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/previewFourCorners.jpg',
    preview: true
  },
  {
    spotId: 7,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/FourCorners1.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/FourCorners2.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/FourCorners3.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/FourCorners4.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/previewYellowStone.jpg',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/YellowStone1.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/YellowStone2.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/YellowStone3.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/YellowStone4.jpg',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/previewArch.jpg',
    preview: true
  },
  {
    spotId: 9,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Arch1.jpg',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Arch2.jpg',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Arch3.jpg',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/Arch4.jpg',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/previewGrandCanyon.jpg',
    preview: true
  },
  {
    spotId: 10,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/GrandCanyon1.jpg',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/GrandCanyon2.jpg',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/GrandCanyon3.jpg',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://bnbprostorage.s3.us-east-2.amazonaws.com/GrandCanyon4.jpg',
    preview: false
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
