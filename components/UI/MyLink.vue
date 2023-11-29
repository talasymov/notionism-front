<template>
    <nuxt-link :to="to" :target="target" class="my-link font-semibold cursor-pointer space-x-1 text-lg flex items-center">
        <span class="my-link__slot"><slot/></span>
        <svg xmlns="http://www.w3.org/2000/svg" class="arrow" width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path fill="currentColor" d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"></path>
            <path class="arrow__chevron-right" stroke="currentColor" d="M1.75 8H11" stroke-width="2" stroke-linecap="round"></path>
        </svg>
    </nuxt-link>
</template>

<script>
import ColorPicker from "~/components/form/ColorPicker.vue";

export default {
    components: {ColorPicker},
    props: {
        to: {
            type: String,
            default: null,
        },
        target: {
            type: String,
            default: '_blank',
        }
    }
}
</script>

<style lang="scss">
.my-link {
  $class: &;

  .arrow {
    transform: translateX(0);
    transition:.2s ease-in-out;

    &__chevron-right {
      stroke-dasharray: 10;
      stroke-dashoffset: 10;
      transition: stroke-dashoffset .2s;
    }
  }

  &__slot {
    position: relative;
    padding: 2px 0;
    &:before {
      position: absolute;
      bottom: -3px;
      left: 0;
      content: '';
      width: 0;
      background-color: currentColor;
      height: 2px;
      border-radius: 10px;
      transition: width 200ms ease-in-out;
    }
  }

  &:hover {
    .arrow {
      transform: translateX(4px);
    }

    .arrow__chevron-right {
      stroke-dashoffset: 22;
    }

    #{$class}__slot {
      &:before {
        width: 100%;
      }
    }
  }

}
</style>