/* eslint-disable indent */
import { DataTypes } from 'sequelize'
import DB from '../BD/conection.js'

const Cliente = DB.define('Cliente', {
  id_cliente: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
  },
  cuil: {
    type: DataTypes.BIGINT,
  },
  apellido: {
    type: DataTypes.STRING,
  },
  nombre_cliente: {
    type: DataTypes.STRING,
  },
  telefono_cliente: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  estado_cliente: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'clientes',
  timestamps: false,
})

export default Cliente