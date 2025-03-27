<template>
  <div
    class="login rounded-[32px] bg-white md:w-[490px] w-full md:p-14 md:px-0 py-4 px-4 flex flex-col mx-auto items-center justify-center">
    <div class="flex items-center justify-center mx-auto bg-[#AA77FF14] !w-[80px] h-[80px] rounded-2xl">
      <img :src="LoginIcon" alt="login-icon" class="object-contain justify-center" />
    </div>
    <div class="my-8">
      <h1 class="md:text-2xl text-xl font-bold leading-9 text-center">
        Authorization
      </h1>
    </div>
    <el-form @keyup.enter="submitForm(ruleFormRef)" ref="ruleFormRef" :model="ruleForm" :rules="rules"
      :hide-required-asterisk="true" label-position="top" class="text-xs min-w-[344px]">
      <el-form-item prop="email" label="">
        <el-input v-model.trim="ruleForm.email" type="text" autocomplete="off" class="!h-12 !text-base"
          placeholder="Log in " />
      </el-form-item>
      <el-form-item prop="password" label="">
        <el-input v-model.trim="ruleForm.password" type="password" :show-password="true" autocomplete="off"
          class="!h-12 !text-base" placeholder="Password" />
      </el-form-item>
      <div class="flex flex-col space-y-4 py-1">
        <el-button size="large" class="w-full text-base font-semibold !h-12" type="primary"
          @click="submitForm(ruleFormRef)" :loading="loading">
          Confirm
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import LoginIcon from "../../assets/svgs/login-icon.svg";
import { FormInstance, FormRules } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useUserStore } from "../../stores";
import sha1 from "sha1";

const i18n = useI18n();
const store = useUserStore();
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  email: "",
  password: "",
});

const rules = reactive<FormRules>({
  email: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "blur",
    },
    {
      type: "email",
      message: i18n.t("validation.inputEmail"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "blur",
    },
    {
      min: 5,
      message: i18n.t("validation.minimumLength", { value: 5 }),
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true;
        const data = {
          ...ruleForm,
          password: sha1(ruleForm.password),
        };
        await store.login(data);
        await store.getUserInfo();
        if (store.user) {
          router.push("/main");
        }
        loading.value = false;
      } catch (error: any) {
        console.log("error", error.message);
        loading.value = false;
      }
    }
  });
};
</script>

<style lang="scss"></style>
