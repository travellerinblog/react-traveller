import React, { Component } from 'react';


class MainTitle extends Component{

  constructor(props) {
    super(props);
    this.keyPressFn = this.keyPressFn.bind(this);
  }
  
  keyPressFn(event) {
    // h2, event, main_title
    this.props.onEditableFocus(event, this.refs.mainTitle);
  }

  render() {
    return (
      <div className="editor-header-mainTitle">
        <h1 
          onKeyPress={(event) => { this.keyPressFn(event) }}
          className="main-title"
          contentEditable="true"
          ref="mainTitle"
        >
        </h1>
      </div>
    );
  }
}

export default MainTitle;
