import { IFile } from "./common.model";

export interface Market {
  id: string;
  name: string;
  avatar: object;
  rating: number;
  background: object;
  created_at: string;
  deleted_at: string | null;
  updated_at: string;
  category_id: string;
  description: string;
}

interface Pagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  limit: number;
  offset: number;
}

export interface IMarketsResponse {
  success: boolean;
  data: Market[];
  timestamp: string;
  error: string | null;
  pagination: Pagination;
}

export interface createMaket {
  category_id: string;
  name: string;
}
export interface IMarketProduct {
  id: string;
  name: string;
  type: string | null;
  price: number;
  avatar: IFile;
  limited: boolean;
  market_id: string;
  created_at: string;
  deleted_at: string | null;
  updated_at: string;
  description: string;
  sort_number: number;
  remaining_count: number;
}
export interface IupdateProduct {
  market_id: string;
  name: string;
  description: string;
  avatar: IFile;
  price: number;
  remaining_count: number;
  limited: boolean;
  sort_number: number;
}
