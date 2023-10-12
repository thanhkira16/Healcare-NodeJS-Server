"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.changeColumn("Users", "image", {
      type: Sequelize.BLOB("long"),
      //using type LONGBLOB in database
      allowNull: true
    })]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.changeColumn("Users", "image", {
      type: Sequelize.STRING,
      allowNull: true
    })]);
  }
};