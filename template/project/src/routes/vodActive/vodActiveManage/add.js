/**
 * CopyRight samphay.
 * 2018/3/30
 */
import React from "react";
import {Modal, Row, Col, Form, Input, DatePicker, Button} from 'antd';
import moment from "moment/moment";
import {Select} from 'antd';
import {Radio} from 'antd';
import {FFormItems, FFSourcePicker, FFUploadFiles,FFormItem} from "../../../components/BusinessComponents";
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
// const namespace = 'vodActiveManage';

function AddComponent(props) {
  const {state, dispatch, form,namespace} = props;
  const {visible, formData, modalData} = state;
  const {type} = modalData;
  const {
    validateFields,
    getFieldsValue,
  } = form;

  function disabled_hd_startTime(startValue) {
    const endValue = formData.endDate ? moment(formData.endDate) : undefined;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() >= endValue.valueOf();
  }

  function disabled_hd_endTime(endValue) {
    const startValue = formData.startDate ? moment(formData.startDate) : undefined;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  function upDateFormData(key, value) {
    formData[key] = value;
    dispatch({
      type: namespace + `/save`,
      payload: {
        formData
      }
    });
  }

  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    },
  };
  const formItemLineLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 18
    },
  };
  const formConfig = [
    {
      name:"基础配置",
      formConfig:[
        {
          label: "活动名称",
          span: 12,
          formItemProps: {
            ...formItemLineLayout
          },
          id: "name",
          option: {
            rules: [
              {
                required: true,
                message: '请输入活动名称',
              }
            ]
          },
          component: <Input placeholder="请输入"/>,
          componentComputedProps(data){
            return {
              addonAfter:data.type||"--"
            }
          }
        },
        {
          label: "活动类型",
          span: 12,
          formItemProps: {
            ...formItemLineLayout
          },
          id: "type",
          option: {
            rules: [
              {
                required: true,
                message: '请选择活动类型',
              }
            ]
          },
          component: <Select placeholder="活动类型">
            <SelectOption value={"1"}>用户首开</SelectOption>
            <SelectOption value={"2"}>设备首开</SelectOption>
          </Select>
        },
        {
          label: "生效时间",
          span: 12,
          formItemProps: {
            ...formItemLineLayout
          },
          id: "startDate",
          option: {
            rules: [
              {
                required: true,
                message: '请输入活动生效时间',
              }
            ]
          },
          value: formData.startDate ? moment(formData.startDate) : undefined,
          component: <DatePicker
            disabledDate={disabled_hd_startTime}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="开始时间"
            onChange={(value) => {
              upDateFormData("startDate", value.format("YYYY-MM-DD HH:mm:ss"))
            }}
          />
        },
        {
          label: "结束时间",
          span: 12,
          formItemProps: {
            ...formItemLineLayout
          },
          id: "endDate",
          option: {
            rules: [
              {
                required: true,
                message: '请输入活动结束时间',
              }
            ]
          },
          value: formData.endDate ? moment(formData.endDate) : undefined,
          component: <DatePicker
            disabledDate={disabled_hd_endTime}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="结束时间"
            onChange={(value) => {
              upDateFormData("endDate", value.format("YYYY-MM-DD HH:mm:ss"))
            }}
          />
        },
        {
          label: "牌照选择",
          span: 12,
          formItemProps: {
            ...formItemLineLayout
          },
          id: "cpCode",
          option: {
            rules: [
              {
                required: true,
                message: '请选择牌照',
              }
            ]
          },
          component: <Select placeholder="牌照选择">
            <SelectOption value={"tx"}>未来牌照</SelectOption>
            <SelectOption value={"snm"}>南方牌照</SelectOption>
          </Select>
        },
        {
          label: "背景图片",
          show({type}){
            return type==1
          },
          span: 12,
          formItemProps: {
            ...formItemLineLayout
          },
          id: "bg_img",
          option: {
            rules: [
              {
                required: true,
                message: '请选择图片',
              }
            ]
          },
          component: <FFUploadFiles size={"small"} action={"/xvod/uploadFile/upload"}/>
        },
      ]
    },

    {
      name:"资源选择",
      formConfig:[
        {
          // label: "牌照选择",
          // span:12,
          formItemProps: {
            // ...formItemLineLayout
          },
          id: "cpoolLst",
          option: {
            rules: [
              {
                required: true,
                message: '请选择商品',
              }
            ]
          },
          component: <FFSourcePicker
            // lazyLoad={true}
            triggerModal={() => {
              return false
            }}
            selectText={"商品"}
            form={form}
            filterValue={["cpCode", "comboTypeCode"]}
            filter={
              <FFormItem
                formConfig={[
                  {
                    label: "商品类型",
                    // span: 12,
                    formItemProps: {
                      labelCol: {
                        span: 3
                      },
                      wrapperCol: {
                        span: 21
                      },
                    },
                    id: "comboTypeCode",
                    option: {
                      rules: [
                        {
                          required: true,
                          message: '请选择商品类型',
                        }
                      ]
                    },
                    component: <RadioGroup placeholder="商品类型">
                      <Radio value={"26"}>企鹅影院</Radio>
                      <Radio value={"27"}>鼎级剧场</Radio>
                      <Radio value={"28"}>腾讯体育</Radio>
                    </RadioGroup>
                  }
                ]}
                {...form}
                formData={formData}
              />
            }
            placeholder={"请选择商品"}
            columns={[
              {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
                className: 'tableCenter',
              },
              {
                title: '牌照',
                dataIndex: 'cpCode',
                key: 'cpCode',
                className: 'tableCenter',
                render(key) {
                  const data = {
                    "tx": "未来牌照",
                    "snm": "南新牌照",
                  };
                  return data[key]
                }
              },
              {
                title: '类型',
                dataIndex: 'durationType',
                key: 'durationType',
                className: 'tableCenter',
                render(key) {
                  const data = {
                    "1": "周卡",
                    "2": "月卡",
                    "3": "季卡",
                    "4": "年卡"
                  };
                  return data[key]
                }
              },
              {
                title: '编码',
                dataIndex: 'code',
                key: 'code',
                className: 'tableCenter',
                editable:true,
                editComponent: <Input/>,
                render(code) {
                  return (
                    <span style={{display: "inline-block", width: "120px"}}>
                  {code}
                </span>
                  )
                }
              },
              {
                title: '时长',
                dataIndex: 'duration',
                key: 'duration',
                className: 'tableCenter',
              },
              {
                title: '时长信息',
                dataIndex: 'duration_desc',
                key: 'duration_desc',
                className: 'tableCenter',
              },
              {
                title: '推荐语',
                dataIndex: 'comment',
                key: 'comment',
                className: 'tableCenter',
              },
              {
                title: '角标信息',
                dataIndex: 'corner',
                key: 'corner',
                className: 'tableCenter',
              },
              {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                className: 'tableCenter',
                editable:true,
                valueFormat(text){
                  return (
                    <span>
                  {parseFloat(text) / 100}元
                </span>
                  );
                },
                editComponent:<Input addonAfter={"分"}/>,
                render(text){
                  return (
                    <span>
                  {parseFloat(text) / 100}元
                </span>
                  );
                },
              },
              {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                className: 'tableCenter',
              },
            ]}
            indexKey={"code"}
            // action={"/xvod/clientType/v1/getClientTypeCodeList"}
            action={"/xvod/combopool/v1/list"}
            actionProps={{
              setSendData(filterParam) {
                let page = JSON.parse(filterParam.page);
                page.size = -1;
                page.page = -1;
                return {
                  ...filterParam,
                  page: JSON.stringify(page),
                }
              },
              setResultData(result = {}) {
                if (result.return_code == 1000) {
                  let data = result.data || [];
                  /*if (result.data && result.data.length > 0) {
                    result.data.map((item) => {
                      data.push({
                        clientType: item.code
                      });
                    });
                  }*/
                  return {
                    data,
                    total: result.iTotalRecords
                  };
                }
              }
            }}
            listOperation={[
              /*{
                render(data,index) {
                  return <Button type={"primary"} onClick={() => {
                    this.editViewItem(data,index);
                  }
                  }>编辑</Button>
                }
              },*/
              {
                render(data) {
                  return <Button type={"primary"} onClick={() => {
                    this.delViewItem(data);
                  }
                  }>删除</Button>
                }
              },
            ]}
          />
        },
      ]
    },
    {
      name:"机型配置",
      formConfig:[
        {
          // label: "牌照选择",
          // span:12,
          formItemProps: {
            // ...formItemLineLayout
          },
          id: "clientTypes",
          option: {
            rules: [
              {
                required: true,
                message: '请选择机型',
              }
            ]
          },
          component: <FFSourcePicker
            // lazyLoad={false}
            selectText={"机型"}
            placeholder={"请选择机型"}
            columns={[
              {
                title: '机型名称',
                dataIndex: 'clientTypeCode',
                key: 'clientTypeCode',
                // className: 'tableCenter',
              }
            ]}
            indexKey={"clientTypeCode"}
            action={"/xvod/clientType/v1/getClientTypeCodeList"}
            actionProps={{
              setSendData(filterParam) {
                return {
                  ...filterParam
                }
              },
              setResultData(result) {
                if (result.return_code == 1000) {
                  let data = [];
                  if (result.data && result.data.length > 0) {
                    result.data.map((item) => {
                      data.push({
                        clientTypeCode: item.code
                      });
                    });
                  }
                  return {
                    data,
                    total: result.iTotalRecords || data.length
                  };
                }
              }
            }}

            listOperation={[{
              render(data) {
                const This = this;
                return <Button type={"primary"} onClick={() => {
                  this.delViewItem(data);
                }
                }>删除</Button>
              }
            }]}
          />
        },
        {
          label: "设备序列号",
          formItemProps: {
            ...formItemLayout
          },
          id: "dnum",
          option: {
            /*normalize(value) {
              if (value) {
                return String(value).trim().replace(/^[,，]/, "").replace("，", ",").replace(",,", ",")
              }
            },*/
            rules: [
              {
                required: false,
                message: "请输入设备序列号"
              },
              /*{
                pattern: /[^,]$/,
                message: "请不要以,结尾"
              }*/
            ]
          },
          component: <Input placeholder={"多个设备序列号，以,隔开"}/>
        },
      ]
    }
  ];
  const okHandler = (isPublish = false) => {
    validateFields((e) => {
      if (e) {
        console.log(e);
        return false;
      }
      let {code, startDate, endDate, saleStatus} = formData;
      const data = {...getFieldsValue()};
      let {dnum = "", clientTypes} = data;
      // dnum = dnum?dnum.split(","):[];
      clientTypes = clientTypes.map(item => {
        return {
          clientTypeCode: item.clientTypeCode,
          sys_version_name: "",
          app_version_name: ""
        }
      });
      const status = 1;
      saleStatus = saleStatus || 0;
      if (isPublish) {
        saleStatus = 1;
      }
      const sendData = {
        ...data,
        code, startDate, endDate, dnum, clientTypes,
        saleStatus, status
      };
      /*dispatch({
        type: namespace + `/add`,
        payload: {
          ...sendData
        }
      });*/
      console.log(data,sendData);
    })
  };
  const cancelHandler = () => {
    dispatch({
      type: namespace + `/closeAddModal`
    })
  };
  if (!visible) {
    return <div/>
  }
  return (
    <Modal
      title={type == "add" ? "添加" : "修改"}
      visible={visible}
      onCancel={cancelHandler}
      onOk={okHandler}
      footer={
        <div>
          <Button type={"primary"} onClick={() => {
            okHandler(true)
          }}>保存并发布</Button>
          <Button type={"primary"} onClick={() => {
            okHandler(false)
          }}>保存</Button>
          <Button type={"default"} onClick={() => {
            cancelHandler()
          }}>取消</Button>
        </div>
      }
      width={900}
    >
      <div>
        <Form>
          <FFormItems
            formConfig={formConfig}
            {...form}
            formData={formData}
          />
        </Form>
      </div>
    </Modal>
  )
}

export default Form.create()(AddComponent)
