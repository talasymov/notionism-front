<template>
  <client-only>
    <resizabale-wrapper :resizable="resizable" :config="{maxHeight, maxWidth}">
      <div
          v-if="false"
          :class="['flex-col', 'rounded-' + config.rounded, 'shadow-' + config.shadow]"
          :style="{
                'width': '300px',
                'background-color': config.bg,
                'border': `${config.border_size}px solid ${config.border_color}`,
                'padding' : `${config.padding ? Number(config.padding) * 2 : 0}px`
            }">
        <div
            :style="{
                'color': config.quote_color,
                'font-size': config.quote_font_size + 'px',
                'font-family': config.quote_font
            }">{{ data.quote && data.quote.quote }}
        </div>
        <div
            class="mt-3"
            :style="{
                'color': config.author_color,
                'font-size': config.author_font_size + 'px',
                'font-family': config.author_font
            }">{{ data.quote && data.quote.author }}
        </div>
      </div>
      <div :class="`border-gray-200 min-w-[400px] ${getWrapperClasses}`" :style="getWrapperStyles">
        <div :style="getBodyStyles">
          «{{data && data.quote && data.quote.quote}}»
        </div>
        <div class="mt-2 text-end flex items-center justify-end" :style="getAuthorStyles">
          {{data && data.quote && data.quote.author}}
        </div>
      </div>
    </resizabale-wrapper>
  </client-only>
</template>

<script>
import ResizabaleWrapper from "~/components/UI/ResizabaleWrapper.vue";

export default {
  name: "QuotesWidget",
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
  computed: {
    getQuoteIconColor() {
      return this.config.author_color || 'rgba(155,155,155.0,5)'
    },
    getWrapperStyles() {
      const padding = this.config.padding && !isNaN(this.config.padding) ? Number(this.config.padding) * 2 : 0
      return {
        'padding': padding + 'px',
        'background-color': this.config.bg || 'transparent',
        'border-left':  `${this.config.border_size}px solid ${this.config.border_color || 'rgba(155,155,155,0.5)'}`,
        'color': this.config.quote_color || 'black',
      }
    },
    getWrapperClasses() {
      return [
        `rounded-${this.config.rounded}`,
      ].join(' ')
    },
    getBodyStyles() {
      return {
        'font-size': this.config.quote_font_size + 'px' || '18px',
        'line-height': '150%',
      }
    },
    getAuthorStyles() {
      return {
        'color': this.config.author_color || 'rgba(155,155,155.0,5)',
        'font-size': this.config.author_font_size + 'px' || '16px',
      }
    }
  }
}
</script>