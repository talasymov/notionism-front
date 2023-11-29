<template>
  <div class="my-input">
    <label
        for="first_name"
        class="my-input__label block mb-2 text-base font-medium text-gray-900"
    >
      {{ label }}
    </label>
    <div class="my-input__slot">
      <input
          :type="isPasswordVisible ? 'text' : props.type"
          :placeholder="props.placeholder"
          :value="props.modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
      />
      <div v-if="type === 'password'" class="my-input__password-visibility-toggle" @click="isPasswordVisible = !isPasswordVisible">
        {{isPasswordVisible ? 'hide' : 'show'}}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  modelValue: any;
  label?: string;
  type: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
}>()

const isPasswordVisible = ref(false)

defineEmits(['update:modelValue'])
</script>

<style lang="scss">
.my-input {
  &__slot {
    position: relative;
  }
  &__selected {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
  }
  &__placeholder {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    opacity: 0.4;
  }
  &__password-visibility-toggle {
    cursor: pointer;
    font-size: 12px;
    position: absolute;
    right: 8px;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: rgba(155, 155, 155, 0.12);
    transition: 250ms ease;
    top: 50%;
    transform: translateY(-50%);
    &:hover {
      background-color: rgba(124, 120, 120, 0.21);
    }
  }
}
</style>