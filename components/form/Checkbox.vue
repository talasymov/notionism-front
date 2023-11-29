<template>
    <div class="flex items-center">
        <div @click="toggleValue" class="flex cursor-pointer items-center">
            <template v-if="!value">
                <svg width="56" height="36" viewBox="0 0 56 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="16" y="10" width="32" height="12" rx="6" fill="#D1D1D6"/>
                    <g filter="url(#filter0_d_202_3391)">
                        <circle cx="18" cy="16" r="10" fill="white"/>
                    </g>
                    <defs>
                        <filter id="filter0_d_202_3391" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="2"/>
                            <feGaussianBlur stdDeviation="4"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_202_3391"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_202_3391" result="shape"/>
                        </filter>
                    </defs>
                </svg>
            </template>
            <template v-else>
                <svg width="56" height="36" viewBox="0 0 56 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="10" width="32" height="12" rx="6" fill="#22D068"/>
                    <g filter="url(#filter0_d_201_3294)">
                        <circle cx="38" cy="16" r="10" fill="white"/>
                    </g>
                    <defs>
                        <filter id="filter0_d_201_3294" x="20" y="0" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="2"/>
                            <feGaussianBlur stdDeviation="4"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_201_3294"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_201_3294" result="shape"/>
                        </filter>
                    </defs>
                </svg>
            </template>
        </div>
        <div @click="toggleValue" class="cursor-default ml-4 text-[16px] z-1">{{label}}</div>
    </div>
</template>

<script>
import {uid} from "~/utils/functions";

export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        modelValue: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return  {
            elementId: uid(),
        }
    },
    computed: {
        value: {
            get() {return this.modelValue},
            set(newValue) {this.$emit('update:modelValue', newValue)}
        }
    },
    methods: {
        toggleValue() {
            this.value = !this.value
        },
    },
};
</script>
