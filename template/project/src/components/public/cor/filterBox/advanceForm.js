import React from 'react'
import { Button, Row, Col } from 'antd'
import {SelectGroup, Timepicker, TextInput,TimepickerRange} from './corAdvanceFormItem'

//高级搜索的表单
class AdvanceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileds: props.fileds,
      handle: props.handle,
      // fieldHandle: props.fieldHandle,
      childRefs: []
    };
    // this.gtChange = this.gtChange.bind(this);
    // this.submitForm = this.submitForm.bind(this);
  }
  componentWillReceiveProps(props,next){
    this.setState({
      fileds: props.fileds,
      handle: props.handle
    });
  }
  // gtChange(value) {
  //   var val = this.state.val;
  //   val.eq = '';
  //   val.gt = value;
  //
  //   this.setState({val: val});
  //   this.state.handle(this.state.name, val);
  // }

  // submitForm(e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   this.state.handle(this.refs.advform);
  // }
  render() {
    var self = this;
    var fileds = self.state.fileds.map((item, j)=>{
      return Object.assign({}, item, self.props.fileds[j]);
    });
    var handler = this.state.handle;
    return (
      <form ref='advform'  style={{maxHeight:'450px', overflow: 'auto'}}>
        {
          fileds.map(function (item, key) {
            if(item.multiple){
              delete item.multiple;
              item.mode = "multiple";
            }
            let item_props = {...item, handle: handler};
            switch (item.type){
            case 'selectUrl' : {
              return <SelectGroup ref={'selectGroup'+key} {...item_props} key={key}/>;
              break
            }
            case 'selectData' : {
              return <SelectGroup ref={'selectGroup'+key} {...item_props} key={key}/>
              break
            }
            case 'timepicker':{
              return <Timepicker ref={'dateCompare'+key} {...item_props} key={key}/>
              break;
            }
            case 'timepickers':{
              return <TimepickerRange ref={'dateCompare'+key} {...item_props} key={key}/>
              break;
            }
            default: {
              return <TextInput ref={'textInput'+key} {...item_props} key={key}/>
            }
          }
        }.bind(this))}
      </form>
    );
  }
}

export default AdvanceForm
