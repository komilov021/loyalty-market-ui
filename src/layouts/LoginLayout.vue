<template>
  <div class="wrapper relative">
    <img
      :src="Logo"
      class="absolute z-50 md:top-[50px] top-5 md:left-[70px] left-5"
      alt="logo"
    />
    <div class="relative">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "../assets/svgs/logo-login.svg";
</script>

<style>
.wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafb;
  background-image: url("../assets/images/main-login.avif");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 1;
}

@media (max-width: 768px) {
  .wrapper {
    background-size: cover;
  }
}
</style>
