<template>
  <div>
    <el-button type="primary" class="w-[172px]" @click="checkdrawer">
      Add {{ current }}
    </el-button>
    <CategoriesDrawer
      v-model="drawerCategory"
      v-if="drawerCategory"
      :type="formTypecategory"
      @close="drawerCategory = false"
      @on-submit="submitFormCategory($event)"
    />
    <ProductsDrawers
      v-model="drawerItem"
      v-if="drawerItem"
      :type="formTypeItems"
      @close="drawerItem = false"
      @on-submit="submitItem($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import {
  ElMessage,
  ElMessageBox,
  FormInstance,
  FormRules,
  UploadUserFile,
} from "element-plus";
import { ref, reactive, computed, onMounted } from "vue";
import UploadFile from "../../components/UploadFile.vue";
import CategoriesDrawer from "../../views/markets/components/CategoriesDrawer.vue";
import ProductsDrawers from "../../views/markets/components/ProductsDrawers.vue";
import { useMarketStore } from "../../stores/market";
import { useI18n } from "vue-i18n";
import { useFileStore } from "../../stores";
import { useMarketProductsStore } from "../../stores/market-products";
import { useMarketCategoriesStore } from "../../stores";

const i18n = useI18n();
const router = useRouter();
const route = useRoute();
const store = useMarketStore();
const marketproduct = useMarketProductsStore();
const formTypecategory = ref<"edit" | "create">();
const formTypeItems = ref<"edit" | "create">();

const currentRoute = computed(
  () => (router.currentRoute.value.fullPath.split("/")[2] || "default") as any
);
const current = computed(() =>
  currentRoute.value == "categories" ? "category" : "item"
);
const drawerCategory = ref(false);
const drawerItem = ref(false);

const checkdrawer = () => {
  if (currentRoute.value == "categories") {
    formTypecategory.value = "create";
    drawerCategory.value = true;
  } else {
    formTypeItems.value = "create";
    drawerItem.value = true;
  }
};

const submitItem = async (data: any) => {
  const params: any = {
    limit: 100,
    page: 1,
    market_id: route.params.id as string,
  };
  await marketproduct.createMarketProduct({
    ...data,
    market_id: route.params.id as string,
  });
  await marketproduct.getMarketProducts(params);
  ElMessage({
    message: "Successfully created",
    type: "success",
  });
  drawerItem.value = false;
};

const submitFormCategory = async (data: any) => {
  try {
    let params = {
      limit: 100,
      page: 1,
      category_id: route.params.category_id as string,
    };
    await store.marketCreate({
      ...data,
      category_id: route.params.category_id,
    });
    store.fetchMarketList(params);
    ElMessage({
      message: "Successfully created",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  } finally {
    drawerCategory.value = false;
  }
};
</script>

<style scoped lang="scss"></style>
