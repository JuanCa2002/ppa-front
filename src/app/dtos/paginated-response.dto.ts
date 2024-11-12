export interface PaginatedResponseDTO<T> {
  data: Array<T>;
  total: any;
}