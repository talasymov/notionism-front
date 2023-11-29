<template>
  <div>
    <TheHeader/>
    <main class="pt-10">
      <div class="container max-w-6xl mx-auto flex flex-wrap px-4 md:flex-nowrap">
        <div class="w-full md:w-1/2 md:pr-14">
          <slot name="sidebar"/>
        </div>
        <div class="w-full">
          <slot name="content"/>
        </div>
      </div>
    </main>
    <TheFooter/>
  </div>
</template>