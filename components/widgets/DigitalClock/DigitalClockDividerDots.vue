<template>
    <svg width="8" height="18" viewBox="0 0 8 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3.53552" width="5" height="5" transform="rotate(45 3.53552 0)" :fill="fill"/>
        <rect x="3.53552" y="10.0355" width="5" height="5" transform="rotate(45 3.53552 10.0355)"
              :fill="fill"/>
    </svg>
</template>
<script>
export default {
    props: {
        fill: String,
    }
}
</script>