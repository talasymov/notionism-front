<template>
    <client-only>
        <resizabale-wrapper :resizable="resizable" :config="{maxHeight, maxWidth}">
            <div :class="['rounded-' + config.bg_rounded]"
                 :style="{
                    'width': '300px',
                    'background-color': config.bg_color,
                    'border': `${config.bg_border_size}px solid ${config.bg_border_color}`,
                    'padding' : `${config.bg_padding ? Number(config.bg_padding) * 2 : 0}px`,
                    'border-radius': getWrapperBorderRadius,
                }"
            >
                <div>
                    <ul class="flex justify-between items-center content-center text-center">
                        <li class="flex flex-col" v-if="config.show_days">
                            <span :style="{'font-size': config.size_days + 'px', 'color': config.color_days}">{{ days }}</span>
                            <span :style="{'font-size': config.size_label_days + 'px', 'color': config.color_label_days}">days</span>
                        </li>
                        <li class="flex flex-col" v-if="config.show_hours">
                            <span :style="{'font-size': config.size_hours + 'px', 'color': config.color_hours}">{{ hours }}</span>
                            <span :style="{'font-size': config.size_label_hours + 'px', 'color': config.color_label_hours}">hours</span>
                        </li>
                        <li class="flex flex-col" v-if="config.show_minutes">
                            <span :style="{'font-size': config.size_minutes + 'px', 'color': config.color_minutes}">{{ minutes }}</span>
                            <span :style="{'font-size': config.size_label_minutes + 'px', 'color': config.color_label_minutes}">minutes</span>
                        </li>
                        <li class="flex flex-col" v-if="config.show_seconds">
                            <span :style="{'font-size': config.size_seconds + 'px', 'color': config.color_seconds}">{{ seconds }}</span>
                            <span :style="{'font-size': config.size_label_seconds + 'px', 'color': config.color_label_seconds}">seconds</span>
                        </li>
                    </ul>
                </div>
            </div>
        </resizabale-wrapper>
    </client-only>
</template>

<script>
import ResizabaleWrapper from "~/components/UI/ResizabaleWrapper.vue";
import moment from "moment/moment";

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

export default {
    name: "CountdownWidget",
    components: {
        ResizabaleWrapper,
    },
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
        config: {
            type: Object,
            default: () => ({}),
        },
        resizable: {
            type: Boolean,
            default: false,
        },
        maxWidth: {
            type: Number,
            default: null,
        },
        maxHeight: {
            type: Number,
            default: null,
        },
    },
    data: () => ({
        now: moment(),
        deadline: null,
        interval: null,
    }),
    methods: {
        tickTack() {
            this.now = moment()

            if (this.distance < 0){
                clearInterval(this.interval)
            }
        },
    },
    computed: {
        getWrapperBorderRadius() {
            const radius = this.config && this.config.rounded

            if(radius) return (radius * 2) + 'px'
            return '8px'
        },
        distance(){
            return this.deadline - this.now
        },
        days(){
            return Math.floor(this.distance / (day)).toString().padStart(2, '0')
        },
        hours(){
            return Math.floor((this.distance % (day)) / (hour)).toString().padStart(2, '0')
        },
        minutes(){
            return Math.floor((this.distance % (hour)) / (minute)).toString().padStart(2, '0')
        },
        seconds(){
            return Math.floor((this.distance % (minute)) / second).toString().padStart(2, '0')
        },
    },
    mounted() {
        this.deadline = new Date(this.config.deadline).getTime()
        this.interval = setInterval(this.tickTack, 1000)
    }
}
</script>

<style scoped>

</style>