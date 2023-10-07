/* eslint-disable indent */
import { DataTypes } from 'sequelize'
import DB from '../BD/conection.js'

const Carrito = DB.define('Carrito', {
  id_cliente: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  id_carrito: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_existencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tiempo_carrito: {
    type: DataTypes.TIMESTAMP,
    allowNull: false,
  },
  cantidad_productos: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
}, {
  tableName: 'carritos',
  timestamps: false,
})

export default Carrito