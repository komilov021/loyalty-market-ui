export interface ListData<T> {
  success: boolean;
  data: T[];
  timestamp: string;
  error: null;
  pagination: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
    offset: number;
  };
}
export interface IFilter {
  limit: number;
  page: number;
  search?: string;
}
export interface IFile {
  id: string;
  name: string;
  size: number;
  type: string;
  created_at: Date;
  bucket_name: string;
}
