module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Apps', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Apps');
  },
};