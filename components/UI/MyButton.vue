<template>
    <button :class="`my-button ${computedCssClasses}`">
        <slot/>
    </button>
</template>

<script>
export default {
    props: {
        size: String,
        block: Boolean,
        bordered: Boolean,
        type: String,
    },
    computed: {
        computedCssClasses() {
            const cssClasses = []
            let buttonSize;


            if (this.size) cssClasses.push(`my-button--${this.size || '2xl'}`)
            if (this.block) cssClasses.push('my-button--block')
            if (this.bordered) cssClasses.push('my-button--bordered')
            if (this.type === 'primary') cssClasses.push('my-button--primary')

            return [...cssClasses, buttonSize].join(' ')
        },
    },
}
</script>