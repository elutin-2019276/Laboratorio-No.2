'user strict'

import Animal from './animal.model.js'
import { encrypt, checkPassword, checkUpdate } from '../../utils/validator.js'
export const test = (req, res) => {
    return res.send('Hello World')
}

export const registro = async (req, res) => {
    try {

        let data = req.body;
        let Animal = new Animal(data)
        await Animal.save()
        return res.send({ message: 'Registered succesfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err })
    }

}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (update) return res.status(400).send({ message: 'Have submitted some data that cannot be update or missing data' })
        let updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { new: true }
        )
        if (!updatedUser) return res.status(401).send({ message: 'User not found and not updated' })
        return res.send({ message: 'Update user', updatedUser })
    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({ message: `Username ${err.keyValue.username}` })
        return res.send({ message: 'Updated user', updatedUser })
    }
}

export const deleteU = async (req, res) => {
    try {
        let { id } = req.params
        let delelteUser = await User.findOneAndUpdate({ _id: id })
        if (!delelteUser) return res.status(400).send({ message: 'Account' })
        return res.send({ message: `Account whith username ${deletedUser.username} deleted succesfully` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting account' })
    }
}