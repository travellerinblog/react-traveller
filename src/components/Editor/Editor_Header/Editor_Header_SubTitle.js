import React, { Component } from 'react';


class SubTitle extends Component {
  constructor(props) {
    super(props);
    this.keyPressFn = this.keyPressFn.bind(this);
  }

  keyPressFn(event) {
    // h2, event, main_title
    this.props.onEditableFocus(event, this.refs.subTitle);
  }

  render() {
    return (
      <div className="editor-header-subTitle">
        <p 
          onKeyPress={(event) => { this.keyPressFn(event) }} 
          className="sub-title" 
          contentEditable="true"
          ref="subTitle"
        >
        </p>
      </div>
    );
  }
}

export default SubTitle;