const sequlize = require('../db');
const { DataTypes } = require('sequelize');

const News = sequlize.define('news', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description1: { type: DataTypes.STRING, allowNull: false },
  description2: { type: DataTypes.STRING, allowNull: false },
  description3: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});


const Contact = sequlize.define('contact', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const Vacancy = sequlize.define('vacancy', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  file: { type: DataTypes.STRING, allowNull: false },
});


module.exports = {
  News, Contact, Vacancy,
};



