<template>
  <div class="bg-[#F2F1F6]">
    <el-container class="h-[100vh]">
      <Sidebar />
      <el-container class="w-full">
        <el-main>
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </el-main>
        <el-footer
          v-if="currentRoute == 'main'"
          class="w-full bg-white border-l border-gray-200 flex justify-end items-center p-4"
        >
          <FooterActions />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import FooterActions from "./components/FooterActions.vue";

const router = useRouter();
const currentRoute = computed(
  () => (router.currentRoute.value.fullPath.split("/")[1] || "default") as any
);
</script>
<style scoped lang="scss"></style>
