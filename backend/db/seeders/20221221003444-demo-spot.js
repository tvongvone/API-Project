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
      description: "Place where web developers are created dsiofio fsd soifj sdoifjiosdfj isojfi iosj fiosd fio sdfisfjisdjf i iosdjf iosdjf ios dsifj sdoifj siodfj iosj dfoisdj fiosdjf iosj fdiosdj fiosdj fios siodjfiso dfjisd f oisjdf oisjfi osfj  oisdjf iosfj  dsfsifjisdjfios.",
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
      name: "Random Place",
      description: "Place where software developers stay",
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
      name: "Dolphin paradise",
      description: "Place where swimmers stay",
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
      name: "Gambling maniacs",
      description: "Place where the best gamblers stay",
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
      address: {[Op.in]: ['123 Disney Lane', '321 Marvel Lane', '12 Ocean Side', '532 Lucky draw lane']}
    }, {})
  }
};
