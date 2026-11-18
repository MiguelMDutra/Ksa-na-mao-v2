import { DataTypes, QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("Units", "updatedAt", {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Units", "updatedAt");
  },
};
