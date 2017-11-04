import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditorHeader from './EditorHeader';
import EditorContent from './EditorContent';

export default class Editor extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      sub_title: '',
      contents: []
    }
  }

  setTitleData = (title) => {
    this.setState({
      title
    });
  }
  setSubTitleData = (sub_title) => {
    this.setState({
      sub_title
    });
  }
  setContentsData = (contents) => {
    this.setState({
      contents
    });
  }
  render() {
    return (
      <div>
        {/* Editor Header
            제목
            부제목
        */}
        <EditorHeader setTitleData={this.setTitleData} setSubTitleData={this.setSubTitleData}/>
        {/* Editor content
            글쓰기
            드래그 했을 때 editor tools 보이게 하기 
        */}
        <EditorContent setContentsData={this.setContentsData}/>
      </div>
    )
  }
}
