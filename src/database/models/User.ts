import mongoose from "mongoose";

export interface IUser {
    clerkId: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    image: string
}

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: [true, 'clerkId required']
    },
    firstName: {
        type: String,
        // required: [true, 'firstName required']
    },
    lastName: {
        type: String,
        // required: [true, 'email required']
    },
    username: {
        type: String,
        // required: [true, 'username required']
    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true
    },
    image: {
        type: String,
        required: [true, 'image required']
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User