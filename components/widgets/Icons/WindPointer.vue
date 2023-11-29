<template>
  <svg :style="{ transform: `rotate(${degree}deg)` }" class="inline-block" width="100%" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 0.5L0.5 17.5L7.5 15L14.5 17.5L6.5 0.5Z" :fill="color"/>
  </svg>
</template>

<script>
export default {
  props: {
    degree: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: 'black',
    },
  }
}
</script>