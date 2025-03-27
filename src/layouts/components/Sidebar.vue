<template>
  <el-aside :style="{ width: !isCollapsed ? '80px' : '264px' }"
    class="sidebar bg-[#FFFFFF] transition-all duration-300 ease-in-out">
    <div class="px-4 mt-4 flex flex-col justify-between h-full">
      <div class="flex flex-col justify-between h-full">
        <div>
          <div v-if="isCollapsed" class="flex justify-between items-center">
            <div class="flex gap-[10px] items-center">
              <img src="../../assets/svgs/logo.svg" class="cursor-pointer" alt="" />
              <h1 class="cursor-pointer text-[16px] text-nowrap font-bold">
                EduPlus MA
              </h1>
            </div>
            <svg class="goback cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="8" @click="sidebarActive"
              height="14" viewBox="0 0 8 14" fill="none">
              <path d="M7 1L1 7L7 13" stroke="#6A6B70" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <div v-else
            class="transition-all duration-300 ease-in-out flex h-[32px] justify-center items-center rotate-180">
            <svg class="goback cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="8" @click="sidebarActive"
              height="14" viewBox="0 0 8 14" fill="none">
              <path d="M7 1L1 7L7 13" stroke="#6A6B70" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <div class="menu-bar mt-8 space-y-[4px]">
            <div v-for="menu of menus?.data" :key="menu.id">
              <div :class="{ active: activeItem?.id === menu.id }" @click="setActive(menu)"
                class="menu-nav !w-full cursor-pointer p-3 rounded-[12px] flex gap-3">
                <img class="object-contain max-w-full max-h-full"
                  :src="`https://admin.eduplus.uz${menu.avatar?.bucket_name}`" alt="" />
                <h1 class="text-[#6A6B70] whitespace-nowrap overflow-hidden">
                  {{ menu.name }}
                </h1>
              </div>
            </div>
            <div :class="{ active: activeItem == 'transaction' }" @click="setActiveTrans('transaction')"
              class="menu-nav !w-full cursor-pointer p-3 rounded-[12px] flex gap-3">
              <img class="object-contain max-w-full max-h-full" src="../../assets/svgs/document.svg" alt="" />
              <h1 class="text-[#6A6B70] whitespace-nowrap overflow-hidden">
                Transaction history
              </h1>
            </div>
          </div>
        </div>
        <div class="!max-w-[115px] cursor-pointer p-auto rounded-[12px] flex items-center mb-8 gap-3" @click="logout">
          <img class="object-contain max-w-full bg-[#F2F1F6] p-3 rounded-full max-h-full"
            src="../../assets/svgs/log-out.svg" alt="" />
          <h1 class="text-[#070811] whitespace-nowrap overflow-hidden">
            Log out
          </h1>
        </div>
      </div>
    </div>
  </el-aside>
</template>

<script setup lang="ts">
import { ElMessageBox } from "element-plus";
import {
  useUserStore,
  useMarketCategoriesStore,
  useMarketStore,
} from "../../stores";
import { onUpdated } from "vue";
import { ref, computed, reactive, onMounted, onBeforeMount } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
const i18n = useI18n()
interface Menu {
  id: string;
  name: string;
  description: string;
  avatar?: object;
  background?: object;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

const store = useUserStore();
const categories = useMarketCategoriesStore();
const market = useMarketStore();
const activeItem = ref<string | Menu | any>(null);
const isCollapsed = ref(true);
const router = useRouter();
const route = useRoute();

const menus = computed(() => categories.marketCategoryList);

function sidebarActive() {
  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem("saveCollapsed", JSON.stringify(isCollapsed.value));
}

const setActive = async (item: any) => {
  router.push(`/main/categories/${item?.id}`);
  await market.fetchMarketList({
    page: 1,
    limit: 100,
    category_id: item.id || route.params.category_id,
  });
  activeItem.value = item;
};

const setActiveTrans = (params: string) => {
  activeItem.value = params;
  router.push("/transaction/history");
};

onMounted(async () => {
  await categories.marketCategory();
  const storedValue = localStorage.getItem("saveCollapsed");
  if (storedValue !== null) {
    isCollapsed.value = JSON.parse(storedValue);
  }
  const routeId = route.params.category_id;
  if (route.path === "/transaction/history") {
    setActiveTrans("transaction");
  } else if (routeId) {
    const foundItem = menus.value?.data.find(
      (menu: any) => menu.id === routeId
    );
    if (foundItem) {
      setActive(foundItem);
    }
  }
});

const logout = () => {
  ElMessageBox.confirm(
    "This action cannot be undone. Continue?",
    i18n.t("shared.warning"),
    {
      distinguishCancelAndClose: false,
      confirmButtonText: "Yes",
      cancelButtonText: "Cencel",
      type: "warning",
      center: true,
      customClass: "custom-message-box",
    }
  )
    .then(() => {
      store.resetToken();
      router.push("/login");
    })
    .catch(() => {
      console.log("Logout cancelled");
    });
};
</script>

<style scoped>
.sidebar {
  overflow: hidden !important;
}

.elside {
  position: relative;
}

.elside .main-sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 12px;
  padding-top: 24px;
}

.menu-nav h1 {
  font-family: Poppins;
  font-size: 15px;
  font-weight: 500;
  line-height: 22.5px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.menu-nav:not(.active) h1 {
  color: #6a6b70;
}

.menu-nav.active h1 {
  color: #000;
}

.menu-nav.active {
  background-color: #f2f1f6;
}

.menu-nav:hover {
  background-color: #fafafc;
}

.menu-nav.active:hover {
  background-color: #f2f1f6;
}

.menu-nav {
  transition: all 0.3s ease-in-out;
}

.menu-nav.justify-center {
  justify-content: center;
}

.sidebar {
  transition: width 0.3s ease-in-out;
}
</style>
