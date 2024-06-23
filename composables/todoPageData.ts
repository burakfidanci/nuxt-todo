import type { TodoItem } from "~/types/todo";

const useTodoPageData = () => {
  const todos = useState<TodoItem[]>("todos", () => [])

  const setTodos = (values: TodoItem[]) => {
    todos.value = values;
  };

  return {
    todos,
    setTodos
  };
};

export default useTodoPageData;
