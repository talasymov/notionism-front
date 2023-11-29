<template>
  <footer class="py-10 bg-gray-50 border-t border-gray-200">
    <div class="container px-4 max-w-6xl mx-auto">
      <div class="md:flex justify-center md:flex-nowrap md:justify-between mx-auto items-center">
        <NuxtLink to="/" class="w-full flex md:block items-center justify-center flex-col md:w-auto mb-5 md:mb-0">
          <svg class="w-12 h-12" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path
                d="M17.62,16.67V13.53a7.91,7.91,0,0,0-.4-2.69,3.11,3.11,0,0,0-.82-1.17,2.12,2.12,0,0,0-1.33-.39,11.31,11.31,0,0,0-3.55,1.34c-.24.14-.36.28-.37.41v8a1.59,1.59,0,0,0,1.46,1.72h.1c.46.07.7.18.7.33s0,.24-.15.27H6.81a.2.2,0,0,1-.15-.22c0-.19.24-.31.7-.38a1.59,1.59,0,0,0,1.57-1.61.41.41,0,0,0,0-.11V10.51a.86.86,0,0,0-.67-.86,3.32,3.32,0,0,0-.62-.16L7.1,9.36a.71.71,0,0,1-.25-.11.3.3,0,0,1,0-.23c0-.12.07-.2.22-.28L10.8,7A.78.78,0,0,1,11,6.87c.16,0,.25.11.25.35V9.57c0,.1,0,.16.11.16A3.52,3.52,0,0,0,12,9.46c.84-.43,1.67-.83,2.49-1.26a5.14,5.14,0,0,1,2.1-.6q3.36,0,3.36,6.25l-.14,4.32V19a1.46,1.46,0,0,0,1.13,1.49,5,5,0,0,0,.92.24,2,2,0,0,1,.59.13.22.22,0,0,1,.13.23.18.18,0,0,1-.15.21h-7a.18.18,0,0,1-.15-.21c0-.19.22-.32.68-.38A1.64,1.64,0,0,0,17.5,19a.49.49,0,0,0,0-.12A15.17,15.17,0,0,0,17.62,16.67Z"/>
            <path d="M4.72,2.24V11.5H2.66V2.24Z"/>
          </svg>
          <span class="text-gray-500 mt-4">© 2022 notionism.org</span>
        </NuxtLink>
        <div class="flex flex-wrap justify-center">
          <a href="mailto:contact@notionism.org">Contact us</a>
          <NuxtLink to="/cookie-policy" class="ml-5">Cookie Policy</NuxtLink>
          <NuxtLink to="/privacy-policy" class="ml-5">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms-conditions" class="ml-5">Terms & Conditions</NuxtLink>
          <NuxtLink to="/template-library" class="ml-5">Templates</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  mounted() {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () {
        (c[a].q = c[a].q || []).push(arguments)
      };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "fzxjgyuz6l");

    (function (){
      let id = 'G-RLQL0TJ49Q';

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', id);

      let script = document.createElement('script')

      script.async = 1;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;

      let y = document.getElementsByTagName('script')[0];
      y.parentNode.insertBefore(script, y);
    })();
  }
}
</script>