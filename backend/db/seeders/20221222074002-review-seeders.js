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
  options.tableName = 'Reviews'
  await queryInterface.bulkInsert(options, [
    {
      userId: 1,
      spotId: 1,
      review: "John said this place is awesome",
      stars: 5
    },
    {
      userId: 1,
      spotId: 2,
      review: "John said this place is meh",
      stars: 2
    },
    {
      userId: 2,
      spotId: 1,
      review: "Tony said this place is meh",
      stars: 3
    },
    {
      userId: 2,
      spotId: 2,
      review: "Tony said this place was rockin",
      stars: 5
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
    options.tableName = "Reviews"
    const Op = Sequelize.Op
    await queryInterface.bulkDelete(options, {
      userId: {
        [Op.in]: [1, 2]
      }
    })

  }
};
