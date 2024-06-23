<template>
  <div>
    <ul class="divide-y divide-gray-200">
      <li
        v-for="todo of todos"
        :key="todo.id"
        class="flex items-center gap-4 my-2"
      >
        <span
          class="flex-1"
          :class="[todo.completed ? 'text-gray-500 line-through' : '']"
          >{{ todo.title }}</span
        >

        <UToggle
          :model-value="todo.completed"
          size="md"
          @update:model-value="handleToggleTodo(todo)"
        />
        <UBadge
          :color="todo.priority == Priority.Normal ? `indigo` : `red`"
          variant="solid"
          >{{ todo.priority }}</UBadge
        >

        <UButtonGroup size="sm" orientation="horizontal">
          <UButton
            variant="soft"
            icon="i-heroicons-x-mark-20-solid"
            @click="openModal(todo)"
          />
        </UButtonGroup>
      </li>
    </ul>
    <div v-if="todos.length === 0">
      <img class="w-56 my-4 mx-auto" src="/man.png" />
    </div>

    <TodoConfirmModal
      :isOpen="isModalOpen"
      message="Delete todo?"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import useTodoPageData from "~/composables/todoPageData";
import { deleteTodo, getTodos, toggleTodo } from "~/services/todos";
import { Priority, type TodoItem } from "~/types/todo";

const toast = useToast();

const { todos, setTodos } = useTodoPageData();

const fetchAndSetTodos = async () => {
  const todosResponse = await getTodos();

  if (todosResponse) {
    setTodos(todosResponse.data);
  } else {
    console.error("Failed to set todos");
  }
};

const handleDeleteTodo = async (todo: TodoItem) => {
  const success = await deleteTodo(todo);

  if (success) {
    todos.value = todos.value.filter((t) => t.id !== todo.id);

    toast.add({
      title: "Success",
      id: "modal-success",
    });
  } else {
    console.error("Failed to delete todo");
  }
};

const handleToggleTodo = async (todo: TodoItem) => {
  const updatedTodo = await toggleTodo(todo);

  if (updatedTodo) {
    const index = todos.value.findIndex((t) => t.id === updatedTodo.id);
    if (index !== -1) {
      todos.value[index] = updatedTodo;
    }

    toast.add({
      title: "Success",
      id: "modal-success",
    });
  } else {
    console.error("Failed to toggle todo");
  }
};

const isModalOpen = ref(false);
const todoToDelete = ref<TodoItem | null>(null);

const openModal = (todo: TodoItem) => {
  todoToDelete.value = todo;
  isModalOpen.value = true;
};

const handleConfirm = () => {
  if (todoToDelete.value) {
    handleDeleteTodo(todoToDelete.value);
  }
  closeModal();
};

const handleCancel = () => {
  closeModal();
};

const closeModal = () => {
  isModalOpen.value = false;
  todoToDelete.value = null;
};

onMounted(fetchAndSetTodos);
</script>
