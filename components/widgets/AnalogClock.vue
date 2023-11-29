<template>
  <client-only>
    <resizabale-wrapper :resizable="resizable" :config="{maxHeight, maxWidth}">
      <div class="analog-clock">
        <div class="analog-clock__container">
          <div :class="['clock', 'shadow-' + config.shadow, 'w-auto', 'h-full']"
               :style="{
              'background-color': config.bg_color,
              'border': `${config.border_size}px solid ${config.border_color}`
           }">
            <ul v-if="config.hours_display" :style="{
          'color': config.hours_color,
          'font-size':  config.hours_size + 'px',
        }">
              <li><i>12</i></li>
              <li v-for="i in 11"><i>{{ i }}</i></li>
            </ul>

            <div class="date" v-if="config.date_display" :style="{
          'color': config.date_color,
          'font-size':  config.date_size + 'px',
        }">
              {{ now.format('D / MM') }}
            </div>

            <div class="hours" :style="{
          '--hours-arrow-color': config.hours_arrow_color,
          'transform': `rotate(${hoursDeg}deg)`
        }"></div>
            <div v-if="config.minutes_display" class="minutes" :style="{
          '--minutes-arrow-color': config.minutes_arrow_color,
          'transform': `rotate(${minutesDeg}deg)`
        }"></div>
            <div v-if="config.seconds_display" class="seconds" :style="{
          '--seconds-arrow-color': config.seconds_arrow_color,
          'transform': `rotate(${secondsDeg}deg)`,
        }"></div>
            <div class="circle" :style="{
          'width': config.center_circle_size + 'px',
          'height': config.center_circle_size + 'px',
          'background-color': config.center_circle_color,
        }"></div>

            <span
                v-if="config.dashes_display"
                v-for="i in 30"
                :style="{
              'height': (100 - config.dashes_padding) + '%',
              '--dashes-color': config.dashes_color,
              'transform': `translate(-50%,-50%) rotate(${i * 6}deg)`
            }"
                :class="i / 5 === parseInt(i / 5, 10) ? 'fives' : ''"
            ></span>
          </div>
        </div>
      </div>
    </resizabale-wrapper>
  </client-only>
</template>

<script>
import moment from "moment";
import ResizabaleWrapper from "~/components/UI/ResizabaleWrapper.vue";


export default {
  name: "AnalogClock",
  components: {
    ResizabaleWrapper,
  },
  data() {
    return {
      now: moment(),
      scale: 1,
    }
  },
  props: [
    'config', 'resizable', 'maxWidth', 'maxHeight'
  ],
  methods: {
    tickTack() {
      this.now = moment()
    },
    handleResize({width, height}) {
      const childWidth = this.$refs.resizableDomElement.offsetWidth.valueOf();
      const childHeight = this.$refs.resizableDomElement.offsetHeight.valueOf();
      this.scale = Math.min(width / childWidth, height / childHeight)
    }
  },
  computed: {
    hoursDeg() {
      return 30 * this.now.hours() + .5 * this.now.minutes()
    },
    minutesDeg() {
      return 6 * this.now.minutes() + .1 * this.now.seconds()
    },
    secondsDeg() {
      return 6 * this.now.seconds()
    },
  },
  mounted() {
    setInterval(this.tickTack, 1000);
  },
}
</script>

<style scoped>
body {
  background: linear-gradient(-90deg, #2FC5BA, #62C6C9, #2FC5BA)
}
</style>