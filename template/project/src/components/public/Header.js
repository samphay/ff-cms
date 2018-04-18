/**
 * Created by wangcuijiao on 2017/5/24.
 */
import React from 'react'
import PropTypes from 'prop-types';
import { Form, Button,Card,Row,Col} from 'antd'
import SelectOption from './SelectOption';

const Header = ({btnText,onBtnAdd,onSelect,selectTitle,allSelectData,...props}) => {

  const selectProps = {onSelect,selectTitle,allSelectData}

  return (
    <Card style={{ marginTop: 5 }}>
      <Row gutter={24}>
        <Col lg={4} md={4} sm={4} xs={4} style={{marginBottom: 16}}>
          <Button type="primary" onClick={onBtnAdd}>{btnText}</Button>
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}  style={{marginBottom: 16}}>
          <SelectOption {...selectProps}/>
        </Col>
        <Col lg={8} md={8} sm={8} xs={8} style={{marginBottom: 16, textAlign: 'right'}}>
        </Col>
      </Row>
    </Card>
  )
}

Header.propTypes = {
  btnText: PropTypes.string,
  onBtnAdd: PropTypes.func,
  onSelect: PropTypes.func,
  selectTitle: PropTypes.string,
  allSelectData: PropTypes.array,
}

//export default Form.create()(Header) 或
export default Header
