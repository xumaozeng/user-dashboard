import React from "react";
import { connect } from "dva";
import { Table, Pagination, Popconfirm, Button } from "antd";
import { routerRedux } from "dva/router";
import queryString from "query-string";
import UserModal from "./UserModal";
import styles from "./Users.css";

const PAGE_SIZE = 3;

function Users(props) {
  const { list: dataSource, total, page: current, loading, dispatch } = props;

  // 删除
  function deleteHandler(id) {
    dispatch({
      type: "users/remove",
      payload: id
    });
  }

  // 编辑
  function editHandler(id, values) {
    dispatch({
      type: "users/patch",
      payload: { id, values }
    });
  }

  // 创建
  function createHandler(values) {
    dispatch({
      type: "users/create",
      payload: values
    });
  }

  // 处理分页
  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: "/users",
        search: queryString.stringify({ page })
      })
    );
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a href="">{text}</a>
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website"
    },
    {
      title: "Operation",
      key: "operation",
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm
            title="确定删除?"
            onConfirm={deleteHandler.bind(null, record.id)}
          >
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      )
    }
  ];

  return (
    <div className={styles.normal}>
      <p className={styles.header}>用户面板</p>
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={createHandler}>
            <Button type="primary">Create User</Button>
          </UserModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={(record) => record.id}
          pagination={false}
        />
        <Pagination
          className={"ant-table-pagination " + styles.right}
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return { list, total, page, loading: state.loading.models.users };
}

export default connect(mapStateToProps)(Users);
