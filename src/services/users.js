import request from "../utils/request";

const PAGE_SIZE = 3;

// 取数据
export function fetch({ page }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}

// 删除
export function remove(id) {
  return request(`/api/users/${id}`, {
    method: "DELETE"
  });
}

// 编辑
export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: "PATCH",
    body: values
  });
}

// 新增
export function create(values) {
  return request(`/api/users`, {
    method: "POST",
    body: values
  });
}
