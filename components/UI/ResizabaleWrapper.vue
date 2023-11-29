<template>
  <client-only>
    <vue-resizable
        :active="resizable ? ['r', 'rb', 'b'] : []"
        :max-width="config.maxWidth || null"
        :max-height="config.maxHeight || null"
        @resize:move="handleResize"
        :class="`${resizable ? 'resizable' : ''} relative`"
        :style="{position: resizable ? 'relative' : 'initial', 'background-color': darkMode ? darkThemeColor : ''}"
    >
      <div v-if="resizable" :class="`absolute bottom-2 left-2 ${darkMode ? 'text-white':'' }`" >
        <checkbox v-model="darkMode" label="Dark mode"/>
      </div>
      <div
          ref="resizableDomElement"
          class="resizable__wrapper"
          :style="{transform:`translate(-50%,-50%) scale(${scale})`}"
      >
        <slot/>
      </div>
    </vue-resizable>
  </client-only>
</template>

<script>
import VueResizable from 'vue-resizable'
import Checkbox from "~/components/form/Checkbox.vue";
export default {
  components: {
    Checkbox,
    VueResizable,
  },
  props: {
    resizable: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => ({
        maxHeight: null,
        maxWidth: null,
      }),
    },
    maxHeight: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    scale: 1,
    darkMode: false,
    darkThemeColor: '#303437',
  }),
  async mounted() {
    if (this.resizable) return

    window.addEventListener('resize', ({target: {innerHeight, innerWidth}}) => {
      this.handleResize({width: innerWidth, height: innerHeight})
    })

    await nextTick()

    this.handleResize({width: window.innerWidth, height: window.innerHeight})
  },
  methods: {
    handleResize({width, height}) {
      const childWidth = this.$refs.resizableDomElement.offsetWidth.valueOf();
      const childHeight = this.$refs.resizableDomElement.offsetHeight.valueOf();
      this.scale = Math.min(width / childWidth, height / childHeight)
    }
  },
}
</script>

<style lang="scss">

.resizable {
  border: 3px dashed rgba(155,155,155,0.4);
  overflow: hidden;
  border-radius: 16px;
  padding: 16px;
  &__wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 16px;
  }
}
</style>