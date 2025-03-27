import { defineStore } from "pinia";
import request from "../utils/request";
import { createMaket, IMarketsResponse, Market } from "../modules/backend";
import { ControlItem } from "../modules/frontend";
import { IFilter, ListData } from "../modules/backend/common.model";

interface marketstore {
  markets: ListData<IMarketsResponse>;
}
export const useMarketStore = defineStore("market", {
  state: (): marketstore => ({
    markets: {
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
    async marketCreate(data: createMaket) {
      return request.post("/market/create", data);
    },
    async fetchMarketList(data: {
      limit: number;
      page: number;
      search?: string;
      category_id: string | null;
    }) {
      const response = await request.get(`/market/list`, {
        params: {
          limit: data.limit,
          page: data.page,
          search: data?.search,
          category_id: data?.category_id,
        },
      });
      this.markets = response;
    },
    async marketUpdateById(
      id: string,
      data: { name: string; sort_number: number }
    ) {
      return request.patch(`/market/${id}`, data);
    },
    async marketDeleteById(id: string) {
      return request.delete(`/market/${id}`);
    },
  },
  getters: {
    getMarketList: (state): ControlItem[] =>
      state.markets.data.map((item: any) => ({
        value: item.id,
        label: item.name,
      })),
  },
});
