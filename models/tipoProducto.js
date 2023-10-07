/* eslint-disable indent */
import { DataTypes } from 'sequelize'
import DB from '../BD/conection.js'

const TipoProducto = DB.define('TipoProducto', {
  id_tipo_producto: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
  },
  nombre_tipo_producto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado_tipo_producto: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'tipoproductos',
  timestamps: false,
}
)

export default TipoProducto