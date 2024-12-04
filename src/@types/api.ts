export interface IResponseWithPagination<T> {
  next: string;
  prev: string;
  results: T;
  count: number;
}
