/**
 * Created by renzhiqiang on 2017/6/24.
 */
import React from 'react'
import PropTypes from 'prop-types';
import { Form, Button,Card,Row,Col} from 'antd'
const Header = ({ele,clickFn}) => {
  if(ele.length ==0){
    return <div></div>
  };
  return (
    <Card style={{ marginTop: 5 }}>
      <Row gutter={16}>
        {ele.map(function (value,index) {
          return (<Button key={index} style={{marginLeft: "15px"}} type="primary" onClick={clickFn.bind(this,value)}>{value.name}</Button>)
        })}
      </Row>
    </Card>
  )
};
Header.propTypes = {
  addItem: PropTypes.object,
  selectItem: PropTypes.object
};

//export default Form.create()(Header) 或
export default Header
