/**
 * Created by wangcuijiao on 2017/5/23.
 */
import React from 'react'
import PropTypes from 'prop-types';
import { Form,Input} from 'antd'
const Search = Input.Search

const search = ({onSearch}) => {
  const searchHandle = (evt) => {
    let value = evt.target.value;
    onSearch(value);
  }

  return (
   <div style={{marginBottom:5,textAlign:'right'}}>
     <span style={{paddingLeft:12,paddingRight:2}}>搜索:</span>
     <Input type='search' style={{width:200}} placeholder="关键字" onChange={searchHandle} />
   </div>
  )
}

search.propTypes = {
  onSearch: PropTypes.func,
}

export default Form.create()(search)
