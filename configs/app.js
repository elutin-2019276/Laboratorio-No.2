//Configuración Express.

//Importaciones
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoustes from '../src/user/user.routes.js'

//Configuraciones
config()
const app = express() //Crear el servidor
const port = process.env.PORT || 3200

//Configurar el servidor de express.
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors()) //Aceptar o denegar las solicitudes de diferentes orígenes (Local, remota)
app.use(helmet()) //Aplica capa de seguridad
app.use(morgan('dev')) //Crea logs de solicitudes al servidor HTTP


//Declaración de rutas 
app.use(userRoustes)

//Levantar el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port  ${port}`)
}

