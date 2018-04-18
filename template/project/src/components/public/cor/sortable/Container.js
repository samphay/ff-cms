import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SortItem from './SortItem';

class Container extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      data: this.props.data,
      columns: this.props.columns
    };
  }
  componentWillReceiveProps(nextProps){
    this.state = {
      data: nextProps.data,
      columns: nextProps.columns
    };
  }
  moveCard(dragIndex, hoverIndex) {
    const { data } = this.state;
    const dragCard = data[dragIndex];

    this.setState(update(this.state, {
      data: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }));
  }
  onSort(){
    const { data } = this.state;
    const { onSort } = this.props;
    onSort(data);
  }
  render() {
    const { data } = this.state;
    const { columns ,keyIndex} = this.props;
    return (
      <div className="ant-table">
        <table className="ant-table-body">
          <thead className="ant-table-thead">
          <tr>
            <th className="tableCenter" key={0}>
              序号
            </th>
            {
              columns.map((col,i)=> {
                return (
                  <th className="tableCenter" key={i}>
                    {col.title}
                  </th>
                )
              })
            }
          </tr>
          </thead>
          <tbody className="ant-table-tbody">
          {data.map((card, i) => (
            <SortItem
              key={card[keyIndex]||i}
              index={i}
              id={card[keyIndex]||i}
              data={card}
              columns={columns}
              onSort={this.onSort.bind(this)}
              moveCard={this.moveCard}
            />
          ))}
          </tbody>

        </table>
      </div>

    );
  }
}
export default DragDropContext(HTML5Backend)(Container);
