import mongoose, { Schema } from "mongoose";
import { IUser } from "./User";

export interface ITask {
    assignedTo: IUser,
    title: string,
    description: string,
    status: 'pending' | 'in-progress' | 'in-review' | 'done',
    priority: 'urgent' | 'high' | 'medium' | 'low',
    deadline: Date
}

const taskSchema = new mongoose.Schema({
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'title required']
    },
    description:{
        type: String,
        required: [true, 'description required']
    },
    status: {
        enum: ['pending', 'in-progress', 'in-review', 'done'],
        required: [true, 'status required']
    },
    priority: {
        enum: ['urgent', 'high', 'medium', 'low'],
        required: [true, 'priority required']
    },
    deadline: {
        type: Date,
        required: [true, 'deadline required']
    }
})