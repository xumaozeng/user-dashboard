import request from "../utils/request";

const PAGE_SIZE = 3;

export function fetch({ page }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
