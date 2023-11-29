<template>
  <div class="my-input relative">
    <label
        class="my-input__label block mb-2 text-base font-medium text-gray-900"
    >
      {{ label }}
    </label>
    <div class="my-input__slot">
      <div class="grid grid-cols-5 gap-1">
      <div
          v-for="color in colors"
          :key="color.value"
          class="cursor-pointer transition col-span-1 text-center text-base px-2 py-1 rounded-lg border-2"
          :style="{borderColor: color.borderColor, color: color.value === modelValue ? 'white' : color.textColor, background: color.value === modelValue ? color.borderColor : ''}"
          @click="$emit('update:modelValue', color.value)"
      >
        {{color.text}}
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {},
    label: {},
  },
  data: () => ({
    colors: [
      {
        text: 'Gray',
        value: 'gray',
        borderColor: '#6b7280',
        textColor: '#17223AFF',
        bgColor: 'transparent',
      },
      {
        text: 'Red',
        value: 'red',
        borderColor: '#ef4444',
        textColor: '#790e0e',
        bgColor: 'transparent',
      },
      {
        text: 'Orange',
        value: 'orange',
        borderColor: '#f97316',
        textColor: '#864d0b',
        bgColor: 'transparent',
      },
      {
        text: 'Yellow',
        value: 'yellow',
        borderColor: '#eab308',
        textColor: '#8a7b19',
        bgColor: 'transparent',
      },
      {
        text: 'Green',
        value: 'green',
        borderColor: '#22c55e',
        textColor: '#105e2c',
        bgColor: 'transparent',
      },
      {
        text: 'Teal',
        value: 'teal',
        borderColor: '#14b8a6',
        textColor: '#0d483d',
        bgColor: 'transparent',
      },
      {
        text: 'Blue',
        value: 'blue',
        borderColor: '#3b82f6',
        textColor: '#14355d',
        bgColor: 'transparent',
      },
      {
        text: 'Indigo',
        value: 'indigo',
        borderColor: '#6366f1',
        textColor: '#0a1234',
        bgColor: 'transparent',
      },
      {
        text: 'Purple',
        value: 'purple',
        borderColor: '#a855f7',
        textColor: '#401175',
        bgColor: 'transparent',
      },
      {
        text: 'Pink',
        value: 'pink',
        borderColor: '#ec4899',
        textColor: '#731648',
        bgColor: 'transparent',
      },
    ]
  }),
}
</script>