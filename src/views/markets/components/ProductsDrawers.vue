<template>
  <el-drawer
    v-model="drawerItem"
    :title="props.type == 'create' ? 'Add Item' : 'Edit Item'"
    class="rounded-l-[24px] drawers"
    :with-header="true"
  >
    <el-scrollbar class="min-h-[400px]">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="w-full !mb-5 white-form"
      >
        <el-form-item prop="avatar" label="">
          <UploadFile
            class="!w-full"
            list-type="text"
            @remove="remove"
            @upload="upload"
            :multiple="true"
            :fileList="fileList"
          >
            <div class="flex items-center justify-center gap-2">
              <img :src="FileUploadIcon" alt="file-upload-icon" />
              <h1 class="text-[#6A6B70] font-normal text-sm">Upload file</h1>
            </div>
            <template #file="{ file }">
              <div
                class="w-full rounded-[16px] px-4 py-3 bg-[#F2F1F6] cursor-pointer flex justify-between items-center mb-2"
              >
                <h1 class="whitespace-nowrap line-clamp-1 tracking-tighter">
                  {{ file?.name }}
                </h1>
                <div @click="remove(file)">
                  <img :src="FileRemoveIcon" alt="file-remove-icon" />
                </div>
              </div>
            </template>
          </UploadFile>
        </el-form-item>
        <el-form-item prop="name" label="">
          <el-input
            type="text"
            v-model="ruleForm.name"
            autocomplete="off"
            class="!h-12 !text-base"
            placeholder="Item name"
          />
        </el-form-item>
        <el-form-item prop="description" label="">
          <el-input
            type="textarea"
            v-model="ruleForm.description"
            placeholder="Description"
            resize="none"
            :rows="6"
          />
        </el-form-item>

        <el-form-item prop="price" label="">
          <el-input
            type="text"
            v-model.number="ruleForm.price"
            autocomplete="off"
            class="!h-[47px] !text-base"
            placeholder="Item cost"
            @keypress="onlyNumber"
          />
        </el-form-item>
        <el-form-item prop="sort_number" label="">
          <el-input
            type="text"
            v-model.number="ruleForm.sort_number"
            autocomplete="off"
            class="!h-12 !text-base"
            placeholder="Sorting inside the category"
            @keypress="onlyNumber"
          />
        </el-form-item>
        <el-form-item prop="remaining_count" label="">
          <el-input
            type="text"
            v-model.number="ruleForm.remaining_count"
            autocomplete="off"
            class="!h-12 !text-base"
            placeholder="Enter the quantity"
            @keypress="onlyNumber"
          />
        </el-form-item>
        <el-checkbox v-model="ruleForm.limited" label="Limited" size="large" />
      </el-form>
    </el-scrollbar>
    <template #footer>
      <div class="w-full h-[1px] bg-[#EFEFF3] mb-6"></div>
      <div class="demo-drawer__footer">
        <el-button
          class="w-full !font-semibold !text-[#FF4444]"
          @click="emit('close', drawerItem)"
        >
          Cancel</el-button
        >
        <el-button
          class="w-full"
          @click="submitItem(ruleFormRef)"
          type="primary"
          >Add</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from "vue";
import {
  ElMessage,
  FormInstance,
  FormRules,
  UploadUserFile,
} from "element-plus";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { onlyNumber } from "../../../composables/common";
import UploadFile from "../../../components/UploadFile.vue";
import FileRemoveIcon from "../../../assets/svgs/file-remove-icon.svg";
import FileUploadIcon from "../../../assets/svgs/file-upload-icon.svg";
import { useMarketCategoriesStore } from "../../../stores";

const drawerItem = defineModel("");
const marketsStore = useMarketCategoriesStore();
const marketsmenu = computed(
  () =>
    marketsStore.marketCategoryList?.data.filter(
      (item: any) => item?.id == route.query.category_id
    )?.[0]
);

const route = useRoute();
const ruleFormRef = ref<FormInstance>();
const fileList = ref<UploadUserFile>() as any;
const emit = defineEmits(["close", "onSubmit"]);
const props = defineProps<{
  type: string | any;
  data?: any;
}>();

const i18n = useI18n();
const ruleForm = reactive<any>({
  avatar: null as any,
  name: "",
  description: "",
  price: null as any,
  sort_number: null as any,
  remaining_count: null as any,
  limited: false,
});
const rules = reactive<FormRules>({
  files: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "blur",
    },
  ],
  name: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "change",
    },
  ],
  description: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "change",
    },
  ],
  price: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "change",
    },
  ],

  sort_number: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "change",
    },
  ],
  remaining_count: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "change",
    },
  ],
  avatar: [
    {
      required: true,
      message: "Please upload your avatar.",
      trigger: "change",
    },
  ],
});

const submitItem = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid: any, fields: any) => {
    if (valid) {
      ruleForm.price = Number(ruleForm.price);
      ruleForm.remaining_count = Number(ruleForm.remaining_count);
      const params: any = {
        market_id: route.params.id,
        ...ruleForm,
      };
      if (marketsmenu.value?.name == "Appearance") {
        params.type = "appearance";
      }
      emit("onSubmit", params);
      formEl.resetFields();
    } else {
      console.log("error submit!", fields);
    }
  });
};
const upload = (file: any) => {
  ruleForm.avatar = file;
  fileList.value = [file];
};
const remove = (file: any) => {
  const index = fileList.value.findIndex((f: any) => f?.name === file.name);
  if (index !== -1) {
    fileList.value.splice(index, 1);
  }
  if (ruleForm.avatar && ruleForm.avatar.name === file.name) {
    ruleForm.avatar = null;
  }
  fileList.value = [...fileList.value];
  ElMessage({
    message: "File has been deleted.",
    type: "success",
  });
};
watch(fileList, (newVal: any) => {
  if (!newVal.length) {
    ruleForm.avatar = null;
  }
});
onMounted(() => {
  if (props.data && props.type === "edit") {
    fileList.value = props.data.avatar ? [props.data.avatar] : [];
    ruleForm.avatar = props.data.avatar || null;
    Object.assign(ruleForm, props.data);
  } else {
    fileList.value = [];
    ruleForm.avatar = null;
  }
});
</script>

<style scoped></style>
