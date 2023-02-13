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
      url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://media.architecturaldigest.com/photos/571e97c5741fcddb16b559c9/2:1/w_5127,h_2563,c_limit/modernist-decor-inspiration-01.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041__340.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972__340.jpg',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8&w=1000&q=80',
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
      spotId: {
        [Op.in]: [1,2, 3, 4]
      }
    })
  }
};
