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
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius morbi enim. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Diam volutpat commodo sed egestas. Ac ut consequat semper viverra nam libero justo. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Adipiscing at in tellus integer feugiat scelerisque varius morbi. Pretium viverra suspendisse potenti nullam. Egestas pretium aenean pharetra magna ac placerat. Eget gravida cum sociis natoque penatibus et magnis dis. Cras sed felis eget velit. Turpis in eu mi bibendum. Pellentesque nec nam aliquam sem et tortor consequat id porta. Ut tellus elementum sagittis vitae et leo duis ut. Dis parturient montes nascetur ridiculus mus. Velit ut tortor pretium viverra suspendisse potenti nullam ac tortor. Quam id leo in vitae turpis. Aliquet risus feugiat in ante metus dictum at tempor commodo.",
      price: 145
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
      description: "Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Sem et tortor consequat id porta nibh. Congue eu consequat ac felis. Tristique nulla aliquet enim tortor at. Dictum non consectetur a erat nam at. Elementum nibh tellus molestie nunc non. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Hac habitasse platea dictumst vestibulum rhoncus est. Eros in cursus turpis massa. Gravida cum sociis natoque penatibus. Volutpat ac tincidunt vitae semper quis. Donec ultrices tincidunt arcu non sodales neque sodales. Donec enim diam vulputate ut pharetra sit amet aliquam. Morbi non arcu risus quis varius quam quisque. Suscipit tellus mauris a diam maecenas sed enim. Eu turpis egestas pretium aenean pharetra magna. Sagittis vitae et leo duis ut diam quam nulla porttitor. Urna porttitor rhoncus dolor purus non enim. Lectus proin nibh nisl condimentum id venenatis a condimentum vitae.",
      price: 112
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
      description: "Magna fermentum iaculis eu non diam phasellus vestibulum. Non curabitur gravida arcu ac tortor dignissim. Vel quam elementum pulvinar etiam non quam lacus suspendisse. Eget nullam non nisi est sit amet facilisis magna etiam. Sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Eget duis at tellus at urna condimentum mattis. Bibendum arcu vitae elementum curabitur. Imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis. In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Duis at tellus at urna condimentum. Et magnis dis parturient montes nascetur ridiculus. Habitant morbi tristique senectus et netus et malesuada fames. Leo vel fringilla est ullamcorper eget.",
      price: 113
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
      description: "Tellus integer feugiat scelerisque varius morbi. Varius duis at consectetur lorem donec. Leo urna molestie at elementum. Posuere ac ut consequat semper viverra nam libero. Elementum nisi quis eleifend quam adipiscing vitae. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Mi sit amet mauris commodo quis imperdiet. Leo in vitae turpis massa. Magna ac placerat vestibulum lectus mauris. Sit amet consectetur adipiscing elit. Non diam phasellus vestibulum lorem sed risus ultricies. Sed blandit libero volutpat sed cras. Enim sed faucibus turpis in eu mi bibendum. Vitae purus faucibus ornare suspendisse sed nisi. Vulputate ut pharetra sit amet.",
      price: 234
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
