import fs from "node:fs";
import path from "node:path";
import {
  TodoInsertOrUpdateItem,
  TodoInsertResponse,
  TodoItem,
  TodoListResponse,
} from "~/types/todo";

export class JsonDB {
  private filePath: string;

  constructor(secret: string) {
    // Mock secret check
    if (!secret) throw new Error("Secret is required");

    this.filePath = path.join(process.cwd(), "server/data", "todos.json");
    this.ensureFileExists();
  }

  private ensureFileExists(): void {
    const dirPath = path.dirname(this.filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify({ todos: [] }));
    }
  }

  private readData(): { todos: TodoItem[] } {
    try {
      const data = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading data:", error);
      return { todos: [] };
    }
  }

  private writeData(data: { todos: TodoItem[] }): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error writing data:", error);
    }
  }

  getAllTodos(): TodoListResponse {
    const data = this.readData();
    return {
      status: true, //fake status
      data: data.todos,
    };
  }

  getTodoById(id: string): TodoItem | undefined {
    const data = this.readData();
    return data.todos.find((todo) => todo.id === id);
  }

  createTodo(todo: TodoInsertOrUpdateItem): TodoInsertResponse {
    const data = this.readData();
    const newTodo: TodoItem = {
      ...todo,
      id: Date.now().toString(),
    };
    data.todos.push(newTodo);
    this.writeData(data);

    return {
      data: newTodo,
      status: true, // fake status
    };
  }

  updateTodo(id: string, updates: TodoItem): TodoItem | undefined {
    const data = this.readData();
    const todoIndex = data.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) return undefined;

    data.todos[todoIndex] = { ...data.todos[todoIndex], ...updates };
    this.writeData(data);
    return data.todos[todoIndex];
  }

  deleteTodo(id: string): boolean {
    const data = this.readData();
    const initialLength = data.todos.length;
    data.todos = data.todos.filter((todo) => todo.id !== id);
    this.writeData(data);
    return data.todos.length < initialLength;
  }
}
