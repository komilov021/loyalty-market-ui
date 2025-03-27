import { ListData } from "@/modules/backend/common.model";
import request from "../utils/request";
import { defineStore } from "pinia";
import { IMarketProduct, IupdateProduct } from "@/modules/backend";

interface products {
  marketList: ListData<IMarketProduct>;
}
export const useMarketProductsStore = defineStore("market-products", {
  state: (): products => ({
    marketList: {
      success: true,
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
    async getMarketProducts(params: {
      page: number;
      limit: number;
      market_id: string;
      search: string | null;
    }) {
      const response = await request.get("/market-products/list", { params });
      this.marketList = response;
    },

    async updateMarketProducts(id: string, data: IupdateProduct) {
      return request.patch(`/market-products/update-sort/${id}`, data);
    },
    async createMarketProduct(data: IupdateProduct) {
      return request.post("/market-products/create", data);
    },
    async deleteMarketProduct(id: string) {
      return request.delete(`/market-products/${id}`);
    },
  },
});
