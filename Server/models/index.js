"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/* 관계 맵핑 */
// user - issue (N:M)
const assignee = sequelize.define("assignee", {}, { timestamps: false });
db.user.belongsToMany(db.issue, {
  foreignKey: "issueId",
  targetKey: "id",
  through: assignee,
});
db.issue.belongsToMany(db.user, {
  foreignKey: "userId",
  targetKey: "id",
  through: assignee,
});

// label - issue (N:M)
const issuelabel = sequelize.define("issuelabel", {}, { timestamps: false });
db.label.belongsToMany(db.issue, {
  foreignKey: "issueId",
  targetKey: "id",
  through: issuelabel,
});
db.issue.belongsToMany(db.label, {
  foreignKey: "labelId",
  targetKey: "id",
  through: issuelabel,
});

// user - comment (1:N)
db.user.hasMany(db.comment, {
  foreignKey: { name: "authorId", allowNull: false },
  onDelete: "cascade",
});

// user - issue (1:N)
db.user.hasMany(db.issue, {
  foreignKey: { name: "authorId", allowNull: false },
  onDelete: "cascade",
});

// issue - comment (1:N)
db.issue.hasMany(db.comment, {
  foreignKey: { name: "issueId", allowNull: false },
  onDelete: "cascade",
});

// issue - image (1:N)
db.issue.hasMany(db.image, {
  foreignKey: { name: "issueId", allowNull: false },
  onDelete: "cascade",
});

// milestone - issue (1:N)
db.milestone.hasMany(db.issue, {
  foreignKey: { name: "milestoneId", allowNull: false },
  onDelete: "cascade",
});

module.exports = db;
