'use server'

import { connectToDB } from "./database"
import User from "./database/models/User"

interface User{
    clerkId?: string
    username: string
    firstName: string
    lastName: string
    email?: string
    image: string
}

export async function createUser(user: User){
    console.log('user from createUser action', user)
    try{
        await connectToDB()
        const newUser = await User.create(user, {new: true})
        console.log('User created: ', newUser)
    }catch(err: unknown){
        if(err instanceof Error){
            console.log(err.message)
        }
    }
}

export async function updateUser(id: string, user: User){
    try{
        await connectToDB()
        const updatedUser = await User.findByIdAndUpdate(id, {new: true})
        console.log('User updated: ', updatedUser)
    }catch(err: unknown){
        throw err
    }
}

export async function deleteUser(id: string | undefined){
    try{
        if(id){
            await connectToDB()
            const deletedUser = User.findByIdAndDelete(id)
            console.log('User deleted: ', deletedUser)
        }
    }catch(err: unknown){
        throw err
    }
}