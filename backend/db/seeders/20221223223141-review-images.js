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
