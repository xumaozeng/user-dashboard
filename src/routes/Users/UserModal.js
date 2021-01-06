import React, { Component } from "react";
import { Modal, Form, Input } from "antd";

const FormItem = Form.Item;

class UserEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false
    });
  };

  okHandler = (values) => {
    const { onOk } = this.props;
    onOk(values);
    this.hideModelHandler();
  };

  render() {
    const { children } = this.props;
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="Edit User"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form
            {...layout}
            initialValues={this.props.record}
            onFinish={this.okHandler}
          >
            <FormItem label="Name" name="name">
              <Input />
            </FormItem>
            <FormItem label="Email" name="email">
              <Input />
            </FormItem>
            <FormItem label="Website" name="website">
              <Input />
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default UserEditModal;
