import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class EditorHeader extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      title_status: false,
      sub_title: '',
      sub_title_status: false
    }
  }

  renderTitle = () => {
    const value = this.state.title;
    const title_status = this.state.title_status;
    const sub_title_status = this.state.sub_title_status;
    let auto_focus = false;

    if( (!title_status && !sub_title_status) || !title_status ) {
      auto_focus = true;
    } 

    if( !title_status || value === '' ) {
      return (
        <label>
          <input 
            type="text" 
            id="editor-header-title"
            className="title"
            ref="titleInput"
            placeholder="제목을 입력해주세요."
            value={this.state.title}
            onChange={(e) => { this.onChangeTitle(e) }}
            onKeyPress={(e) => { this.onKeyPressChangeStatus(e) }}
            autoFocus={auto_focus}
            />
        </label>
      );
    } 

    return (
      <h1 className="title" onClick={(e) => { this.onClickChangeStatus(e) }}>{this.state.title}</h1>
    );
    
  }
  renderSubTitle = () => {
    const value = this.state.title;
    const title_status = this.state.title_status;
    const sub_title_status = this.state.sub_title_status;
    let auto_focus = false;

    if( title_status && !sub_title_status ) {
      auto_focus = true;
    } 

    if( !sub_title_status || value === '' ) {
      return (
        <label>
          <input 
            type="text" 
            id="editor-header-subtitle"
            className="sub-title"
            ref="subTitleInput"
            placeholder="부제목을 입력해주세요."
            value={this.state.sub_title}
            onChange={(e) => { this.onChangeSubTitle(e) }}
            onKeyPress={(e) => { this.onKeyPressChangeStatus(e) }}
            autoFocus={auto_focus}
            />
        </label>
      );
    } 

    return (
      <h2 className="sub-title" onClick={(e) => { this.onClickChangeStatus(e) }}>{this.state.sub_title}</h2>
    );
    
  }

  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  onChangeSubTitle = (e) => {
    this.setState({
      sub_title: e.target.value
    })
  }
  onKeyPressChangeStatus = (e) => {
    let value = e.target.value;
 
    if( e.charCode === 13 ) {
      if( value.length < 5 ) {
        alert('5글자 이상 써주세요.');
        return;
      }
      this.changeStatus(e);
    }
  }
  onClickChangeStatus = (e) => {
    
    this.changeStatus(e);
  }
  changeStatus = (e) => {
    let class_name = e.target.getAttribute('class');

    if( class_name === 'title' ) {
      this.setState({
        title_status: !this.state.title_status
      });
    } else if ( class_name === 'sub-title' ) {
      this.setState({
        sub_title_status: !this.state.sub_title_status
      });
    }
    
  }
  
  disabledSubmit = (e) => {
    e.stopPropagation();
  }

  render() {
    return (
      <div className="editor-header">
        <form action="" onSubmit={(e) => { this.disabledSubmit(e) }}>
          <fieldset>
            <legend className="a11y-hidden">제목과 소제목쓰기 ㅠㅠ</legend>
            {this.renderTitle()}
            {this.renderSubTitle()}
          </fieldset>
        </form>
        {/* 제목 */}
        <h1></h1>
        {/* 부제목 */}
      </div>
    )
  }
}
