import { fetch, remove, patch, create } from "../services/users";
import queryString from "query-string";

export default {
  namespace: "users",
  state: {
    list: [],
    total: null,
    page: null
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    }
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(fetch, { page });
      yield put({
        type: "save",
        payload: {
          data,
          total: parseInt(headers["x-total-count"], 10),
          page: parseInt(page, 10)
        }
      });
    },

    // 删除
    *remove({ payload: id }, { call, put, select }) {
      yield call(remove, id);
      const page = yield select((state) => state.users.page);
      yield put({ type: "fetch", payload: { page } });
    },

    // 编辑
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(patch, id, values);
      const page = yield select((state) => state.users.page);
      yield put({
        type: "fetch",
        payload: { page }
      });
    },

    // 新增
    *create({ payload: values }, { call, put, select }) {
      yield call(create, values);
      const page = yield select((state) => state.users.page);
      yield put({
        type: "fetch",
        payload: { page }
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location) => {
        const { pathname, search } = location;
        if (pathname === "/users") {
          dispatch({
            type: "fetch",
            payload: queryString.parse(search.replace(/^[?]*(.*)$/, "$1"))
          });
        }
      });
    }
  }
};
