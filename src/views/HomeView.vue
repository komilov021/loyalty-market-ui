<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center">
      <div
        class="relative circletab rounded-t-[18px] bg-white text-center active py-4 px-6"
      >
        <h1 class="relative bottom-1 font-medium">Purchase history list</h1>
      </div>
    </div>
    <div
      style=""
      class="w-full bg-white relative -top-3 rounded-[18px] pb-4 h-full"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
