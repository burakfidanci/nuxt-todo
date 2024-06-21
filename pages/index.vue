<script setup>
const loading = ref(false);
const newTodo = ref("");

const todos = ref([])
todos.value = await $fetch("/api/todos");

async function addTodo() {
  loading.value = true;

  await $fetch("/api/todos", {
    method: "POST",
    body: {
      title: newTodo.value,
      completed: false,
    },
  });
  todos.value = await $fetch("/api/todos");

  loading.value = false;
}

async function toggleTodo(todo) {
  todo.completed = !todo.completed;
  await $fetch(`/api/todos/${todo.id}`, {
    method: "PATCH",
    body: {
      completed: todo.completed,
    },
  });
  todos.value = await $fetch("/api/todos");
}

async function deleteTodo(todo) {
  await $fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
  todos.value = await $fetch("/api/todos");
}
</script>

<template>
  <UCard @submit.prevent="addTodo">
    <template #header>
      <h3 class="text-lg font-semibold leading-6">
          Todo List
      </h3>
    </template>

    <div class="flex items-center gap-2">
      <UInput
        v-model="newTodo"
        name="todo"
        :disabled="loading"
        class="flex-1"
        placeholder="Review the codebase"
        autocomplete="off"
        size="xs"
        autofocus
        :ui="{ wrapper: 'flex-1' }"
      />

      <UButton
        type="submit"
        icon="i-heroicons-plus-20-solid"
        size="md"
        :loading="loading"
        :disabled="newTodo.trim().length === 0"
      />
    </div>

    <ul class="divide-y divide-gray-200">
      <li
        v-for="todo of todos"
        class="flex items-center gap-4"
      >
        <span
          class="flex-1 font-medium"
          :class="[todo.completed ? 'text-gray-500 line-through' : '']"
        >{{ todo.title }}</span>

        <UToggle
          :model-value="todo.completed"
          size="xs"
          @update:model-value="toggleTodo(todo)"
        />

        <UButton
          variant="soft"
          icon="i-heroicons-x-mark-20-solid"
          @click="deleteTodo(todo)"
        />
      </li>
    </ul>
  </UCard>
</template>
