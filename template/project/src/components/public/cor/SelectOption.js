/**
 * Created by wangcuijiao on 2017/5/22.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Form,Select} from 'antd'
const Option = Select.Option;

const SelectOption = ({ onSelect,selectMultiple,selectTitle, allSelectData = [], defaultSelectData=[],...selectProps }) => {

  function getData() {
    const data = [];
    for (let i = 0; i <allSelectData.length; i++) {
      data.push(<Option key={allSelectData[i].id+"_"+i} value={allSelectData[i].id}>{allSelectData[i].title}</Option>);
    }
    return data;
  }

  return (
    <div>
      <span>{selectTitle}</span>
      <Select
        multiple={selectMultiple}
        defaultValue={defaultSelectData}
        placeholder="None selected"
        onChange={onSelect}
        style={{ width: '80%' }}
      >
        {getData()}
      </Select>
    </div>

  )
}

SelectOption.propTypes = {
  onSelect: PropTypes.func,
  allSelectData: PropTypes.array.isRequired,
//  buttonStyle: PropTypes.object,
//  dropdownProps: PropTypes.object,
}

export default SelectOption
