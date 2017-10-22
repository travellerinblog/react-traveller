import React, { Component } from 'react'

import MainContents from './Editor_Main_Contents';

export default class EditMain extends Component {
  render() {
    return (
      <div className="editor-main">
        <MainContents 
          onEditableFocus={this.props.onEditableFocus}
        />
      </div>
    )
  }
}
