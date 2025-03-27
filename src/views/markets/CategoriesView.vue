<template>
  <div class="flex flex-col">
    <div>
      <div class="p-6 pb-0">
        <el-form @submit.prevent="">
          <el-form-item>
            <el-input v-model="filter.search" class="w-full" placeholder="Search for categories" :prefix-icon="Search"
              clearable @keyup.enter="fetchList" @clear="(filter.search = null), fetchList()" />
          </el-form-item>
        </el-form>
      </div>
      <div v-loading="loading" v-if="marketlist.data" class="h-full">
        <el-table v-on:row-click="onViewClick" :data="marketlist.data" stripe style="width: 100%"
          row-class-name="cursor-pointer">
          <el-table-column type="index" label="№" sortable min-width="150" align="left" />
          <el-table-column prop="name" label="Names" sortable min-width="180" />
          <el-table-column prop="sort_number" label="Sorting by number" sortable min-width="180" />
          <el-table-column fixed="right" label="Actions" sortable width="150">
            <template #default="{ row }">
              <el-tooltip content="View" placement="bottom">
                <el-button @click="onViewClick(row.id), stopEvent($event)" link type="primary" size="small">
                  <el-icon class="!text-[#6A6B70]" :size="22">
                    <View />
                  </el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="Edit" placement="bottom">
                <el-button @click="
                  openEdit(row);
                stopEvent($event);
                " link type="primary" size="small">
                  <img src="../../assets/svgs/edit.svg" class="!w-[22px] !h-[22px]" alt="edit" />
                </el-button>
              </el-tooltip>

              <el-tooltip content="Delete" placement="bottom">
                <el-button @click="deleteCategorie(row.id), stopEvent($event)" link type="primary" size="small">
                  <img src="../../assets/svgs/delete.svg" class="!w-[22px] !h-[22px]" alt="edit" />
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else class="flex">
        <div class="w-full flex flex-col items-center justify-center h-[60vh] text-center gap-3">
          <img :src="NotFoundIcon" alt="not-found-icon" />
          <h1 class="font-semibold">
            No categories added <br />
            right now
          </h1>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="py-2">
    <el-pagination
      background
      v-if="marketlist.pagination?.total_items < filter.limit"
      @current-change="onPaginationChange"
      class="bg-red-400"
      layout="prev, pager, next"
      next-text="Next ->"
      prev-text="<- Previous"
      :current-page="filter.page"
      :page-size="filter.limit"
      :total="marketlist.pagination?.total_items"
    />
  </div> -->
  <CategoriesDrawer v-model="drawer" v-if="drawer" :type="categoriesType" :data="currentCategory"
    @close="drawer = false" @on-submit="updateCategories($event)"></CategoriesDrawer>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, reactive } from "vue";
import { useMarketStore } from "../../stores/market";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import NotFoundIcon from "../../assets/svgs/not-found-icon.svg";
import CategoriesDrawer from "../markets/components/CategoriesDrawer.vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n()
const route = useRoute();
const router = useRouter();
const store = useMarketStore();
const marketlist = computed(() => store.markets);
const categoriesType = ref<"edit" | "delete">();
const loading = ref<boolean>(false);
const currentCategory = ref();

const drawer = ref<boolean>(false);
const filter = reactive({
  page: 1,
  limit: 100,
  search: null as any,
  category_id: route.params?.category_id as string,
});

const stopEvent = (event: any) => {
  event.stopPropagation();
};
const onViewClick = (row: any) => {
  router.push({
    name: "Items",
    params: { id: row.id },
    query: {
      category_id: route.params.category_id,
    },
  });
};
const openEdit = (data: any) => {
  categoriesType.value = "edit";
  currentCategory.value = data;
  drawer.value = true;
};

const fetchList = async () => {
  try {
    loading.value = true;
    await store.fetchMarketList(filter);
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
const updateCategories = async (data: any) => {
  try {
    let params = {
      name: data.name,
      sort_number: data.sort_number,
    };
    await store.marketUpdateById(data.id, params);
    await fetchList();
    ElMessage({
      message: "Successfully Updated",
      type: "success",
    });
    drawer.value = false;
  } catch (error: any) {
    console.log(error);
  }
};
const deleteCategorie = async (id: string) => {
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
      await store.marketDeleteById(id);
      ElMessage({
        message: "successfully deleted",
        type: "success",
      });
      await fetchList();
      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  })
};
onMounted(async () => {
  await fetchList();
});
</script>

<style scoped lang="scss"></style>
