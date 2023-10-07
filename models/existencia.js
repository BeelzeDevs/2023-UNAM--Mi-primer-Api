/* eslint-disable indent */
import { DataTypes } from 'sequelize'
import DB from '../BD/conection.js'

const Existencia = DB.define('Existencia', {
  id_existencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_proveedor: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad_existencia: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  estado_existencia: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
},  {
  tableName: 'existencias',
  timestamps: false,
    }
)

export default Existencia