import React from 'react'
import './cms.less'

class BoxLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
        <div className="boxLabel">
        {this.props.text}&nbsp;{(this.props.num !== undefined) ? `( ${this.props.num} )` : ''}
        {this.props.children}
        </div>
        <div className="splitLine"></div>
      </div>
  }
}
export default BoxLabel
