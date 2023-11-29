<template>
    <div class="faq">
        <h2 class="faq__title text-center mb-4 font-semibold text-2xl">{{ title }}</h2>
        <div class="faq__wrapper rounded-lg border-[1px] border-gray-200 shadow-sm">
            <div class="faq__list">
                <div v-for="(question, index) in questions" :key="index"
                    class="faq__item p-4 border-b-[1px] border-gray-200">
                    <button
                            class="faq__question text-xl font-semibold flex justify-between align-center w-full"
                            @click="toggleQuestion(index)"
                    >
                        <h3>{{ question.question }}</h3>
                        <div :class="{ 'rotate-[90deg]': activeQuestionIdx === index, 'transition': true }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z"
                                      fill="black"/>
                            </svg>
                        </div>
                    </button>

                    <transition name="faq">
                        <p class="faq__answer py-4 text-lg" v-show="activeQuestionIdx === index" v-html="question.answer"></p>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Faq',
    data: () => ({
        title: "FAQ ",
        activeQuestionIdx: null,
        questions: [
            {
                question: 'What are Notion widgets?',
                answer: 'Notionism\'s Notion widgets are customizable embeds designed to enhance Notion\'s functionality and make the workspace more aesthetically pleasing.',
            },
            {
                question: 'How do I add a widget to my Notion page?',
                answer: 'To install a widget, first create and customize it to your liking: login to your Notionism account, select a widget from the library, adjust it, and then copy the embed link. Afterward, paste the link into any Notion page and select the "Embed link" option.',
            },
            {
                question: 'What kind of widgets are available for Notion?',
                answer: 'We currently support Clock (Analog, Digital, Flip/Retro), Weather, and Calendar widgets. Quotes, Calculator, Countdown, and Pomodoro widgets are in development and will be released soon. To upvote or propose a widget, visit <a href="https://notoinism.canny.io/widgets" target="_blank">this page.</a>',
            },
            {
                question: 'Can I customize the appearance of my widgets?',
                answer: 'Absolutely! You can customize every element of our widgets, including size, color, font, border, shadow, and background. Colours and elements can be adjusted in Notionism\'s editor, and the size of a widget can be changed by resizing its block on a Notion page.',
            },
            {
                question: 'Do I need to pay for widgets in Notion?',
                answer: 'No, for now we all widgets are absolutely free without any limitations!',
            },
            {
                question: 'Can I create my own custom widgets in Notion?',
                answer: 'You can customize available widgets, but you cannot create new ones. However, you can suggest a new widget or upvote existing ones <a href="https://notoinism.canny.io/widgets" target="_blank">here.</a>',
            },
            {
                question: 'How do I delete a widget from my Notion page?',
                answer: 'To delete a widget, select the widget block and click on the "..." button. Then, choose "Delete" to remove the widget from your page. If you no longer need a widget, you can also remove it from your Notionism profile.',
            },
            {
                question: 'Will widgets slow down my Notion page?',
                answer: 'We develop widgets with performance in mind, ensuring that they are lightweight. Our server response times are quick, so using Notionism\'s widgets should not cause any page loading issues.',
            },
            {
                question: 'Can I use Notion widgets on mobile devices?',
                answer: 'Yes, you can use widgets on mobile devices by accessing your Notion workspace through the mobile app or web browser.',
            },
            {
                question: 'Do you support widgets for dark theme?',
                answer: 'Absolutely! With many customization options, you can adjust the background and accent colours to fit both the light and dark Notion themes.',
            },
        ],
    }),
    methods: {
        toggleQuestion(index) {
            if(this.activeQuestionIdx === index) return this.activeQuestionIdx = null
            this.activeQuestionIdx = index
        }
    }
};
</script>

<style lang="scss">
.faq-enter-active {
  transition: all 0.3s ease-out;
}

.faq-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.faq-enter-from,
.faq-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

.faq a {
    color: deeppink;
    text-decoration: underline;
}
</style>
