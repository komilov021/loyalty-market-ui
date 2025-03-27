import { IFile, ListData } from "@/modules/backend/common.model";
import request from "../utils/request";
import { defineStore } from "pinia";

interface categoriesList {
  id: string;
  name: string;
  avatar: IFile;
}
[];
interface IMarketCategory {
  marketCategoryList: ListData<categoriesList>;
}
export const useMarketCategoriesStore = defineStore("market-categories", {
  state: (): IMarketCategory => ({
    marketCategoryList: {
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
    async marketCategory() {
      let response = await request.get("/market-categories/list");
      this.marketCategoryList = response;
    },
  },
});
