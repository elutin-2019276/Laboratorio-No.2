//Conexión de MongoDB

'use strict'

import mongoose, { mongo } from 'mongoose'

export const connect = async()=>{
    try{
        mongoose.connection.on('error', ()=>{
            console.log('MondoDB | could not be connect to mongodb')
            mongoose.disconnect()
        })

        mongoose.connection.on('connecting', ()=> console.log('MongoDB | try connecting'))
        mongoose.connection.on('connected', ()=> console.log('MongoDB | connected to mongodb'))
        mongoose.connection.on('open', ()=> console.log('MongoDB | connect to database'))
        mongoose.connection.on('reconnected', ()=> console.log('MongoDB | reconnected to mongdb'))
        
        return await mongoose.connect('mongodb://127.0.0.1:27017/AdoptionSystemAV24')
       
    }catch(err){
        console.error('Database connection failed', err)
    }
}