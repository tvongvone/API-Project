'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {}

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}



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
      spotId: 3,
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius morbi enim. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Diam volutpat commodo sed egestas. Ac ut consequat semper viverra nam libero justo. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur!",
      stars: 3
    },
    {
      userId: 1,
      spotId: 4,
      review: "I had a crazy night!!!",
      stars: 4
    },
    {
      userId: 2,
      spotId: 1,
      review: "Tony said it is pretty cool",
      stars: 4
    },
    {
      userId: 2,
      spotId: 4,
      review: "I had the time of my life!!!",
      stars: 5
    },
    {
      userId: 3,
      spotId: 2,
      review: "It could be better",
      stars: 3
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
