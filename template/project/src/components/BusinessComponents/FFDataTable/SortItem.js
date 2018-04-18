/**
 * CopyRight Samphay.
 * 2018/4/13
 */
import React, {Component} from 'react';
import { DragSource, DropTarget} from 'react-dnd';
import {findDOMNode} from 'react-dom';
import PropTypes from "prop-types";
import classNames from "classnames";


function dragDirection(
  dragIndex,
  hoverIndex,
  initialClientOffset,
  clientOffset,
  sourceClientOffset,
) {
  const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
  const hoverClientY = clientOffset.y - sourceClientOffset.y;
  if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
    return 'downward';
  }
  if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
    return 'upward';
  }
}

/*let BodyRow = (props) => {
  const {
    isOver,
    connectDragSource,
    connectDropTarget,
    connectDragPreview,
    moveRow,
    index,
    isDragging,
    dragRow,
    clientOffset,
    sourceClientOffset,
    initialClientOffset,
    ...restProps
  } = props;
  // console.log(props)
  const style = {...restProps.style, cursor: 'move'};
  let className = restProps.className;
  if (isOver && initialClientOffset) {
    const direction = dragDirection(
      dragRow.index,
      restProps.index,
      initialClientOffset,
      clientOffset,
      sourceClientOffset
    );
    if (direction === 'downward') {
      className += ' drop-over-downward';
    }
    if (direction === 'upward') {
      className += ' drop-over-upward';
    }
  }
  const opacity = isDragging ? 0 : 1;
  return connectDragPreview(
    connectDragSource(
      connectDropTarget(
        <tr
          {...restProps}
          key={restProps.index}
          className={className}
          style={{...style, opacity}}
        />
      )
    ));
}*/
const rowSource = {
  beginDrag(props) {
    return {
      id:props.id,
      // key:props.id,
      index: props.index,
    };
  },
};

const rowTarget = {
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
    props.moveRow(dragIndex, hoverIndex);
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
  drop(props, monitor) {
    const {onSort} = props;
    onSort && onSort();
  },
};
@DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  sourceClientOffset: monitor.getSourceClientOffset(),
}))
@DragSource('row', rowSource, (connect, monitor) => {
  return ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    dragRow: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset(),
    isDragging: monitor.isDragging(),
  })
})
export default class SortItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...props
    }
  }

  static propTypes = {};

  state = {};

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

  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      connectDragPreview,
      moveRow,
      index,
      key,
      dataSource,
      onSort,
      isDragging,
      dragRow,
      clientOffset,
      sourceClientOffset,
      initialClientOffset,
      ...restProps
    } = this.state;
    const style = {...restProps.style, cursor: 'move'};
    let className = restProps.className;
    if (isOver && initialClientOffset) {
      const direction = dragDirection(
        dragRow.index,
        restProps.index,
        initialClientOffset,
        clientOffset,
        sourceClientOffset
      );
      if (direction === 'downward') {
        className += ' drop-over-downward';
      }
      if (direction === 'upward') {
        className += ' drop-over-upward';
      }
    }
    const opacity = isDragging ? 0 : 1;
    return connectDragPreview(
      connectDragSource(
        connectDropTarget(
          <tr
            {...restProps}
            key={key}
            className={className}
            style={{...style, opacity}}
          />
        )
      ));
  }
}
