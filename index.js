import { createRequire } from 'node:module'
import  express  from 'express'

const require = createRequire(import.meta.url)
const datos = require('./datos.json')

const app = express()
const expossedPort = 192

app.get('/', (req,res) => {

	res.status(200).send('<h1>Bienvenido a mi primer API</h1><p>los comandos son los siguientes:</p>')

})

/* 1- Crear el endpoint ‘/usuarios/’, que devuelva el listado completo de usuarios.*/
app.get('/usuarios/', (req,res) => {
	try{
		let allUsers = datos.usuarios
		res.status(200).json(allUsers)
	}catch(error){
		res.status(2004).json({'message': error})
	}
	
})
/* 2- Crear el endpoint ‘/usuarios/id’ que devuelva los datos de un usuario en particular consignado por
su número de id */
app.get('/usuarios/:id', (req, res) =>{

	try{
		let UserID = parseInt(req.params.id)
		let UserFound = datos.usuarios.find((Usuario) => Usuario.id === UserID)

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
		
		req.on('end', () => {
			const userData = JSON.parse(bodyTemp)
			req.body = userData
			datos.usuarios.push(req.body)
		})
		res.status(201).json({'meesage': 'User added succesfully'})

	}catch(error){
		res.status(204).json({'message': error})
	}
})

/* 4- Crear el endpoint ‘/usuarios/id’ que permita modificar algún atributo de un usuario. */
app.patch('/usuarios/:id', (req,res) => {
	let idUserEdit = parseInt(req.params.id)
	let userToEdit = datos.usuarios.find( (user) => user.id === idUserEdit)

	if(!userToEdit){
		res.status(204).json({'message': 'User not found'})
	}
	let bodyTemp = ''

	req.on('data',(chunk)=>{
		bodyTemp += chunk.toString()
	})
	req.on('end', ()=>{
		const userData = JSON.parse(bodyTemp)
		req.body = userData

		if(userData.nombre){
			userToEdit.nombre = userData.nombre
		}
		if(userData.edad){
			userToEdit.edad = userData.edad
		}
		if(userData.email){
			userToEdit.email = userData.email
		}
		if(userData.telefono){
			userToEdit.telefono = userData.telefono
		}

		res.status(200).json({'message': 'User Updated'})

	})

})

/* 5 - Crear el endpoint ‘/usuarios/id’ que permita borrar un usuario de los datos*/
app.delete('/usuarios/:id', (req,res) => {
	let userID = parseInt(req.params.id)
	let userToDelete = datos.usuarios.find((user) => user.id === userID)

	if(!userToDelete){
		res.status(204).json({'message': 'User not found'})
	}

	let userToDeleteINDEX = datos.usuarios.indexOf(userToDelete)
	try{
		datos.usuarios.splice(userToDeleteINDEX,1)
		res.status(200).json({'message': 'User deleted succesfully'})
	}
	catch(error){
		res.status(204).json({'message': error})
	}
})
/* 6- Crear el endpoint que permita obtener el precio de un producto que se indica por id. */
app.get('/productos/precio/:id', (req,res) =>{
	try{
		let productID = parseInt(req.params.id)
		let productToGetPrice = datos.productos.find((product) => product.id === productID)
		if(productToGetPrice){
			res.status(200).json({'Product price' : productToGetPrice.precio})
		}else{
			res.status(204).json({'message' : 'Product not found'})
		}
	}catch(error){
	
		res.status(204).json({'message':error})
	}

})

/* 7- Crear el endpoint que permita obtener el nombre de un producto que se indica por id. */
app.get('/productos/nombre/:id', (req,res) =>{
	try{
		let productID = parseInt(req.params.id)
		let productToGetName = datos.productos.find((product) => product.id === productID)
		if(productToGetName){
			res.status(200).json({'Product name' : productToGetName.nombre})
		}
		else{
			res.status(204).json({'message' : 'user not found'})
		}
	}catch(error){
	
		res.status(204).json({'message':error})
	}

})

/* 8- Crear el endpoint que permita obtener el teléfono de un usuario que se indica por id. */
app.get('/usuarios/telefono/:id', (req,res) =>{
	try{
		let userID = parseInt(req.params.id)
		let userToGetTel = datos.usuarios.find((user) => user.id === userID)
		if(userToGetTel){
			res.status(200).json({'User number' :userToGetTel.telefono})
		}
		else{
			res.status(204).json({'message' : 'user not found'})
		}
	} catch(error){
	
		res.status(204).json({'message':error})
	}

})

/* 9- Crear el endpoint que permita obtener el nombre de un usuario que se indica por id. */
app.get('/usuarios/nombre/:id', (req,res) =>{
	try{
		let userID = parseInt(req.params.id)
		let userToGetName = datos.usuarios.find((user) => user.id === userID)
		if(userToGetName){
			res.status(200).json({'User name' : userToGetName.nombre})
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
app.get('/productos/totalstock', (req,res) => {
	try {
		// Sumar los precios individuales de todos los productos
		const totalStock = datos.productos.reduce((total, product) => {
			return total + product.precio
		}, 0)
	
		res.status(200).json({ 'Total Stock Price': totalStock })
	}
	catch (error) {
		res.status(204).json({ 'message': error })
	}
	
})


app.use('', (req, res) => {
	res.status(404).send('<h1>ERROR 404 </h1>')
})


app.listen(expossedPort, () => {
	console.log('Servidor montado, escuchando en http://localhost:'+expossedPort)
})
