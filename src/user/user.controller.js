'user strict'

import User from './user.model.js' //Único que puede ir en mayúscula
import { encrypt, checkPassword, checkUpdate } from '../../utils/validator.js'
export const test = (req, res) => {
    return res.send('Hello World')
}


export const register = async (req, res) => { //Solo para clientes
    try {
        //Capturar la informacion del cliente (body)
        let data = req.body;
        //Encriptar la constraseña
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto
        data.role = 'CLIENT' //Si viene con otro valor o no viene, lo asigna a role Cliente
        //Crear una instancia del modelo (schema)
        let user = new User(data)
        //Guardar la información 
        await user.save()
        //Responda al usuario
        return res.send({ message: 'Registered succesfully' })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error registering user', err })
    }
}

export const login = async (req, res) => {
    try {
        //Capturar la información (body)
        let { username, password } = req.body
        //Validar que el usuario existe
        let user = await User.findOne({ username })
        //Verifico que la contraseña coincida
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }

            //Responder (dar acceso)
            return res.send({ message: `Welcome ${user.name}`, loggedUser })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Failed to login' })
    }
}

export const update = async (req, res) => { //Usuarios logeado
    try {
        //Obtener el id del usuario o acutalizar
        let { id } = req.params
        //Obtener datos que vamos a actualizar
        let data = req.body
        //Validar si trae datos a actualizar
        let update = checkUpdate(data, id)
        if (update) return res.status(400).send({ message: 'Have submitted some data that cannot be update or missing data' })
        //Validar si tien permisos (tokenización) X Hoy no le vemos X
        //Actulizamos en la BD
        let updatedAnimal = await User.findOneAndUpdate(
            { _id: id }, //ObjectId <- hexadecimal (hora sys, versión mongo, llave privada)
            data, //Datos que va actualizar
            { new: true } //Objeto de la BD ya actualizada 
        )
        //Validar si se actualizó
        if (!updatedAnimal) return res.status(401).send({ message: 'User not found and not updated' })
        //Responder con el dato actualizado
        return res.send({ message: 'Updated animal', updatedAnimal})

    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({ message: `Username ${err.keyValue.username} is already taken` })
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const deleteU = async (req, res) => {
    try {
        //Obtener el id
        let { id } = req.params
        //Validar si está logeado y el mismo X Hay no le vemos X
        //Eliminar (deleteOne / findOneAndDelte)
        let delelteAnimal = await User.findOneAndDelete({ _id: id })
        //Verificar que se eliminó
        if (!deletedAnimal) return res.status(400).send({ message: 'Account' })
        //Responder
        return res.send({ message: `Account whith username ${deletedAnimal.username} deleted succesfully` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting account' })
    }
}