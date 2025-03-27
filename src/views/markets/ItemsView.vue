<template>
  <div>
    <div class="px-6 pt-4 flex items-center">
      <button @click="router.go(-1)" class="font-normal text-base text-[#6A6B70]">
        Categories /&nbsp;
      </button>
      <h1 class="font-normal text-base text-[#212121] underline underline-offset-1">
        {{ categoriesList?.name }}
      </h1>
    </div>
    <div class="p-6 pb-0">
      <el-form @submit.prevent="">
        <el-form-item class="">
          <el-input v-model="filter.search" class="w-full" placeholder="Search for items" :prefix-icon="Search"
            clearable @clear="(filter.search = null), fetchList()" @keyup.enter="fetchList" />
        </el-form-item>
      </el-form>
    </div>
    <div v-if="marketlist?.data" class="h-full" v-loading="loading">
      <el-table :data="marketlist?.data" stripe style="width: 100%">
        <el-table-column prop="sort_number" label="Number" sortable width="145" align="left" />
        <el-table-column align="left" prop="name" label="Names" sortable min-width="209" />
        <el-table-column align="left" prop="price" label="Price" sortable min-width="75" />
        <el-table-column align="left" label="File" sortable min-width="160">
          <template #default="{ row }">
            <div>
              <div v-if="row.avatar?.bucket_name" class="flex items-center gap-3">
                <img :src="`https://admin.eduplus.uz${row.avatar?.bucket_name}`" alt=""
                  class="!w-[24px] !h-[24px] rounded-[6px]" style="object-fit: cover" />
                <h2>{{ row.avatar?.name }}</h2>
              </div>
              <div v-else class="flex items-center gap-3">
                <img class="!w-[24px] !h-[24px] rounded-[6px]" src="../../assets/images/gallery.jpg" alt=""
                  style="object-fit: cover" />
                <h2>No File</h2>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Actions" width="120">
          <template #default="{ row }">
            <el-tooltip content="Edit" placement="bottom">
              <el-button @click="itemEditOpen(row)" link type="primary" size="small">
                <img src="../../assets/svgs/edit.svg" class="!w-[22px] !h-[22px]" alt="edit" />
              </el-button>
            </el-tooltip>
            <el-tooltip content="Delete" placement="bottom">
              <el-button @click="deleteCategorie(row.id)" link type="primary" size="small">
                <img src="../../assets/svgs/delete.svg" class="!w-[22px] !h-[22px]" alt="edit" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else class="flex !h-[50vh] justify-center items-center">
      <div class="w-full flex flex-col items-center text-center gap-3">
        <img :src="NotFoundIcon" alt="not-found-icon" />
        <h1 class="font-semibold">
          No items added <br />
          right now
        </h1>
      </div>
    </div>
  </div>

  <ProductsDrawers v-model="drawer" v-if="drawer" :type="type" @close="drawer = false" :data="editItemData"
    @on-submit="updateItem($event)" />
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ElMessage,
  ElMessageBox,
  FormInstance,
  FormRules,
  linkEmits,
  UploadUserFile,
} from "element-plus";
import { useI18n } from "vue-i18n";
import {
  useMarketCategoriesStore,
  useMarketProductsStore,
  useMarketStore,
} from "../../stores";
import { Search } from "@element-plus/icons-vue";
import NotFoundIcon from "../../assets/svgs/not-found-icon.svg";
import ProductsDrawers from "./components/ProductsDrawers.vue";
const i18n = useI18n()
const route = useRoute();
const router = useRouter();
const marketStore = useMarketStore();
const marketsMenuStore = useMarketCategoriesStore();
const store = useMarketProductsStore();
const marketlist = computed(() => store.marketList);

const loading = ref(false);
const type = ref<"create" | "edit">();
const categoriesList = computed(() => checkCategory());
const drawer = ref<boolean>(false);
const editItemData = ref();

const filter = reactive({
  page: 1,
  limit: 100,
  market_id: route.params.id as string,
  search: null as any,
});
let marketParams = reactive({
  page: 1,
  limit: 100,
  category_id: route.query.category_id as string,
});

const updateItem = async (data: any) => {
  try {
    loading.value = true;
    let dataType = marketsMenuStore.marketCategoryList?.data.filter(
      (item: any) => item?.id == route.query.category_id
    )?.[0];
    if (dataType?.name == "Appearance") {
      data.type = "appearance";
    }
    await store.updateMarketProducts(data.id, data);
    store.getMarketProducts(filter);
    drawer.value = false;
    ElMessage({
      message: "successfully updated",
      type: "success",
    });

    loading.value = false;
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};

const checkCategory = (): any => {
  return marketStore.markets.data.filter(
    (item: any) => item.id == route.params.id
  )[0];
};
const itemEditOpen = (data: any) => {
  type.value = "edit";
  editItemData.value = data;
  editItemData.value.market_id = route.params.id as string;
  drawer.value = true;
  // fileList.value = ruleForm?.avatar ? [ruleForm.avatar] : "";
};
const fetchList = async () => {
  try {
    loading.value = true;
    await store.getMarketProducts(filter);
    loading.value = false;
  } catch (error: any) {
    loading.value = false;
    console.log("error", error?.message);
  }
};
const onPaginationChange = (event: number) => {
  filter.page = event;
  fetchList();
};

const deleteCategorie = async (id: any) => {
  ElMessageBox.confirm(
    "This action cannot be undone. Continue?",
    i18n.t("shared.warning"),
    {
      confirmButtonText: "Yes",
      cancelButtonText: "Cencel",
      type: "warning",
      center: true,
      customClass: "custom-message-box"
    }
  ).then(async () => {
    try {
      loading.value = true;
      await store.deleteMarketProduct(id);
      await store.getMarketProducts(filter);
      ElMessage({
        message: "successfully deleted",
        type: "success",
      });
      loading.value = false;
    } catch (error) {
      loading.value = false;
      console.log(error);
    }
  })
};
onMounted(async () => {
  if (!marketStore.markets.data.length) {
    marketStore.fetchMarketList(marketParams);
  }
  store.getMarketProducts(filter);
});
</script>

<style scoped></style>
