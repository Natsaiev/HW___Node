import { sequelize } from '../config/db.js';
import { Sequelize } from 'sequelize';  // Импортируем Sequelize
import BookModel from './book.js';

export const Book = BookModel(sequelize, Sequelize.DataTypes);

export const db = {
  sequelize,
  Sequelize,
};
