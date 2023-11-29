<template>
    <teleport to="body">
        <transition name="slide-fade">
            <div class="modal" v-if="modelValue">
                <div class="modal-overlay" @click="close"></div>
                <div class="modal-container relative" :style="{'max-width': maxWidth|| '100%'}">
                    <div class="modal-close absolute" @click="close">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="black"/>
                        </svg>
                    </div>
                    <slot/>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script>
export default {
    props: {
        title: String,
        modelValue: Boolean,
        maxWidth: String,
        closeBtn: Boolean,
    },
    computed: {
      dialog: {
          get() {return this.modelValue},
          set(newValue) {this.$emit('update:modelValue', newValue)}
      }
    },
    methods: {
        close() {
            this.dialog = false
        }
    },
};
</script>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.15s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    border: none;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    font-size: 2rem;
    font-weight: bold;
    z-index: 1;
    cursor: pointer;
}
.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
    z-index: 2;
    width: 80%;
    max-width: 660px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
}
</style>
