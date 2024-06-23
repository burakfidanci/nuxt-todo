import { todosUrl } from "~/contants/endpoints";
import type {
  TodoInsertResponse,
  TodoItem,
  TodoListResponse,
} from "~/types/todo";
import { useAxios } from "./api";

export const getTodos = async (): Promise<TodoListResponse | null> => {
  const axios = useAxios();

  try {
    const response = await axios.get<TodoListResponse>(todosUrl);

    if (response.data.status) {
      return response.data;
    } else {
      console.error("Failed to fetch todos");
      return null;
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
    return null;
  }
};

export const toggleTodo = async (todo: TodoItem): Promise<TodoItem | null> => {
  const axios = useAxios();

  try {
    todo.completed = !todo.completed;
    const response = await axios.patch<TodoItem>(`${todosUrl}/${todo.id}`, {
      completed: todo.completed,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to toggle todo");
      return null;
    }
  } catch (error) {
    console.error("Error toggling todo:", error);
    return null;
  }
};

export const deleteTodo = async (todo: TodoItem): Promise<boolean> => {
  const axios = useAxios();

  try {
    const response = await axios.delete(`${todosUrl}/${todo.id}`);

    if (response.status === 200) {
      return true;
    } else {
      console.error("Failed to delete todo");
      return false;
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    return false;
  }
};

export const addTodo = async (
  todo: TodoItem
): Promise<TodoInsertResponse | null> => {
  const axios = useAxios();

  try {
    const response = await axios.post<TodoInsertResponse>(`${todosUrl}`, todo);

    if (response.data.status) {
      return response.data;
    } else {
      console.error("Failed to add todo");
      return null;
    }
  } catch (error) {
    console.error("Error adding todo:", error);
    return null;
  }
};
