import { Sequelize } from 'sequelize'

//Crear instancia de conexion

const DB = new Sequelize(
	'xwgnmrle', // Name database
	'xwgnmrle', // Username
	'HfcyaiUmK8JB2ZNO3BOLz3NGTM9PJDih', // Password
	{
		host:'silly.db.elephantsql.com', // Server
		dialect:'postgres',  // Dialecto o lenguaje de BD para seguir el standard
		logging:true, // el loggin va a permitir que te informe en la terminal la interaccion entre la BD y el ORM sequelize
	}
    
)

export default DB
