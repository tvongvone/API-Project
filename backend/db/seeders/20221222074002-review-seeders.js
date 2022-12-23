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
      review: "John said it is pretty cool",
      stars: 4
    },
    {
      userId: 1,
      spotId: 2,
      review: "John said it is pretty fun",
      stars: 3
    },
    {
      userId: 1,
      spotId: 3,
      review: "John said it was awesome!",
      stars: 5
    },
    {
      userId: 2,
      spotId: 2,
      review: "Tony said it is pretty cool",
      stars: 4
    },
    {
      userId: 2,
      spotId: 4,
      review: "Tony said it was the time of his life",
      stars: 5
    },
    {
      userId: 3,
      spotId: 1,
      review: "Mike said its pretty chill",
      stars: 4
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
        [Op.in]: [1, 2, 3]
      }
    })

  }
};
