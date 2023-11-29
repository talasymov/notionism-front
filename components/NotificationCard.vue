<template>
  <div class="p-4">
    <h2 class="text-xl">Notification card {{counter}}</h2>

    <button class="my-button border-2 border-black" @click="increase">+</button>
    <button class="my-button border-2 border-black" @click="decrease">-</button>
  </div>
</template>

<script setup>
const counter = ref(0)

const increase = () => counter.value++
const decrease = () => counter.value--
</script>