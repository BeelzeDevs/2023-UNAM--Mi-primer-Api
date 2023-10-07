/* eslint-disable indent */
import { DataTypes } from 'sequelize'
import DB from '../BD/conection.js'

const Usuario = DB.define('Usuario',
	{
	id_usuario: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	nombre_usuario: {
		type: DataTypes.STRING,
	},
	contrasenia_usuario: {
		type: DataTypes.STRING,
	},
	estado_usuario: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
	},
	},
		{
		tableName:'usuarios',
		timestamps:false
		}
)

export default Usuario

