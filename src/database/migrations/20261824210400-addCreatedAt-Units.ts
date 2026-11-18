import { DataTypes, QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("Units", "createdAt", {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Units", "createdAt");
  },
};
