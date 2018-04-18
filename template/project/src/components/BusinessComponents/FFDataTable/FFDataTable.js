/**
 * CopyRight Samphay.
 * 2018/4/13
 */
import React, {Component} from 'react';
import {Table} from 'antd';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import PropTypes from "prop-types";
import classNames from "classnames";
import SortItem from "./SortItem";

@DragDropContext(HTML5Backend)
export default class FFDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...props
    }
    this.moveRow = this.moveRow.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  static propTypes = {
    ...Table.propTypes,
    sortable: PropTypes.bool,
    onSort: PropTypes.func
  };

  state = {
    sortable: false,
    dataSource:[]
  };

  componentWillMount() {

  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...newProps
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  SortComponents={
    body: {
      row:SortItem
    }

  }

  moveRow = (dragIndex, hoverIndex) => {
    const {dataSource} = this.state;
    const dragRow = dataSource[dragIndex];
    this.setState(
      update(this.state, {
        dataSource: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      }),
    );
  }
  onSort(){
    const {dataSource,onSort} = this.state;
    onSort&&onSort(dataSource)
  }
  render() {
    const {props, state, SortComponents,onSort, moveRow} = this;
    const {sortable,dataSource,indexKey} = state;
    const sortableConfig = sortable?{
      components:SortComponents,
      onRow: (record, index) => {
        return ({
          id:record[indexKey]||index,
          key:record[indexKey]||index,
          index,
          moveRow,
          onSort
        })
      }
    }:{}
    return (
      <Table
        {...props}
        {...sortableConfig}
        dataSource={dataSource}
      />
    )
  }
}



