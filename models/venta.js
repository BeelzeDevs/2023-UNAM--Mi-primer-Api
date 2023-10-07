/* eslint-disable indent */
import { DataTypes } from 'sequelize'
import DB from '../BD/conection.js'

const Venta = DB.define('Venta', {
  id_venta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_cliente: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  id_existencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tiempo_venta: {
    type: DataTypes.TIMESTAMP,
    allowNull: false,
  },
  cantidad_productos: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  total_venta: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  estado_venta: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'ventas',
  timestamps: false,
})

export default Venta