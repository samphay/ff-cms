import React from 'react'
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'antd'
import SearchGroup from './ui/search'

const search = ({
  field,
  keyword,
  onSearch,
  onAdd,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  const searchGroupProps = {
    field,
    keyword,
    size: 'default',
    select: true,
    selectOptions: [{ value: 'name', name: '名称' }, { value: 'address', name: 'ID' }],
    selectProps: {
      defaultValue: field || 'name'
    },
    onSearch: (value) => {
      onSearch(value)
    }
  };



  return (
    <Row gutter={24}>
        <SearchGroup {...searchGroupProps} />
    </Row>
  )
}

search.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
}

export default Form.create()(search)
