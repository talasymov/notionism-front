<template>
    <div class="container max-w-6xl mx-auto p-4 grid grid-cols-12">
        <div class="col-span-12">
            <div class="breadcrumbs">
                <my-breadcrumbs :breadcrumbs="WIDGET_LIBRARY_BREADCRUMBS"/>
            </div>
        </div>
        <div class="col-span-12">
            <div class="max-w-[570px] m-auto text-center relative py-4">
                <h1 class="text-xl font-bold">
                    Notion Widgets Gallery 🎨
                </h1>
                <h2 class="text-base mt-1">
                    Browse, customize and install free embeddable widgets for Notion
                </h2>
            </div>
        </div>
        <div class="col-span-12 mt-6">
            <WidgetList :ssr="true"/>
        </div>
        <div class="col-span-12 mt-2">
            <feedback-bite-section :data="feedbackBiteSectionData"/>
        </div>
        <div class="col-span-12 my-[100px]">
            <widgets-faq/>
        </div>
    </div>
</template>

<script setup lang="ts">
import MyBreadcrumbs from "~/components/UI/MyBreadcrumbs.vue";
import {WIDGET_LIBRARY_BREADCRUMBS} from "~/utils/defaultData";
import WidgetList from "~/components/widgets/WidgetList.vue";
import FeedbackBiteSection from "~/components/UI/FeedbackBiteSection.vue";

useHead({
    title: 'Hand-crafted Notion Templates - Notionism.org',
    meta: [
        {
            name: 'description',
            content: 'Browse the collection of ready-to-use Notion widgets from the Notionism team. Jumpstart your Notion workspace setup with pre-made solutions!'
        }
    ],
    link: [
        {rel: 'icon', href: '/favicon.ico'}
    ]
})

const feedbackBiteSectionData = {
    title: 'Can\'t find the right widget? Offer yours!',
    text: 'We read all your suggestions and implement them if possible. Posting your suggestion in our feedback system you repeatedly increase the chance that this widget will appear in the list.',
    linkText: 'Suggest widget',
    to: '/feedback',
}
</script>