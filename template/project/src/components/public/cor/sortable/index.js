import React, { Component } from 'react';
import Container from './Container';
import PropTypes from 'prop-types';
export default class Sortable extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array,
    dataSource: PropTypes.array,
    keyIndex: PropTypes.string,
    indexKey: PropTypes.string,
    onSort: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state={
      ...props
    }
  }
  componentWillReceiveProps(nextProps){
    this.state = {
      ...nextProps
    };
  }
  render() {
    return (
      <Container
        columns={this.state.columns}
          data={this.state.data||this.state.dataSource}
        keyIndex={this.state.keyIndex||this.state.indexKey}
        onSort={this.state.onSort}
      />
    );
  }
}
