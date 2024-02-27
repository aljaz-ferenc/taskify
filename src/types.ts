export interface ITask {
    title: string,
    description: string,
    deadline: Date,
    priority: 'urgent' | 'high' | 'medium' | 'low',
    status: 'pending' | 'in-progress' | 'in-review' | 'done',
    assignedTo: string[]
}