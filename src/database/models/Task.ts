import mongoose, { Schema } from "mongoose";
import { IUser } from "./User";

export interface ITask {
    assignedTo: string[],
    title: string,
    description: string,
    status: 'pending' | 'in-progress' | 'in-review' | 'done',
    priority: 'urgent' | 'high' | 'medium' | 'low',
    deadline: Date
}

const taskSchema = new mongoose.Schema({
    assignedTo: {
        type: [String],
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
        type: String,
        enum: ['pending', 'in-progress', 'in-review', 'done'],
        required: [true, 'status required'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['urgent', 'high', 'medium', 'low'],
        required: [true, 'priority required']
    },
    deadline: {
        type: Date,
        required: [true, 'deadline required']
    }
})

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema)
export default Task