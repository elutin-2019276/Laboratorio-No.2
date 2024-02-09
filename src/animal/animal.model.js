import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    search: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    keeper: {
        type: String,
        required: true,
    },
    decription: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN', 'CLIENT'],
        required: true
    }
})