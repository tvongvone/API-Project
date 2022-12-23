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
    options.tableName = 'Images'
    await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "John's first url"
      },
      {
        reviewId: 1,
        url: "John's second url"
      },
      {
        reviewId: 2,
        url: "John's third url"
      },
      {
        reviewId: 4,
        url: "Tony's first url"
      },
      {
        reviewId: 5,
        url: "Tony's second url"
      },
      {
        reviewId: 6,
        url: "Mike's first url"
      },
      {
        reviewId: 6,
        url: "Mike's second url"
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
    options.tableName = 'Images'
    const Op = Sequelize.Op
    await queryInterface.bulkDelete(options, {
      reviewId: {
        [Op.in]: [1,2,4, 5, 6]
      }
    })
  }
};
