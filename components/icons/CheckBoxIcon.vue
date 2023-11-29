<template>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z" :fill="dark ? 'white' : 'black'"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6402 8.2318C17.0645 8.58537 17.1218 9.21593 16.7682 9.64021L11.7682 15.6402C11.5937 15.8497 11.3411 15.9788 11.0691 15.9976C10.797 16.0165 10.5291 15.9234 10.3273 15.74L7.32733 13.0127C6.91868 12.6412 6.88856 12.0087 7.26007 11.6001C7.63157 11.1914 8.26402 11.1613 8.67268 11.5328L10.9002 13.5578L15.2318 8.35984C15.5854 7.93556 16.2159 7.87824 16.6402 8.2318Z" :fill="dark ? 'white' : 'black'"/>
  </svg>
</template>

<script setup>
defineProps({
  dark: {
    type: Boolean,
    default: false,
  }
})
</script>