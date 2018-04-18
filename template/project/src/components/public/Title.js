/**
 * Created by wangcuijiao on 2017/5/22.
 */
import React from 'react';

/*页面标题组件，可传参*/
export default class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const titleStyle = {
      padding:'0px 3px',
   //   background:'#ECECEC',
      font_size: '18px',
      marginBottom: 10,
      borderRadius:1,
      overflow:'hidden',
    };
    return (
      <div style={titleStyle} >{this.props.name}</div>
    )
  }
}
