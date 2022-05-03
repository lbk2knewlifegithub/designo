export interface Pagination<T> {
  data: T;
  current: number;
  total: number;
  next?: number;
  prev?: number;
}
