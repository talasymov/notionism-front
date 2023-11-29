<template>
  <div :class="`flex items-center select-none relative pr-4 ${props.variant === 'small' ? 'space-x-1' : 'space-x-2'}`" @click="handleLike">
    <div :class="`${props.variant === 'small' ? 'scale-[0.8]' : ''}`">
      <HearthFill v-if="templateStore.isLiked(template)"
                  :class="`${isAnimating && 'gelatine'} hover:scale-[1.1] transition`"/>
      <HearthEmpty v-else :class="`${isAnimating && 'gelatine'} hover:scale-[1.1] transition`"/>
    </div>
    <b :style="{color: PRIMARY_COLOR}" :class="`${props.variant === 'small' ? 'text-xs' : ''}`">
      {{ props.template.likes }}
    </b>
  </div>
</template>

<script setup lang="ts">
import HearthFill from "~/components/icons/HearthFill.vue";
import HearthEmpty from "~/components/icons/HearthEmpty.vue";
import {PRIMARY_COLOR} from "~/utils/defaultData";
import {Template} from "~/types/template-library/types";
import {useTemplateStore} from "~/store/template";

const emit = defineEmits(['toggleLike'])

const props = defineProps<{
  template: Template,
  variant?: 'small' | 'large'
}>()

const templateStore = useTemplateStore()

const userAlreadyLike = ref(false)
const isAnimating = ref(false)

function handleLike() {
  if (templateStore.isLiked(props.template)) {
    userAlreadyLike.value = false
    props.template.likes--
    templateStore.toggleLike(props.template)
    return
  }

  props.template.likes++
  isAnimating.value = true

  templateStore.toggleLike(props.template)

  setTimeout(() => {
    isAnimating.value = false
  }, 500)
}

</script>

<!--suppress CssUnusedSymbol -->
<style>
.gelatine {
  animation: gelatine 0.5s forwards;
}

@keyframes gelatine {
  from, to {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
}
</style>
