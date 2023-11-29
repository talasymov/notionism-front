<template>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 13C9 10.7909 10.7909 9 13 9H18C20.2091 9 22 10.7909 22 13V18C22 20.2091 20.2091 22 18 22H13C10.7909 22 9 20.2091 9 18V13ZM13 11C11.8954 11 11 11.8954 11 13V18C11 19.1046 11.8954 20 13 20H18C19.1046 20 20 19.1046 20 18V13C20 11.8954 19.1046 11 18 11H13Z" :fill="color"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 3.79086 3.79086 2 6 2H11C13.2091 2 15 3.79086 15 6V6.20833C15 6.76062 14.5523 7.20833 14 7.20833C13.4477 7.20833 13 6.76062 13 6.20833V6C13 4.89543 12.1046 4 11 4H6C4.89543 4 4 4.89543 4 6V11C4 12.1046 4.89543 13 6 13H6.20833C6.76062 13 7.20833 13.4477 7.20833 14C7.20833 14.5523 6.76062 15 6.20833 15H6C3.79086 15 2 13.2091 2 11V6Z" :fill="color"/>
  </svg>
</template>

<script setup>

const props = defineProps({
  color: {
    type: String,
    default: 'black'
  }
})

</script>