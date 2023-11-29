<template>
  <div class="container max-w-[500px] flex flex-col px-4 justify-center mx-auto sm:px-6 lg:px-8" style="height:calc(80vh - 68px)">
    <h3 class="text-xl font-bold text-center">Welcome to Notionism ✨</h3>
    <p class="text-base text-center mt-2">Enter using your Google account or your credentials below and gain access to our resources and widgets.</p>
    <div class="bg-white mt-8 sm:rounded-lg">
      <section v-if="!redirectingLoading">
        <button @click="loginWithGoogle" class="my-button my-button--md my-button--bordered my-button--block hover:text-blue-600 hover:border-blue-600">
          <google-icon class="w-4 h-4 mr-2 -ml-1"/>
          Sign in with Google
        </button>
        <div class="text-center text-base text-gray-500 py-2">
          Or
        </div>
        <form @submit.prevent="login">
          <div>
            <TextInput
                id="email"
                v-model="form.email"
                label="Email"
                type="email"
                class=" block w-full"
            />
          </div>
          <div>
            <TextInput
                id="password"
                v-model="form.password"
                label="Password"
                type="password"
                class="block w-full mt-4"
            />
          </div>
          <div class="mt-12">
            <button :class="`my-button my-button--primary my-button--bordered my-button--md my-button--block ${loginLoading && 'loading'}`">
              {{loginLoading ? 'Loading...' : 'Sign In'}}
            </button>
          </div>
        </form>
      </section>
      <section v-else class="w-full h-[80px] rounded-lg bg-gray-900 loading text-white flex items-center justify-center">
        Redirecting to the dashboard
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/store/auth";
import TextInput from "~/components/form/TextInput.vue";
import GoogleIcon from "~/components/icons/GoogleIcon.vue";

const authStore = useAuthStore()
const config = useRuntimeConfig()
const route = useRoute()
const loginLoading = ref(false)
const redirectingLoading = ref(false)

useHead({
    title: `Login`,
    meta: [
        {name: 'robots', content: 'noindex'},
    ],
    link: [
        {rel: 'icon', href: '/favicon.ico'}
    ]
})

if (authStore.isAuth) {
  navigateTo('/dashboard')
}

const form = reactive({
  email: null,
  password: null
})

const login = async () => {
  const authStore = useAuthStore();

  loginLoading.value = true

  await authStore.login(form)

  loginLoading.value = false
}

const loginWithGoogle = () => window.location.href = `${config.public.apiBase}auth/google-auth/redirect`

onMounted(async () => {
  if (route.query.google_token) {

    redirectingLoading.value = true
    await authStore.googleLogin(route.query.google_token.toString())
  }
})
</script>