<template>
  <div>
    <label for="first_name" class="block mb-2 text-base font-medium text-gray-900">{{ label }}</label>
    <textarea
        class="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
        :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"></textarea>
  </div>
</template>

<script setup type="ts">
defineProps({
  modelValue: null,
  label: null
})

defineEmits(['update:modelValue'])
</script>