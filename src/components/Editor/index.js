import React, { Component } from 'react';

import EditorHeader from './Editor_Header';
import EditorMain from './Editor_Main';

export default class Editor extends Component {
  constructor(props) {
    super(props);

    this.setEditableFocus = this.setEditableFocus.bind(this);
    this.getEditableFocus = this.getEditableFocus.bind(this);
    this.onEditableFocus = this.onEditableFocus.bind(this); 
  }
  
  /**
   * 
   * ContentEditable Focus
   * 
   */

  setEditableFocus = (node) => {
    var caretID = 'caret';
    var cc = document.createElement('span');
    cc.id = caretID;
    // console.log(cc);

    window.getSelection().getRangeAt(0).insertNode(cc);
    
    node.blur();
    
  }

  getEditableFocus = (node) => {
    var caretID = '#caret';

    node.focus();
    // console.log(node);
    var range = document.createRange();
    var cc = node.querySelector(caretID);
    // console.log('dddd?')
    range.selectNode(cc);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    range.deleteContents();
  }

  onEditableFocus(event, node) {
    let value = event.target.innerText;
    
    if( value === "" ) { 
      return; 
    }
    
    this.setEditableFocus(node);

    node.innerHTML = node.innerHTML.replace(/<[/]?span[^i|>]*>/g, value);
    
    this.getEditableFocus(node);
  }
  render() {
    return (
      <div>
        <EditorHeader 
          onEditableFocus={this.onEditableFocus}
        />
        <EditorMain 
          onEditableFocus={this.onEditableFocus}
        />
      </div>
    )
  }
}
