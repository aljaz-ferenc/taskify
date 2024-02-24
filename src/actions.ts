'use server'

import { ObjectId } from "mongodb"
import { connectToDB } from "./database"
import User, { IUser } from "./database/models/User"

interface User{
    clerkId?: string
    username: string
    firstName: string
    lastName: string
    email?: string
    image: string
}

export async function createUser(user: User){
    try{
        await connectToDB()
        const newUser = await User.create(user)
        return JSON.parse(JSON.stringify(newUser))
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
        if(err instanceof Error){
            console.log(err.message)
        }
    }
}

export async function deleteUser(clerkId: string | undefined){
    try{
        if(clerkId){
            await connectToDB()
            const deletedUser = await User.deleteOne({clerkId})
            console.log('User deleted: ', deletedUser)
        }
    }catch(err: unknown){
        if(err instanceof Error){
            console.log(err.message)
        }
    }
}