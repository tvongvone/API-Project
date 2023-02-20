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
   options.tableName = 'Images'
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://hgtvhome.sndimg.com/content/dam/images/hgrm/fullset/2012/5/30/0/Original-colonial-den_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1405413131585.jpeg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://static.vecteezy.com/system/resources/previews/004/365/884/original/empty-white-wooden-wall-on-wooden-floor-interior-design-3d-rendering-free-photo.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'http://cdn.home-designing.com/wp-content/uploads/2019/04/living-room-pendant-light.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://images.ctfassets.net/3s5io6mnxfqz/20h2jTlgbUEoNi1FQ8OcCG/80f1242bf4a9b6019437cc685b9e3e73/contemporary-interior-design-guide.jpeg',
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
      spotId: 3,
      url: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F34%2F2020%2F04%2F17%2Fpowder-blue-sofa-living-room-0420-opus-2000.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://assets.newatlas.com/dims4/default/3f383a4/2147483647/strip/true/crop/1620x1080+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Ftasteful-interiors-tiny-house-46.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://assets.newatlas.com/dims4/default/f4205ea/2147483647/strip/true/crop/1100x733+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F4f%2F2a%2F68ec533840678b260b59ad137505%2F17-web-or-mls-gr7a5448-orig.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://ca-times.brightspotcdn.com/dims4/default/5425f8a/2147483647/strip/true/crop/5557x4000+0+0/resize/1200x864!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fb0%2Fa0%2Ff84ece4d4b8088fa159c20304ef2%2F975626-sd-hm-quonset-hut-adu-005.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8&w=1000&q=80',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://www.reviewjournal.com/wp-content/uploads/2014/03/web1_bp-cover-hotel_003.jpg?w=640',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/interior-view-of-the-famous-bellagio-hotel-and-casino-chon-kit-leong.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://media-cdn.tripadvisor.com/media/photo-s/13/43/84/a9/inside-casino.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/annapolis/Club-21---private-gaming-room---Live-Casino-Hotel-abe716e85056a36_abe71859-5056-a36a-0b09b6172701e1ad.jpg',
      preview: false
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
