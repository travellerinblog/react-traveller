import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditorHeader from './EditorHeader';

export default class Editor extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    return (
      <div>
        {/* Editor Header
            제목
            부제목
        */}
        <EditorHeader />
        {/* Editor content
            글쓰기
            드래그 했을 때 editor tools 보이게 하기 
        */}
      </div>
    )
  }
}
