import React from 'react'
import moment from 'moment';
import {Input, Row, Col, InputNumber, Select, DatePicker, Form} from 'antd'
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

//高级搜索的表单中的下拉多选字段(用于选项多于3个时)
class SelectGroup extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: props.field,
            label: props.displayName,
            multiple: props.multiple || false,
            handle: props.handle,
            selectData:props.selectData,
            val: props.default?props.default:[]
        };
        this.changeHandle = this.changeHandle.bind(this);
    }
    componentWillReceiveProps(props,next){
      this.setState({
        name: props.field,
        label: props.displayName,
        multiple: props.multiple || false,
        handle: props.handle,
        selectData:props.selectData
      });
    }
    changeHandle (value) {
        this.setState({val: value});
        this.state.handle(this.state.name, value);
    }
    render () {
        var {selectData} = this.state;
        var {selectorKey,selectorValue} = this.props;
        var placeholder = "请选择(单选)";
        if(!(selectData instanceof Array)){return null;}
       if(!this.state.multiple){
            if(selectData[0]&&selectData[0].key != ''){
              selectData.unshift({
                key : "",
                value : '请选择'
              });
            }
        }else {
         placeholder = "请选择(多选)";
       }
      selectData = selectData.map(function (data) {
        var obj = {};
            obj.key = data[selectorKey]||data['key'];
            obj.value = data[selectorValue]||data['value'];
        return obj;
      });
         let idVal = this.state.name;
        return (  <Col style={{marginLeft: '20px'}} span={4}>
                      <label className="uk_label" style={{paddingBottom: "7px"}}>{this.state.label} :</label>
                        <Select
                            multiple={this.state.multiple}
                            showSearch
                            name={this.state.name}
                            style={{width: '100%'}}
                            optionFilterProp="children"
                            value={this.state.val}
                            placeholder={placeholder}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={this.changeHandle}
                        >
                            {selectData.map(function (item, key) {
                                return <Select.Option key={idVal + key + ''} value={item.key + ''}>{item.value}</Select.Option>
                            })}
                        </Select>
                    </Col>
                );
    }
}
//高级搜索的表单中的文本字段
class TextInput extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: props.field,
            label: props.displayName,
            // text: props.text,
            handle: props.handle,
            val: ''
        };
        this.changeHandle = this.changeHandle.bind(this);
        // this.reset = this.reset.bind(this);
    }

    changeHandle (e) {
        this.setState({val: e.target.value});
        this.state.handle(this.state.name, e.target.value);
    }

    // reset () {
    //     this.setState({val: ''});
    //     this.state.handle(this.state.name, '');
    // }

    render () {
      const {placeholder} = this.props
        return  <Col style={{marginLeft: '20px'}} span={4}>
                    <label className="uk_label">{this.state.label} :</label>
                    <Input style={{marginTop: "7px"}} name={this.state.name} placeholder={placeholder?placeholder:('请输入' + this.state.label)} value={this.state.val} onChange={this.changeHandle}/>
                </Col>
    }
}
//搜索的表单中的日期类型字段
class Timepicker extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          name: props.field,
          label: props.displayName,
          handle: props.handle,
          defaultValue:props.defaultValue,
          format:props.timeFormat == '' || props.timeFormat == 'timestamp' ? 'YYYY-MM-DD': props.timeFormat,
          val: '',
        };
        this.fromChange = this.fromChange.bind(this);
    }

    fromChange (date, dateString) {
        this.setState({val: dateString || ''});

        if(this.props.timeFormat == "timestamp"&&dateString){
          dateString = new Date(dateString).getTime();
        }
        this.state.handle(this.state.name, dateString);
    }
    // 是否具有默认值
    isdefaultValue(){
      if(this.props.defaultValue){
        return   <DatePicker onChange={this.fromChange}
                             placeholder={'请选择' + this.state.label}
                             format={this.state.format}
                             defaultValue={moment(this.props.defaultValue, 'YYYY-MM-DD')}
                             style={{width:'100%',marginTop: "7px"}} />

      }else {
        return   <DatePicker onChange={this.fromChange}
                             placeholder={'请选择' + this.state.label}
                             format={this.state.format}
                             style={{width:'100%',marginTop: "7px"}} />
      }
    }
    render () {
        return (
               <Col style={{marginLeft: '20px'}} span={4}>
                   <label className="uk_label">{this.state.label} :</label>
                   <FormItem wrapperCol={{span: 24}} style={{marginBottom: '5px', paddingRight:'6px'}}>
                     {this.isdefaultValue()}
                   </FormItem>
              </Col>
        );
    }
}
//时间段控件
class TimepickerRange extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: props.field,
      label: props.displayName,
      handle: props.handle,
      format:props.defaultValue||'YYYY-MM-DD',
      val: '',
    };
    this.fromChange = this.fromChange.bind(this);
  }

  fromChange (date, dateString) {
    this.setState({val: dateString[0]+'~'+dateString[1] || ''});
    this.state.handle(this.state.name, dateString[0]+'~'+dateString[1] || "");
  }
  render () {
    return (
      <Col style={{marginLeft: '20px'}} span={4}>
        <label className="uk_label">{this.state.label} :</label>
        <FormItem wrapperCol={{span: 24}} style={{marginBottom: '5px', paddingRight:'6px'}}>
          <RangePicker onChange={this.fromChange}
                       placeholder={'请选择' + this.state.label}
                       format={this.state.format}
                       showTime={{
                         hideDisabledOptions: true
                       }}
                       style={{width:'100%',marginTop: "7px"}} />
        </FormItem>
      </Col>
    );
  }
}

export default {
    SelectGroup,
    Timepicker,
    TimepickerRange,
    TextInput,
}
