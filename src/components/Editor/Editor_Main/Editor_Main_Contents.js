import React, { Component } from 'react';
import update from 'react-addons-update';
import PropTypes from 'prop-types';

export default class MainContents extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content_counter: -1,
      focused_content: -1,
      contents: []
    };

    
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onFocus = this.onFocus.bind(this);
    
    this.addTextComp = this.addTextComp.bind(this);
    this.contentTemp = this.contentTemp.bind(this);
    this.addTextContentBetweenContents = this.addTextContentBetweenContents.bind(this);

    this.setEndOfContenteditable = this.setEndOfContenteditable.bind(this);
    this.getCaretCharacterOffsetWithin = this.getCaretCharacterOffsetWithin.bind(this);
    this.getCaretPosition = this.getCaretPosition.bind(this);
  }

  /**
   * @memberof MainContents
   * 이벤트 영역
   * onKeyPress: keyPress 이벤트가 작동했을 때 일어나는 함수.
   * onKeyUp: keyUp 이벤트가 작동했을  때 일어나는 함수.
   */

  onKeyPress = (e) => {
    console.log(e.charCode);
    if( e.charCode === 13 ) {
      // this.addTextComp();
      console.log("???");
      let index = e.target.getAttribute('data-index');
      this.addTextContentBetweenContents(index, this.contentTemp('text'));
      return false;
    }
    
  }
  onKeyUp = (e) => {
    let target = e.target,
        value = target.innerText,
        index = target.getAttribute('data-index'),
        cursor_offset = this.getCaretPosition(target);

    console.log(e.keyCode);
    console.log('cursor_offset', cursor_offset);
    if( e.keyCode === 46 ) {
      return;
    }
    if( index > 0 ) {
      console.log('인덱스 1이상');
      let prev_comp = target.previousSibling;
      
      
      if( e.keyCode === 8 && cursor_offset <= 1 ) {
        console.log('keycode가 8이고 cursor_offset이 0일 때');
        prev_comp.innerHTML = prev_comp.innerText + value;
        this.setState({
          content_counter: this.state.content_counter - 1,
          focused_content: this.state.focused_content - 1,
          contents: update(this.state.contents, { $splice: [[this.state.focused_content, 1]] })
        });
        this.setEndOfContenteditable(prev_comp);
      }
      // target.parentNode.removeChild(target);
    } 
  }
  onFocus = (e) => {
    
    this.setState({
      focused_content: parseInt(e.target.getAttribute('data-index'))
    });
  }

  /**
   * @memberof MainContents
   * state 추가(텍스트, 이미지)
   */
  contentTemp = (type) => {
    return {
      type: type
    };
  }
  addTextComp = () => {
    this.setState({
      focused_content: this.state.focused_content + 1,
      content_counter: this.state.content_counter + 1,
      contents: update(this.state.contents, { $push: [this.contentTemp('text')] })
    });
  }
  addTextContentBetweenContents = (index, content) => {

    console.log('index: ', index);

    // if ( index === 0 || index === this.state.content_counter - 1) {
    //   // console.log('처음 또는 마지막 컨텐츠에서 추가')
    //   this.addTextComp();
    //   return;
    // }

    // console.log('중간에 넣는 로직');
    this.setState({
      focused_content: this.state.focused_content + 1,
      content_counter: this.state.content_counter + 1,
      contents: update(this.state.contents, { $splice: [[index, 0, this.contentTemp('text')]] })
    })

  }
  
  /**
   * @memberof MainContents
   * ETC
   * contentEditable 사용시 포커스를 마지막 부분에다 주기 위한 함수.
   */
  setEndOfContenteditable = (contentEditableElement) => {
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
      range = document.createRange();//Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
      range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection();//get the selection object (allows you to change selection)
      selection.removeAllRanges();//remove any selections already made
      selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
      range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
      range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
      range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
      range.select();//Select the range (make it the visible selection
    }
  }
  getCaretCharacterOffsetWithin = (element) => {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type != "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  }
  getCaretPosition = () => {
    if (window.getSelection && window.getSelection().getRangeAt) {
      var range = window.getSelection().getRangeAt(0);
      var selectedObj = window.getSelection();
      var rangeCount = 0;
      var childNodes = selectedObj.anchorNode.parentNode.childNodes;
      console.log('getCaretPosition: ', childNodes);
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i] == selectedObj.anchorNode) {
          break;
        }
        if (childNodes[i].outerHTML)
          rangeCount += childNodes[i].outerHTML.length;
        else if (childNodes[i].nodeType == 3) {
          rangeCount += childNodes[i].textContent.length;
        }
      }
      return range.startOffset + rangeCount;
    }
    return -1;
  }
  

  /**
   * @memberof MainContents
   * 라이프 사이클
   */
  componentDidMount = () => {
    this.addTextComp();
    let target = this.refs.mainContents.childNodes[this.state.focused_content];
    console.log('componentDidMount: ', this.state.focused_content);
    console.log(target);
    // target.innerHTML = target.innerHTML.replace( /[<][^>]*[>]/gi, '');
  }
  componentDidUpdate = (prevProps, prevState) => {
    // console.log(this.refs.mainContents.childNodes[this.state.focused_content]);
    if( this.state.content_counter > 0 ) {
      // console.log('componentDidUpdate focuses_content: ', this.state.focused_content);
      let target = this.refs.mainContents.childNodes[this.state.focused_content];
      // // let text = target.;
      target.focus();
      // target.innerHTML = target.innerHTML.replace( /[<][^>]*[>]/gi, '');
    }
  }
  
  render() {
    const mapToComponent = (data) => {
      return data.map((content, index) => {
        if(content.type === 'text') {
          return (
            <p 
              contentEditable="true" 
              key={index}
              data-index={index}
              onKeyPress={(e) => { this.onKeyPress(e) }}
              onKeyUp={(e) => { this.onKeyUp(e) }}
              onFocus={(e) => { this.onFocus(e) }}
            ></p>
          );
        }
      });
    }
    return (
      <div 
        className="editor-main-contents"
        ref="mainContents"
      >
      {mapToComponent(this.state.contents)}
      </div>
    )
  }
}

