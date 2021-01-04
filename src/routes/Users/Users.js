import React from "react";
import { connect } from "dva";
import { Table, Pagination, Popconfirm } from "antd";
import styles from "./Users.css";

const PAGE_SIZE = 3;

function Users(props) {
  const { list: dataSource, total, page: current, loading } = props;

  function deleteHandler(id) {
    console.warn(`TODO: ${id}`);
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
      render: (text, { id }) => (
        <span className={styles.operation}>
          <a href="">Edit</a>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deleteHandler.bind(null, id)}
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
