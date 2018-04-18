import React from 'react'
import { Col,Row,Button} from 'antd'

import AdvanceForm from './advanceForm'

/**
 * props示例：
 * {
    showFlag: filterBoxShowFlag,//boolean
    switchPane: (key)=> {
      console.log(key);
    },
    simple: {...simpleForm, handle:simpleSubmit, reset:simpleReset},
    advance: {...advanceForm, handle:advanceSubmit, reset:advanceReset, advanceHandles:advanceHandles},
  }
 *
 * 具体用法请参考 src/routers/dict/dict.js文件
 *
 * simpleSubmit，simpleReset ---- 关键字搜索表单的提交和重置
 *
 * advanceSubmit，advanceReset ---- 高级搜索表单的提交和重置
 * advanceHandles ---- 高级搜索表单中字段发生change事件的处理程序
 *
 * simpleForm: {
      name: 'query',
      label: '关键词',
      text: '名称or编号'
    }
 *
 * advanceForm: {
      fileds: [
        {
          name: 'id',
          label: '编号',
          text: '输入正整数',
          type: 'numComp',
        },
        {
          name: 'name',
          label: '名称',
          text: '输入名称过滤字符',
          type: 'default',
        },
        {
          name: 'code',
          label: '编码',
          text: '输入编码过滤字符',
          type: 'default',
        },
        {
          name: 'sort_order',
          label: '排序标识',
          text: '输入正整数',
          type: 'numComp',
        },
        {
          name: 'description',
          label: '描述',
          text: '输入描述过滤字符',
          type: 'default',
        },
        {
          name: 'remove_flag',
          label: '有效性',
          options: [
            {text: '有效', value: 0},
            {text: '无效', value: 1}
          ],
          multiple: true,//支持多选
          type: 'select',
        },
        {
          name: 'valid_date',
          label: '有效日期',
          options: [
            {text: '这个日期之前'},
            {text: '这个日期之后'},
            {text: '当前日期'}
          ],
          type: 'dateComp',
        }
      ]
    }
 *
 */

//点击表格右上角的筛选按钮时弹出的过滤组件
class FilterBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
        return <Row gutter={24}>
                 <AdvanceForm {...this.props} />
               </Row>
  }
}
export default FilterBox
