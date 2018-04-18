import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'dva'
import {hashHistory,routerRedux} from 'dva/router'
import {Layout,Switch,Form, Input, Cascader,Radio,Select, Menu,Button, Row, Col, Icon, Modal, Spin, Collapse} from 'antd'
import {PageLabel, BoxLabel} from './../../components/public/cor';
// import '../../components/cor/cms.less'
const FormItem = Form.Item;
const confirm = Modal.confirm;
const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;
import './config.less';
const { TextArea } = Input;

function menuConfigAdd({location, dispatch, form, menuConfigAdd}) {
  if (!menuConfigAdd) {
    return null;
  }
  const {detail,menus,formatTime,filterArr,filterItem,bottonArr,bottonItem,tableHeadArr,operateInfoArr,visible,type,tempDetail} = menuConfigAdd;
  const {getFieldDecorator, validateFields,setFieldsValue, getFieldsValue} = form;
  const actionTypeHead = 'menuConfigAdd/';
  const pageLabelProps = {
    isCorTable: true,
    current: detail.name ? ("菜单配置列表 >" + detail.name + '的编辑') : "菜单配置列表 > 新增"
  };
  const submitHandle = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {...getFieldsValue()};
      var dataParam = {
        id:detail.id ? detail.id:null,
        menuId:data["menuId"]||"",
        url: data["url"] || '',
        name:data["name"],
        buttonInfo:bottonArr,
        paramFilters:filterArr,
        tableHeads:tableHeadArr,
        operations:operateInfoArr,
      };
      dispatch({
        type: `${actionTypeHead}add`,
        payload: {
          ...dataParam
        }
      })
    })
  };
  // 取消
  const cancelHandle = () => {
    Modal.confirm({
      title: '确定放弃此次操作?',
      content: null,
      onOk() {
        hashHistory.goBack();
      },
      onCancel() {
      },
    });
  };
  const add = (inedx,action) => {
    dispatch({
      type: `${actionTypeHead}managerItem`,
      payload: {
        idx : inedx,
        action: action
      }
    });
  };
  const onchange=(index,type,value,e) => {
    switch (type){
      case "button":{
        bottonArr[index].name = document.getElementsByClassName("buttonName")[index].value;
        bottonArr[index].url = document.getElementsByClassName("buttonAttach")[index].value;
        if(typeof value == "string"){
          bottonArr[index].type = value;
        }
        break;
      }
      case "filter": {
        filterArr[index].displayName = document.getElementsByClassName("filterName")[index].value;
        filterArr[index].field = document.getElementsByClassName("filterFielde")[index].value;
        filterArr[index].url = document.getElementsByClassName("filterUrl")[index].value;
        filterArr[index].selectorKey = document.getElementsByClassName("selectorKey")[index].value;
        filterArr[index].selectorValue = document.getElementsByClassName("selectorValue")[index].value;

        if(value=="select"){
          filterArr[index].type = e;
        } else if(value=="multiple"){
          filterArr[index].multiple = e.target.value=="multiple"? true : false;
        }else if(value=="format") {
          filterArr[index].timeFormat = e;
        }
        filterArr[index].defaultValue='';
        break;
      }
      case "table": {
        tableHeadArr[index].displayName = document.getElementsByClassName("tableName")[index].value;
        tableHeadArr[index].fieldName = document.getElementsByClassName("tableFielde")[index].value;
        if(typeof value != "object"){
          tableHeadArr[index].supportSort = value ? 'false':'true';
        };
        tableHeadArr[index].render = document.getElementsByClassName("tableRender")[index].value;
        break;
      }
      case "operate": {
        operateInfoArr[index].operateName = document.getElementsByClassName("operateIName")[index].value;
        operateInfoArr[index].icon = document.getElementsByClassName("operateIFielde")[index].value;
        operateInfoArr[index].key = document.getElementsByClassName("operatekey")[index].value;
        operateInfoArr[index].url = document.getElementsByClassName("operateurl")[index].value;
        operateInfoArr[index].access = document.getElementsByClassName("access")[index].value;

        break;
      }
    }
    dispatch({
      type: `${actionTypeHead}onchangeFiled`
    });
  };
  //筛选条件列表动态生成
  const buttonItems = ()=>{
    return bottonArr.length==0 ? <Button size={'large'} style={{marginLeft: "46%"}} type="primary" onClick={add.bind(this,-1,"buttonItemAdd")}>添加</Button> : bottonArr.map((value,index)=>{
      return (<div key={index} className="context">
        <button className="addButton" onClick={add.bind(this,index,"buttonItemAdd")}>添加</button>
        <div className="deleteSqurie" onClick={add.bind(this,index,"buttonItemDelete")}>X</div>
        <Row gutter={16}  style={{marginTop: "10px"}}>
          <Col className="gutter-row"  span={7}>
            <label className="leftItem">名 称 : </label>
            <Input className="buttonName" onChange={onchange.bind(this,index,'button')} value={value.name||''} />
          </Col>
          <Col className="gutter-row" span={7}>
            <label>类 型 : </label>
            <Select allowClear  multiple={false} value={value.type} onSelect={onchange.bind(this,index,'button')} style={{width: '80%'}}>{bottonItem.map((item, key) => {return <Select.Option key={key + ''} value={item.value + ''}>{item.text}</Select.Option>})}</Select>
          </Col>
          <Col className="gutter-row" span={7}>
            <label>附 加 : </label>
            <Input style={{ width: '80%' }} className="buttonAttach" onChange={onchange.bind(this,index,'button')} value={value.url||''}  />
          </Col>
        </Row>
      </div>)
    })
  };
  //筛选条件列表动态生成
  const filterItems = ()=>{
    return filterArr.length==0 ? <Button size={'large'} style={{marginLeft: "46%"}} type="primary" onClick={add.bind(this,-1,"filterItemAdd")}>添加</Button>  :filterArr.map((value,index)=>{
      return (<div key={index} className="context">
        <button className="addButton" onClick={add.bind(this,index,'filterItemAdd')}>添加</button>
        <div className="deleteSqurie" onClick={add.bind(this,index,'filterItemDelete')}>X</div>
        <Row gutter={16} style={{marginTop: "10px"}}>
          <Col className="gutter-row" span={6}>
            <label className="leftItem">名 称 : </label>
            <Input className="filterName" onChange={onchange.bind(this,index,'filter')} placeholder="请输入名称" value={value.displayName||''} />
          </Col>
          <Col className="gutter-row" span={6}>
            <label>字 段 : </label>
            <Input className="filterFielde"  onChange={onchange.bind(this,index,'filter')} placeholder="请输入字段" value={value.field||''} />
          </Col>
          <Col className="gutter-row" span={6}>
            <label>类 型 : </label>
            <Select allowClear value={value.type} onSelect={onchange.bind(this,index,'filter',"select")} multiple={false} style={{width: '80%'}}>{filterItem.map((item, key) => {return <Select.Option key={key + ''} value={item.value + ''}>{item.text}</Select.Option>})}</Select>
          </Col>

          <Col className="gutter-row" span={3} style={{display:value.type == 'selectUrl'|| value.type == 'selectData' ? 'block':"none"}}>
            <RadioGroup onChange={onchange.bind(this,index,'filter','multiple')} value={value.multiple? "multiple":"single"}>
              <Radio value={"single"}>单选</Radio>
              <Radio value={"multiple"}>多选</Radio>
            </RadioGroup>
          </Col>
          <Col className="gutter-row" span={13} style={{paddingBottom: "10px",display:value.type == 'timepicker'|| value.type == 'timepickers' ? 'block':"none"}}>
            <label>时间格式 : </label>
            <Select allowClear value={value.timeFormat} defaultValue="YYYY-MM-DD" onSelect={onchange.bind(this,index,'filter',"format")} multiple={false} style={{width: '80%'}} >{formatTime.map((item, key) => {return <Select.Option key={key + ''} value={item.value + ''}>{item.text}</Select.Option>})}</Select>
          </Col>
          <Col className="gutter-row" span={17}  style={{paddingBottom: "10px",display:value.type == 'selectUrl'||value.type == 'selectData' ? "block":"none"}}>
            <Input className="filterUrl" type="textarea" rows={4} onChange={onchange.bind(this,index,'filter')} placeholder={value.type == 'selectUrl'? "请输入url接口" :'请输入规范静态数据 例如:[{"key": "key","value": "选择一" }]' }   value={value.url||''} />
          </Col>
          <Col className="gutter-row" span={6}  style={{paddingBottom: "10px",paddingTop:"9px",display:value.type == 'selectUrl' ? 'block':"none"}}>
           <div>
             <label> key : </label>
             <Input className="selectorKey"  onChange={onchange.bind(this,index,'filter')} placeholder="请输入下拉框数据中key" value={value.selectorKey||''} />
           </div>
            <div>
              <label>value : </label>
              <Input className="selectorValue"  onChange={onchange.bind(this,index,'filter')} placeholder="请输入下拉框数据中value" value={value.selectorValue||''} />
            </div>
          </Col>
        </Row>
      </div>)
    })
  };
  //筛选条件列表动态生成
  const tableItems = ()=>{
    return tableHeadArr.length==0 ? <Button size={'large'} style={{marginLeft: "46%"}} type="primary" onClick={add.bind(this,-1,"tableItemAdd")}>添加</Button>:tableHeadArr.map((value,index)=>{
      return (<div key={index} className="context">
        <button className="addButton" onClick={add.bind(this,index,'tableItemAdd')}>添加</button>
        <div className="deleteSqurie" onClick={add.bind(this,index,'tableItemDelete')}>X</div>
        <Row gutter={16} style={{marginTop: "10px"}}>
          <Col className="gutter-row" span={9}>
            <label className="leftItem">名 称 : </label>
            <Input className="tableName" onChange={onchange.bind(this,index,'table')} placeholder="请输入名称" value={value.displayName||''} />
          </Col>
          <Col className="gutter-row" span={9}>
            <label>字 段 : </label>
            <Input className="tableFielde" onChange={onchange.bind(this,index,'table')} placeholder="请输入字段" value={value.fieldName||''} />
          </Col>
          <Col className="gutter-row" span={3}>
            <label>是否排序 : </label>
            <Switch defaultChecked={value.supportSort == "false" ? true : false}  checkedChildren={'开'} unCheckedChildren={'关'} onChange={onchange.bind(this,index,'table')} />
          </Col>
          <Col className="gutter-row" span={21}  style={{paddingBottom: "10px"}}>
            <Input className="tableRender" type="textarea" rows={3} onChange={onchange.bind(this,index,'table')} placeholder="渲染(render)(渲染规则:一段简单html代码:js代码放在时{}中,数据源为data。例如:<span>{data.name}</span>)(如需引号,必须双引号)" value={value.render||''} />
          </Col>
        </Row>
      </div>)
    })
  };
  //操作动态生成
  const operateInfoItems = ()=>{
    return operateInfoArr.length==0 ? <Button size={'large'} style={{marginLeft: "46%"}} type="primary" onClick={add.bind(this,-1,"operateInfoAdd")}>添加</Button> : operateInfoArr.map((value,index)=>{
      return (<div key={index} className="context">
        <button className="addButton" onClick={add.bind(this,index,'operateInfoAdd')}>添加</button>
        <div className="deleteSqurie" onClick={add.bind(this,index,'operateInfoDelete')}>X</div>
        <Row gutter={16} style={{marginTop: "10px"}}>
          <Col className="gutter-row" span={5}>
            <label className="leftItem">名 称 : </label>
            <Input className="operateIName" onChange={onchange.bind(this,index,'operate')} placeholder="请输入名称" value={value.operateName||''} />
          </Col>
          <Col className="gutter-row" span={4}>
            <label>图 标 : </label>
            <Input className="operateIFielde" onChange={onchange.bind(this,index,'operate')} placeholder="请输入字段" value={value.icon||''} />
          </Col>
          <Col className="gutter-row" span={5}  style={{paddingBottom: "10px"}}>
            <label>组 件 : </label>
            <Input className="operatekey" onChange={onchange.bind(this,index,'operate')} placeholder="请输入标识" value={value.key||''} />
          </Col>
          <Col className="gutter-row" span={8}  style={{paddingBottom: "10px"}}>
            <label>接 口 : </label>
            <Input className="operateurl" onChange={onchange.bind(this,index,'operate')} placeholder="请输入url" value={value.url||''} />
          </Col>
          <Col className="gutter-row" span={20}  style={{paddingBottom: "10px",marginLeft: "42px"}}>
            <Input className="access" type="textarea" rows={4} onChange={onchange.bind(this,index,'operate')} placeholder="输入操作按钮的是否显示控制条件:比如{data.status == 1} 表示当status==1时候,按钮才显示,默认不填全部显示(如需引号,必须双引号)"   value={value.access||''} />
          </Col>
        </Row>
      </div>)
    })
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 3 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 21 },
      sm: { span: 21 },
    },
  };
  const formItemLayouts = {
    labelCol: {
      xs: { span: 2 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 22 },
      sm: { span: 22 },
    },
  };
  const saveHander= ()=>{
    let tempDetail = {};
    if(type=="import"){
      try{
        tempDetail=JSON.parse(document.getElementsByClassName("exprot")[0].value);
      }catch (e){
        console.info('导入数据格式有问题');
        return;
      }
      dispatch({
        type: `${actionTypeHead}saveTem`,
        payload: {tempDetail:tempDetail}
      });
    }else {
      dispatch({
        type: `${actionTypeHead}initData`,
        payload: {visible:false}
      });
    }
  };
  const hideModelHandler= ()=>{
    dispatch({
      type: `${actionTypeHead}initData`,
      payload: {visible:false}
    });
  }
  const emprots = (data)=> {

    dispatch({
      type: `${actionTypeHead}initData`,
      payload: {visible:true,type:data}
    });
  }
  return (
    <div className="content-inner ConfigMenuCss">
        <Row className="marginB16 bgcWhite">
          <PageLabel {...pageLabelProps} />
          <div className="noTopBorder">
            <div className="tabContent">
              <Form layout="horizontal">
                <Collapse>
                  <Panel header="基本信息" key="1">
                    <Row gutter={16}>
                      <Col className="gutter-row" span={12}>
                        <FormItem label="配置名称 :" {...formItemLayout} hasFeedback>{getFieldDecorator('name', {initialValue: detail&&detail.name || '',})(<Input  placeholder="请输入描述"/>)}</FormItem>
                      </Col>
                      <Col className="gutter-row" span={12}>
                        <FormItem label="关联菜单 :" {...formItemLayout} hasFeedback>
                          {getFieldDecorator('menuId',{initialValue: detail && detail.menuId || '',})(
                            <Select showSearch
                                    optionFilterProp="children"
                                    multiple={false}
                                    style={{width: '80%'}}
                                    onSelect={(value,e)=>{
                                      setFieldsValue({
                                        name:e.props.label
                                      })
                                    }}
                                    placeholder="请选择">
                              {menus.map((item, key) => {return <Select.Option key={key + ''} label={item.label} value={item.value + ''}>{item.label}</Select.Option>})}
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                  </Panel>
                  <Panel header="按钮配置" key="2">
                    {buttonItems()}
                  </Panel>
                  <Panel header="筛选配置" key="3">
                    {filterItems()}
                  </Panel>
                  <Panel header="表头字段配置" key="4">
                    <Col className="gutter-row" span={21}>
                      <FormItem label="列表接口名称 :" {...formItemLayouts} hasFeedback>{getFieldDecorator('url', {initialValue: detail&&detail.url || ''})(<Input  placeholder="请输入接口"/>)}</FormItem>
                    </Col>
                    <div style={{paddingTop: "21px"}}>
                    {tableItems()}
                    </div>
                  </Panel>
                  <Panel header="操作配置" key="5">
                    {operateInfoItems()}
                  </Panel>
                </Collapse>
              </Form>
              <div style={{paddingTop: '24px'}}>
                <Button size={'large'} style={{marginRight: '20px'}} onClick={cancelHandle}>取消</Button>
                <Button size={'large'} type="primary" onClick={submitHandle}>保存</Button>
                <Button size={'large'} style={{marginLeft: "23px",background:'#a74516'}} type="primary" onClick={emprots.bind(this,'import')}>导入</Button>
                <Button size={'large'} style={{marginLeft: "23px",background:'#a74516'}} type="primary" onClick={emprots.bind(this,'export')}>导出</Button>

              </div>
            </div>
          </div>
        </Row>
        <Modal width={600} title="导入导出" visible={visible} onOk={saveHander} onCancel={hideModelHandler}>
          <TextArea value={type=="export" ? JSON.stringify(tempDetail):''} style={{display:type=="export" ? "block":"none",height: "200px"}}></TextArea>
          <TextArea className="exprot" style={{display:type=="import" ? "block":"none",height: "200px"}}></TextArea>
        </Modal>
    </div>
  )
}
function mapStateToProps({menuConfigAdd}) {
  return {menuConfigAdd}
}

export default Form.create({})(connect(mapStateToProps)(menuConfigAdd))
