/**
 * CopyRight Samphay.
 * 2018/1/12
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import style from './index.less';
import {Input} from "antd";
export default class FFSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...props
    };
    this.onChange = this.onChange.bind(this);
  }

  static bounceId=null;

  static propTypes = {
    value: PropTypes.string,
    bounce: PropTypes.number,
    onChange: PropTypes.func,
    isShow: PropTypes.bool
  };

  state = {
    value: "",
    bounce: 1000,
    bounceId:null,
    isTyping: false,
    isFocus:false,
    isShow:true,
    label:"搜索",
    placeholder:"关键字"
  };

  componentWillMount() {

  }

  componentDidMount() {
    // console.log("FFSearch is Mounted")
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...newProps
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log("FFSearch update");
    return true;
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate() {
    // console.log("FFSearch is updated")
  }

  componentWillUnmount() {
    // console.log("FFSearch is unmounted")
  }

  onChange(value,type) {
    const {onChange,value:oldValue,bounce} = this.state;
    this.setState({
      value
    });
    clearTimeout(FFSearch.bounceId);
    FFSearch.bounceId = setTimeout(()=>{
      onChange&&onChange(value);
    },bounce)
  }

  render() {
    const {
      onChange,
      state
    } = this;
    const {
      value,
      isFocus,
      isShow,
      label,
      placeholder
    } = state;
    return (
      <div className={style.searchWrap} style={!isShow?{display:"none"}:{}}>
        <span className={style.searchLabel}>{label}:</span>
        <span className={style.search}>
          <Input
            placeholder={placeholder}
            autoFocus={isFocus}
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
            }}
          />
        </span>
      </div>
    )
  }
}
