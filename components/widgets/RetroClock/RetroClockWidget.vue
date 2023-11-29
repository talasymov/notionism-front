<template>
    <client-only>
        <resizabale-wrapper :resizable="resizable" :config="{maxHeight, maxWidth}">
            <div :class="['relative', 'rounded-' + config.bg_rounded]"
                 :style="{
                    'width': '300px',
                }"
            >
                <div
                        class="flex gap-3 text-center"
                >
                    <div
                            v-for="element in elements"
                            class="bg-primary items-center flex justify-center w-full py-7 relative"
                            :class="['rounded-' + config.tiles_rounded]"
                            :style="{
                            'background-color': config.bg_color,
                            'border': `${config.border_size}px solid ${config.border_color}`,
                        }"
                    >
                        <span
                                :style="{
                                'color': config.font_color,
                                'font-size': config.font_size + 'px',
                            }"
                        >
                            {{ element.value }}
                        </span>
                        <div
                                v-if="config.divider_display"
                                class="absolute w-full h-0.5 bg-gray-50 top-1/2"
                                :style="{
                                'background-color': config.divider_color,
                                'height': config.divider_size + 'px',
                            }"
                        ></div>
                        <div
                                v-if="element.name === 'hours' && config.time_format_display"
                                class="absolute text-white left-2 bottom-1"
                                :style="{
                                'color': config.font_color,
                                'font-size': (config.font_size / 5) + 'px',
                            }"
                        >{{ timeFormat }}
                        </div>
                        <div
                                v-if="(element.name === 'seconds' && config.weekday_display) || config.weekday_display && element.name === 'minutes' && !config.show_seconds"
                                class="absolute text-white right-2 bottom-1"
                                :style="{
                                'color': config.font_color,
                                'font-size': (config.font_size / 5) + 'px',
                            }"
                        >{{ weekday }}
                        </div>
                    </div>
                </div>
            </div>
        </resizabale-wrapper>
    </client-only>
</template>

<script>
import ResizabaleWrapper from "~/components/UI/ResizabaleWrapper.vue";
import moment from "moment/moment";

export default {
    name: "RetroClockWidget",
    components: {
        ResizabaleWrapper,
    },
    data() {
        return {
            now: moment(),
        }
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
    computed: {
        elements() {
            let elements = []

            elements.push({value: this.now.hours().toString().padStart(2, '0'), name: 'hours'})
            elements.push({value: this.now.minutes().toString().padStart(2, '0'), name: 'minutes'})

            if (this.config.show_seconds) {
                elements.push({value: this.now.seconds().toString().padStart(2, '0'), name: 'seconds'})
            }

            return elements
        },
        timeFormat() {
            if (this.config.time_format === 24) {
                return 'PM'
            }

            return 'AM'
        },
        weekday() {
            if (this.config.weekday_format === 'short') {
                return this.now.format('ddd').toUpperCase()
            }

            if (this.config.weekday_format === 'full') {
                return this.now.format('dddd').toUpperCase()
            }

            return ''
        },
    },
    methods: {
        tickTack() {
            this.now = moment()
        },
    },
    mounted() {
        setInterval(this.tickTack, 1000);
    },
}
</script>

<style scoped>

</style>