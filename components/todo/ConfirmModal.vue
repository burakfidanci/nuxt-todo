<template>
  <UModal v-model="props.isOpen" @close="cancel" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Are you sure?
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="cancel"
          />
        </div>
      </template>

      <p>{{ message }}</p>

      <template #footer>
        <UButton class="mr-2" @click="confirm">Yes</UButton>
        <UButton color="orange" @click="cancel">Cancel</UButton>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  isOpen: Boolean,
  message: {
    type: String,
    default: "Are you sure?",
  },
});

const emits = defineEmits(["confirm", "cancel"]);

const confirm = () => emits("confirm");

const cancel = () => emits("cancel");
</script>
