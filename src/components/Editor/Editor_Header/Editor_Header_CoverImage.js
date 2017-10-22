import React from 'react';


const CoverImage = () => {

    return (
      <div className="editor-header-coverImage">
        <form action="">
          <fieldset>
            <legend>이미지 불러오기 영역</legend>
            <label htmlFor="coverImage-input-file">
              불러오기
              <input 
                id="coverImage-input-file"
                type="file"
                onChange={ (event) => {  }}
              />
            </label>
          </fieldset>
        </form>
      </div>
    );
}

export default CoverImage