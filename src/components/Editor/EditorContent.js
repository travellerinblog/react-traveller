import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class EditorContent extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  constructor(props) {
    super(props);

    this.state = {
      // text, img의 컨텐츠 정보들.
      contents: [],
      // newLine의 value값
      input_value: '',
      // image file 데이터
      image_file: null,
      image_data: '',
      // 수정할 text input에 대한 값들.
      rendered_input_value: '',
      rendered_inactived_content_index: 0,
      effects: []
    };
  }

  // 1. input enter, backspace 구현
  /**
   * @func setTextData 
   * @description 데이터를 가공해서 contents에 추가시켜주는 함수.
   */ 
  setTextData = () => {
    // 데이터를 가공해서 state.contents배열에 추가시킴.
    /*
      {
        type: 'text',
        value: ''
      }
    */
    const value = this.state.input_value;
    let temp_arr = [
      {
        is_active: false,
        type: 'text',
        value
      }
    ];

    this.setState({
      contents: this.state.contents.concat(temp_arr),
      input_value: ''
    }, () => {
      this.props.setContentsData(this.state.contents);
    });

    
  }

  setImageData = (file, data) => {
    /*
      {
        type: 'image',
        file:
        url:
      }
    */
    let temp_arr = [
      {
        type: 'image',
        info: {
          file,
          data
        }
      }
    ];

    this.setState({
      contents: this.state.contents.concat(temp_arr)
    }, () => {
      this.props.setContentsData(this.state.contents);
    });
    this.refs.newLine.focus();
  }
  /**
   * @func revisedContentData 
   * @description 기존 content이 수정된 후 저장하는 함수.
   */ 
  revisedContentData = () => {
    const index = this.state.rendered_inactived_content_index;
    const value = this.state.rendered_input_value;
    let contents = this.state.contents;
    let is_next_content_actived = false;

    contents = contents.map((data, _index) => {


      data.is_active = false;
      
      if( index === _index ) {
        data.value = value;
      }

      // index !== 0 일 때
      // 이전 is_active를 true로 바꾸고 state의 rendered 값을 바꿔야함.

      if( index < _index ) {
        // 1. 현재 자신의 다음에 있는 type이 텍스트인 것만 골라서 renderedTextActive함수를 실행시켜줘야 함.
        if( !is_next_content_actived && data.type === 'text' ) {
          data.is_active = true;
          this.setState({
            rendered_input_value: data.value,
            rendered_inactived_content_index: _index
          });
          is_next_content_actived = true;
        } 
      }

      if( (contents.length - 1) === _index ) {
        this.refs.newLine.focus();
      }
      return data;
    });

    this.setState({
      contents
    }, () => {
      this.props.setContentsData(this.state.contents);
    });
  }
  /**
   * @func onChangeImage 
   * @description 
   */ 
  onChangeImage = (e) => {
    e.preventDefault();
    
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      // this.setState({
      //   image_file: file,
      //   image_data: reader.result
      // });
      console.log(file);
      this.setImageData(file, reader.result);      
    }

    reader.readAsDataURL(file)
  }

  /**
   * @func onChangeInputValue 
   * @description input의 value값을 state에 저장하는 함수.
   */ 
  onChangeInputValue = (e) => {
    this.setState({
      input_value: e.target.value
    })
  }
  /**
   * @func onKeyPress 
   * @description input의 value가 빈값이 아니고 Enter를 쳤을 때 setTextData 함수를 실행시키는 함수.
   */ 
  onKeyPress = (e) => {
    var useage = e.target.getAttribute('data-useage');

    // if( e.charCode )

    if( (this.state.rendered_input_value !== '' || this.state.input_value !== '') && e.charCode === 13 ) {
      if( useage === 'newLine' ) {
        this.setTextData();
      } else if ( useage === 'revise' ) {
        this.revisedContentData();
      }
    }
  }
  /**
   * @func onKeyUp 
   * @description input의 value값이 빈값이고 백스페이스를 눌렀을 때 state의 content값의
   *              마지막 요소를 빼고 contents에 재할당 시키고 state의 input_value값을 pop시킨
   *              요소의 value값으로 집어넣어줌.
   */ 
  onKeyUp = (e) => {
    let useage = e.target.getAttribute('data-useage');
    let contents = this.state.contents;
    let rendered_index = this.state.rendered_inactived_content_index;

    const contents_length = contents.length;

    console.log(e.keyCode);
    // up 38 down 40
    if( useage === 'revise' && e.keyCode === 38 ) {
      rendered_index--;

      if( rendered_index < 0 ) {
        return;
      }
      this.renderedTextActived(rendered_index);
    }

    if( useage === 'revise' && e.keyCode === 40 ) {
      rendered_index++;
      if( rendered_index > (contents_length - 1) ) {
        this.refs.newLine.focus();
        return;
      }
      this.renderedTextActived(rendered_index);
    }

    if( useage === 'newLine' && this.state.input_value === '' && e.keyCode === 8 ) {
      
      console.log('contents[contents.lenth - 1]: ', contents[contents.length - 1]);
      let is_image_contents = contents[contents.length - 1].type === 'image' ? true : false; 
      
      // console.log('text_contents: ', text_contents);
      if( is_image_contents ) {
        return;
      }

      let last_content = contents.pop();

      this.setState({
        contents: contents,
        input_value: last_content.value
      }, () => {
        this.props.setContentsData(this.state.contents);
      });

      return;
    } 

    if( useage === 'revise' && this.state.rendered_input_value === '' && e.keyCode === 8 ) {
      const inactived_index = this.state.rendered_inactived_content_index;
      let new_rendered_index = 0;
      
      if( inactived_index !== 0 ) {
        for(let i = inactived_index - 1; i >= 0; i--) {
          const content = contents[i];
          
          if( content.type === 'text' ) {
            new_rendered_index = i;
            break;
          }
        }
        contents = this.renderedTextActived(new_rendered_index);
      }
      
      contents.splice(inactived_index, 1);      

      this.setState({
        contents
      }, () => {
        this.props.setContentsData(this.state.contents);
      });
    } 
  }

  renderedTextActived = (index) => {
    let contents = this.state.contents;

    return contents.map((data, _index) => {
      
      if( _index === index ) {
        data.is_active = true;
        this.setState({
          rendered_input_value: data.value,
          rendered_inactived_content_index: index
        });
      } else {
        data.is_active = false;
      }

      return data;
    });
  }
  /**
   * @func onClickRenderedContent 
   * @description 기존 content value를 수정하기 위한 함수.
   */ 
  onClickRenderedContent = (e) => {
    const index = parseInt(e.target.getAttribute('data-index'));
    let contents = this.renderedTextActived(index);

    this.setState({
      contents
    });

  }

  /**
   * @func onChangeRenderedContent 
   * @description 기존 content value의 수정된 값을 저장하는 함수.
   */ 
  onChangeRenderedContent = (e) => {
    this.setState({
      rendered_input_value: e.target.value
    });
  }

  removeImage = (e) => {
    const index = e.target.parentNode.getAttribute('data-index');
    console.log('removeImage index: ', index);
    let contents = this.state.contents;
    let is_delete = window.confirm('이미지를 삭제하시겠습니까?');

    if( is_delete ) {
      
      contents.splice(index, 1);

      this.setState({
        contents
      }, () => {
        this.props.setContentsData(this.state.contents);
      });
      this.refs.newLine.focus();
    }
  }
  /**
   * @func renderContent 
   * @description state의 contents의 값을 렌더링 시켜주는 함수.
   */ 
  renderContent = () => {
    let contents = this.state.contents;
    if( contents.length !== 0 ) {

      let is_inActive = false;

      contents = contents.map((data, index) => {
        
        if( data.type === 'image' ) {
          let alt = data.info.file.name.replace(/.gif|.png|.jpeg|.jpg/, '').trim();
          
          return (
            <div 
              className="editor-image-box" 
              key={index}
              data-index={index}
              onClick={(e) => { this.removeImage(e) }}
            >
              <img src={data.info.data} alt={alt} />
            </div>
          );
        }

        if( data.is_active ) {

          return (
            <input 
              type="text" 
              key={index}
              className="rendered-content-input"
              data-useage="revise"
              autoFocus={true} 
              value={this.state.rendered_input_value}
              onChange={(e) => { this.onChangeRenderedContent(e) }}
              onKeyPress={(e) => { this.onKeyPress(e) }}
              onKeyUp={(e) => { this.onKeyUp(e) }}
              />
          )
        } else {
          return (
            <p 
              key={index} 
              data-index={index} 
              onClick={(e) => { this.onClickRenderedContent(e) }}
              >{data.value}</p>
          );
        }
  
      });
      
      return contents;
    } 
    
  }
  /**
   * @func addNewLine 
   * @description 새로운 글을 쓰기위한 input태그를 렌더링시키는 함수.
   */ 
  addNewLine = () => {
    
    return (
      <input 
        type="text"
        className="new-line"
        data-useage="newLine"
        autoFocus="true"
        ref="newLine"
        placeholder="글을 입력해주세요."
        value={this.state.input_value} 
        onChange={(e) => { this.onChangeInputValue(e) }}
        onKeyPress={(e) => { this.onKeyPress(e) }}
        onKeyUp={(e) => { this.onKeyUp(e) }}
        />
    );
  }

  // componentDidMount = () => {
    
  // }
  
  componentDidMount = () => {
    setTimeout(() => {
      this.props.setContentsData(this.state.contents);
    }, 2000);
  }
  
  render() {
    return (
      <div className="editor-content">
        <EditorTools onChangeImage={this.onChangeImage}/>
        {this.renderContent()}
        {this.addNewLine()}
      </div>
    )
  }
}

const EditorTools = ({ onChangeImage }) => {

    return (
      <div className="editor-tools">
        <label htmlFor="editor-tool-image">이미지 추가하기</label>
        <input 
          id="editor-tool-image" 
          type="file"
          onChange={(e) => { onChangeImage(e) }}
          />
      </div>
    );
}

