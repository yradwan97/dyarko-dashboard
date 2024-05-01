export interface APIResponse<T> {
  data: T[];
  message: string;
  size: number;
  pages: number;
  itemsCount: number;
}
