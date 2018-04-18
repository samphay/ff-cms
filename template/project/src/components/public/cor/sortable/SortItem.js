import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from './ItemTypes';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
  drop(props, monitor, component){
    props.onSort();
  }
};

class SortItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any,
    moveCard: PropTypes.func.isRequired,
    onSort: PropTypes.func,
    data: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired
  };
  componentWillReceiveProps(nextProps){
    this.state = {
      ...nextProps
    };
  }
  render() {
    const {data,columns, index,isDragging, connectDragSource, connectDropTarget, connectDragPreview} = this.state;
    console.log(isDragging)
    const opacity = isDragging ? 0 : 1;
    return connectDragPreview(
      connectDropTarget(
        connectDragSource(
          <tr
            style={{cursor:"move",opacity}}>
              <td className="tableCenter" key={0} >
                {index+1}
              </td>
              {
                columns.map((item,itemIndex) => {
                  return (
                    <td className="tableCenter" key={itemIndex}>
                      {
                        item.render?item.render(data[item.dataIndex],data,index):data[item.dataIndex]
                      }
                    </td>
                  )
                })
              }
          </tr>
        )
      )
    );
  }
}

export default DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))(DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(SortItem))
