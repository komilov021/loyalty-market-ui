<template>
  <div class="flex flex-col">
    <div class="w-full bg-white rounded-[18px] flex flex-col !h-full relative">
      <div class="p-6 items-center flex gap-4 justify-between">
        <el-input
          v-model="filter.uid"
          class="md:flex-1"
          placeholder="Search for ID and name of the students"
          :prefix-icon="Search"
          clearable
          @keyup.enter="fetchList"
          @clear="(filter.uid = null), fetchList()"
        />
        <el-input
          v-model="filter.name"
          placeholder="Search for item name "
          clearable
          class="w-full max-w-[330px] md:flex-1"
          @keyup.enter="fetchList"
          @clear="(filter.name = null), fetchList()"
        />
        <el-date-picker
          v-model="defaultTime"
          type="daterange"
          range-separator=" - "
          start-placeholder="Start date"
          end-placeholder="End date"
          :format="'DD.MM.YYYY'"
          class="max-w-[280px] w-full md:flex-1 custom-date-picker"
          @change="onDateChange"
          @keypress.enter="fetchList"
          :prefix-icon="null"
          :suffix-icon="null"
        >
          <template #suffix>
            <div
              class="!w-9 !h-9 rounded-lg bg-[#F2F1F6] flex items-center justify-center"
            >
              <img
                class="calendar-icon"
                :src="CalendarIcon"
                alt="calendar-icon"
              />
            </div>
          </template>
        </el-date-picker>
      </div>
      <div v-if="transaction.data?.length">
        <el-table
          :data="transaction.data"
          stripe
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="" label="№" sortable width="70">
            <template #default="{ $index }">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="uid"
            label="ID student"
            sortable
            min-width="90"
            align="left"
          />
          <el-table-column
            prop="full_name"
            label="Name of student"
            sortable
            min-width="150"
          />
          <el-table-column
            prop="name"
            label="Item name"
            sortable
            min-width="150"
          />
          <el-table-column
            prop="total_gem"
            label="Cost"
            sortable
            min-width="80"
          />
          <el-table-column
            prop="total_gem"
            label="Cost"
            sortable
            min-width="90"
          >
            <template #default="{ row }">
              <div>
                {{ dayjs(row.created_at).format("YYYY-MM-DD") }}
              </div>
            </template></el-table-column
          >
          <el-table-column
            prop="status"
            label="Transaction status"
            sortable
            width="220"
          >
            <template #default="{ row }">
              <div v-if="!isEditing[row.id]" class="flex items-center gap-10">
                <el-tag
                  v-if="row.status == 'success'"
                  color="#ECFDF3"
                  class="!text-[#007E33] !border-[#ECFDF3]"
                  round
                >
                  <div
                    class="flex items-center gap-[6px] capitalize text-xs font-medium"
                  >
                    <span
                      class="bg-[#00C851] w-[6px] h-[6px] rounded-full"
                    ></span>
                    {{ row.status }}
                  </div>
                </el-tag>
                <el-tag
                  v-else-if="row.status == 'refund'"
                  color="#F0F9FF"
                  class="!text-[#026AA2] !border-[#F0F9FF]"
                  round
                >
                  <div
                    class="flex items-center gap-[6px] capitalize text-xs font-medium"
                  >
                    <span
                      class="bg-[#0BA5EC] w-[6px] h-[6px] rounded-full"
                    ></span>
                    {{ row.status }}
                  </div>
                </el-tag>
                <el-tag
                  v-else-if="row.status == 'pending'"
                  color="#F5F5F5"
                  class="!text-[#414651] !border-[#F5F5F5]"
                  round
                >
                  <div
                    class="flex items-center gap-[6px] capitalize text-xs font-medium"
                  >
                    <span
                      class="bg-[#717680] w-[6px] h-[6px] rounded-full"
                    ></span>
                    {{ row.status }}
                  </div>
                </el-tag>
                <el-tag
                  v-else-if="row.status == 'canceled'"
                  color="#FEF3F2"
                  class="!text-[#CC0000] !border-[#FEF3F2]"
                  round
                >
                  <div
                    class="flex items-center gap-[6px] capitalize text-xs font-medium"
                  >
                    <span
                      class="bg-[#FF4444] w-[6px] h-[6px] rounded-full"
                    ></span>
                    {{ row.status }}
                  </div>
                </el-tag>
                <div
                  class="flex items-center cursor-pointer"
                  @click="editStatus(row)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M10.083 1.83398H8.24967C3.66634 1.83398 1.83301 3.66732 1.83301 8.25065V13.7507C1.83301 18.334 3.66634 20.1673 8.24967 20.1673H13.7497C18.333 20.1673 20.1663 18.334 20.1663 13.7507V11.9173"
                      stroke="#6A6B70"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.7037 2.76881L7.48038 9.99214C7.20538 10.2671 6.93038 10.808 6.87538 11.2021L6.48121 13.9613C6.33454 14.9605 7.04038 15.6571 8.03954 15.5196L10.7987 15.1255C11.1837 15.0705 11.7245 14.7955 12.0087 14.5205L19.232 7.29714C20.4787 6.05048 21.0654 4.60214 19.232 2.76881C17.3987 0.935476 15.9504 1.52214 14.7037 2.76881Z"
                      stroke="#6A6B70"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.668 3.80469C14.2821 5.99552 15.9963 7.70969 18.1963 8.33302"
                      stroke="#6A6B70"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div v-else class="flex items-center gap-1">
                <el-select
                  v-model="row.status"
                  placeholder="Select status"
                  class="w-full"
                >
                  <el-option
                    v-for="(item, i) of statusData"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <div class="flex items-center">
                  <el-button
                    :loading="loading"
                    :icon="Check"
                    size="small"
                    circle
                    color="#6941c6"
                    @click="saveStatus(row)"
                  />
                  <el-button
                    @click="cancelEdit(row)"
                    :icon="Close"
                    size="small"
                    circle
                    color="#44444F"
                    class="!ml-2"
                  />
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="p-4">
          <el-pagination
            background
            v-if="transaction.pagination?.total_items > filter.limit"
            @current-change="onPaginationChange"
            layout="prev, pager, next"
            next-text="Next ->"
            prev-text="<- Previous"
            :page-size="filter.limit"
            :total="transaction.pagination?.total_items"
          />
        </div>
      </div>

      <div
        v-else
        class="w-full flex flex-col justify-center items-center !h-[60vh] space-y-6"
      >
        <div class="p-6 rounded-[16px] bg-[#F2F1F6]">
          <img src="../../assets/svgs/category-storage.svg" alt="" />
        </div>
        <h1 class="text-[#070811] text-center font-semibold text-lg">
          No categories added <br />
          right now
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from "../../stores/transactions";
import { Calendar, Check, Close, Search } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import { computed, onMounted, reactive, ref } from "vue";
import CalendarIcon from "../../assets/svgs/calendar-icon.svg";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
const i18n = useI18n();
const transactionStore = useTransactionStore();
const transaction = computed(() => transactionStore.transaction);
const defaultTime: any = ref(["", ""]);
const loading = ref(false);
const filter = reactive({
  page: 1,
  limit: 20,
  uid: undefined as any,
  name: undefined as any,
  start_date: null as any,
  end_date: null as any,
});

const originalStatus = ref<string | null>();
function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
const onDateChange = (val: any) => {
  if (val && val.length === 2) {
    filter.start_date = dayjs(val[0]).format("YYYY-MM-DD");
    filter.end_date = dayjs(val[1]).format("YYYY-MM-DD");
  } else {
    filter.start_date = null;
    filter.end_date = null;
  }
  fetchList();
};
const fetchList = async () => {
  if (isNumeric(filter.uid)) {
    filter.name = filter.name ? filter.name : undefined;
  } else {
    filter.uid = filter.uid ? filter.uid : undefined;
  }
  await transactionStore.fetchTransactionList(filter);
};
const isEditing = ref({} as any);
const statusData = ref([
  { label: "Success", value: "success" },
  { label: "Refund", value: "refund" },
  { label: "Pending", value: "pending" },
  { label: "Canceled", value: "canceled" },
]);

const editStatus = (data: any) => {
  // console.log(data);
  if (data.status === "refund") {
    ElMessage.warning("Refund status cannot be changed!");
    return;
  }

  originalStatus.value = data.status;
  isEditing.value[data.id] = true;
};
const saveStatus = async (row: any) => {
  if (originalStatus.value === "refund") {
    ElMessage.error("Refund status cannot be changed!");
    row.status = originalStatus.value;
    isEditing.value[row.id] = false;
    return;
  } else if (row.status === "refund" && originalStatus.value !== "canceled") {
    ElMessage.error("Only 'canceled' status can be changed to 'refund'!");
    row.status = originalStatus.value;
    isEditing.value[row.id] = false;
    return;
  } else if (
    (originalStatus.value === "success" ||
      originalStatus.value === "pending") &&
    row.status === "refund"
  ) {
    ElMessage.error("Success or Pending status cannot be changed to 'refund'!");
    row.status = originalStatus.value;
    isEditing.value[row.id] = false;
    return;
  }

  // if (
  //   originalStatus.value === "canceled" &&
  //   (row.status === "success" || row.status === "pending")
  // ) {
  //   ElMessage.error("Canceled status cannot be changed to 'success' or 'pending'!");
  //   row.status = originalStatus.value;
  //   isEditing.value[row.id] = false;
  //   return;
  // }
  ElMessageBox.confirm(
    "This action cannot be undone. Continue?",
    i18n.t("shared.warning"),
    {
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      type: "warning",
      center: true,
    }
  ).then(async () => {
    try {
      loading.value = true;

      await transactionStore.fetchTransactionUpdate({
        id: row.id,
        student_id: row.student_id,
        uid: row.uid,
        status: row.status,
        amount: Math.abs(Number(row.total_gem)) as any,
      });

      ElMessage.success("Status changed");
      fetchList();
      loading.value = false;
      isEditing.value[row.id] = false;
    } catch (error) {
      loading.value = false;
    }
  });
};

const cancelEdit = (row: any) => {
  row.status = originalStatus.value;
  isEditing.value[row.id] = false;
};
const onPaginationChange = (event: number) => {
  filter.page = event;
  fetchList();
};

onMounted(() => {
  fetchList();
});
</script>

<style lang="scss" scoped>
.custom-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 24px;
  height: 24px;
}
</style>
