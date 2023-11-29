<template>
  <div>
    <label class="block mb-2 text-base font-medium text-gray-900">{{ label }}</label>
    <input
        class="block w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
        aria-describedby="user_avatar_help" type="file"
        @input="$emit('update:modelValue', $event.target.files[0])"/>
  </div>
</template>

<script setup type="ts">
defineProps({
  modelValue: null,
  label: null
})

defineEmits(['update:modelValue'])
</script>