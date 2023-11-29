<template>
    <client-only>
        <resizabale-wrapper :resizable="resizable" :config="{maxHeight, maxWidth}">
            <div
                 :style="{
                    'width': '300px',
                    'background-color': config.bg_color,
                    'border': `${config.bg_border_size}px solid ${config.bg_border_color}`,
                    'padding' : `${config.bg_padding ? Number(config.bg_padding) * 2 : 0}px`,
                    'border-radius':`${config.bg_rounded}px`
                }"
            >
                <div class="gap-y-2 flex flex-col">
                    <div v-for="bar in bars" class="flex gap-x-2 items-center">
                        <div
                            v-if="config.bar_label_position === 'left'"
                            :class="['whitespace-nowrap', {
                                'w-16': config.bar_label_format === 'minimal',
                                'w-32': config.bar_label_format === 'percent',
                            }]"
                            :style="{
                                'color': config.font_color,
                                'font-size': config.font_size + 'px',
                                'font-family': config.font_family
                            }"
                        >{{ labelFormat(bar) }}</div>
                        <div
                            :class="['relative w-full', 'rounded-' + config.bg_rounded]"
                            :style="{
                                'border': `${config.bar_border_size}px solid ${config.bar_border_color}`,
                                'background-color': config.bar_bg_color,
                                'height': config.bar_height + 'px',
                                'width': config.bar_width + '%',
                            }"
                        >
                            <div
                                :class="['absolute h-full', 'rounded-' + config.bg_rounded]"
                                :style="{
                                'width': `${bar.value}%`,
                                'background-color': config.bar_color,
                            }">
                            </div>
                            <div
                                v-if="config.bar_label_position === 'center'"
                                class="absolute h-full w-full flex items-center justify-center"
                                :style="{
                                    'color': config.font_color,
                                    'font-size': config.font_size + 'px',
                                    'font-family': config.font_family
                                }"
                            >
                                {{ labelFormat(bar) }}
                            </div>
                        </div>
                        <div
                            v-if="config.bar_label_position === 'right'"
                            :class="['whitespace-nowrap', {
                                'w-16': config.bar_label_format === 'minimal',
                                'w-32': config.bar_label_format === 'percent',
                            }]"
                            :style="{
                                'color': config.font_color,
                                'font-size': config.font_size + 'px',
                                'font-family': config.font_family
                            }"
                        >{{ labelFormat(bar) }}</div>
                    </div>
                </div>
            </div>
        </resizabale-wrapper>
    </client-only>
</template>

<script>
import ResizabaleWrapper from "~/components/UI/ResizabaleWrapper.vue";
import moment from "moment";

export default {
    name: "LifeProgressBarWidget",
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
    data: () => ({}),
    methods: {
        labelFormat(bar){
            if (this.config.bar_label_format === 'none'){
                return '';
            }

            if (this.config.bar_label_format === 'percent'){
                return bar.text + ': ' + Math.round(bar.value) + '%';
            }

            return bar.text
        },
        yearProgress() {
            let start = moment().startOf('year')
            let end = moment().endOf('year')
            let total = end.diff(start, 'minutes')

            return (total - end.diff(moment(new Date()), 'minutes')) * 100 / total
        },
        quarterProgress() {
            let start = moment().startOf('quarter')
            let end = moment().endOf('quarter')
            let total = end.diff(start, 'minutes')

            return (total - end.diff(moment(new Date()), 'minutes')) * 100 / total
        },
        monthProgress() {
            let start = moment().startOf('month')
            let end = moment().endOf('month')
            let total = end.diff(start, 'minutes')

            return (total - end.diff(moment(new Date()), 'minutes')) * 100 / total
        },
        weekProgress() {
            let start = moment().startOf('week')
            let end = moment().endOf('week')
            let total = end.diff(start, 'minutes')

            return (total - end.diff(moment(new Date()), 'minutes')) * 100 / total
        },
        dayProgress() {
            let start = moment().startOf('day')
            let end = moment().endOf('day')
            let total = end.diff(start, 'minutes')

            return (total - end.diff(moment(new Date()), 'minutes')) * 100 / total
        },
        lifeProgress() {
            return moment(new Date()).diff(moment(this.config.birthday), 'years') * 100 / this.config.life_expectancy
        },
    },
    computed: {
        bars() {
            let bars = []

            if (this.config.life_bar) {
                bars.push({text: 'Life', value: this.lifeProgress()})
            }

            if (this.config.year_bar) {
                bars.push({text: 'Year', value: this.yearProgress()})
            }

            if (this.config.quarter_bar) {
                bars.push({text: 'Quarter', value: this.quarterProgress()})
            }

            if (this.config.month_bar) {
                bars.push({text: 'Month', value: this.monthProgress()})
            }

            if (this.config.week_bar) {
                bars.push({text: 'Week', value: this.weekProgress()})
            }

            if (this.config.day_bar) {
                bars.push({text: 'Day', value: this.dayProgress()})
            }

            return bars
        },
    },
}
</script>

<style scoped>

</style>