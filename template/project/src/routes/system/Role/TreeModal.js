import React, { Component } from 'react';
import { Modal} from 'antd';
import MenuTree from './menuTree';

class TreeModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.props.onload(this.props.recordId);
    this.roleId = this.props.recordId;
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { save } = this.props;
    save(this.roleId);
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
        <Modal title="菜单分配" visible={this.state.visible} onOk={this.okHandler} onCancel={this.hideModelHandler}>
          <MenuTree roleID={this.roleId} ></MenuTree>
        </Modal>
      </span>
    );
  }
}

export default TreeModal;
