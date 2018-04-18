import React, { Component } from 'react';
import { Modal} from 'antd';
import UserCreate from './UserCreate';

class UserCreateModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.props.onload({});
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { children } = this.props;
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="新增用户"
          visible={this.state.visible}
          footer={null}
          onCancel={this.hideModelHandler}
        >
          <UserCreate hideModelHandler={this.hideModelHandler} />
        </Modal>
      </span>
    );
  }
}

export default UserCreateModal;
