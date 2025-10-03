

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "login",
  "root",
  "",
  {
    dialect: "mysql",
    host: "localhost",
    define: {
      timestamps: false,
    },
  },
);

const connect = async function() {
  try {
    await sequelize.authenticate();
    console.log("mysql connection is successfully");
  } catch (error) {
    console.log(error);
  }
};

connect();

module.exports = sequelize;
