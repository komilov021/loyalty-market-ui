import { StudentDataResponse } from "@/modules/backend/transaction-model";
import request from "../utils/request";
import { defineStore } from "pinia";

type transactions = {
  transaction: StudentDataResponse;
};

export const useTransactionStore = defineStore("transaction", {
  state: (): transactions => ({
    transaction: {
      success: false,
      data: [],
      timestamp: "",
      error: null,
      pagination: {
        total_items: 0,
        total_pages: 0,
        current_page: 0,
        limit: 10,
        offset: 0,
      },
    },
  }),
  actions: {
    async fetchTransactionList(filters: {
      page: number;
      limit: number;
      uid: string;
      name: string;
      start_date: string;
      end_date: string;
    }) {
      let res = await request.post("/transaction/transaction_list", filters);
      this.transaction = res;
    },
    async fetchTransactionUpdate(data: {
      id: string;
      amount: number;
      uid: string;
      student_id: string;
      status: string;
    }) {
      await request.post("/transaction/transaction_update", data);
    },
  },
  getters: {},
});
