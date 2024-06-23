<template>
  <div
    class="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900"
  >
    <UCard
      class="w-1/2 bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 ring-1 ring-gray-200 dark:ring-gray-700 rounded-lg shadow-lg min-h-96"
    >
      <template #header>
        <div class="flex space-between items-center">
          <h4 class="flex-1">Todo App</h4>
          <div id="teleport-form-button"></div>
        </div>
      </template>

      <TodoList/>

      <TodoForm/>
      
    </UCard>
  </div>
</template>
<script setup lang="ts">

</script>

<style scoped></style>
