/* eslint-disable indent */
import { DataTypes } from 'sequelize'
import DB from '../BD/conection.js'

const Admin = DB.define('Admin', {
  id_admin: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
  },
  CUIT: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre_admin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono_admin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'admins',
  timestamps: false,
}
)

export default Admin