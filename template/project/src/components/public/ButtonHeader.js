/**
 * Created by wangcuijiao on 2017/5/25.
 */
import React from 'react'
import PropTypes from 'prop-types';
import { Form, Button,Card,Row,Col} from 'antd'

const ButtonHeader = ({btnText,onBtnAdd,...props}) => {

  return (
    <Card style={{ marginTop: 5 }}>
      <Row gutter={24}>
        <Col lg={4} md={4} sm={4} xs={4} style={{marginBottom: 16}}>
          <Button type="primary" onClick={onBtnAdd}>{btnText}</Button>
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}  style={{marginBottom: 16}}>
        </Col>
        <Col lg={8} md={8} sm={8} xs={8} style={{marginBottom: 16, textAlign: 'right'}}>
        </Col>
      </Row>
    </Card>
  )
}

ButtonHeader.propTypes = {
  btnText: PropTypes.string,
  onBtnAdd: PropTypes.func,
}

export default ButtonHeader
