import { DataTypes, QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("Units", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      abbreviation: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM("Solido", "Liquido"),
        defaultValue: "Solido",
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("Units");
  },
};
