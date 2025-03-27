export interface StudentData {
  id: string;
  uid: string;
  full_name: string;
  student_id: string;
  name: string;
  total_gem: string;
  status: string;
  created_at: string;
}

export interface Pagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  limit: number;
  offset: number;
}

export interface StudentDataResponse {
  success: boolean;
  data: StudentData[];
  timestamp: string;
  error: string | null;
  pagination: Pagination;
}
