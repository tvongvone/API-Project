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
    options.tableName = 'Bookings'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        userId: 2,
        startDate: '2023-08-01',
        endDate: '2023-08-05'
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2023-02-02',
        endDate: '2023-03-03'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2023-05-06',
        endDate: '2023-05-10'
      },
      {
        spotId: 4,
        userId: 1,
        startDate: '2023-02-18',
        endDate: '2023-03-01'
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
    options.tableName = 'Bookings'
    const Op = Sequelize.Op
    await queryInterface.bulkDelete(options, {
      spotId: {
        [Op.in]: [2,3,4]
      }
    })
  }
};
