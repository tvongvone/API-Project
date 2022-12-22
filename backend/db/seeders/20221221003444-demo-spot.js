'use strict';

let options = {}

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

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
   options.tableName = 'Spots'
   await queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: "123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 123
    },
    {
      ownerId: 1,
      address: "321 Marvel Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 34.7645358,
      lng: -123.4730327,
      name: "Anotha Academy",
      description: "Place where software developers are created",
      price: 231
    },
    {
      ownerId: 2,
      address: "12 Ocean Side",
      city: "Santa Maria",
      state: "California",
      country: "United States of America",
      lat: 32.7645358,
      lng: -112.4730327,
      name: "Dolphin Academy",
      description: "Place where swimmers are created",
      price: 13
    },
    {
      ownerId: 3,
      address: "532 Lucky draw lane",
      city: "Las Vegas",
      state: "Nevada",
      country: "United States of America",
      lat: 24.7645358,
      lng: -101.4730327,
      name: "Gambling Academy",
      description: "Place where the best gamblers are made",
      price: 500
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots'
    const Op = Sequelize.Op
    await queryInterface.bulkDelete(options, {
      address: {[Op.in]: ['123 Disney Lane']}
    }, {})
  }
};
