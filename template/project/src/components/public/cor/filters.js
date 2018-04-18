/**
 * Created by wangcuijiao on 2017/5/24.
 */
import React from 'react'
import PropTypes from 'prop-types';
import { Form, Button,Card,Row,Col} from 'antd'
import AdvanceForm from './filterBox/filterBox';

const Filters = ({selectItem}) => {
  // const {addItem, selectItem} = props;
  if(selectItem.fileds.length ==0){
    return <div></div>
  }
  return (
    <Card style={{ marginTop: 5 }}>
      <Row gutter={24}>
        <Col lg={24} md={24} sm={24} xs={24}  style={{marginBottom: 16}}>
          <AdvanceForm {...selectItem} />
        </Col>
      </Row>
    </Card>
  )
};

Filters.propTypes = {
  selectItem: PropTypes.object
};

export default Filters
