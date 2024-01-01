const Sequelize = require("sequelize");
const db = require("../config/database");
const { DataTypes } = Sequelize;

const Group = db.define("Group", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  GroupName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = Group;
