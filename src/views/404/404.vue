<template>
  <div
    class="w-full h-screen bg-[#F2F1F6] flex flex-col items-center justify-center"
  >
    <img
      class="w-3/4 lm:w-1/3 h-3/4 mb-8"
      src="../../assets/svgs/not-found.svg"
      alt="Not Found"
    />
    <el-button
      class="bg-blue-500 text-white hover:bg-blue-600 focus:ring focus:ring-blue-300 rounded px-6 py-3"
      @click="router.push('/main')"
    >
      Go Back
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped></style>
