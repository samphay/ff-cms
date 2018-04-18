/**
 * CopyRight Samphay.
 * 2017/12/22
 */
"use strict";
import React, {Component} from 'react';
import {Upload, Icon, Modal} from 'antd';
import style from './index.less';
import {openModal} from "../../../utils";
import PropTypes from "prop-types";
const uploadFileUrl = "/xvod/uploadFile/v1/upload";
function getBase64(file) {
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    // reader.readAsText(file);
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => resolve(reader.result));
  });
}

export class FFImgViewer extends Component {
  constructor(props) {
    super(props);
    this.state={
      ...this.state,
      ...props
    };
    this.view = this.view.bind(this);
    this.closeView = this.closeView.bind(this);
  }

  state = {
    visible: false
  };

  view() {
    this.setState({
      visible: true
    })
  }

  closeView() {
    this.setState({
      visible: false
    })
  }

  render() {
    const {view, closeView, props, state} = this;
    const {src, size,style:imgStyle} = props;
    const {visible} = state;
    const imageViewerClass = {
      small: style.imageViewerSmall,
      normal: style.imageViewerNormal
    };
    const imageViewerClassName = imageViewerClass[size] ?
      imageViewerClass[size] :
      imageViewerClass["normal"];
    return <div className={imageViewerClassName}>
      <div className={style.img} style={{...imgStyle}} title={"点击可以预览"} onClick={view}>
        <img src={src} alt=""/>
      </div>
      <Modal visible={visible} title={"预览"} width={800} footer={null} onCancel={closeView}>
        <img src={src} alt="" style={{width: "100%"}}/>
      </Modal>
    </div>
  }
}

class FFUploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...props
    };
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.getValueProps = this.getValueProps.bind(this);
    this.getSizeStyle = this.getSizeStyle.bind(this);
  }
  static propTypes = {
    action: PropTypes.string,
    imgSize: PropTypes.string,
    limit: PropTypes.number,
    countLimit: PropTypes.number,
    size: PropTypes.string,
  };
  state = {
    value: [],
    loading:false,
    imgSize:"",
    limit:1,
    countLimit:1,
    accept:"image/jpeg,image/png",
    action:uploadFileUrl
  };
  componentDidMount(){
    this.getValueProps(this.props);
  }
  componentWillReceiveProps(nextProps){
    this.getValueProps(nextProps);
  }
  getValueProps(props){
    let {value=[]} = props;
    if(typeof value =="string"){
      value = value?[value]:[];
    }
    this.setState({
      ...props,
      value
    });
  }
  onChange({file}) {
    const This = this;
    const {onChange} = This.props;
    let {value,countLimit} = This.state;
    if(file.status==="uploading"){
      This.setState({
        loading:true
      });
    }else{
      This.setState({
        loading:false
      });
    }
    if(file.status==="done"){
      getBase64(file.originFileObj).then((base64url)=>{
        if(typeof onChange === "function"){
          const {response} = file;
          if(response&&response.data){
            let url = response.data;
            value.push(url);
            This.setState({
              value
            });
            if(countLimit==1){
              value = value.join("")
            }
            onChange(value);
          }
        }
      });
    }

  }

  beforeUpload(file) {
    const {limit,imgSize} = this.state;
    return new Promise((resolve, reject)=>{
      const checkInfo = {
        pass : true,
        message : ""
      };
      getBase64(file).then((value)=>{
        const img = new Image();
        img.src = value;
        img.onload = ()=>{
          const checkType = (file.type === 'image/jpeg' || file.type === 'image/png');
          const checkLimit = file.size / 1024 / 1024 < limit;
          const checkSize = imgSize===""?true:`${img.width}*${img.height}`===imgSize;
          if (!checkLimit) {
            checkInfo.pass = false;
            checkInfo.message = `图片需要小于${limit}MB`;
          }
          if (!checkSize) {
            checkInfo.pass = false;
            checkInfo.message = `图片尺寸必须为${imgSize}`;
          }
          if (!checkType) {
            checkInfo.pass = false;
            checkInfo.message = "只能选择jpg/png格式的照片";
          }
          if(checkInfo.pass){
            resolve(file)
          }else{
            openModal(checkInfo.message, {
              okText: "知道了"
            });
            // reject()
          }
        };
        img.onerror = ()=>{
          openModal("图片格式已损坏，请重新选择", {
            okText: "知道了"
          });
        };
      });
    });
  }
  onCancel(i){
    const {onChange} = this.props;
    let {value,countLimit} = this.state;
    value.splice(i,1);
    // console.log("onCancel",value)
    this.setState({
      value
    });
    if(countLimit==1){
      value = value.join("")
    }
    onChange(value);
  }
  getSizeStyle(imgSize=""){
    let {size} = this.props;
    const [w,h] = imgSize.split("*");
    const W = size == "small"?48:90;
    const H = Math.ceil((W*h)/w);
    return {
      width:W+"px",
      height:H+"px",
      lineHeight:H+"px"
    }
  }
  render() {
    const {onCancel,onChange, beforeUpload,getSizeStyle} = this;
    let {size} = this.props;
    const {value=[],loading,action,accept,countLimit,imgSize} = this.state;
    const UploadBtnClass = {
      small: style.UploadBtnSmall,
      normal: style.UploadBtnNormal
    };
    const UploadBtnClassName = UploadBtnClass[size] ? UploadBtnClass[size] : UploadBtnClass["normal"];
    return <div className={style.UploadBtnWrap}>
      {
        value.length>0 ?
          value.map&&value.map((url,i)=>{
            return <div key={i} className={style.imageViewerWrap} style={{position:"relative"}}>
              <Icon className={style.closeImgBtn} onClick={()=>{
                onCancel(i)
              }} type={"close-circle"}/>
              <FFImgViewer style={getSizeStyle(imgSize)} src={url} size={size}/>
            </div>
          })
          :""
      }
      {
        value.length<countLimit||countLimit==0?<Upload
          className={style.uploader}
          action={action}
          accept={accept}
          onChange={(value)=>{onChange(value)}}
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <div title={"点击上传图片"} className={UploadBtnClassName} style={loading?{fontSize:"14px",...getSizeStyle(imgSize)}:{...getSizeStyle(imgSize)}}>
            <Icon type={loading?"loading":"plus"} />
          </div>
        </Upload>:""
      }
    </div>
  }
}

export default FFUploadFiles
