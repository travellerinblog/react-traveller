import React, { Component } from 'react';

import HeaderTitle from './Editor_Header_Title';

import '../../../scss/modules/Editor/Editor_header/_Editor_Header.scss';

export default class EditorHeader extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="editor-header">
        <HeaderTitle 
          onEditableFocus={this.props.onEditableFocus}
        />
      </div>
    )
  }
}
