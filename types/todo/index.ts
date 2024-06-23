export enum Priority {
    Urgent = "Urgent",
    Normal = "Normal"
}

export interface TodoInsertResponse {
    status: boolean
    data: TodoItem
}

export interface TodoListResponse {
    status: boolean
    data: TodoItem[]
}

export interface TodoInsertOrUpdateItem {
    title: string
    completed: boolean
    priority: Priority
}

export interface TodoItem {
    id: string
    title: string
    completed: boolean
    priority: Priority
}