<template>
  <ClientOnly>
    <Teleport to="#teleport-form-button">
      <UButton
        @click="toggleForm"
        icon="i-heroicons-plus"
        size="sm"
        color="primary"
        label="Add Task"
        square
        variant="solid"
      />
    </Teleport>
  </ClientOnly>
  <USlideover v-model="isOpen">
    <form @submit.prevent="handleAddTodo" class="p-3">
      <UICard class="w-full">
        <template #header>
          <h3 class="text-lg font-semibold leading-6">Add Todo</h3>
        </template>

        <div class="flex flex-col gap-2">
          <UFormGroup label="Todo" class="mb-3">
            <template #default>
              <UInput
                v-model="todoItem.title"
                name="todo"
                :disabled="loading"
                class="flex-1"
                placeholder="Review the codebase"
                autocomplete="off"
                size="xs"
                autofocus
                :ui="{ wrapper: 'flex-1' }"
              />
            </template>
          </UFormGroup>

          <URadioGroup
            v-model="todoItem.priority"
            legend="Choose priority"
            :options="options"
            class="mb-3"
          />
          <UDivider size="sm" />
          <UButton
            type="submit"
            icon="i-heroicons-plus-20-solid"
            size="md"
            label="Add Todo"
            :loading="loading"
            :disabled="todoItem.title.trim().length === 0"
          />
        </div>
      </UICard>
    </form>
  </USlideover>
</template>

<script lang="ts" setup>
import {
  Priority,
  type TodoInsertResponse,
  type TodoItem,
  type TodoListResponse,
} from "~/types/todo";
import useTodoPageData from "~/composables/todoPageData";
import { addTodo, getTodos } from "~/services/todos";

const { setTodos } = useTodoPageData();

const isOpen = ref<boolean>(false);

const toggleForm = () => (isOpen.value = true);

const emptyTodo: TodoItem = {
  id: "",
  completed: false,
  priority: Priority.Normal,
  title: "",
};

const todoItem = ref<TodoItem>({ ...emptyTodo });
const loading = ref(false);

const options = Object.values(Priority).map((priority) => ({
  value: priority,
  label: priority,
}));

const toast = useToast();

const handleAddTodo = async () => {
  loading.value = true;

  try {
    const response = await addTodo(todoItem.value);

    if (response && response.status) {
      toast.add({
        title: "Success",
        id: "modal-success",
      });
      isOpen.value = false;
      await fetchAndSetTodos();
    } else {
      toast.add({
        title: "Error",
        id: "modal-error",
      });
    }
  } catch (error) {
    console.error("Error adding todo:", error);
    toast.add({
      title: "Error",
      id: "modal-error",
    });
  } finally {
    todoItem.value = { ...emptyTodo };
    loading.value = false;
  }
};

const fetchAndSetTodos = async () => {
  const todosResponse = await getTodos();

  if (todosResponse) {
    setTodos(todosResponse.data);
  } else {
    console.error("Failed to set todos");
  }
};
</script>

<style></style>
