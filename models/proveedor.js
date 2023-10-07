/* eslint-disable indent */
import { DataTypes } from 'sequelize'
import DB from '../BD/conection.js'

const Proveedor = DB.define('Proveedor', {
  id_proveedor: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
  },
  CUIT: {
    type: DataTypes.BIGINT,
  },
  razon_social: {
    type: DataTypes.STRING,
  },
  telefono_prov: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  estado_proveedor: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, 
    {
  tableName: 'proveedores',
  timestamps: false,
}
)

export default Proveedor