<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center">
      <div
        class="relative circletab rounded-t-[18px] bg-white text-center active py-4 px-6"
      >
        <h1 class="relative bottom-1 font-medium">{{ pageTitle }}</h1>
      </div>
    </div>
    <div style="" class="w-full bg-white relative -top-3 rounded-[18px] pb-6 h-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const tabType: any = ref<"categories" | "items">();
const router = useRouter();
const pageTitle = computed(() => {
  const currentPath = router.currentRoute.value.fullPath.split("/")[2];

  return currentPath === "categories"
    ? "Categories"
    : currentPath === "item"
    ? "Items"
    : "Default";
});
</script>

<style lang="scss"></style>
