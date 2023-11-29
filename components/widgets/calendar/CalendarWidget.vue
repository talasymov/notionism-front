<template>
  <client-only>
    <resizabale-wrapper :resizable="resizable" :config="{maxHeight, maxWidth}">
      <Calendar
          v-model="date"
          :attributes='attrs'
          ref="calendar"
          class="custom-calendar"
          :color="config.theme_color"
          :isDark="config.is_dark"
          :borderless="config.borderless"
          title-position="left"
      >
        <template #title>
          test
        </template>
        <template #footer>
          <div v-if="config.today_button || config.current_date " class="w-full px-4 pb-3">
            <button
                v-if="config.today_button"
                :class="`hover:scale-[0.98] active:scale-[0.97] transition text-base text-white font-bold w-full px-3 py-1 rounded-md`"
                :style="`background:${config.button_color};color:${buttonTextColor(config.button_color)};border:${config.button_color === '#ffffff' ? '1px solid rgba(155,155,155,0.30)': 'none'}`"
                @click="moveToday"
            >
              Today
            </button>
            <div v-if="config.current_date" class="mt-2 text-center text-base flex justify-between opacity-50">
              <span>{{moment().format('DD.MM.YYYY')}}</span>
              <span>{{moment().format('HH:mm:ss')}}</span>
            </div>
          </div>
        </template>
      </Calendar>
    </resizabale-wrapper>
  </client-only>
</template>

<script>
import 'v-calendar/style.css';
import ResizabaleWrapper from "~/components/UI/ResizabaleWrapper.vue";
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';
import moment from "moment";
import chroma from 'chroma-js';

// TODO calendar documentation - https://vcalendar.io/calendar/layouts.html
// TODO разобраться почему не приходят config

export default {
  components: {
    ResizabaleWrapper,
    Calendar
  },
  props: {
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
    date: new Date(),
  }),
  setup() {
    return {moment}
  },
  computed: {
    attrs() {
      return [
        {
          key: 'today',
          highlight: true ,
          dates: new Date(),
        }]
    },
  },
  async mounted() {
    await nextTick()
    document.querySelector('.custom-calendar').style.borderColor = this.config.border_color
  },
  watch: {
    'config.border_color':{
      immediate: true,
      handler(val) {
        if(!val) return

        const element = document.querySelector('.custom-calendar')

        if(!element) return

        element.style.borderColor = val
      }
    },
  },
  methods: {
    normalizeColor(color) {
      const rgbMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*\d+\.\d+)?\)$/i);

      if (!rgbMatch) {
        return color;
      }

      const hex = this.rgbToHex(rgbMatch[1], rgbMatch[2], rgbMatch[3]);

      return hex;
    },
    rgbToHex(r, g, b) {
      return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    },
    componentToHex(c) {
      const hex = parseInt(c, 10).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    },
    buttonTextColor(color) {
      if(!color) return '#ffffff'

      const tmprColor = this.normalizeColor(color)

      const hex = parseInt(tmprColor.slice(1), 16);

      const brightness = ((hex >> 16) & 255) * 0.299 + ((hex >> 8) & 255) * 0.587 + (hex & 255) * 0.114;

      if(brightness < 180) return '#ffffff'

      const chromaColor = chroma(color);


      const darkSaturatedColor = chromaColor.darken(brightness > 240 ? 4 : 3).saturate(0.5);

      return darkSaturatedColor.hex();
    },
    moveToday() {
      this.$refs.calendar.move(new Date());
    }
  },
}
</script>

<style lang="scss">
.custom-calendar {
  .vc-title {
    margin-left: 6px;
  }
  .vc-weeks {
    margin-top: 8px;
  }
  .vc-pane-container {
    .vc-pane-header-wrapper {
      .vc-header {
        .vc-arrow {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid rgba(155,155,155,0.35);
          transition: 150ms ease-in-out;
          &:hover {
            border: 1px solid rgba(155, 155, 155, 0.6);
          }
        }
      }
    }
  }
  .vc-next {
    //
  }
}
</style>