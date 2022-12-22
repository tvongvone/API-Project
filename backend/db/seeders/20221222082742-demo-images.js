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
      spotId: 1,
      url: 'disney image',
      preview: true
    },
    {
      spotId: 1,
      url: 'random image',
      preview: false
    },
    {
      spotId: 2,
      url: 'DC image',
      preview: true
    },
    {
      spotId: 3,
      url: 'dog image',
      preview: true
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
      url: {
        [Op.in]: ['disney image', 'random image', 'DC image', 'dog image']
      }
    })
  }
};
