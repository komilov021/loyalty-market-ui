<template>
  <el-drawer
    v-model="drawerCategory"
    :title="type == 'create' ? 'Add category' : 'Edit category'"
    class="drawers"
  >
    <div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        :hide-required-asterisk="true"
        label-position="top"
        class="w-full white-form"
      >
        <el-form-item prop="name" label="">
          <el-input
            type="text"
            v-model="ruleForm.name"
            autocomplete="off"
            class="!h-12 !text-base"
            placeholder="Category name"
          />
        </el-form-item>
        <el-form-item prop="sort_number" label="">
          <el-input
            type="text"
            v-model="ruleForm.sort_number"
            autocomplete="off"
            class="!h-12"
            placeholder="Sorting number"
            @input="onchecknumber"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="w-full h-[1px] bg-[#EFEFF3] mb-6"></div>
      <div class="demo-drawer__footer">
        <el-button
          @click="emit('close', drawerCategory)"
          class="w-full !font-semibold !text-[#FF4444]"
          >Cancel</el-button
        >
        <el-button class="w-full" @click="sumbit(ruleFormRef)" type="primary"
          >Add</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const drawerCategory = defineModel("");
const emit = defineEmits(["close", "onSubmit"]);
const ruleFormRef = ref<FormInstance>();

const props = defineProps<{
  type: string | any;
  data?: any;
}>();
const ruleForm = reactive({
  name: "",
  sort_number: null as any,
});
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "blur",
    },
  ],

  sort_number: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "blur",
    },
  ],
});

const onchecknumber = (value: any) => {
  if (isNaN(value) || value === "") {
    ruleForm.sort_number = null as any;
  } else {
    ruleForm.sort_number = Number(value);
  }
};
const sumbit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid: any, fields: any) => {
    if (valid) {
      try {
        if (props.type == "create") {
          emit("onSubmit", ruleForm);
        } else {
          emit("onSubmit", ruleForm);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
onMounted(() => {
  if (ruleForm && props.type == "edit") {
    Object.assign(ruleForm, props.data);
  }
});
</script>

<style scoped></style>
