export interface ITask {
    title: string,
    description: string,
    deadline: Date,
    priority: 'urgent' | 'high' | 'medium' | 'low',
    status: 'to-do' | 'in-progress' | 'in-review' | 'done'
}