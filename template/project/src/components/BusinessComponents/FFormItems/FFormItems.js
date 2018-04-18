/**
 * CopyRight Samphay.
 * 2018/4/16
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.less'
import FFormItem from "./FFormItem";

function FFormItems(props) {
  const {formConfig} = props;
  return <div className={style.FForm}>
    {
      formConfig.map((item, i) => {
        return (
          <div key={i} className={style.FFormBox}>
            {
              item.name ? <h1>{item.name}</h1> : ""
            }
            <FFormItem
              className={style.formBoxContent}
              {...props}
              formConfig={item.formConfig}
            />
          </div>
        )
      })
    }
  </div>
}

FFormItems.propTypes = {
  formConfig: PropTypes.array.isRequired,
  name: PropTypes.string
}


export default FFormItems

