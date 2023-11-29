<template>
    <svg width="28" height="53" viewBox="0 0 28 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!--top-->
        <path d="M6.38095 5L4 2.5L6.38095 0H21.619L24 2.5L21.619 5H6.38095Z" :fill="topColor"/>
        <!--middle-->
        <path d="M21.619 48L24 50.5L21.619 53L6.38095 53L4 50.5L6.38095 48L21.619 48Z" :fill="bottomColor"/>
        <!--bottom-->
        <path d="M6.38095 29L4 26.5L6.38095 24H21.619L24 26.5L21.619 29H6.38095Z" :fill="middleColor"/>
        <!--right top-->
        <path d="M-1.09278e-07 6.5L2.5 4L5 6.5L5 22.5L2.5 25L-8.08661e-07 22.5L-1.09278e-07 6.5Z"
              :fill="leftTopColor"/>
        <!--right bottom-->
        <path d="M28 46.5L25.5 49L23 46.5L23 30.5L25.5 28L28 30.5L28 46.5Z" :fill="rightBottomColor"/>
        <!--left top-->
        <path d="M23 6.5L25.5 4L28 6.5L28 22.5L25.5 25L23 22.5L23 6.5Z" :fill="rightTopColor"/>
        <!--left bottom-->
        <path d="M5 46.5L2.5 49L3.27835e-07 46.5L2.42598e-06 30.5L2.5 28L5 30.5L5 46.5Z" :fill="leftBottomColor"/>
    </svg>
</template>

<script>
export default {
    props: {
        input: Number,
        emptyColor: String,
        fillColor: String,
    },
    computed: {
        getInputValue() {
            return Number(this.input)
        },
        topColor() {
            if ([2, 3, 5, 6, 7, 8, 9, 0].includes(this.getInputValue)) return this.fillColor
            return this.emptyColor
        },
        middleColor() {
            if ([2, 3, 4, 5, 6, 8, 9].includes(this.getInputValue)) return this.fillColor
            return this.emptyColor
        },
        bottomColor() {
            if ([2, 3, 5, 6, 8, 9, 0].includes(this.getInputValue)) return this.fillColor
            return this.emptyColor
        },
        rightTopColor() {
            if ([1, 2, 3, 4, 7, 8, 9, 0].includes(this.getInputValue)) return this.fillColor
            return this.emptyColor
        },
        rightBottomColor() {
            if ([1, 3, 4, 5, 6, 7, 8, 9, 0].includes(this.getInputValue)) return this.fillColor
            return this.emptyColor
        },
        leftTopColor() {
            if ([4, 5, 6, 8, 9, 0].includes(this.getInputValue)) return this.fillColor
            return this.emptyColor
        },
        leftBottomColor() {
            if ([2, 6, 8, 0].includes(this.getInputValue)) return this.fillColor
            return this.emptyColor
        },
    },
}
</script>