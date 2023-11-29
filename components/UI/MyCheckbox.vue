<template>
    <div class="flex items-center">
        <input
                type="checkbox"
                class="h-5 w-5 text-green-500 focus:ring-green-400 border-gray-300 rounded"
                :id="id"
                :checked="modelValue"
                @change="handleChange"
        >
        <label :for="id" class="ml-2 text-gray-700">
            {{ label }}
        </label>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        modelValue: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        handleChange(event) {
            this.$emit('update:modelValue', event.target.checked);
        },
    },
};
</script>
