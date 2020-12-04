import React from "react";
import { connect } from "dva";
import { Table, Button } from "antd";
import styles from "./index.css";

function User({ dispatch, list: dataSource, loading, total, page: current }) {
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
      render: (text, record) => <span>删除</span>
    }
  ];
  return (
    <div className={styles.normal}>
      <div className={styles.create}>
        <Button type="primary">Create User</Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={false}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.user;
  return {
    loading: state.loading.models.user,
    list,
    total,
    page
  };
}

export default connect(mapStateToProps)(User);
