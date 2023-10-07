import { createRequire } from 'node:module'
import  express  from 'express'

import DB from './BD/conection.js'
//import productos from './models/producto.js'
import Usuario from './models/usuario.js'
import Producto from './models/producto.js'
import Existencia from './models/existencia.js'
import Cliente from './models/cliente.js'

const require = createRequire(import.meta.url)
//const datos = require('./datos.json')

const app = express()
const expossedPort = 192

  
app.get('/', (req,res) => {

	res.status(200).send('<h1>Bienvenido a mi primer API</h1><p>los comandos son los siguientes:</p>')

})

/* 1- Crear el endpoint ‘/usuarios/’, que devuelva el listado completo de usuarios.*/
app.get('/usuarios/', async (req,res) => {
	try{
		let allUsers = await Usuario.findAll() // select * from usuarios
		res.status(200).json(allUsers)
	}catch(error){
		res.status(204).json({'message': error})
	}
	
})
/* 2- Crear el endpoint ‘/usuarios/id’ que devuelva los datos de un usuario en particular consignado por
su número de id */
app.get('/usuarios/:id', async (req, res) =>{

	try{
		let UserID = parseInt(req.params.id)
		let UserFound = await Usuario.findByPk(UserID)

		res.status(200).json(UserFound)
	}catch(error){
		res.status(204).json({'message':error})
	}
})

/* 3- Crear el endpoint ‘/usuarios/’ que permita guardar un nuevo usuario.*/

app.post('/usuarios', (req,res)=>{
	try{
		let bodyTemp = ''
		req.on('data', (chunk)=> {
			bodyTemp += chunk.toString()
		})
		
		req.on('end', async () => {
			const userData = JSON.parse(bodyTemp)
			req.body = userData
			const userToSave = new Usuario(req.body)
			await userToSave.save()
			
			res.status(201).json({'meesage': 'User added succesfully'})
		})

	}catch(error){
		res.status(204).json({'message': error})
	}
})

/* 4- Crear el endpoint ‘/usuarios/id’ que permita modificar algún atributo de un usuario. */
app.patch('/usuarios/:id', async (req,res) => {
	let idUserEdit = parseInt(req.params.id)
	try{
		let userToEdit = await Usuario.findByPk(idUserEdit)
		if(!userToEdit){
			res.status(204).json({'message':'User not found'})
		}

		let bodyTemp = ''

		req.on('data',(chunk)=>{
			bodyTemp += chunk.toString()
		})

		req.on('end', async ()=>{
			const userData = JSON.parse(bodyTemp)
			req.body = userData

			await userToEdit.update(req.body)

			res.status(200).json({'message': 'User Updated'})

		})



	}catch(error){
		res.status(204).json({'message': 'User not found'})
	}
	

})

/* 5 - Crear el endpoint ‘/usuarios/id’ que permita borrar un usuario de los datos*/
app.delete('/usuarios/:id', async (req,res) => {
	let userID = parseInt(req.params.id)
	try {
		let userToDelete = await Usuario.findByPk(userID)
		if(!userToDelete){
			res.status(204).json({'message': 'User not found'})
		}
		await userToDelete.destroy()
		res.status(200).json({'message': 'User deleted succesfully'})

	} catch (error) {
		res.status(204).json({'message': error})
	}
	
})
/* 6- Crear el endpoint que permita obtener el precio de un producto que se indica por id. */
app.get('/existencias/precio/:id', async (req,res) =>{
	try{
		let existenciaID = parseInt(req.params.id)
		let existenciaToGetPrice = await Existencia.findByPk(existenciaID)
		if(existenciaToGetPrice){
			res.status(200).json({'Existence price' : existenciaToGetPrice.precio}) // los precios los tengo en las existencias, el producto no posee precio hasta crear una existencia (existencia = producto + proveedor)
		}else{
			res.status(204).json({'message' : 'Existence not found'})
		}
	}catch(error){
	
		res.status(204).json({'message':error})
	}

})

/* 7- Crear el endpoint que permita obtener el nombre de un producto que se indica por id. */
app.get('/productos/nombre/:id', async (req,res) =>{
	try{
		let productID = parseInt(req.params.id)
		let productToGetName = await Producto.findByPk(productID)
		if(productToGetName){
			res.status(200).json({'Product name' : productToGetName.nombre_producto})
		}
		else{
			res.status(204).json({'message' : 'product not found'})
		}
	}catch(error){
	
		res.status(204).json({'message':error})
	}

})

/* 8- Crear el endpoint que permita obtener el teléfono de un usuario que se indica por id. */
app.get('/clientes/telefono/:id', async (req,res) =>{
	try{
		let clientID = parseInt(req.params.id)
		let clientToGetTel = await Cliente.findByPk(clientID)
		if(clientToGetTel){
			res.status(200).json({'Client number' :clientToGetTel.telefono_cliente})
		}
		else{
			res.status(204).json({'message' : 'Client not found'})
		}
	} catch(error){
	
		res.status(204).json({'message':error})
	}

})

/* 9- Crear el endpoint que permita obtener el nombre de un usuario que se indica por id. */
app.get('/clientes/nombre/:id', async(req,res) =>{
	try{
		let clientID = parseInt(req.params.id)
		let clientToGetName = await Cliente.findByPk(clientID)
		if(clientToGetName){
			res.status(200).json({'User name' : clientToGetName.nombre_cliente})
		}
		else{
			res.status(204).json({'message' : 'user not found'})
		}

	}catch(error){
	
		res.status(204).json({'message':error})
	}

})

/* 10- Crear el endpoint que permita obtener el total del stock actual de productos, la sumatoria de los
precios individuales. */
app.get('/existencias/totalstock', async (req,res) => {
	try {
		// Sumar los precios individuales de todos los productos
		const existencias = await Existencia.findAll()
		const totalStock = existencias.reduce((total,existencias)=> {
			const precio = parseFloat(existencias.precio)
			return total + precio
		},0)
	
		res.status(200).json({ 'Total Stock Price': totalStock })
	}
	catch (error) {
		res.status(204).json({ 'message': error })
	}
	
})


app.use('', (req, res) => {
	res.status(404).send('<h1>ERROR 404 </h1>')
})

try {
	await DB.authenticate() //es asincrono y lanza una consulta random para probar la conexión
	console.log('database connected successfully')
} catch (error) {
	console.log('database conection error')
}

app.listen(expossedPort, () => {
	console.log('Servidor montado, escuchando en http://localhost:'+expossedPort)
})
