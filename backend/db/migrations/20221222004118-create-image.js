'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}



module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Images'
    await queryInterface.createTable(options, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Spots',
          onDelete: 'CASCADE',
          hooks:true
        }
      },
      reviewId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Reviews',
          onDelete: 'CASCADE',
          hooks:true
        }
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      preview: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Images'
    await queryInterface.dropTable(options);
  }
};
