<template>
    <client-only>
        <resizabale-wrapper
                :resizable="resizable"
                :config="{maxHeight, maxWidth}"
        >
            <div
                class="digital-clock rounded-lg border-2 border-gray-200"
                :style="{
                'border-color': config && config.border_color,
                'background-color': config && config.bg,
                padding: getWrapperPadding,
                'border-radius': getWrapperBorderRadius,
            }"
            >
                <div class="digital-clock__time flex justify-center">
                    <div class="flex gap-2">
                        <number-section :input="getHours[0]"
                                        :empty-color="getDisabledSegmentsColor"
                                        :fill-color="getActiveSegmentsColor"
                        />
                        <number-section :input="getHours[1]"
                                        :empty-color="getDisabledSegmentsColor"
                                        :fill-color="getActiveSegmentsColor"
                        />
                    </div>
                    <div class="flex items-center justify-center mx-2">
                        <digital-clock-divider-dots
                            :fill="config && config.active_segments_color || 'rgba(0,0,0,1)'"
                        />
                    </div>
                    <div class="flex gap-2">
                        <number-section :input="getMinutes[0]"
                                        :empty-color="getDisabledSegmentsColor"
                                        :fill-color="getActiveSegmentsColor"
                        />
                        <number-section :input="getMinutes[1]"
                                        :empty-color="getDisabledSegmentsColor"
                                        :fill-color="getActiveSegmentsColor"
                        />
                    </div>
                    <template v-if="config && config.is_show_seconds">
                        <div class="flex items-center justify-center mx-2">
                            <digital-clock-divider-dots
                                :fill="config && config.active_segments_color || 'rgba(0,0,0,1)'"
                            />
                        </div>
                        <div class="flex gap-2">
                            <number-section :input="getSeconds[0]"
                                            :empty-color="getDisabledSegmentsColor"
                                            :fill-color="getActiveSegmentsColor"
                            />
                            <number-section :input="getSeconds[1]"
                                            :empty-color="getDisabledSegmentsColor"
                                            :fill-color="getActiveSegmentsColor"
                            />
                            {{ getTime }}
                        </div>
                    </template>
                </div>
                <template v-if="config && config.is_show_additional_info">
                    <div
                        class="digital-clock__additional-info font-semibold flex pt-2 text-base"
                        :style="{
                        'justify-content': config && config.is_24_time_format ? 'center' : 'space-between',
                        color: config && config.text_color || 'rgba(0,0,0,1)'
                        }"
                    >
                        <div>
                            {{getDay}}
                        </div>
                        <div v-if="config && !config.is_24_time_format">
                            pm
                        </div>
                    </div>
                </template>
            </div>
        </resizabale-wrapper>
    </client-only>
</template>

<script>
import NumberSection from "~/components/widgets/DigitalClock/NumberSection.vue";
import moment from "moment";
import ResizabaleWrapper from "~/components/UI/ResizabaleWrapper.vue";
import DigitalClockDividerDots from "~/components/widgets/DigitalClock/DigitalClockDividerDots.vue";

export default {
    components: {DigitalClockDividerDots, ResizabaleWrapper, NumberSection},
    props: {
        config: {
            type: Object,
            default: () => ({}),
        },
        maxWidth: {
            type: Number,
            default: null,
        },
        maxHeight: {
            type: Number,
            default: null,
        },
        resizable: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        time: moment(),
        DEFAULT_DISABLED_SEGMENTS_COLOR:'rgba(155,155,155,0.3)',
        DEFAULT_ACTIVE_SEGMENTS_COLOR: '#000000',
    }),
    methods: {
        tickTack() {
            this.time = moment()
        },
    },
    computed: {
        getWrapperPadding() {
            const padding = this.config && this.config.padding

            if(padding) return (padding * 2) + 'px'
            return '16px'
        },
        getWrapperBorderRadius() {
            const radius = this.config && this.config.rounded

            if(radius) return (radius * 2) + 'px'
            return '8px'
        },
        getDisabledSegmentsColor() {
            return this.config && this.config.disabled_segments_color || this.DEFAULT_DISABLED_SEGMENTS_COLOR
        },
        getActiveSegmentsColor() {
            return this.config && this.config.active_segments_color || this.DEFAULT_ACTIVE_SEGMENTS_COLOR
        },
        getDay() {
            if(this.config && this.config.is_full_day_name) {
                return this.time.format('dddd').toLowerCase()
            }
            return this.time.format('ddd').toLowerCase()
        },
        getHours() {
            if(this.config && this.config.is_24_time_format) {
                return this.time.hours().toString().padStart(2, '0')
            }
            return this.time.format('h').padStart(2, '0')
        },
        getMinutes() {
            return this.time.minutes().toString().padStart(2, '0')
        },
        getSeconds() {
            return this.time.seconds().toString().padStart(2, '0')
        },
    },
    mounted() {
        setInterval(this.tickTack, 1000);
    },
}
</script>