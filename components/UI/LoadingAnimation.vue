<template>
    <svg id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
  <circle :fill="fill" stroke="none" cx="32" cy="50" r="6">
    <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.1"/>
  </circle>
        <circle :fill="fill" stroke="none" cx="52" cy="50" r="6">
    <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.2"/>
  </circle>
        <circle :fill="fill" stroke="none" cx="72" cy="50" r="6">
    <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.3"/>
  </circle>
</svg>
</template>

<script>
export default {
    props: {
        fill: {
            type: String,
            default: '#000000'
        }
    }
}
</script>