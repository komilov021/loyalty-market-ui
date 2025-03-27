<template>
  <el-upload
    ref="uploadRef"
    class="upload-demo"
    :limit="2"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :auto-upload="false"
    list-type="picture"
    v-model:file-list="fileList"
    :accept="props.accept"
    :on-change="onFileChange"
    :on-remove="onRemove"
    drag
  >
    <template #trigger>
      <slot>
        <el-button :icon="Plus" type="primary" plain size="large">
          Upload File
        </el-button>
      </slot>
    </template>
    <template #file="{ file }">
      <slot name="file" :file="file"></slot>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { useFileStore } from "../stores/file";
import { Plus } from "@element-plus/icons-vue";
import {
  ElMessage,
  UploadFile,
  UploadInstance,
  UploadUserFile,
} from "element-plus";
import { onMounted, ref, watch } from "vue";

export interface Props {
  accept?: string;
  reset?: any;
  fileList?: UploadUserFile[];
}

const props = withDefaults(defineProps<Props>(), {
  accept: ".svg, .png, .jpg, .jpeg",
  reset: false,
  fileList: [] as any,
});

const emit = defineEmits(["upload", "remove"]);
const fileList = ref<UploadUserFile[]>([]);
const uploadRef = ref<UploadInstance>();
const fileStore = useFileStore();
const onFileChange = async (file: UploadFile, _fileList: UploadFile[]) => {
  const result = await fileStore.uploadFile(file.raw as File);
  if (result) {
    fileList.value = [file];
    emit("upload", result);
  } else {
    emit("upload", null);
  }
};

const onRemove = () => {
  fileList.value = [];
  emit("remove");
};

onMounted(() => {
  fileList.value = props.fileList || [];
});
watch(
  () => props.reset,
  (val) => {
    onRemove();
  }
);
</script>

<style scoped></style>
