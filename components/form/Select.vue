<template>
  <div>
    <label for="first_name" class="block mb-2 text-base font-medium text-gray-900">{{ label }}</label>
    <select :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      <option :value="null">None</option>
      <option v-for="option in options" :value="option.id">{{ option.name }}</option>
    </select>
  </div>
</template>

<script setup type="ts">
defineProps({
  modelValue: null,
  label: null,
  options: []
})

defineEmits(['update:modelValue'])
</script>