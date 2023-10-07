/* eslint-disable indent */
import { DataTypes } from 'sequelize'
import DB from '../BD/conection.js'

const Marca = DB.define('Marca', {
  id_marca: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
  },
  nombre_marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado_marca: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, 
    {
    tableName: 'marcas',
    timestamps: false,
    }
)

export default Marca