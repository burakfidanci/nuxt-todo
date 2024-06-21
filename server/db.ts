import fs from "node:fs";
import path from "node:path";

export class JsonDB {
  private filePath: string;

  constructor(secret: string) {
    // Mock secret check
    if (!secret)
      throw new Error("Secret is required");
    
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

  private readData(): { todos: any[]; } {
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  private writeData(data: { todos: any[]; }): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  getAllTodos(): any[] {
    const data = this.readData();
    return data.todos;
  }

  getTodoById(id: string): any | undefined {
    const data = this.readData();
    return data.todos.find(todo => todo.id === id);
  }

  createTodo(todo: any): any {
    const data = this.readData();
    const newTodo: any = {
      ...todo,
      id: Date.now().toString(),
    };
    data.todos.push(newTodo);
    this.writeData(data);
    return newTodo;
  }

  updateTodo(id: string, updates: any): any | undefined {
    const data = this.readData();
    const todoIndex = data.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1)
      return undefined;

    data.todos[todoIndex] = { ...data.todos[todoIndex], ...updates };
    this.writeData(data);
    return data.todos[todoIndex];
  }

  deleteTodo(id: string): boolean {
    const data = this.readData();
    const initialLength = data.todos.length;
    data.todos = data.todos.filter(todo => todo.id !== id);
    this.writeData(data);
    return data.todos.length < initialLength;
  }
}
