<template>
  <div>
    <DashboardTheHeader/>
    <main class="overflow-hidden">
      <div class="container max-w-6xl mx-auto">
        <slot/>
      </div>
    </main>
    <TheFooter/>
  </div>
</template>